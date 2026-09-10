import { ButtonLink, Container } from "@/components/ui";

export function NotFoundContent() {
  return (
    <section className="flex min-h-[60vh] items-center bg-background pb-16 pt-32 sm:pt-40">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-6xl font-extrabold tracking-tight text-primary sm:text-7xl">
            404
          </p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Страницата не е пронајдена
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Линкот што го отворивте не постои или е преместен. Вратете се на
            почетната страница или контактирајте нè директно.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <ButtonLink href="/mk">Почетна страница</ButtonLink>
            <ButtonLink href="/mk/kontakt" variant="pill">
              Контактирајте нè
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
