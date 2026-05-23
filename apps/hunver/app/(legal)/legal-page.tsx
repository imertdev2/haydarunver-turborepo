import type { ReactNode } from "react"

interface LegalSection {
  heading: string
  body: ReactNode
}

interface LegalPageProps {
  title: string
  intro?: string
  updatedAt: string // "20 Mayıs 2026"
  sections: LegalSection[]
}

export function LegalPage({ title, intro, updatedAt, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <header className="mb-10 border-b border-white/10 pb-8">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A]">
            Yasal
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">
              {intro}
            </p>
          )}
          <p className="mt-4 text-xs text-white/30">Son güncelleme: {updatedAt}</p>
        </header>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="mb-3 text-base font-semibold text-white md:text-lg">
                {i + 1}. {section.heading}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-white/55 md:text-base">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
