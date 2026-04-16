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
  { src: "/images/gallery/1.jpg", alt: "Galeri 1", category: "Festival" },
  { src: "/images/gallery/2.jpg", alt: "Galeri 2", category: "Meditasyon" },
  { src: "/images/gallery/3.jpg", alt: "Galeri 3", category: "Nefes" },
  { src: "/images/gallery/4.jpg", alt: "Galeri 4", category: "Bioenerji" },
  { src: "/images/gallery/5.jpg", alt: "Galeri 5", category: "Doğa" },
  { src: "/images/gallery/6.jpg", alt: "Galeri 6", category: "Festival" },
  { src: "/images/gallery/7.jpg", alt: "Galeri 7", category: "Meditasyon" },
  { src: "/images/gallery/8.jpg", alt: "Galeri 8", category: "Nefes" },
  { src: "/images/gallery/9.jpg", alt: "Galeri 9", category: "Doğa" },
  { src: "/images/gallery/10.jpg", alt: "Galeri 10", category: "Bioenerji" },
]

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-xs text-white/20">
      {label}
    </div>
  )
}

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
