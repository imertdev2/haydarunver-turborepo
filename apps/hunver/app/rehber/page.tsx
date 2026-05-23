"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { Phone, Globe, MapPin, Search, ImageOff } from "lucide-react"
import {
  BUSINESS_CATEGORIES,
  BUSINESS_REGIONS,
  type Business,
  type BusinessCategory,
  type BusinessRegion,
} from "@/lib/database.types"

type CategoryFilter = "all" | BusinessCategory
type RegionFilter = "all" | BusinessRegion

const categoryLabel = (v: BusinessCategory) =>
  BUSINESS_CATEGORIES.find((c) => c.value === v)?.label ?? v

const regionLabel = (v: BusinessRegion) =>
  BUSINESS_REGIONS.find((r) => r.value === v)?.label ?? v

function normalizePhone(p: string) {
  return p.replace(/\D/g, "").replace(/^0/, "")
}

function instagramUrl(handle: string) {
  if (handle.startsWith("http")) return handle
  return `https://instagram.com/${handle.replace(/^@/, "")}`
}

export default function RehberPage() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<CategoryFilter>("all")
  const [region, setRegion] = useState<RegionFilter>("all")
  const [q, setQ] = useState("")

  useEffect(() => {
    setLoading(true)
    fetch("/api/businesses")
      .then((r) => r.json())
      .then((data) => setBusinesses(data.businesses ?? []))
      .catch(() => setBusinesses([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase()
    return businesses.filter((b) => {
      if (category !== "all" && b.category !== category) return false
      if (region !== "all" && b.region !== region) return false
      if (search && !b.name.toLowerCase().includes(search)) return false
      return true
    })
  }, [businesses, category, region, q])

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Çıralı · Olympos · Adrasan · Kemer
          </p>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-4xl">
            Bölge Rehberi
          </h1>
          <p className="mx-auto max-w-xl text-sm text-white/50 md:text-base">
            Konaklama, restoran, tekne, dalış, rehber ve daha fazlası — bölgenin işletmelerine
            doğrudan ulaş.
          </p>
        </div>

        {/* Arama */}
        <div className="mb-6">
          <div className="relative mx-auto max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="İşletme ara..."
              className="w-full rounded-full border border-white/10 bg-[#141414] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/25 focus:border-[#C8A96A]/40 focus:outline-none"
            />
          </div>
        </div>

        {/* Bölge filtre */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <FilterChip
            label="Tüm Bölgeler"
            active={region === "all"}
            onClick={() => setRegion("all")}
          />
          {BUSINESS_REGIONS.map((r) => (
            <FilterChip
              key={r.value}
              label={r.label}
              active={region === r.value}
              onClick={() => setRegion(r.value)}
            />
          ))}
        </div>

        {/* Kategori filtre */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <FilterChip
            label="Tüm Kategoriler"
            active={category === "all"}
            onClick={() => setCategory("all")}
            subtle
          />
          {BUSINESS_CATEGORIES.map((c) => (
            <FilterChip
              key={c.value}
              label={c.label}
              active={category === c.value}
              onClick={() => setCategory(c.value)}
              subtle
            />
          ))}
        </div>

        {/* Liste */}
        {loading && (
          <p className="py-16 text-center text-sm text-white/30">Yükleniyor...</p>
        )}

        {!loading && filtered.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#141414] py-16 text-center">
            <p className="text-sm text-white/40">Bu kriterlerde işletme bulunamadı.</p>
            <p className="mt-1 text-xs text-white/20">
              {businesses.length === 0
                ? "Henüz hiç işletme eklenmemiş."
                : "Filtreyi değiştirip tekrar dene."}
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function FilterChip({
  label,
  active,
  onClick,
  subtle,
}: {
  label: string
  active: boolean
  onClick: () => void
  subtle?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-[#C8A96A]/40 bg-[#C8A96A]/10 text-[#C8A96A]"
          : subtle
            ? "border-white/5 text-white/40 hover:border-[#C8A96A]/20 hover:text-white"
            : "border-white/10 text-white/55 hover:border-[#C8A96A]/25 hover:text-white"
      )}
    >
      {label}
    </button>
  )
}

function BusinessCard({ business: b }: { business: Business }) {
  const cover = b.photos[0]

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all hover:border-[#C8A96A]/30">
      {/* Görsel */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0D0D0D]">
        {cover ? (
          <Image
            src={cover}
            alt={b.name}
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            {regionLabel(b.region)}
          </span>
          <span className="rounded-full border border-[#C8A96A]/30 bg-[#C8A96A]/10 px-2 py-0.5 text-[10px] font-medium text-[#C8A96A] backdrop-blur-sm">
            {categoryLabel(b.category)}
          </span>
        </div>
        {b.price_range && (
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[11px] font-semibold tracking-wider text-white/85 backdrop-blur-sm">
            {b.price_range}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-base font-semibold text-white md:text-lg">{b.name}</h3>

        {b.address && (
          <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/40">
            <MapPin className="size-3" />
            <span className="truncate">{b.address}</span>
          </p>
        )}

        {b.description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/55">
            {b.description}
          </p>
        )}

        {b.features.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {b.features.slice(0, 4).map((f) => (
              <li
                key={f}
                className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/55"
              >
                {f}
              </li>
            ))}
            {b.features.length > 4 && (
              <li className="text-[10px] text-white/30">+{b.features.length - 4}</li>
            )}
          </ul>
        )}

        {/* Aksiyonlar */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {b.whatsapp && (
            <a
              href={`https://wa.me/90${normalizePhone(b.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z" />
              </svg>
              WhatsApp
            </a>
          )}
          {b.phone && (
            <a
              href={`tel:${b.phone}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#C8A96A]/30 hover:text-[#C8A96A]"
            >
              <Phone className="size-3.5" />
              Ara
            </a>
          )}
          {b.website && (
            <a
              href={b.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#C8A96A]/30 hover:text-[#C8A96A]"
            >
              <Globe className="size-3.5" />
              Web
            </a>
          )}
          {b.instagram && (
            <a
              href={instagramUrl(b.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-[#C8A96A]/30 hover:text-[#C8A96A]"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-3.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
