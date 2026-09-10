import { Footer, Header } from "@/components/layout";
import { NotFoundContent } from "@/components/sections";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
