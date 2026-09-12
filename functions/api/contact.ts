/**
 * Contact form endpoint — a Cloudflare Pages Function.
 *
 * The site itself is a static export with no server, so this file is the only
 * server-side code in the project. Pages routes it at `/api/contact` from its
 * path on disk; there is no router to register it with.
 *
 * It is NOT served by `next dev`. To exercise it locally:
 *
 *     npm run preview      # next build + wrangler pages dev out
 *
 * which reads secrets from `.dev.vars` (gitignored) and serves on :8788.
 */

type Env = {
  /** Resend API key. `re_…`. Dashboard → API Keys. */
  RESEND_API_KEY: string;
  /** Where leads are delivered. */
  CONTACT_TO: string;
  /** Sender. Must be on a Resend-verified domain, or `onboarding@resend.dev`. */
  CONTACT_FROM: string;
  /** Set to "1" to log the message instead of sending it. Local use only. */
  CONTACT_DRY_RUN?: string;
};

type Payload = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** Honeypot. Hidden from humans; bots fill it in. */
  website: string;
};

/** Visitor-facing copy. The site is Macedonian; so are these. */
const ERRORS = {
  badRequest: "Неисправно барање.",
  validation: "Проверете ги внесените податоци.",
  server: "Пораката не беше испратена. Обидете се повторно подоцна.",
} as const;

const MAX_BODY_BYTES = 16 * 1024;

const LIMITS = {
  firstName: 80,
  lastName: 80,
  company: 120,
  email: 160,
  phone: 40,
  subject: 120,
  message: 5000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      // Never let a lead confirmation sit in a cache.
      "cache-control": "no-store",
    },
  });

const fail = (error: string, status: number) => json({ ok: false, error }, status);

/** Escape for interpolation into the HTML mail body. */
const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Strip CR/LF so a submitted value cannot inject extra headers when it lands
 * in the subject line or in `reply_to`.
 */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

const str = (value: unknown) => (typeof value === "string" ? value : "");

function validate(payload: Payload): string | null {
  for (const [key, max] of Object.entries(LIMITS) as [
    keyof typeof LIMITS,
    number,
  ][]) {
    if (str(payload[key]).length > max) return ERRORS.validation;
  }

  if (!payload.firstName.trim()) return "Внесете го вашето име.";
  if (!payload.lastName.trim()) return "Внесете го вашето презиме.";
  if (!payload.email.trim()) return "Внесете ја вашата е-пошта.";
  if (!EMAIL_PATTERN.test(payload.email.trim())) {
    return "Внесете валидна адреса на е-пошта.";
  }
  if (!payload.subject.trim()) return "Изберете тема на пораката.";
  if (payload.message.trim().length < 10) {
    return "Пораката треба да содржи барем 10 знаци.";
  }

  return null;
}

function buildEmail(payload: Payload, receivedAt: string) {
  const fullName = oneLine(`${payload.firstName} ${payload.lastName}`);
  const rows: [string, string][] = [
    ["Име", fullName],
    ["Компанија", payload.company.trim() || "—"],
    ["Е-пошта", payload.email.trim()],
    ["Телефон", payload.phone.trim() || "—"],
    ["Тема", payload.subject.trim()],
    ["Примено", receivedAt],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Порака:",
    payload.message.trim(),
  ].join("\n");

  const html = `<!doctype html>
<html lang="mk">
  <body style="margin:0;padding:24px;background:#f5f5f5;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#171717">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px">
      <h1 style="margin:0 0 4px;font-size:18px">Нова порака од контакт формата</h1>
      <p style="margin:0 0 20px;font-size:14px;color:#737373">wvpconsulting.mk</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr>
          <td style="padding:6px 12px 6px 0;color:#737373;white-space:nowrap;vertical-align:top">${esc(label)}</td>
          <td style="padding:6px 0;vertical-align:top">${esc(value)}</td>
        </tr>`,
          )
          .join("\n        ")}
      </table>
      <h2 style="margin:24px 0 8px;font-size:14px;color:#737373;font-weight:600">Порака</h2>
      <div style="font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(payload.message.trim())}</div>
    </div>
  </body>
</html>`;

  return {
    subject: `Контакт: ${oneLine(payload.subject)} — ${fullName}`,
    text,
    html,
  };
}

/**
 * Anything that is not a POST.
 *
 * Without this, Pages finds no handler for the method and falls through to the
 * static assets, where `/api/contact` does not exist — so a GET answers 404 and
 * looks like the endpoint was never deployed. Method-specific exports take
 * priority over this one, so `onRequestPost` below still handles real posts.
 */
export const onRequest: PagesFunction<Env> = async () =>
  new Response(null, { status: 405, headers: { allow: "POST" } });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Reject cross-site posts. A same-origin form always sends `Origin`.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return fail(ERRORS.badRequest, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail(ERRORS.badRequest, 415);
  }

  // Cheap early reject for oversized posts. A chunked body can omit this
  // header, so it is a courtesy, not a guarantee — the real ceilings are the
  // Workers platform body limit and the WAF rate-limit rule on this path.
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) {
    return fail(ERRORS.badRequest, 413);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail(ERRORS.badRequest, 400);
  }

  if (typeof raw !== "object" || raw === null) {
    return fail(ERRORS.badRequest, 400);
  }

  const source = raw as Record<string, unknown>;
  const payload: Payload = {
    firstName: str(source.firstName),
    lastName: str(source.lastName),
    company: str(source.company),
    email: str(source.email),
    phone: str(source.phone),
    subject: str(source.subject),
    message: str(source.message),
    website: str(source.website),
  };

  // Honeypot. Report success so the bot marks the address as working and
  // stops retrying, but send nothing.
  if (payload.website.trim()) {
    return json({ ok: true }, 200);
  }

  const invalid = validate(payload);
  if (invalid) return fail(invalid, 422);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error(
      "contact: missing env. Need RESEND_API_KEY, CONTACT_TO, CONTACT_FROM.",
    );
    return fail(ERRORS.server, 500);
  }

  const receivedAt = new Date().toISOString().replace("T", " ").slice(0, 16);
  const mail = buildEmail(payload, receivedAt);

  if (env.CONTACT_DRY_RUN === "1") {
    console.log("contact: DRY RUN, nothing sent\n" + mail.text);
    return json({ ok: true }, 200);
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        // So hitting Reply in the inbox answers the visitor, not the sender
        // address. `reply_to` is snake_case in the REST API.
        reply_to: oneLine(payload.email),
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
      }),
    });
  } catch (error) {
    console.error("contact: resend unreachable", error);
    return fail(ERRORS.server, 502);
  }

  if (!response.ok) {
    // Resend's message explains the real cause (unverified domain, bad key,
    // sandbox recipient restriction). It must not reach the visitor.
    console.error(`contact: resend ${response.status}`, await response.text());
    return fail(ERRORS.server, 502);
  }

  // The message id is the only handle on a lead after the fact — it is what
  // Resend's dashboard and API are keyed by when someone asks "did that
  // enquiry actually arrive?". Cheap to log, impossible to recover later.
  const sent = (await response.json().catch(() => null)) as { id?: string } | null;
  console.log(`contact: sent ${sent?.id ?? "(no id returned)"}`);

  return json({ ok: true }, 200);
};
