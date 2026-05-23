import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Nefes Terapisi Nedir ve Nasıl Çalışır? | Haydar Ünver",
  description:
    "Nefes terapisi ile sinir sistemini düzenle, duygusal blokajları çöz ve bedenin doğal iyileşme gücünü harekete geçir. Bilinçli nefes teknikleri ve faydaları hakkında kapsamlı rehber.",
  keywords: [
    "nefes terapisi",
    "breathwork",
    "nefes çalışması",
    "bilinçli nefes",
    "holotropik nefes",
    "nefes teknikleri",
    "Haydar Ünver",
  ],
  openGraph: {
    title: "Nefes Terapisi Nedir ve Nasıl Çalışır?",
    description:
      "Bilinçli nefes ile sinir sistemini düzenle, duygusal blokajları çöz. Nefes terapisi rehberi.",
    images: ["/images/nefes-terapisi.png"],
  },
}

export default function NefesTerapisiPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/images/nefes-terapisi.png"
          alt="Nefes Terapisi"
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
                Nefes
              </span>
              <span className="text-xs text-white/40">12 Nisan 2026</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Nefes Terapisi Nedir ve Nasıl Çalışır?
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <div className="space-y-6 text-sm leading-relaxed text-white/70 md:space-y-8 md:text-base md:leading-relaxed">
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Nefes, yaşamın en temel ritmidir. Doğduğumuz andan itibaren bizi
            hayata bağlayan bu ritim, aynı zamanda bedenin, zihnin ve ruhun
            derinliklerine açılan bir kapıdır. Nefes terapisi, bu kapıyı bilinçli
            olarak aralamayı öğretir.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Nefes Terapisi Nedir?
          </h2>
          <p>
            Nefes terapisi, bilinçli ve kontrollü nefes tekniklerini kullanarak
            bedenin doğal iyileşme mekanizmalarını harekete geçiren bir terapi
            yöntemidir. Binlerce yıllık köklere sahip olan bu pratik, Pranayama,
            holotropik nefes, transformasyonel nefes ve rebirthing gibi farklı
            geleneklerden beslenir.
          </p>
          <p>
            Günlük hayatta çoğumuz sığ ve hızlı nefes alırız. Bu nefes paterni,
            sempatik sinir sistemini sürekli aktif tutarak stres, kaygı ve
            gerginlik döngüsü yaratır. Nefes terapisi bu döngüyü kırar ve
            parasempatik sinir sistemini — yani bedenin &ldquo;dinlen ve iyileş&rdquo;
            modunu — devreye sokar.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Nefes Terapisi Nasıl Çalışır?
          </h2>
          <p>
            Bir nefes terapisi seansında, terapistin rehberliğinde belirli nefes
            kalıpları uygulanır. Bu kalıplar genellikle derin diyafram nefesi,
            bağlantılı nefes (nefesler arasında duraklama olmadan sürekli akış)
            ve belirli ritimlerle nefes almayı içerir.
          </p>

          <div className="rounded-xl border border-[#C8A96A]/15 bg-[#C8A96A]/[0.03] p-5 md:p-6">
            <h3 className="mb-3 font-semibold text-[#C8A96A]">
              Bir seans sırasında neler olur?
            </h3>
            <ul className="space-y-2 text-white/60">
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Bedenin oksijen seviyesi artar, hücreler yenilenir
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Bastırılmış duygular yüzeye çıkarak serbest bırakılır
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Sinir sistemi dengelenir, derin bir rahatlama hissedilir
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Zihinsel berraklık ve netlik artar
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Bedensel gerginlikler ve ağrılar çözülür
              </li>
            </ul>
          </div>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Nefes Terapisinin Faydaları
          </h2>
          <p>
            Düzenli nefes çalışması, hem fiziksel hem de zihinsel sağlık üzerinde
            derin etkiler bırakır. Araştırmalar, bilinçli nefes pratiklerinin
            kortizol seviyelerini düşürdüğünü, bağışıklık sistemini
            güçlendirdiğini ve uyku kalitesini artırdığını göstermektedir.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            {[
              { title: "Stres ve Kaygı", desc: "Kronik stres döngüsünü kırarak derin bir iç huzur sağlar" },
              { title: "Duygusal Arınma", desc: "Yıllardır bastırılmış duyguları güvenli bir şekilde serbest bırakır" },
              { title: "Beden Farkındalığı", desc: "Bedenle yeniden bağlantı kurarak iç sinyalleri duymayı öğretir" },
              { title: "Enerji ve Canlılık", desc: "Hücresel oksijenlemeyi artırarak enerji seviyesini yükseltir" },
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
            Kimler İçin Uygundur?
          </h2>
          <p>
            Nefes terapisi, stres ve kaygı yaşayan, duygusal tıkanıklık hisseden,
            kronik ağrılarla başa çıkmaya çalışan, uyku sorunları yaşayan veya
            kişisel gelişim yolculuğunda derinleşmek isteyen herkese uygundur.
            Herhangi bir deneyim gerektirmez — tek ihtiyacınız olan nefes almaya
            istekli olmaktır.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            İlk Adımı Atmak
          </h2>
          <p>
            Nefes terapisi yolculuğuna başlamak için karmaşık bir hazırlığa gerek
            yok. Açık bir niyet, rahat bir ortam ve kendinize ayıracağınız zaman
            yeterli. Bireysel seanslar ya da grup çalışmalarıyla bu dönüştürücü
            deneyimi yaşayabilirsiniz.
          </p>
          <p>
            Unutma: her nefes yeni bir başlangıçtır. Bilinçli nefes aldığın her
            an, kendine geri dönüşün bir adımıdır.
          </p>

          {/* CTA */}
          <div className="mt-4 rounded-xl border border-[#258989]/20 bg-[#258989]/[0.06] p-6 text-center md:p-8">
            <p className="mb-3 text-base font-semibold text-white md:text-lg">
              Nefes terapisi ile tanışmaya hazır mısın?
            </p>
            <p className="mb-5 text-sm text-white/50">
              Bireysel seans veya grup çalışmaları için iletişime geç.
            </p>
            <a
              href="https://wa.me/908503031559?text=Merhaba%2C%20nefes%20terapisi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
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
