import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { SERVICES } from "./_data"

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "Nefes terapisi, bioenerji, aile dizimi, ses meditasyonu, watsu, retreatler ve online seanslar — Haydar Ünver ile çalışılabilecek alanlar.",
  alternates: { canonical: "/hizmetler" },
}

export default function HizmetlerPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mb-12 text-center md:mb-16">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Birlikte çalışabileceğimiz alanlar
          </p>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-4xl">
            Hizmetler
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-white/55 md:text-base">
            Bedene, nefese ve bilince eğilen bireysel seanslar, eğitimler ve retreatler.
            Sana uygun olanı seç, randevu oluştur ya da WhatsApp'tan ulaş.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/hizmetler/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all hover:border-[#C8A96A]/30"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0D0D0D]">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
                <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur-sm md:text-xs">
                  <Clock className="size-3" />
                  {s.duration}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-base font-semibold text-white md:text-lg">
                  {s.title}
                </h2>
                <p className="mt-1 text-xs text-[#C8A96A]/80 md:text-sm">{s.tagline}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
                  {s.intro[0]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#C8A96A] transition-transform group-hover:translate-x-0.5">
                  Detaylar
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
