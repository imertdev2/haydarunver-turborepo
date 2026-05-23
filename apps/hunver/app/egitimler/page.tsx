import type { Metadata } from "next"
import { TrainingsSection } from "@/components/trainings-section"
import { getTrainings } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Eğitimler",
  description:
    "Nefes terapisi, bioenerji ve meditasyon eğitimleri. Bireysel öğrenme ve grup programları.",
  alternates: { canonical: "/egitimler" },
}

export default async function EgitimlerPage() {
  const trainings = await getTrainings()
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      {trainings.length > 0 ? (
        <TrainingsSection
          trainings={trainings.map((t) => ({
            title: t.title,
            image: { src: t.image_src, alt: t.image_alt || t.title },
          }))}
        />
      ) : (
        <TrainingsSection />
      )}
    </main>
  )
}
