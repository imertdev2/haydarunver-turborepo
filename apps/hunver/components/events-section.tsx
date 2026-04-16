import Image from "next/image"

interface Event {
  title: string
  location: string
  date: string
  image: { src: string; alt: string }
}

interface EventsSectionProps {
  subtitle?: string
  title?: string
  description?: string
  featuredEvent?: Event
  upcomingLabel?: string
  upcomingEvents?: Event[]
}

const defaultFeaturedEvent: Event = {
  title: "Kutsalçeşme Festivali - Ünal / Antalya, Türkiye",
  location: "Ünal / Antalya, Türkiye",
  date: "24-30 Nisan",
  image: { src: "/images/event-featured.jpg", alt: "Kutsalçeşme Festivali" },
}

const defaultUpcomingEvents: Event[] = [
  {
    title: "Ritual Festivali",
    location: "",
    date: "14-18 Nisan",
    image: { src: "/images/event-ritual.jpg", alt: "Ritual Festivali" },
  },
  {
    title: "Yaşamartı Festivali",
    location: "",
    date: "16-20 Nisan",
    image: { src: "/images/event-yasamarti.jpg", alt: "Yaşamartı Festivali" },
  },
  {
    title: "Bir-yere Festivali",
    location: "",
    date: "24-30 Nisan",
    image: { src: "/images/event-biryere.jpg", alt: "Bir-yere Festivali" },
  },
]

export function EventsSection({
  subtitle = "Buluşmalar",
  title = "Birlikte Derinleşiyoruz",
  description = "Hayatın seni çağırdığı yerlere, doğa, müzik ve bilinçle buluştuğumuz etkinliklere katıl.",
  featuredEvent = defaultFeaturedEvent,
  upcomingLabel = "Sayısız Etkinlikler",
  upcomingEvents = defaultUpcomingEvents,
}: EventsSectionProps) {
  return (
    <section className="bg-[#258989] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-3 md:text-base">
            {subtitle}
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:mb-4 md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
            {description}
          </p>
        </div>

        {/* Featured event label */}
        <p className="mb-3 text-xs font-semibold tracking-widest text-[#C8A96A] uppercase md:mb-4 md:text-sm">
          Önemli Etkinlik
        </p>

        {/* Featured Event - large card */}
        <div className="group relative mb-8 overflow-hidden rounded-xl md:mb-10 md:rounded-2xl">
          <div className="relative aspect-[16/7] sm:aspect-[16/6]">
            <Image
              src={featuredEvent.image.src}
              alt={featuredEvent.image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-[#0D0D0D]/20 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-6">
            <h3 className="text-sm font-semibold text-white md:text-lg">
              {featuredEvent.title}
            </h3>
            <span className="shrink-0 text-xs font-medium text-[#C8A96A] md:text-sm">
              {featuredEvent.date}
            </span>
          </div>
        </div>

        {/* Upcoming events label */}
        <p className="mb-3 text-xs font-semibold tracking-widest text-[#C8A96A] uppercase md:mb-4 md:text-sm">
          {upcomingLabel}
        </p>

        {/* Upcoming events - 3 cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
          {upcomingEvents.map((event, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/70 via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
                <h3 className="text-xs font-semibold text-white md:text-sm">
                  {event.title}
                </h3>
                <span className="shrink-0 text-[10px] font-medium text-[#C8A96A] md:text-xs">
                  {event.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
