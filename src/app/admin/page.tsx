import type { Metadata } from "next";

import { AdminApp } from "@/features/admin";

export const metadata: Metadata = {
  title: "Админ",
  robots: { index: false, follow: false },
};

/**
 * The editor's page for blog posts. Deliberately outside `[locale]`: it has no
 * header, footer or translations, and it is not linked from the site. All of
 * its data comes from /api/admin after sign-in, so the static HTML holds
 * nothing but the sign-in form.
 */
export default function AdminPage() {
  return <AdminApp />;
}
