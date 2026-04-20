import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Ses Meditasyonu: İçsel Sessizliğe Yolculuk | Haydar Ünver",
  description:
    "Ses meditasyonu ile zihinsel gürültüyü sustur, derin bir iç huzura ulaş. Tibet çanakları, gong ve ses frekanslarının iyileştirici gücünü keşfet.",
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
            titreşimlerin iyileştirici etkisini kullanan kadim bir pratiktir.
            Tibet çanakları, kristal çanaklar, gong, tuning fork ve insan sesi
            gibi araçlarla yapılır. Bu sesler, beyin dalgalarını yavaşlatarak
            derin meditasyon durumlarına (theta ve delta dalgaları) geçişi
            kolaylaştırır.
          </p>
          <p>
            Ses terapisinin kökenleri binlerce yıl öncesine, Antik Mısır, Hint
            ve Tibet geleneklerine uzanır. Bu kültürler, sesin sadece duyulabilir
            bir fenomen olmadığını, aynı zamanda hücresel düzeyde iyileştirici
            bir güç olduğunu biliyorlardı.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Ses Nasıl İyileştirir?
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

          {/* CTA */}
          <div className="mt-4 rounded-xl border border-[#258989]/20 bg-[#258989]/[0.06] p-6 text-center md:p-8">
            <p className="mb-3 text-base font-semibold text-white md:text-lg">
              Sesin iyileştirici gücünü deneyimle
            </p>
            <p className="mb-5 text-sm text-white/50">
              Bireysel veya grup ses meditasyonu seansları için iletişime geç.
            </p>
            <a
              href="https://wa.me/908503031559?text=Merhaba%2C%20ses%20meditasyonu%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#C8A96A]/30 bg-[#C8A96A] px-6 py-2.5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a] hover:shadow-lg hover:shadow-[#C8A96A]/20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z"/>
              </svg>
              WhatsApp ile Ulaş
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}
