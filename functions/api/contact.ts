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
  /**
   * Turnstile secret. Optional: leave it unset and the check is skipped
   * entirely, which is how this endpoint behaved before Turnstile existed.
   *
   * Set it only AFTER a build has shipped with NEXT_PUBLIC_TURNSTILE_SITE_KEY.
   * Secret without site key means no page can produce a token and every
   * genuine submission is refused.
   */
  TURNSTILE_SECRET_KEY?: string;
};

/**
 * The site's languages. Kept in step with `src/i18n/locales.ts` by hand: this
 * function is built separately from the app and cannot import it.
 */
type Language = "mk" | "sq";

type Payload = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** The page's language. Visitor-facing errors are answered in it. */
  locale: Language;
  /** Honeypot. Hidden from humans; bots fill it in. */
  website: string;
  /** Turnstile token. "" when the widget is disabled or did not load. */
  turnstileToken: string;
};

/**
 * Visitor-facing copy. The field messages match the form's own in
 * `src/data/content/ui.ts` and `ui.sq.ts`, so a message is worded the same
 * whether the browser or the server caught the problem.
 */
const ERRORS: Record<
  Language,
  {
    badRequest: string;
    validation: string;
    server: string;
    challenge: string;
    firstName: string;
    lastName: string;
    emailMissing: string;
    emailInvalid: string;
    subject: string;
    message: string;
  }
> = {
  mk: {
    badRequest: "Неисправно барање.",
    validation: "Проверете ги внесените податоци.",
    server: "Пораката не беше испратена. Обидете се повторно подоцна.",
    challenge: "Потврдата дека не сте робот не успеа. Обидете се повторно.",
    firstName: "Внесете го вашето име.",
    lastName: "Внесете го вашето презиме.",
    emailMissing: "Внесете ја вашата е-пошта.",
    emailInvalid: "Внесете валидна адреса на е-пошта.",
    subject: "Изберете тема на пораката.",
    message: "Пораката треба да содржи барем 10 знаци.",
  },
  sq: {
    badRequest: "Kërkesë e pavlefshme.",
    validation: "Kontrolloni të dhënat e futura.",
    server: "Mesazhi nuk u dërgua. Provoni përsëri më vonë.",
    challenge: "Verifikimi se nuk jeni robot dështoi. Provoni përsëri.",
    firstName: "Shkruani emrin tuaj.",
    lastName: "Shkruani mbiemrin tuaj.",
    emailMissing: "Shkruani e-postën tuaj.",
    emailInvalid: "Shkruani një adresë të vlefshme e-poste.",
    subject: "Zgjidhni temën e mesazhit.",
    message: "Mesazhi duhet të ketë të paktën 10 karaktere.",
  },
};

/** How the language is named in the email to the firm, which is Macedonian. */
const LANGUAGE_NAMES: Record<Language, string> = {
  mk: "македонски",
  sq: "албански (Shqip)",
};

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
  const messages = ERRORS[payload.locale];

  for (const [key, max] of Object.entries(LIMITS) as [
    keyof typeof LIMITS,
    number,
  ][]) {
    if (str(payload[key]).length > max) return messages.validation;
  }

  if (!payload.firstName.trim()) return messages.firstName;
  if (!payload.lastName.trim()) return messages.lastName;
  if (!payload.email.trim()) return messages.emailMissing;
  if (!EMAIL_PATTERN.test(payload.email.trim())) return messages.emailInvalid;
  if (!payload.subject.trim()) return messages.subject;
  if (payload.message.trim().length < 10) return messages.message;

  return null;
}

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Ask Cloudflare whether this token came from a real visitor.
 *
 * `unavailable` is kept distinct from `rejected` on purpose, because the two
 * deserve opposite treatment. A rejected token is a robot and gets a 403. An
 * unreachable verification service is almost always our own misconfiguration
 * or a transient outage, and the caller FAILS OPEN — the whole point of this
 * site is capturing leads, so silently dropping genuine enquiries during a
 * Cloudflare wobble costs the firm far more than the spam it would prevent.
 * The honeypot is still in force either way.
 */
async function verifyTurnstile(
  secret: string,
  token: string,
  remoteIp: string | null,
): Promise<"ok" | "rejected" | "unavailable"> {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  // Optional, and it sharpens Cloudflare's scoring.
  if (remoteIp) form.append("remoteip", remoteIp);

  let response: Response;
  try {
    response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body: form });
  } catch (error) {
    console.error("contact: turnstile unreachable", error);
    return "unavailable";
  }

  // Parse before checking the status: a bad secret comes back as HTTP 400
  // whose body still names the reason, and that reason is the whole value of
  // this log line to whoever is staring at a form that stopped working.
  const result = (await response.json().catch(() => null)) as {
    success?: boolean;
    "error-codes"?: string[];
  } | null;

  if (result?.success === true) return "ok";

  const codes = result?.["error-codes"] ?? [];
  const detail = codes.join(", ") || `http ${response.status}`;

  // `invalid-input-secret` and `missing-input-secret` are OUR bug, not the
  // visitor's, and would otherwise read as a site full of robots. So is any
  // non-200 from siteverify itself.
  if (!response.ok || codes.some((code) => code.includes("-secret"))) {
    console.error(
      `contact: turnstile misconfigured, check TURNSTILE_SECRET_KEY (${detail}). ` +
        "Failing open — this submission was let through unverified.",
    );
    return "unavailable";
  }

  console.warn(`contact: turnstile rejected (${detail})`);
  return "rejected";
}

function buildEmail(payload: Payload, receivedAt: string) {
  const fullName = oneLine(`${payload.firstName} ${payload.lastName}`);
  const rows: [string, string][] = [
    ["Име", fullName],
    ["Компанија", payload.company.trim() || "—"],
    ["Е-пошта", payload.email.trim()],
    ["Телефон", payload.phone.trim() || "—"],
    ["Тема", payload.subject.trim()],
    // Tells whoever answers which language the visitor wrote in.
    ["Јазик", LANGUAGE_NAMES[payload.locale]],
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

  // An Albanian enquiry is flagged in the subject, so it stands out in the
  // inbox before anyone opens it.
  const languageTag = payload.locale === "sq" ? "[SQ] " : "";

  return {
    subject: `${languageTag}Контакт: ${oneLine(payload.subject)} — ${fullName}`,
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
  // The language is not known until the body is parsed, so the few rejections
  // before that point answer in the default language.
  const early = ERRORS.mk;

  // Reject cross-site posts. A same-origin form always sends `Origin`.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return fail(early.badRequest, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail(early.badRequest, 415);
  }

  // Cheap early reject for oversized posts. A chunked body can omit this
  // header, so it is a courtesy, not a guarantee — the real ceilings are the
  // Workers platform body limit and the WAF rate-limit rule on this path.
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) {
    return fail(early.badRequest, 413);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail(early.badRequest, 400);
  }

  if (typeof raw !== "object" || raw === null) {
    return fail(early.badRequest, 400);
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
    // Anything unrecognised, including a missing field from an older cached
    // page, is treated as Macedonian.
    locale: source.locale === "sq" ? "sq" : "mk",
    website: str(source.website),
    turnstileToken: str(source.turnstileToken),
  };

  const messages = ERRORS[payload.locale];

  // Honeypot. Report success so the bot marks the address as working and
  // stops retrying, but send nothing.
  if (payload.website.trim()) {
    return json({ ok: true }, 200);
  }

  // Runs before Turnstile so a malformed post costs no outbound request.
  const invalid = validate(payload);
  if (invalid) return fail(invalid, 422);

  // Skipped entirely when no secret is configured — see the Env comment.
  if (env.TURNSTILE_SECRET_KEY) {
    if (!payload.turnstileToken) {
      console.error(
        "contact: TURNSTILE_SECRET_KEY is set but the submission carried no " +
          "token. The build serving this page had no " +
          "NEXT_PUBLIC_TURNSTILE_SITE_KEY, so the widget never rendered. " +
          "Add the site key as a build variable and redeploy, or remove the " +
          "secret. Until then every genuine enquiry is being refused.",
      );
      return fail(messages.challenge, 403);
    }

    const verdict = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      payload.turnstileToken,
      request.headers.get("cf-connecting-ip"),
    );

    if (verdict === "rejected") return fail(messages.challenge, 403);
    // "unavailable" deliberately falls through. See verifyTurnstile.
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    console.error(
      "contact: missing env. Need RESEND_API_KEY, CONTACT_TO, CONTACT_FROM.",
    );
    return fail(messages.server, 500);
  }

  const receivedAt = new Date().toISOString().replace("T", " ").slice(0, 16);
  const mail = buildEmail(payload, receivedAt);

  if (env.CONTACT_DRY_RUN === "1") {
    console.log(
      `contact: DRY RUN, nothing sent\nSubject: ${mail.subject}\n` + mail.text,
    );
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
    return fail(messages.server, 502);
  }

  if (!response.ok) {
    // Resend's message explains the real cause (unverified domain, bad key,
    // sandbox recipient restriction). It must not reach the visitor.
    console.error(`contact: resend ${response.status}`, await response.text());
    return fail(messages.server, 502);
  }

  // The message id is the only handle on a lead after the fact — it is what
  // Resend's dashboard and API are keyed by when someone asks "did that
  // enquiry actually arrive?". Cheap to log, impossible to recover later.
  const sent = (await response.json().catch(() => null)) as { id?: string } | null;
  console.log(`contact: sent ${sent?.id ?? "(no id returned)"}`);

  return json({ ok: true }, 200);
};
