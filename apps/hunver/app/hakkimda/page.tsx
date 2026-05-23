import type { Metadata } from "next"
import { AboutSection } from "@/components/about-section"

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Haydar Ünver — nefes terapisti ve wellness eğitmeni. Bireysel seans, eğitim ve retreatlerle çalışıyor.",
  alternates: { canonical: "/hakkimda" },
}

export default function HakkimdaPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      <AboutSection />
    </main>
  )
}
