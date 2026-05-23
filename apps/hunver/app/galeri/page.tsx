import type { Metadata } from "next"
import { GallerySection } from "@/components/gallery-section"
import { getGalleryImages } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Seans, eğitim ve retreatlerden kareler. Bedenle, doğayla ve bilinçle geçirdiğimiz anlar.",
  alternates: { canonical: "/galeri" },
}

export default async function GaleriPage() {
  const images = await getGalleryImages()
  // Kategori sekmeleri: "Hepsi" + benzersiz kategoriler (seed sırası korunur).
  const categories = ["Hepsi", ...Array.from(new Set(images.map((i) => i.category)))]

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      {images.length > 0 ? (
        <GallerySection
          categories={categories}
          images={images.map((i) => ({ src: i.src, alt: i.alt, category: i.category }))}
        />
      ) : (
        <GallerySection />
      )}
    </main>
  )
}
