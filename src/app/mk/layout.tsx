import { Footer, Header } from "@/components/layout";

export default function MkLayout({ children }: LayoutProps<"/mk">) {
  return (
    <>
      <a
        href="#glavna-sodrzina"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Прескокни до содржината
      </a>
      <Header />
      <main id="glavna-sodrzina" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
