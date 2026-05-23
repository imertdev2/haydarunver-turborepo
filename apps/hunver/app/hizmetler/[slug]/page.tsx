import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, MonitorSmartphone, CalendarCheck } from "lucide-react"
import { SERVICES, getServiceBySlug } from "../_data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: `/hizmetler/${service.slug}` },
    openGraph: {
      title: `${service.title} — Haydar Ünver`,
      description: service.metaDescription,
      images: [service.image],
    },
  }
}

function whatsappLink(serviceTitle: string) {
  const msg = `Merhaba, ${serviceTitle} hakkında bilgi almak istiyorum.`
  return `https://wa.me/908503031559?text=${encodeURIComponent(msg)}`
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Person",
      name: "Haydar Ünver",
    },
    areaServed: { "@type": "Country", name: "Turkey" },
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Link
          href="/hizmetler"
          className="mb-6 inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-[#C8A96A]"
        >
          <ArrowLeft className="size-3.5" />
          Tüm Hizmetler
        </Link>

        {/* Hero */}
        <header className="mb-12 grid gap-8 md:mb-16 md:grid-cols-[1fr,1.1fr] md:items-center">
          <div>
            <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
              {service.tagline}
            </p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              {service.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#141414] px-3 py-1 text-xs text-white/70">
                <Clock className="size-3" />
                {service.duration}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#141414] px-3 py-1 text-xs text-white/70">
                <MonitorSmartphone className="size-3" />
                {service.format}
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D]">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Açıklama */}
        <section className="mb-14 space-y-4 md:mb-16">
          {service.intro.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-white/65 md:text-lg">
              {p}
            </p>
          ))}
        </section>

        {/* Kimler için */}
        <section className="mb-14 md:mb-16">
          <h2 className="mb-5 text-lg font-semibold text-white md:text-xl">
            Bu seans kimler için?
          </h2>
          <ul className="space-y-3">
            {service.forWhom.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/60 md:text-base">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Nasıl ilerler */}
        <section className="mb-14 md:mb-20">
          <h2 className="mb-6 text-lg font-semibold text-white md:text-xl">
            Nasıl ilerler?
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {service.howItWorks.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#141414] p-5"
              >
                <div className="mb-3 inline-flex size-7 items-center justify-center rounded-full border border-[#C8A96A]/30 text-xs font-semibold text-[#C8A96A]">
                  {i + 1}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-white">{step.title}</h3>
                <p className="text-xs leading-relaxed text-white/55 md:text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="overflow-hidden rounded-2xl border border-[#C8A96A]/15 bg-gradient-to-br from-[#141414] via-[#0D0D0D] to-[#141414] p-6 md:p-10">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white md:text-xl">
                {service.title} için bir alan açalım
              </h2>
              <p className="mt-1 text-sm text-white/55 md:text-base">
                Randevudan önce sorularını WhatsApp'tan iletebilirsin.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/randevu"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#C8A96A] px-5 py-2.5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a]"
              >
                <CalendarCheck className="size-4" />
                Randevu Al
              </Link>
              <a
                href={whatsappLink(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z" />
                </svg>
                WhatsApp ile Ulaş
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
