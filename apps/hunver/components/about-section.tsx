import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface AboutSectionProps {
  subtitle?: string
  title?: string
  paragraphs?: string[]
  ctaText?: string
  ctaHref?: string
  image?: { src: string; alt: string }
}

export function AboutSection({
  subtitle = "Hoşgeldin",
  title = "Ben Haydar Ünver",
  paragraphs = [
    "Hayata, vücut ve zihinle birlikte çalışmayı/yaşamayı bırakan/dan, genel güvülürlüğü ve performansını arttırarak kendi aktarımıma doğru başladım.",
    "Bu deneyim/öğreniş; nefes, hareket ve bilinçli yaşamdan meditasyona uzanıyordu.",
    "Hayatın dönüşümü — yaşamın gerçeğine.",
  ],
  ctaText = "Hayatın Bilgeliğini Yap",
  ctaHref = "/hakkimda",
  image = { src: "/images/hakkimda.png", alt: "Haydar Ünver" },
}: AboutSectionProps) {
  return (
    <section className="relative bg-[#0D0D0D]">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Left - Image with turkuaz background */}
        <div className="relative min-h-[400px] bg-[#258989] md:min-h-[500px] lg:min-h-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>

        {/* Right - Text content */}
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
          <p className="mb-3 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-4 md:text-base">
            {subtitle}
          </p>

          <h2 className="mb-6 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:mb-8 md:text-4xl">
            {title}
          </h2>

          <div className="mb-8 space-y-4 md:mb-10">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-white/60 md:text-base">
                {p}
              </p>
            ))}
          </div>

          <div>
            <Button
              asChild
              className="group h-10 gap-2 rounded-lg border border-[#C8A96A]/30 bg-[#C8A96A] px-5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a] hover:shadow-lg hover:shadow-[#C8A96A]/20 md:h-11 md:px-6"
            >
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
