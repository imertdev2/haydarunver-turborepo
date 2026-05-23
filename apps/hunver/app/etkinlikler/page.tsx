import type { Metadata } from "next"
import { EventsSection } from "@/components/events-section"

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Yaklaşan retreatler, festivaller ve çalıştaylar. Nefes, beden ve bilinçle buluştuğumuz etkinliklere katıl.",
  alternates: { canonical: "/etkinlikler" },
}

export default function EtkinliklerPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-20 md:pt-24">
      <EventsSection />
    </main>
  )
}
