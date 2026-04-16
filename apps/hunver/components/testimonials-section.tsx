"use client"

import Image from "next/image"
import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface Testimonial {
  name: string
  date: string
  rating: number
  text: string
  avatar: { src: string; alt: string }
}

interface TestimonialsSectionProps {
  subtitle?: string
  title?: string
  description?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Elif Yılmaz",
    date: "14 Mar 2026",
    rating: 5,
    text: "Nefes terapisi hayatımı değiştirdi. Yıllardır taşıdığım ağırlıktan kurtuldum, kendimi ilk defa bu kadar hafif hissediyorum.",
    avatar: { src: "/images/testimonial-1.jpg", alt: "Elif Yılmaz" },
  },
  {
    name: "Emre Kaya",
    date: "28 Şub 2026",
    rating: 5,
    text: "Bioenerji seansından sonra bedenimde inanılmaz bir rahatlama hissettim. Haydar hoca gerçekten işinin ehli.",
    avatar: { src: "/images/testimonial-2.jpg", alt: "Emre Kaya" },
  },
  {
    name: "Ayşe Demir",
    date: "10 Şub 2026",
    rating: 5,
    text: "Festival deneyimi muhteşemdi. Doğanın içinde, bilinçli insanlarla birlikte olmak bana yeni bir perspektif kazandırdı.",
    avatar: { src: "/images/testimonial-3.jpg", alt: "Ayşe Demir" },
  },
  {
    name: "Burak Aksoy",
    date: "22 Oca 2026",
    rating: 5,
    text: "Ses meditasyonu ile iç sessizliğimi buldum. Her seanstan sonra zihinsel berraklık artıyor, herkese tavsiye ederim.",
    avatar: { src: "/images/testimonial-4.jpg", alt: "Burak Aksoy" },
  },
]

function AvatarPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-[#258989]/20 text-lg font-semibold text-[#258989]">
      {name.charAt(0)}
    </div>
  )
}

export function TestimonialsSection({
  subtitle = "Deneyimler",
  title = "Katılımcılardan",
  description = "Dönüşüm yolculuğuna katılanların deneyimleri ve geri bildirimleri.",
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0)

  // Show 4 on desktop, 2 on tablet, 1 on mobile — handled by CSS grid, we paginate per 1
  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  // Build visible items (show 4, wrapping around)
  const visible = Array.from({ length: 4 }, (_, i) => testimonials[(current + i) % testimonials.length]!)

  return (
    <section className="bg-[#0D0D0D] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-3 md:text-base">
            {subtitle}
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:mb-4 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
            {description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {visible.map((t, i) => (
            <div
              key={`${t.name}-${current}-${i}`}
              className="flex flex-col items-center rounded-xl border border-[#C8A96A]/10 bg-[#141414] p-5 text-center md:p-6 animate-in fade-in duration-500"
            >
              {/* Avatar */}
              <div className="relative mb-4 size-16 overflow-hidden rounded-full md:size-20">
                <Image
                  src={t.avatar.src}
                  alt={t.avatar.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={cn(
                      "size-3.5 md:size-4",
                      s < t.rating ? "fill-[#C8A96A] text-[#C8A96A]" : "text-white/20"
                    )}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="mb-4 flex-1 text-xs leading-relaxed text-white/60 md:text-sm">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Name & date */}
              <p className="text-sm font-semibold text-white">{t.name}</p>
              <p className="mt-1 text-[10px] text-white/30 md:text-xs">{t.date}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
          <button
            onClick={prev}
            aria-label="Önceki"
            className="flex size-9 items-center justify-center rounded-full border border-[#C8A96A]/20 text-white/50 transition-all hover:border-[#C8A96A]/40 hover:text-[#C8A96A]"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-1.5 px-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Yorum ${i + 1}`}
                className="group flex h-6 items-center"
              >
                <div className={cn(
                  "h-[2px] rounded-full transition-all duration-500",
                  i === current ? "w-6 bg-[#C8A96A]" : "w-3 bg-white/20 group-hover:bg-white/40"
                )} />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Sonraki"
            className="flex size-9 items-center justify-center rounded-full border border-[#C8A96A]/20 text-white/50 transition-all hover:border-[#C8A96A]/40 hover:text-[#C8A96A]"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
