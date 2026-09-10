import type { Metadata } from "next";

import { LegalPage } from "@/components/sections";
import { privacyPolicy } from "@/data/content";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.description,
  alternates: { canonical: "/mk/politika-za-privatnost" },
};

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
