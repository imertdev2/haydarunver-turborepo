import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogCta } from "@/components/blog-cta"

export const metadata: Metadata = {
  title: "Ses Meditasyonu: İçsel Sessizliğe Yolculuk | Haydar Ünver",
  description:
    "Ses meditasyonu ile zihinsel gürültüye alan aç, derin gevşemeyi destekle. Tibet çanakları, gong ve ses frekanslarının dengeleyici etkisini keşfet.",
  keywords: [
    "ses meditasyonu",
    "sound healing",
    "ses terapisi",
    "Tibet çanağı",
    "gong meditasyonu",
    "ses frekansı",
    "meditasyon",
    "Haydar Ünver",
  ],
  openGraph: {
    title: "Ses Meditasyonu: İçsel Sessizliğe Yolculuk",
    description:
      "Tibet çanakları ve sesin titreşimi ile zihinsel gürültüyü sustur, derinlere in.",
    images: ["/images/ses-meditasyonu.png"],
  },
}

export default function SesMeditasyonuPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/images/ses-meditasyonu.png"
          alt="Ses Meditasyonu"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 md:px-6 md:pb-12">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-[#C8A96A]"
            >
              <ArrowLeft className="size-4" />
              Blog
            </Link>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-[#258989]/20 px-3 py-1 text-xs font-medium text-[#258989]">
                Meditasyon
              </span>
              <span className="text-xs text-white/40">3 Nisan 2026</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Ses Meditasyonu: İçsel Sessizliğe Yolculuk
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <div className="space-y-6 text-sm leading-relaxed text-white/70 md:space-y-8 md:text-base md:leading-relaxed">
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Sessizliğe ulaşmanın yolu bazen sesten geçer. Tibet çanaklarının
            yankısı, gongun derin titreşimi, sesin sana dokunduğu o an — zihin
            durur, beden çözülür ve sen, kendi derinliğinle baş başa kalırsın.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Ses Meditasyonu Nedir?
          </h2>
          <p>
            Ses meditasyonu (Sound Healing), belirli frekanslardaki seslerin ve
            titreşimlerin dengeleyici etkisinden yararlanan kadim bir pratiktir.
            Tibet çanakları, kristal çanaklar, gong, tuning fork ve insan sesi
            gibi araçlarla yapılır. Bu sesler, beyin dalgalarını yavaşlatarak
            derin meditasyon durumlarına (theta ve delta dalgaları) geçişi
            kolaylaştırır.
          </p>
          <p>
            Ses terapisinin kökenleri binlerce yıl öncesine, Antik Mısır, Hint
            ve Tibet geleneklerine uzanır. Bu kültürler, sesin sadece duyulabilir
            bir fenomen olmadığını, aynı zamanda bedendeki dengeyi
            destekleyebileceğini fark etmişlerdi.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Ses Nasıl Etki Eder?
          </h2>
          <p>
            İnsan bedeninin yüzde 70&apos;i sudur ve su, sesi mükemmel bir
            şekilde iletir. Tibet çanağının titreşimi bedene değdiğinde, bu
            titreşim hücrelerin derinliklerine kadar ulaşır. Bu fenomene
            &ldquo;rezonans&rdquo; denir — beden, dışarıdan gelen harmonik
            frekanslarla kendi doğal frekansına geri döner.
          </p>

          <div className="rounded-xl border border-[#C8A96A]/15 bg-[#C8A96A]/[0.03] p-5 md:p-6">
            <h3 className="mb-3 font-semibold text-[#C8A96A]">
              Ses meditasyonunun etkileri
            </h3>
            <ul className="space-y-2 text-white/60">
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Beyin dalgalarını alfa ve theta seviyelerine düşürür
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Kas gerginliğini çözer, kan basıncını düzenler
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Stres hormonu kortizolü düşürür
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Derin uyku kalitesini artırır
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Duygusal blokajları çözerek iç huzur sağlar
              </li>
            </ul>
          </div>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Bir Ses Meditasyonu Seansı Nasıl Geçer?
          </h2>
          <p>
            Seans genellikle 45–90 dakika sürer. Katılımcılar yere uzanır, gözler
            kapatılır ve terapist çeşitli ses araçlarıyla mekanı titreşimle
            doldurur. Bazen sesler yumuşak ve sarmalayıcıdır, bazen güçlü ve
            sarsıcı.
          </p>
          <p>
            Yapman gereken hiçbir şey yok — sadece uzanmak, nefes almak ve sesin
            seni taşımasına izin vermek. Çoğu kişi seans sırasında derin bir
            trans benzeri duruma geçer. Bazıları görüntüler, renkler veya
            anılar deneyimler; bazıları sadece derin bir huzur hisseder.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Hangi Enstrümanlar Kullanılır?
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            {[
              { title: "Tibet Çanakları", desc: "El dövme metal çanaklar. Her biri farklı frekansta titreşir ve farklı enerji merkezlerini (çakraları) etkiler" },
              { title: "Kristal Çanaklar", desc: "Saf kuartzdan yapılmış çanaklar. Son derece berrak ve penetran bir ses üretir" },
              { title: "Gong", desc: "Derin, geniş titreşim alanı yaratır. Tüm bedeni sararak derin gevşeme sağlar" },
              { title: "Şaman Davulu", desc: "Ritmik vuruşlarla beyin dalgalarını senkronize ederek trance durumuna geçişi destekler" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/[0.06] bg-[#141414] p-4"
              >
                <h4 className="mb-1 text-sm font-semibold text-[#258989]">
                  {item.title}
                </h4>
                <p className="text-xs text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Su Üstü Ses Meditasyonu
          </h2>
          <p>
            Özellikle benzersiz bir deneyim olan su üstü ses meditasyonunda
            katılımcılar havuzda yüzen şiltelere uzanır. Su, sesi 4 kat daha
            hızlı ilettiği için titreşimler bedenin her hücresine ulaşır.
            Havuzdaki ses terapisi, suyun kaldırma kuvveti ile birleşerek
            bedenin tamamen teslim olmasını ve derin bir gevşemeye ulaşmasını
            sağlar.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Kimler İçin Uygundur?
          </h2>
          <p>
            Ses meditasyonu herkes için uygundur. Meditasyon deneyimi olmayanlar
            için özellikle güzel bir başlangıç noktasıdır çünkü &ldquo;bir şey
            yapmayı&rdquo; gerektirmez — sadece sesin seni taşımasına izin
            verirsin. Uykusuzluk, stres, kaygı ve kronik ağrı yaşayanlar için
            özellikle etkilidir.
          </p>
          <p>
            Sesin olmadığı yerde sessizlik başlar. Ve o sessizlikte, gerçek sen
            saklıdır.
          </p>

        </div>
        <BlogCta topic="Ses Meditasyonu" />
      </article>
    </main>
  )
}
