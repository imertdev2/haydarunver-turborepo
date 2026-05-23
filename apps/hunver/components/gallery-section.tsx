"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"

interface GalleryImage {
  src: string
  alt: string
  category: string
}

interface GallerySectionProps {
  subtitle?: string
  title?: string
  categories?: string[]
  images?: GalleryImage[]
}

const defaultCategories = ["Hepsi", "Nefes", "Meditasyon", "Festival", "Bioenerji", "Doğa"]

const defaultImages: GalleryImage[] = [
  // Festival
  { src: "/images/galleries/2N8A1247.JPG", alt: "Antik kentte grup çalışması", category: "Festival" },
  { src: "/images/galleries/2N8A1274.JPG", alt: "Antik kentte buluşma", category: "Festival" },
  { src: "/images/galleries/2N8A5834.jpg", alt: "Doğada grup buluşması", category: "Festival" },
  { src: "/images/galleries/4a5f97d2-b0d1-45ff-abbd-ebfa38bccb71.jpg", alt: "Mağarada buluşma", category: "Festival" },
  { src: "/images/galleries/6263022f-354b-4bc6-af2c-17f4ce987655.jpg", alt: "Budist keşiş ile buluşma", category: "Festival" },
  // Meditasyon
  { src: "/images/galleries/2N8A5742.jpg", alt: "İç mekan meditasyon seansı", category: "Meditasyon" },
  { src: "/images/galleries/2N8A5776.jpg", alt: "Ağaçlar altında grup meditasyonu", category: "Meditasyon" },
  { src: "/images/galleries/2N8A5799.jpg", alt: "Doğada bireysel meditasyon", category: "Meditasyon" },
  { src: "/images/galleries/WhatsApp%20Image%202026-04-10%20at%20.jpeg", alt: "Dağ zirvesinde meditasyon", category: "Meditasyon" },
  { src: "/images/galleries/WhatsApp%20Image%202026-04-10%20at%2016.53.15.jpeg", alt: "Shiva heykeli önünde meditasyon", category: "Meditasyon" },
  { src: "/images/galleries/WhatsApp%20Image%202026.jpeg", alt: "Bali tapınağında dua", category: "Meditasyon" },
  { src: "/images/galleries/88aacd54-ee2d-4486-8094-0f1501034292.jpg", alt: "Barış stupa önünde meditasyon", category: "Meditasyon" },
  { src: "/images/galleries/07b31ee6-3e44-4586-a289-8e5f90c5f94a.jpg", alt: "Hindu tapınağında dua", category: "Meditasyon" },
  { src: "/images/galleries/3b1dcf04-2751-40c0-a9f4-50674bba7f9e.jpg", alt: "Mağara tapınağında dua", category: "Meditasyon" },
  { src: "/images/galleries/60954c18-9ef0-429f-991c-9024d50d051a.jpg", alt: "Mağarada meditasyon", category: "Meditasyon" },
  { src: "/images/galleries/cb7f088f-960b-42a3-abc5-8eb77defea9c.jpg", alt: "Shiva heykeli önünde namaste", category: "Meditasyon" },
  { src: "/images/galleries/ec66b174-483c-44ef-be7c-bb663ce3f068.jpg", alt: "Çin tapınağında dua", category: "Meditasyon" },
  // Nefes
  { src: "/images/galleries/2N8A6599.jpg", alt: "İç mekan nefes çalışması", category: "Nefes" },
  { src: "/images/galleries/DSC_3168_Haydar%20Olga.jpg", alt: "Havuzda ses terapisi seansı", category: "Nefes" },
  { src: "/images/galleries/photo_5823467859848841138_y.jpg", alt: "Nefes terapisi seansı", category: "Nefes" },
  // Bioenerji
  { src: "/images/galleries/2N8A5821.jpg", alt: "Doğada enerji çalışması", category: "Bioenerji" },
  { src: "/images/galleries/2N8A7336.jpg", alt: "Bioenerji terapi seansı", category: "Bioenerji" },
  { src: "/images/galleries/DSC_3160.jpg", alt: "Havuzda rahatlama terapisi", category: "Bioenerji" },
  // Doğa
  { src: "/images/galleries/2N8A5757.jpg", alt: "Doğa yürüyüşü", category: "Doğa" },
  { src: "/images/galleries/WhatsApp%20Image%202026-04-10%20at%2016.53.16.jpeg", alt: "Okyanus kıyısında", category: "Doğa" },
  { src: "/images/galleries/WhatsApp%20Image%202026-04-10.jpeg", alt: "Dağ zirvesinde gün doğumu", category: "Doğa" },
  { src: "/images/galleries/0ef25e40-7c2c-4e88-a7ab-d36b5bec018f.jpg", alt: "Batu Caves merdivenleri", category: "Doğa" },
  { src: "/images/galleries/5de313fe-bb88-42eb-9af6-3f3400c14883.jpg", alt: "Mağara içi keşif", category: "Doğa" },
  { src: "/images/galleries/5f147e22-4324-48d3-b814-6ce100c68745.jpg", alt: "Mağara tapınağında namaste", category: "Doğa" },
  { src: "/images/galleries/c5177a0b-77a5-46b6-94b3-c2d43a16b94b.jpg", alt: "Dağ tapınağında buluşma", category: "Doğa" },
  { src: "/images/galleries/d6e428cd-1c7f-450d-b5d4-91c13468209d.jpg", alt: "Nepal stupa ile selfie", category: "Doğa" },
]

export function GallerySection({
  subtitle = "Anılar",
  title = "Galeri",
  categories = defaultCategories,
  images = defaultImages,
}: GallerySectionProps) {
  const [active, setActive] = useState("Hepsi")

  const filtered = active === "Hepsi" ? images : images.filter((img) => img.category === active)

  return (
    <section className="bg-[#0D0D0D] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 text-center md:mb-10">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-3 md:text-base">
            {subtitle}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h2>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-1 md:mb-10 md:gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "relative px-3 py-1.5 text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm",
                active === cat
                  ? "text-[#C8A96A]"
                  : "text-white/50 hover:text-white/80"
              )}
            >
              {cat}
              {active === cat && (
                <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#C8A96A] md:inset-x-4" />
              )}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {filtered.map((img, i) => {
            const tall = i % 3 === 1
            return (
              <div
                key={`${img.src}-${i}`}
                className="group relative mb-3 break-inside-avoid overflow-hidden rounded-lg md:mb-4 md:rounded-xl"
              >
                <div className={cn("relative w-full", tall ? "aspect-[3/4]" : "aspect-[4/3]")}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
