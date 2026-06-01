import type { Metadata } from "next"
import Image from "next/image"
import { CalendarDays, MapPin, Tag, Users } from "lucide-react"
import { getEvents } from "@/lib/content"
import { EVENTS_FALLBACK } from "@/lib/events-fallback"
import type { EventItem } from "@/lib/database.types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Etkinlikler",
  description:
    "Yaklaşan retreatler, festivaller ve kamplar. Nefes, beden ve bilinçle buluştuğumuz Çıralı etkinliklerine katıl.",
  alternates: { canonical: "/etkinlikler" },
}

function EventCard({ event, past }: { event: EventItem; past?: boolean }) {
  return (
    <article
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-all hover:border-[#C8A96A]/30 ${
        past ? "opacity-75" : ""
      }`}
    >
      {event.image_src && (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={event.image_src}
            alt={event.image_alt || event.title}
            fill
            sizes="(min-width:768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
              past
                ? "bg-white/5 text-white/40"
                : "bg-[#C8A96A]/15 text-[#C8A96A]"
            }`}
          >
            {past ? "Geçmiş" : "Yaklaşan"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-white/45">
            <CalendarDays className="size-3.5" />
            {event.date_label}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-semibold leading-snug text-white">
          {event.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-white/55">
          {event.description}
        </p>

        <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3 text-xs text-white/45">
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 shrink-0 text-[#258989]" />
              {event.location}
            </span>
          )}
          {event.event_type && (
            <span className="inline-flex items-center gap-1.5">
              <Tag className="size-3.5 shrink-0 text-[#258989]" />
              {event.event_type}
            </span>
          )}
          {event.capacity && (
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5 shrink-0 text-[#258989]" />
              {event.capacity}
            </span>
          )}
        </div>

        {!past && (
          <a
            href={`https://wa.me/908503031559?text=${encodeURIComponent(
              `Merhaba, "${event.title}" etkinliği hakkında bilgi almak istiyorum.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z" />
            </svg>
            Bilgi Al
          </a>
        )}
      </div>
    </article>
  )
}

export default async function EtkinliklerPage() {
  const dbEvents = await getEvents()
  const events = dbEvents.length > 0 ? dbEvents : EVENTS_FALLBACK

  const upcoming = events.filter((e) => e.status !== "past")
  const past = events.filter((e) => e.status === "past")

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <header className="mb-12 text-center md:mb-16">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Buluşmalar
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Etkinlikler
          </h1>
          <p className="mx-auto max-w-xl text-sm text-white/55 md:text-base">
            Doğada, müzikle ve bilinçle buluştuğumuz kamp, retreat ve festivaller.
          </p>
        </header>

        {upcoming.length > 0 && (
          <section className="mb-14 md:mb-20">
            <h2 className="mb-5 text-xs font-semibold tracking-widest text-[#C8A96A] uppercase md:text-sm">
              Yaklaşan Etkinlikler
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {upcoming.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="mb-5 text-xs font-semibold tracking-widest text-white/40 uppercase md:text-sm">
              Geçmiş Etkinlikler
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {past.map((e) => (
                <EventCard key={e.id} event={e} past />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
