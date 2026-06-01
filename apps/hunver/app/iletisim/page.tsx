import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle, CalendarCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Bireysel seans, grup çalışması, etkinlik ve eğitim için Haydar Ünver'e ulaş. WhatsApp, e-posta veya randevu sayfasından bağlan.",
  alternates: { canonical: "/iletisim" },
}

const WA_URL =
  "https://wa.me/908503031559?text=" +
  encodeURIComponent("Merhaba, bilgi almak istiyorum.")

const PHONE_DISPLAY = "+90 850 303 15 59"
const PHONE_HREF = "tel:+908503031559"
const EMAIL = "info@haydarunver.com"

export default function IletisimPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-20 md:pt-28 md:pb-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {/* Header */}
        <header className="mb-12 text-center md:mb-16">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Bağlan
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            İletişim
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Bireysel seans, grup çalışması, eğitim veya etkinlik için bana doğrudan ulaşabilirsin.
          </p>
        </header>

        {/* Hızlı aksiyonlar */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a] md:text-base"
          >
            <MessageCircle className="size-5" />
            WhatsApp'tan Yaz
          </a>
          <Link
            href="/randevu"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C8A96A] px-5 py-4 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a] md:text-base"
          >
            <CalendarCheck className="size-5" />
            Online Randevu Al
          </Link>
        </div>

        {/* Detaylar */}
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={PHONE_HREF}
            className="group rounded-2xl border border-white/10 bg-[#141414] p-5 transition-all hover:border-[#C8A96A]/30 md:p-6"
          >
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-[#258989]/15 text-[#258989]">
              <Phone className="size-5" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Telefon
            </p>
            <p className="mt-1 text-base font-semibold text-white transition-colors group-hover:text-[#C8A96A]">
              {PHONE_DISPLAY}
            </p>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className="group rounded-2xl border border-white/10 bg-[#141414] p-5 transition-all hover:border-[#C8A96A]/30 md:p-6"
          >
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-[#258989]/15 text-[#258989]">
              <Mail className="size-5" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
              E-posta
            </p>
            <p className="mt-1 break-all text-base font-semibold text-white transition-colors group-hover:text-[#C8A96A]">
              {EMAIL}
            </p>
          </a>

          <div className="rounded-2xl border border-white/10 bg-[#141414] p-5 sm:col-span-2 md:p-6">
            <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-[#258989]/15 text-[#258989]">
              <MapPin className="size-5" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
              Konum
            </p>
            <p className="mt-1 text-base font-semibold text-white">Antalya, Türkiye</p>
            <p className="mt-1 text-sm text-white/55">
              Seans, eğitim ve retreatler farklı lokasyonlarda gerçekleşir. Detay için
              ulaşabilirsiniz.
            </p>
          </div>
        </div>

        {/* Çalışma alanı bilgisi */}
        <section className="mt-12 rounded-2xl border border-[#C8A96A]/15 bg-gradient-to-br from-[#141414] via-[#0D0D0D] to-[#141414] p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white md:text-xl">
            Nasıl ilerleriz?
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-white/60 md:text-base">
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#C8A96A]/30 text-xs font-semibold text-[#C8A96A]">
                1
              </span>
              <span>WhatsApp veya e-posta ile ulaşırsın, ihtiyacını paylaşırsın.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#C8A96A]/30 text-xs font-semibold text-[#C8A96A]">
                2
              </span>
              <span>Sana uygun seans / etkinlik türünü birlikte değerlendiririz.</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-[#C8A96A]/30 text-xs font-semibold text-[#C8A96A]">
                3
              </span>
              <span>Randevu sayfasından tarih ve saat planlanır.</span>
            </li>
          </ol>
        </section>
      </div>
    </main>
  )
}
