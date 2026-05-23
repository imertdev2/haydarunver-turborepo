import type { Metadata } from "next"
import { EventsSection } from "@/components/events-section"
import { getEvents } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Yaklaşan retreatler, festivaller ve çalıştaylar. Nefes, beden ve bilinçle buluştuğumuz etkinliklere katıl.",
  alternates: { canonical: "/etkinlikler" },
}

export default async function EtkinliklerPage() {
  const events = await getEvents()
  // DB boşsa props verme → bileşen kendi statik fallback'ini gösterir.
  const featured = events.find((e) => e.is_featured) ?? events[0]
  const upcoming = events.filter((e) => e.id !== featured?.id)
  const toEvent = (e: (typeof events)[number]) => ({
    title: e.title,
    image: { src: e.image_src, alt: e.image_alt || e.title },
  })

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      {events.length > 0 && featured ? (
        <EventsSection
          featuredEvent={toEvent(featured)}
          upcomingEvents={upcoming.map(toEvent)}
        />
      ) : (
        <EventsSection />
      )}
    </main>
  )
}
