import Image from "next/image"

interface Event {
  title: string
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
  title: "Kokopellis Festivali",
  image: { src: "/images/kokopellis.png", alt: "Kokopellis Festivali" },
}

const defaultUpcomingEvents: Event[] = [
  {
    title: "Masal Festivali",
    image: { src: "/images/masal-festivali.png", alt: "Masal Festivali" },
  },
  {
    title: "Namaste Festivali",
    image: { src: "/images/namaste-festivali.png", alt: "Namaste Festivali" },
  },
  {
    title: "Be Your Retreat",
    image: { src: "/images/beyouretreat.png", alt: "Be Your Retreat" },
  },
]

export function EventsSection({
  subtitle = "Buluşmalar",
  title = "Birlikte Derinleşiyoruz",
  description = "Hayatın seni çağırdığı yerlere, doğa, müzik ve bilinçle buluştuğumuz etkinliklere katıl.",
  featuredEvent = defaultFeaturedEvent,
  upcomingLabel = "Diğer Etkinlikler",
  upcomingEvents = defaultUpcomingEvents,
}: EventsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#258989] py-14 md:py-20 lg:py-24">
      {/* Subtle glow accents */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#C8A96A] opacity-[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-[#0D0D0D] opacity-[0.15] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-3 md:text-base">
            {subtitle}
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
            {description}
          </p>
        </div>

        {/* Featured event label */}
        <p className="mb-3 text-xs font-semibold tracking-widest text-[#C8A96A] uppercase md:mb-4 md:text-sm">
          Öne Çıkan Etkinlik
        </p>

        {/* Featured Event */}
        <div className="group mb-10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/20 md:mb-12 md:rounded-3xl">
          <Image
            src={featuredEvent.image.src}
            alt={featuredEvent.image.alt}
            width={1400}
            height={400}
            className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {/* Upcoming events label */}
        <p className="mb-3 text-xs font-semibold tracking-widest text-[#C8A96A] uppercase md:mb-4 md:text-sm">
          {upcomingLabel}
        </p>

        {/* Upcoming events - 3 cards, equal height */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {upcomingEvents.map((event, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/15 md:rounded-2xl"
            >
              <Image
                src={event.image.src}
                alt={event.image.alt}
                width={600}
                height={400}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
