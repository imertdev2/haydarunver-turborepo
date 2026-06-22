import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogCta } from "@/components/blog-cta"

export const metadata: Metadata = {
  title: "Aile Dizimi Nedir? Sistemik Bakışın Görünmez Bağları | Haydar Ünver",
  description:
    "Aile dizimi nedir, nasıl çalışır, kimler için uygundur? Sistemik bakışın aileden devralınan görünmez sadakatleri görünür kılma yolunu keşfet.",
  keywords: [
    "aile dizimi",
    "sistemik dizim",
    "aile dizilimi",
    "Bert Hellinger",
    "sistemik bakış",
    "aile travması",
    "Haydar Ünver",
  ],
  openGraph: {
    title: "Aile Dizimi Nedir? Sistemik Bakışın Görünmez Bağları",
    description:
      "Sistemde nesilden nesle taşınan görünmez bağlar ve aile dizimi pratiği.",
    images: ["/images/aile-dizilimi.png"],
  },
  alternates: { canonical: "/blog/aile-dizimi" },
}

export default function AileDizimiPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/images/aile-dizilimi.png"
          alt="Aile Dizimi"
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
                Aile Dizimi
              </span>
              <span className="text-xs text-white/40">15 Mayıs 2026</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Aile Dizimi Nedir? Sistemik Bakışın Görünmez Bağları
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <div className="space-y-6 text-sm leading-relaxed text-white/70 md:space-y-8 md:text-base md:leading-relaxed">
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Bazen kendi seçtiğimizi sandığımız hayatın aslında çok daha eskiye
            uzanan bir sahnenin devamı olduğunu fark ederiz. Tekrar eden ilişkiler,
            kimin tarafından söylendiği belli olmayan iç sesler, bedeni terk
            etmeyen bir hüzün… Aile dizimi, tam da bu noktada sahneye çıkar.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Aile Dizimi Nedir?
          </h2>
          <p>
            Aile dizimi, Alman psikoterapist Bert Hellinger tarafından
            geliştirilen sistemik bir pratiktir. Bireyi yalnız başına değil,
            içinden geldiği aile sistemiyle birlikte ele alır. Bu sistemin görünür
            ve görünmez üyeleri — anneanne, dede, doğmayan kardeş, dışlanan
            atalar — bugünkü davranışlarımız üzerinde sessiz bir etki bırakır.
          </p>
          <p>
            Çalışmada, kendi sistemin için temsilciler seçer ve sahnede onları
            yerleştirirsin. Beklenmedik bir şey olur: temsilciler, daha önce
            tanımadıkları kişilerin duygularını, jestlerini ve bedensel
            tepkilerini gösterir. Hellinger bu fenomene &ldquo;temsil edici
            algı&rdquo; (representing perception) der.
          </p>

          <div className="rounded-xl border border-[#C8A96A]/15 bg-[#C8A96A]/[0.03] p-5 md:p-6">
            <h3 className="mb-3 font-semibold text-[#C8A96A]">
              Sistemin üç temel yasası
            </h3>
            <ul className="space-y-2 text-white/60">
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                <span>
                  <strong className="text-white/80">Aidiyet:</strong> Sisteme dahil
                  herkesin yeri vardır — dışlanan, unutulan, erken ölen dahil.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                <span>
                  <strong className="text-white/80">Sıralanma:</strong> Daha önce
                  gelen, sonra gelenden önceliklidir. Çocuk anne-babadan büyük
                  davrandığında yük artar.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                <span>
                  <strong className="text-white/80">Verme – Alma Dengesi:</strong>{" "}
                  Sistemdeki alışveriş dengelendiğinde akış başlar.
                </span>
              </li>
            </ul>
          </div>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Bu Çalışmanın Kimin İçin Anlamı Var?
          </h2>
          <p>
            Aile dizimi, &ldquo;içimde benim olmayan bir şey taşıyor olabilir
            miyim?&rdquo; sorusunu ciddiye alan herkes için bir kapıdır. Sıkça
            tekrarlanan örüntüler, bilinmedik suçluluk duyguları, anne-baba ya
            da kardeş ilişkisindeki sıkışmalar, doğmamış kardeşlerin gölgesi —
            bunlar sahneye gelir.
          </p>
          <p>
            Sahnede iyileşmeyi sözcüklerle değil; bir bakış, bir baş eğme, bir
            yer değişikliğiyle deneyimlersin. Sistemde herkes uygun yerini
            aldığında, bedenin nefes alır.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Bireysel ve Grup Çalışması
          </h2>
          <p>
            Aile dizimi iki şekilde çalışılabilir:
          </p>
          <ul className="space-y-2 pl-4">
            <li className="flex gap-2">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[#258989]" />
              <span>
                <strong className="text-white/80">Grup formatında</strong> —
                katılımcılardan oluşan temsilcilerle, daha geniş bir sahne kurulur.
                Hem temsilci olmak hem kendi mevzunu çalışmak mümkündür.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[#258989]" />
              <span>
                <strong className="text-white/80">Bireysel formatta</strong> —
                nesneler veya kağıtlar üzerinden sahne kurulur. Daha sessiz, daha
                gizli mevzular için uygundur.
              </span>
            </li>
          </ul>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Seans Öncesi ve Sonrası
          </h2>
          <p>
            Çalışmaya gelirken belli bir niyetle gelmek yerine, sade bir
            sorunla, sade bir cümleyle gelmek genellikle daha etkilidir.
            &ldquo;Annemle aramda ne oluyor?&rdquo; gibi tek katmanlı bir mevzu
            sahnenin kendini açmasına yer açar.
          </p>
          <p>
            Çalışmadan sonra birkaç gün, hatta birkaç hafta süren sessiz bir
            entegrasyon dönemi başlar. Bu sürede sahneyi sözel olarak çok
            analiz etmemek; bedenin değişimini izlemek tavsiye edilir.
          </p>

          <p>
            Aile dizimi, kimseyi suçlamadan, sadakatleri görünür kılarak
            sevginin daha sağlıklı bir akışla yeniden yer almasına alan açar.
            Belki en güzel tarafı budur: çözüm bilgide değil, sahnenin
            kendindedir.
          </p>
        </div>
        <BlogCta topic="Aile Dizimi" />
      </article>
    </main>
  )
}
