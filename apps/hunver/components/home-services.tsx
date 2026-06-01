import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface HomeService {
  slug: string
  title: string
  description: string
  forWhom: string
  formats: string[] // bireysel / grup / online
  whatsappText: string
}

const SERVICES: HomeService[] = [
  {
    slug: "nefes-terapisi",
    title: "Nefes Terapisi",
    description:
      "Bilinçli nefes pratiğiyle bedeni gevşetmeye ve sinir sistemine alan açmaya yönelik çalışma.",
    forWhom: "Stres, yoğun zihinsel yük, duygusal birikim yaşayan; nefesle çalışmak isteyen herkes için uygun.",
    formats: ["Bireysel", "Grup", "Online"],
    whatsappText: "Merhaba, nefes terapisi hakkında bilgi almak istiyorum.",
  },
  {
    slug: "aile-dizimi",
    title: "Aile Dizimi",
    description:
      "Aile sistemindeki görünmez bağ ve dinamikleri sahaya çıkarmak için sistemik çalışma.",
    forWhom: "Tekrar eden ilişki, iş veya aile örüntülerini fark etmek isteyen kişiler için uygun.",
    formats: ["Bireysel", "Grup"],
    whatsappText: "Merhaba, aile dizimi hakkında bilgi almak istiyorum.",
  },
  {
    slug: "bioenerji",
    title: "Bioenerji",
    description:
      "Bedenin enerji alanında oluşan tıkanıklıklara nazikçe alan açan dengeleme çalışması.",
    forWhom: "Yorgunluk, gerginlik ya da içsel dengeyi tazelemek isteyen kişiler için uygun.",
    formats: ["Bireysel"],
    whatsappText: "Merhaba, bioenerji seansı hakkında bilgi almak istiyorum.",
  },
  {
    slug: "ses-meditasyonu",
    title: "Ses Meditasyonu",
    description:
      "Tibet çanakları ve sesin titreşimiyle derin gevşemeye ve içsel sessizliğe alan açan pratik.",
    forWhom: "Zihinsel yorgunluk, uyku düzensizliği ve sessizliğe ihtiyaç duyan kişiler için uygun.",
    formats: ["Bireysel", "Grup"],
    whatsappText: "Merhaba, ses meditasyonu hakkında bilgi almak istiyorum.",
  },
]

function whatsappLink(text: string) {
  return `https://wa.me/908503031559?text=${encodeURIComponent(text)}`
}

export function HomeServices() {
  return (
    <section className="bg-[#0D0D0D] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Seanslar
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Birlikte Çalıştığımız Alanlar
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            Bedenin, zihnin ve duyguların birlikte dengelenmesine alan açan dört temel seans.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#141414] p-6 transition-all hover:border-[#C8A96A]/30 md:p-8"
            >
              <h3 className="text-xl font-bold text-white md:text-2xl">{s.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
                {s.description}
              </p>

              <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C8A96A]/70">
                  Kimler için uygun?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{s.forWhom}</p>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#C8A96A]/70">
                  Seans türü
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.formats.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-[#258989]/30 bg-[#258989]/[0.08] px-2.5 py-0.5 text-xs font-medium text-[#258989]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href={`/hizmetler/${s.slug}`}
                  className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#C8A96A] px-4 py-2.5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a]"
                >
                  Detaylı Bilgi Al
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={whatsappLink(s.whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
