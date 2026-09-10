import { redirect } from "next/navigation";

/** The site is Macedonian-only; the root simply forwards to the locale. */
export default function RootPage() {
  redirect("/mk");
}
