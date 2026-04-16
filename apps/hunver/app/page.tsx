import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { TrainingsSection } from "@/components/trainings-section"
import { EventsSection } from "@/components/events-section"
import { GallerySection } from "@/components/gallery-section"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <TrainingsSection />
      <EventsSection />
      <GallerySection />
      <BlogSection />
      <Footer />
    </main>
  )
}
