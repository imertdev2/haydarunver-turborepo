import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Ruler, Check, ImageOff } from "lucide-react"
import { getProperties } from "@/lib/content"
import { PROPERTIES_FALLBACK } from "@/lib/properties-fallback"
import type { Property } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Emlak & Yatırım Fırsatları",
  description:
    "Çıralı, Olympos ve Kemer bölgesinde arsa, otel, bungalov tesis ve villa yatırım fırsatları.",
  alternates: { canonical: "/emlak" },
}

const statusStyles: Record<string, string> = {
  Satılık: "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",
  Devren: "border-[#C8A96A]/30 bg-[#C8A96A]/[0.1] text-[#C8A96A]",
  Kiralık: "border-[#258989]/30 bg-[#258989]/[0.1] text-[#258989]",
}

function whatsappLink(p: Property) {
  const msg = `Merhaba, "${p.title}" (${p.location}) ilanı hakkında bilgi almak istiyorum.`
  return `https://wa.me/908503031559?text=${encodeURIComponent(msg)}`
}

function PropertyCard({ property: p }: { property: Property }) {
  const cover = p.photos[0]
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all hover:border-[#C8A96A]/30">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0D0D0D]">
        {cover ? (
          <Image
            src={cover}
            alt={p.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/15">
            <ImageOff className="size-10" strokeWidth={1.25} />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm ${
              statusStyles[p.status] ?? "border-white/10 bg-black/40 text-white/80"
            }`}
          >
            {p.status}
          </span>
          {p.category && (
            <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
              {p.category}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-base font-semibold leading-snug text-white md:text-lg">
          {p.title}
        </h2>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/45">
          {p.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5 text-[#258989]" />
              {p.location}
            </span>
          )}
          {p.size && (
            <span className="inline-flex items-center gap-1">
              <Ruler className="size-3.5 text-[#258989]" />
              {p.size}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/55">{p.description}</p>

        {p.features.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-1.5">
            {p.features.map((f) => (
              <li key={f} className="inline-flex items-center gap-1.5 text-xs text-white/55">
                <Check className="size-3 shrink-0 text-[#C8A96A]" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
          <span className="text-sm font-semibold text-[#C8A96A]">{p.price}</span>
          <a
            href={whatsappLink(p)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#20bd5a]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z" />
            </svg>
            Bilgi Al
          </a>
        </div>
      </div>
    </article>
  )
}

export default async function EmlakPage() {
  const dbProps = await getProperties()
  const properties = dbProps.length > 0 ? dbProps : PROPERTIES_FALLBACK

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <header className="mb-12 text-center md:mb-16">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Çıralı · Olympos · Kemer
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Emlak & Yatırım Fırsatları
          </h1>
          <p className="mx-auto max-w-xl text-sm text-white/55 md:text-base">
            Bölgede arsa, butik otel, bungalov tesis ve villa fırsatları. Detay için
            doğrudan WhatsApp'tan ulaş.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </main>
  )
}
