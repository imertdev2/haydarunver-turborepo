import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogCta } from "@/components/blog-cta"

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

        </div>
        <BlogCta topic="Nefes Terapisi" />
      </article>
    </main>
  )
}
