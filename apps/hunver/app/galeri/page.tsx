import type { Metadata } from "next"
import { GallerySection } from "@/components/gallery-section"

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Seans, eğitim ve retreatlerden kareler. Bedenle, doğayla ve bilinçle geçirdiğimiz anlar.",
  alternates: { canonical: "/galeri" },
}

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      <GallerySection />
    </main>
  )
}
