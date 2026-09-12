export type ContactPayload = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

/** Fallback when the endpoint is unreachable or answers with something odd. */
const GENERIC_ERROR =
  "Пораката не беше испратена. Обидете се повторно или пишете ни на е-пошта.";

/**
 * Single integration point for the contact form.
 *
 * Posts to `/api/contact`, which is a Cloudflare Pages Function
 * (`functions/api/contact.ts`) that validates the submission again and hands
 * it to Resend. The site is a static export, so this endpoint does not exist
 * under `next dev` — use `npm run preview` to exercise the real thing.
 *
 * @param honeypot Contents of the hidden field. Always "" for a human; the
 *   server decides what to do with it, so it is passed through untouched.
 */
export async function submitContactForm(
  payload: ContactPayload,
  honeypot = "",
): Promise<ContactResult> {
  let response: Response;

  try {
    response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, website: honeypot }),
    });
  } catch {
    // Offline, DNS failure, request blocked by an extension.
    return { ok: false, error: GENERIC_ERROR };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    // A non-JSON response means something upstream answered instead of the
    // function — a 404 HTML page under `next dev`, or a proxy error page.
    // The first case is the common one and costs an afternoon if unexplained.
    if (response.status === 404) {
      console.warn(
        "/api/contact returned 404. `next dev` does not run Cloudflare Pages " +
          "Functions — use `npm run preview` and open localhost:8788 instead.",
      );
    }
    return { ok: false, error: GENERIC_ERROR };
  }

  const result = body as Partial<ContactResult> | null;

  if (response.ok && result?.ok === true) {
    return { ok: true };
  }

  const error =
    result && "error" in result && typeof result.error === "string"
      ? result.error
      : GENERIC_ERROR;

  return { ok: false, error };
}
