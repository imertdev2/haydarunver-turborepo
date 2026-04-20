import Image from "next/image"
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
  ctaText = "WhatsApp ile Ulaş",
  ctaHref = "https://wa.me/908503031559?text=Merhaba%2C%20bilgi%20almak%20istiyorum.",
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
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z"/>
                </svg>
                {ctaText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
