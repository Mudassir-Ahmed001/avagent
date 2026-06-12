export default function Home() {
  return (
    <div className="font-sans min-h-screen p-6 sm:p-10 lg:p-16">
      <main className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-between gap-10 rounded-[2rem] border border-border/70 bg-card/80 p-8 shadow-2xl backdrop-blur-sm sm:p-12 lg:p-16">
        <section className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm">
            Dark sage mode
          </div>

          <div className="max-w-3xl space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Axiom feels calm, dark, and fully sage-tinted.
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              The starter branding is gone. This version leans into a deep sage
              palette across the shell, surfaces, buttons, and text so the whole
              app stays in one visual language.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-border bg-background/60 p-5 shadow-sm">
              <p className="text-sm font-medium text-primary">Theme</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Dark by default with sage-green surfaces and subtle contrast.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-background/60 p-5 shadow-sm">
              <p className="text-sm font-medium text-primary">Branding</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                No Next.js starter copy, icons, or template links left on the
                page.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-background/60 p-5 shadow-sm">
              <p className="text-sm font-medium text-primary">UI</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Buttons, cards, borders, and background all share the same tone.
              </p>
            </article>
          </div>
        </section>

        <section className="flex flex-col gap-4 sm:flex-row">
          <a
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
            href="#"
          >
            Explore the space
          </a>
          <a
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-secondary px-6 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            href="#"
          >
            Start building
          </a>
        </section>
      </main>
    </div>
  );
}
