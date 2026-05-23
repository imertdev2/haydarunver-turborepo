import Image from "next/image"

interface Training {
  title: string
  image: { src: string; alt: string }
}

interface TrainingsSectionProps {
  subtitle?: string
  title?: string
  description?: string
  trainings?: Training[]
}

const defaultTrainings: Training[] = [
  { title: "Nefes Terapisi", image: { src: "/images/nefes-terapisi.png", alt: "Nefes Terapisi" } },
  { title: "Bioenerji", image: { src: "/images/bio-enerji.png", alt: "Bioenerji" } },
  { title: "Aile Dizilimi", image: { src: "/images/aile-dizilimi.png", alt: "Aile Dizilimi" } },
  { title: "Ses Meditasyonu", image: { src: "/images/ses-meditasyonu.png", alt: "Ses Meditasyonu" } },
]

export function TrainingsSection({
  subtitle = "Eğitimler",
  title = "Kendine Dön",
  description = "Zihnin yorgunluğunda, beden sana haberlerini iletir.",
  trainings = defaultTrainings,
}: TrainingsSectionProps) {
  return (
    <section className="bg-[#258989] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-3 md:text-base">
            {subtitle}
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:mb-4 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            {description}
          </p>
        </div>

        {/* Training cards - 4 columns */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
          {trainings.map((training, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <div className="relative aspect-[3/4]">
                <Image
                  src={training.image.src}
                  alt={training.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-white md:text-base">
                  {training.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
