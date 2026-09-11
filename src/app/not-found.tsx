import { Footer, Header } from "@/components/layout";
import { NotFoundContent } from "@/components/sections";
import { mobileNav, primaryNav } from "@/data/site";

export default function NotFound() {
  return (
    <>
      <Header nav={primaryNav} mobileNav={mobileNav} />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
