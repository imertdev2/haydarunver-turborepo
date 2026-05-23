import type { Metadata } from "next"
import { TrainingsSection } from "@/components/trainings-section"

export const metadata: Metadata = {
  title: "Eğitimler",
  description:
    "Nefes terapisi, bioenerji ve meditasyon eğitimleri. Bireysel öğrenme ve grup programları.",
  alternates: { canonical: "/egitimler" },
}

export default function EgitimlerPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      <TrainingsSection />
    </main>
  )
}
