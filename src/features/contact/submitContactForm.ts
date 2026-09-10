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

/**
 * Single integration point for the contact form.
 *
 * There is no backend yet — this resolves successfully after a short delay so
 * the UI states are exercised. Replace the body with a `fetch` to an API route
 * or a transactional e-mail provider; the component needs no changes.
 */
export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!payload.email) {
    return { ok: false, error: "Недостига е-пошта." };
  }

  return { ok: true };
}
