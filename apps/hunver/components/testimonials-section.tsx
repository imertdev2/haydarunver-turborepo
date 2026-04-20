"use client"

import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface YouTubeShort {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
}

interface TestimonialsSectionProps {
  subtitle?: string
  title?: string
  description?: string
}

export function TestimonialsSection({
  subtitle = "Geri Dönüşler",
  title = "Öğrencilerden",
  description = "Dönüşüm yolculuğuna katılanların deneyimleri.",
}: TestimonialsSectionProps) {
  const [shorts, setShorts] = useState<YouTubeShort[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState<string | null>(null)

  // Fetch shorts from API
  useEffect(() => {
    fetch("/api/youtube-shorts")
      .then((res) => res.json())
      .then((data) => {
        if (data.shorts && data.shorts.length > 0) {
          setShorts(data.shorts)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // How many items visible at once
  const visibleCount = 4

  const next = useCallback(() => {
    if (shorts.length === 0) return
    setCurrent((c) => (c + 1) % shorts.length)
  }, [shorts.length])

  const prev = useCallback(() => {
    if (shorts.length === 0) return
    setCurrent((c) => (c - 1 + shorts.length) % shorts.length)
  }, [shorts.length])

  // Auto-rotate (only when no video is playing)
  useEffect(() => {
    if (shorts.length === 0 || playingId) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next, shorts.length, playingId])

  const visible =
    shorts.length > 0
      ? Array.from(
          { length: Math.min(visibleCount, shorts.length) },
          (_, i) => shorts[(current + i) % shorts.length]!
        )
      : []

  const youtubeChannelUrl = "https://www.youtube.com/@haydar_unversal/shorts"

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

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[9/16] animate-pulse rounded-xl bg-white/[0.04]"
              />
            ))}
          </div>
        )}

        {/* No shorts / API not configured — show YouTube link */}
        {!loading && shorts.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 w-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <a
                  key={i}
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-[#141414] flex items-center justify-center transition-all hover:border-[#C8A96A]/30"
                >
                  <div className="flex flex-col items-center gap-3 text-center px-4">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-10 text-red-600 md:size-12"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-xs font-medium text-white/40 group-hover:text-white/60 md:text-sm">
                      YouTube&apos;da İzle
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm font-medium text-[#C8A96A] transition-colors hover:text-[#d4b87a]"
            >
              Tüm videoları YouTube&apos;da izle →
            </a>
          </div>
        )}

        {/* Shorts grid */}
        {!loading && shorts.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
              {visible.map((short, i) => (
                <div
                  key={`${short.id}-${current}-${i}`}
                  className="group relative aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-[#141414] animate-in fade-in duration-500"
                >
                  {playingId === short.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${short.id}?autoplay=1&loop=1`}
                      title={short.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  ) : (
                    <button
                      onClick={() => setPlayingId(short.id)}
                      className="relative h-full w-full"
                    >
                      {/* Thumbnail */}
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Play overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                        <div className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110 md:size-14">
                          <svg
                            viewBox="0 0 24 24"
                            fill="#0D0D0D"
                            className="ml-1 size-5 md:size-6"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Title overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                        <p className="line-clamp-2 text-left text-xs font-medium text-white md:text-sm">
                          {short.title}
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            {shorts.length > visibleCount && (
              <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
                <button
                  onClick={prev}
                  aria-label="Önceki"
                  className="flex size-9 items-center justify-center rounded-full border border-[#C8A96A]/20 text-white/50 transition-all hover:border-[#C8A96A]/40 hover:text-[#C8A96A]"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {shorts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrent(i)
                        setPlayingId(null)
                      }}
                      aria-label={`Short ${i + 1}`}
                      className="group flex h-6 items-center"
                    >
                      <div
                        className={cn(
                          "h-[2px] rounded-full transition-all duration-500",
                          i === current
                            ? "w-6 bg-[#C8A96A]"
                            : "w-3 bg-white/20 group-hover:bg-white/40"
                        )}
                      />
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
            )}

            {/* YouTube link */}
            <div className="mt-6 text-center">
              <a
                href={youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#C8A96A] transition-colors hover:text-[#d4b87a]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Tümünü YouTube&apos;da İzle
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
