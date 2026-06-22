import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogCta } from "@/components/blog-cta"

export const metadata: Metadata = {
  title: "Günlük Hayata Taşıyabileceğin 5 Farkındalık Pratiği | Haydar Ünver",
  description:
    "Sabah açılışından gün sonu kapanışına kadar günlük rutinine ekleyebileceğin sade ama dönüştürücü beş farkındalık pratiği.",
  keywords: [
    "farkındalık",
    "mindfulness",
    "günlük pratik",
    "bilinçli yaşam",
    "nefes pratiği",
    "öz farkındalık",
    "Haydar Ünver",
  ],
  openGraph: {
    title: "Günlük Hayata Taşıyabileceğin 5 Farkındalık Pratiği",
    description:
      "Sade ama dönüştürücü beş farkındalık pratiği — günlük rutinine ekle.",
    images: ["/images/hakkimda.png"],
  },
  alternates: { canonical: "/blog/farkindalik-pratikleri" },
}

export default function FarkindalikPratikleriPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/images/hakkimda.png"
          alt="Farkındalık Pratikleri"
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
                Bilinçli Yaşam
              </span>
              <span className="text-xs text-white/40">22 Mayıs 2026</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Günlük Hayata Taşıyabileceğin 5 Farkındalık Pratiği
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <div className="space-y-6 text-sm leading-relaxed text-white/70 md:space-y-8 md:text-base md:leading-relaxed">
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Farkındalık bir kurs konusu değil, gün boyu süren küçük geri
            dönüşlerin toplamıdır. Aşağıda anlatılan beş pratik, hiçbiri 10
            dakikadan uzun sürmeyen, hayata kolayca yerleşebilecek davetlerdir.
            Tek tek deneyebilir, kendi temponda sürdürebilirsin.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            1. Üç Nefeslik Açılış
          </h2>
          <p>
            Sabah uyanır uyanmaz telefona uzanmadan önce, yatağında üç bilinçli
            nefes al. İlk nefeste bedenini hatırla, ikincide günü, üçüncüde tek
            bir niyet belirle. Bu üç nefes, günü reaktif değil bilinçli
            başlatmanı destekler.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            2. Geçiş Anlarında Eşik Duraklaması
          </h2>
          <p>
            Bir mekândan diğerine geçerken, bir toplantıdan ötekine giderken
            kapı eşiğinde iki saniye dur. &ldquo;Şimdi nereye geçiyorum?&rdquo;
            diye sor. Bu küçük durak, taşıdığın gerginliği bir sonraki ortama
            sürüklememe pratiğidir.
          </p>

          <div className="rounded-xl border border-[#C8A96A]/15 bg-[#C8A96A]/[0.03] p-5 md:p-6">
            <h3 className="mb-3 font-semibold text-[#C8A96A]">
              Neden işe yarar?
            </h3>
            <p className="text-white/65">
              Sinir sistemi geçişlerde regüle olamadığında stres hormonu birikir.
              Eşik duraklaması, bedenin ortama uyum sağlaması için kısa ama
              kritik bir tampondur.
            </p>
          </div>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            3. Yemek Öncesi Tek Cümle
          </h2>
          <p>
            Tabağın önüne oturduğunda, ilk lokmadan önce kendine tek bir cümle
            söyle: &ldquo;Bu yemek bana ulaşan birçok elin emeği.&rdquo; Bu kısa
            şükran, sindirimi yavaşlatır ve bedenin yediğini gerçekten almasına
            alan açar.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            4. Bedeni Tarama (90 saniye)
          </h2>
          <p>
            Gün ortasında otururken gözlerini kapat ve dikkatini başından
            ayaklarına doğru bedeninde gezdir. Hangi bölgede gerginlik var? O
            bölgeye iki nefes ver, yargılamadan. Bu 90 saniye, biriken
            kasılmaları erken fark etmeni sağlar.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            5. Gün Sonu Üç Hatırlama
          </h2>
          <p>
            Yatağa girmeden önce zihnindeki listeden çık, üç şeyi hatırla:
          </p>
          <ul className="space-y-2 pl-4">
            <li className="flex gap-2">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[#258989]" />
              <span>Bugün bana iyi gelen bir şey</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[#258989]" />
              <span>Bugün fark ettiğim bir gerginlik</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[#258989]" />
              <span>Yarın için sade bir niyet</span>
            </li>
          </ul>
          <p>
            Bu üç hatırlama, zihinsel atık biriktirmeden uyku moduna geçişi
            destekler.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Pratiği Sürdürmek
          </h2>
          <p>
            Hepsini birden yapmaya çalışma. Bir hafta sadece &ldquo;üç nefeslik
            açılış&rdquo;la başla. Beden yeni alışkanlığı tutunca diğerlerini
            ekleyebilirsin. Farkındalık, çoklukla değil tekrarla derinleşir.
          </p>
          <p>
            Unutma: farkındalık özel bir an için değil, sıradan günün
            içindedir. En kıymetli pratik, zaten yaptığın hareketi bilinçli
            yapmaktır.
          </p>
        </div>
        <BlogCta topic="Bilinçli Yaşam" />
      </article>
    </main>
  )
}
