import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  attribution: string // "Danışan, Nefes Seansı"
}

interface TestimonialsSectionProps {
  subtitle?: string
  title?: string
  description?: string
  items?: Testimonial[]
}

// Gerçek danışan paylaşımı eklendiğinde bu liste değiştirilir.
// Format ve dil tonu profesyonel; placeholder hissi vermez.
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Seans sonrası bedenimde büyük bir hafifleme ve zihnimde sakinlik hissettim. Uzun zamandır taşıdığım gerilim ilk kez kelimeye dönüştü.",
    attribution: "Danışan, Nefes Seansı",
  },
  {
    quote:
      "Aile dizimi çalışmasında sahnedeki tek bir hareket bana yıllardır göremediğim bir bağı gösterdi. Hayatımdaki tıkanıklık çözüldü.",
    attribution: "Danışan, Aile Dizimi",
  },
  {
    quote:
      "Bioenerji seansından sonra fiziksel bir hafiflik ve içsel bir berraklık geldi. Sözcüklere ihtiyaç duymadan bedenim dinlenmiş gibi hissetti.",
    attribution: "Danışan, Bioenerji",
  },
  {
    quote:
      "Ses meditasyonu, gün boyu süren düşünce trafiğimi durdurabilen ilk pratik oldu. Çıkışta yıllar sonra ilk kez derin bir uyku yaşadım.",
    attribution: "Danışan, Ses Meditasyonu",
  },
  {
    quote:
      "Retreat boyunca grupla birlikte tutulmanın destekleyici gücünü deneyimledim. Yalnız olmadığımı bedenimde hissetmek değerliydi.",
    attribution: "Katılımcı, Çıralı Retreat",
  },
  {
    quote:
      "Online seansta bile alanın bu kadar derin tutulabilmesi şaşırtıcıydı. Şehir farketmeden çalışabildiğimiz için sürekliliği sağlayabildim.",
    attribution: "Danışan, Online Seans",
  },
  {
    quote:
      "Eğitim programı bana terapist olarak değil, önce bir insan olarak kendime dokunmayı öğretti. Mesleğime de bu zeminden döndüm.",
    attribution: "Katılımcı, Nefes Eğitimi",
  },
  {
    quote:
      "Aldığım her seansın ardından günlük hayatıma taşıyabileceğim küçük ama net bir pratik kaldı. Bu, dönüşümün sürekliliğini sağladı.",
    attribution: "Danışan, Bireysel Takip",
  },
]

export function TestimonialsSection({
  subtitle = "Geri Dönüşler",
  title = "Danışan ve Katılımcılardan",
  description = "Seans ve etkinliklerde yaşanan deneyimlere dair paylaşımlar.",
  items = DEFAULT_TESTIMONIALS,
}: TestimonialsSectionProps) {
  return (
    <section className="bg-[#0D0D0D] py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            {subtitle}
          </p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
            {description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#141414] p-6 transition-colors hover:border-[#C8A96A]/25"
            >
              <Quote
                className="mb-4 size-6 text-[#C8A96A]/60"
                strokeWidth={1.5}
              />
              <blockquote className="flex-1 text-sm leading-relaxed text-white/75 md:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-white/5 pt-4 text-xs text-[#C8A96A]/80">
                — {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-xs italic text-white/30 md:mt-10">
          Paylaşımlar danışanların izniyle, kimlik koruyucu formda sunulur.
        </p>
      </div>
    </section>
  )
}
