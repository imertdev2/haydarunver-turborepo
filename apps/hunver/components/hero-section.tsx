"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface HeroImage {
  src: string
  alt: string
}

export interface HeroSlide {
  subtitle: string
  title: string
  description: string
  ctaText: string
  ctaHref: string
  personImage?: HeroImage
  backgroundImage?: HeroImage
}

interface HeroSectionProps {
  slides?: HeroSlide[]
  galleryImages?: [HeroImage, HeroImage, HeroImage]
  autoPlayInterval?: number
}

function MandalaSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <circle cx="200" cy="200" r="170" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
      <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
      <circle cx="200" cy="200" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 200 + 60 * Math.cos(angle)
        const y1 = 200 + 60 * Math.sin(angle)
        const x2 = 200 + 150 * Math.cos(angle)
        const y2 = 200 + 150 * Math.sin(angle)
        return (
          <line key={`ray-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.4" opacity="0.15" />
        )
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180
        const cx = 200 + 110 * Math.cos(angle)
        const cy = 200 + 110 * Math.sin(angle)
        return <circle key={`dot-${i}`} cx={cx} cy={cy} r="3" fill="currentColor" opacity="0.2" />
      })}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = i * 60
        return (
          <ellipse key={`petal-${i}`} cx="200" cy="200" rx="20" ry="80" stroke="currentColor" strokeWidth="0.5" opacity="0.12" fill="none" transform={`rotate(${angle} 200 200)`} />
        )
      })}
    </svg>
  )
}

function ImagePlaceholder({ className, label }: { className?: string; label: string }) {
  return (
    <div className={cn("flex items-center justify-center rounded-xl bg-white/[0.04] text-xs text-white/20 border border-white/[0.06]", className)}>
      {label}
    </div>
  )
}

const defaultSlides: HeroSlide[] = [
  {
    subtitle: "Zihnini Sıfırla",
    title: "Sistemini Yeniden Başlat",
    description: "Sinir sistemini regüle eden, zihinsel gürültüyü susturan ve seni merkezine getiren derin bir dönüşüm deneyimi.",
    ctaText: "Hemen Başla",
    ctaHref: "/basvuru",
    personImage: { src: "/images/hunver-man.png", alt: "Haydar Ünver" },
    backgroundImage: { src: "/images/slider-1.png", alt: "Slider arka plan" },
  },
  {
    subtitle: "Dair Yüce Gönül",
    title: "Acıyı Anlamadan Özgürleşemezsin",
    description: "Acı bir dönüşüm değildir, içindeki en derin bilgeliğe ulaşmanın kapısıdır.",
    ctaText: "Bu Sırları Keşfet",
    ctaHref: "/kesfet",
    backgroundImage: { src: "/images/slider-2.png", alt: "Antik tiyatro ve katılımcılar" },
  },
  {
    subtitle: "Hayatın Rotası",
    title: "Sistemini Yeniden Kur",
    description: "Yoğun dünyanda durarak, nefes ve öz-farkındalık deneyimi ile yeniden dönüşümünü başlat.",
    ctaText: "Ücretsiz Deneyimini Başlat",
    ctaHref: "/basvuru",
    backgroundImage: { src: "/images/slider-3.png", alt: "Meditasyon ve gün batımı" },
  },
]

/* ─── Slide Layout: Person (text left + person right) ─── */
function PersonSlide({ slide, index }: { slide: HeroSlide; index: number }) {
  return (
    <>
      {/* Background */}
      {slide.backgroundImage ? (
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={slide.backgroundImage.src}
            alt={slide.backgroundImage.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0D0D0D]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/80 via-[#0D0D0D]/40 to-transparent" />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D0D0D] via-[#0D0D0D] to-[#112222]" />
          <div className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-[#258989] opacity-[0.07] blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-[#258989] opacity-[0.05] blur-[100px]" />
        </div>
      )}

      {/* Mandala */}
      <div className="pointer-events-none absolute -top-16 right-0 md:-top-10 md:right-[5%]">
        <MandalaSVG className="h-[280px] w-[280px] text-[#C8A96A] opacity-40 md:h-[380px] md:w-[380px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-20 md:px-6 md:pt-24 lg:pt-28">
        <div className="grid flex-1 items-end gap-6 lg:grid-cols-[1fr_auto] lg:gap-10">
          <div className="max-w-lg self-center">
            <p
              key={`subtitle-${index}`}
              className="mb-3 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-4 md:text-base lg:text-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {slide.subtitle}
            </p>
            <h1
              key={`title-${index}`}
              className="mb-4 text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:mb-5 md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100"
            >
              {slide.title}
            </h1>
            <p
              key={`desc-${index}`}
              className="mb-6 max-w-md text-sm leading-relaxed text-white/60 md:mb-8 md:text-base lg:text-lg animate-in fade-in slide-in-from-bottom-6 duration-500 delay-200"
            >
              {slide.description}
            </p>
            <div key={`cta-${index}`} className="animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300">
              <Button
                asChild
                className="group h-10 gap-2 rounded-lg border border-[#C8A96A]/30 bg-[#C8A96A] px-5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a] hover:shadow-lg hover:shadow-[#C8A96A]/20 md:h-11 md:px-6"
              >
                <Link href={slide.ctaHref}>
                  {slide.ctaText}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div
            key={`person-${index}`}
            className="relative mx-auto w-full max-w-[200px] sm:max-w-[260px] md:max-w-[320px] lg:max-w-[400px] animate-in fade-in duration-700"
          >
            <div className="absolute inset-x-8 bottom-0 top-1/4 rounded-full bg-[#258989]/25 blur-[80px]" />
            <div className="absolute inset-x-16 bottom-0 top-1/3 rounded-full bg-[#258989]/15 blur-[60px]" />
            <Image
              src={slide.personImage!.src}
              alt={slide.personImage!.alt}
              width={520}
              height={640}
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_0_40px_rgba(37,137,137,0.2)]"
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Slide Layout: Background Image (full-bleed + centered text) ─── */
function BackgroundSlide({ slide, index }: { slide: HeroSlide; index: number }) {
  return (
    <>
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src={slide.backgroundImage!.src}
          alt={slide.backgroundImage!.alt}
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0D0D0D]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/20 to-[#0D0D0D]/50" />
      </div>

      {/* Content - left aligned like slide 1 */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-20 md:px-6 md:pt-24 lg:pt-28">
        <div className="max-w-lg">
          <p
            key={`subtitle-${index}`}
            className="mb-3 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-4 md:text-base lg:text-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {slide.subtitle}
          </p>
          <h1
            key={`title-${index}`}
            className="mb-4 text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-3xl md:mb-5 md:text-4xl lg:text-5xl animate-in fade-in slide-in-from-bottom-6 duration-500 delay-100"
          >
            {slide.title}
          </h1>
          <p
            key={`desc-${index}`}
            className="mb-6 max-w-md text-sm leading-relaxed text-white/70 md:mb-8 md:text-base lg:text-lg animate-in fade-in slide-in-from-bottom-6 duration-500 delay-200"
          >
            {slide.description}
          </p>
          <div key={`cta-${index}`} className="animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300">
            <Button
              asChild
              className="group h-10 gap-2 rounded-lg border border-[#C8A96A]/30 bg-[#C8A96A] px-5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a] hover:shadow-lg hover:shadow-[#C8A96A]/20 md:h-11 md:px-6"
            >
              <Link href={slide.ctaHref}>
                {slide.ctaText}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function HeroSection({
  slides = defaultSlides,
  galleryImages,
  autoPlayInterval = 6000,
}: HeroSectionProps) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === current) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [current, isTransitioning])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, slides.length, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, slides.length, goTo])

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval)
    return () => clearInterval(timer)
  }, [next, autoPlayInterval])

  const slide = slides[current]!
  const isBackgroundSlide = !!slide.backgroundImage

  return (
    <section className="relative flex h-screen min-h-[600px] flex-col overflow-hidden bg-[#0D0D0D]">
      {/* Slide content - switches layout based on slide type */}
      {isBackgroundSlide ? (
        <BackgroundSlide slide={slide} index={current} />
      ) : (
        <PersonSlide slide={slide} index={current} />
      )}

      {/* Gallery - 3 fixed images, always visible, never changes */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className={cn(
          "grid grid-cols-3 gap-2 pb-6 sm:gap-3 md:gap-4 md:pb-8",
          !isBackgroundSlide && "-mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28"
        )}>
          {[0, 1, 2].map((i) => {
            const img = galleryImages?.[i]
            return (
              <div
                key={`gallery-${i}`}
                className="group relative overflow-hidden rounded-lg border border-[#C8A96A]/15 shadow-xl shadow-black/50 md:rounded-xl lg:rounded-2xl"
              >
                {img ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={500}
                    height={320}
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <ImagePlaceholder
                    className="aspect-[16/10]"
                    label={`Görsel ${i + 1}`}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-[#0D0D0D]/50 via-transparent to-transparent md:rounded-xl lg:rounded-2xl" />
              </div>
            )
          })}
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pb-4 md:px-6 md:pb-6">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className="group relative flex h-8 items-center"
              >
                <div className={cn(
                  "h-[2px] rounded-full transition-all duration-500",
                  i === current
                    ? "w-8 bg-[#C8A96A]"
                    : "w-4 bg-white/20 group-hover:bg-white/40"
                )} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              aria-label="Önceki"
              className="flex size-9 items-center justify-center rounded-full border border-[#C8A96A]/20 text-white/50 transition-all hover:border-[#C8A96A]/40 hover:text-[#C8A96A]"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={next}
              aria-label="Sonraki"
              className="flex size-9 items-center justify-center rounded-full border border-[#C8A96A]/20 text-white/50 transition-all hover:border-[#C8A96A]/40 hover:text-[#C8A96A]"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
    </section>
  )
}
