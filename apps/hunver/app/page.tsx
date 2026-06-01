import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { HomeServices } from "@/components/home-services"
import { TrainingsSection } from "@/components/trainings-section"
import { EventsSection } from "@/components/events-section"
import { GallerySection } from "@/components/gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BlogSection } from "@/components/blog-section"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <HomeServices />
      <TrainingsSection />
      <EventsSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  )
}
