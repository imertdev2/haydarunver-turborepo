import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BlogCta } from "@/components/blog-cta"

export const metadata: Metadata = {
  title: "Bioenerji ile Bedenin Dilini Anlamak | Haydar Ünver",
  description:
    "Bioenerji terapisi ile bedenin enerji blokajlarını çöz, fiziksel ve duygusal dengeyi yeniden kur. Bioenerji nedir, nasıl çalışır ve kimler için uygundur?",
  keywords: [
    "bioenerji",
    "bioenerji terapisi",
    "enerji çalışması",
    "enerji blokajı",
    "enerji terapisi",
    "denge çalışması",
    "Haydar Ünver",
  ],
  openGraph: {
    title: "Bioenerji ile Bedenin Dilini Anlamak",
    description:
      "Bioenerji terapisi ile bedenin enerji blokajlarını çöz, dengeyi yeniden kur.",
    images: ["/images/bio-enerji.png"],
  },
}

export default function BioenerjiPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        <Image
          src="/images/bio-enerji.png"
          alt="Bioenerji"
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
                Bioenerji
              </span>
              <span className="text-xs text-white/40">8 Nisan 2026</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              Bioenerji ile Bedenin Dilini Anlamak
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
        <div className="space-y-6 text-sm leading-relaxed text-white/70 md:space-y-8 md:text-base md:leading-relaxed">
          <p className="text-base leading-relaxed text-white/80 md:text-lg">
            Bedenin bir dili var. Ağrılar, gerginlikler, kronik yorgunluk — bunlar
            bedenin sana gönderdiği mesajlar. Bioenerji, bu mesajlara alan açan ve
            bedenin enerji akışında dengelenmeyi destekleyen kadim bir pratiktir.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Bioenerji Nedir?
          </h2>
          <p>
            Bioenerji, canlı organizmaların yaşam enerjisi (prana, chi, ki)
            üzerinde çalışan bir pratiktir. Her canlının etrafında ve içinde akan
            bir enerji alanı vardır. Stres, travma, bastırılmış duygular ve
            bedensel gerginlikler bu enerji akışında tıkanıklıklara yol açabilir.
          </p>
          <p>
            Bioenerji çalışmasında uygulayıcı, elleri aracılığıyla bu enerji
            alanındaki dengesizliklere alan açar; akışın yeniden düzenlenmesini ve
            bedenin doğal dengesinin desteklenmesini hedefler.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Bioenerji Nasıl Çalışır?
          </h2>
          <p>
            Bir bioenerji seansında terapist, danışanın enerji alanını tarayarak
            blokaj noktalarını tespit eder. Ardından çeşitli el teknikleri
            kullanarak bu blokajları çözer ve enerji akışını düzenler. Seans
            sırasında danışan genellikle sıcaklık, karıncalanma, hafiflik veya
            derin bir rahatlama hissedebilir.
          </p>

          <div className="rounded-xl border border-[#C8A96A]/15 bg-[#C8A96A]/[0.03] p-5 md:p-6">
            <h3 className="mb-3 font-semibold text-[#C8A96A]">
              Bioenerji seansında yaşanabilecek deneyimler
            </h3>
            <ul className="space-y-2 text-white/60">
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Bedende sıcaklık dalgaları ve enerji akışı hissi
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Derin duygusal boşalma ve rahatlama
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Kronik ağrı ve gerginliklerin azalması
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Zihinsel sakinlik ve berraklık
              </li>
              <li className="flex gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-[#C8A96A]" />
                Uyku kalitesinde iyileşme
              </li>
            </ul>
          </div>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Beden Neyi Tutar, Neyi Bırakır?
          </h2>
          <p>
            Modern yaşamda çoğumuz duygularımızı bastırmayı öğrendik. Öfkeyi
            yutarız, üzüntüyü saklarız, korkuyu görmezden geliriz. Ama beden
            hiçbir şeyi unutmaz. Her bastırılmış duygu, bedende bir gerilim
            olarak depolanır — omuzlardaki sertlik, mide sorunları, baş ağrıları.
          </p>
          <p>
            Bioenerji çalışması, bu depolanmış gerilim ve duyguları katman katman
            çözer. Beden rahatlayınca zihin de rahatlar; zihin sakinleşince beden
            iyileşir. Bu karşılıklı döngü, bioenerji terapisinin en güçlü
            yönlerinden biridir.
          </p>

          <h2 className="pt-2 text-xl font-bold text-white md:text-2xl">
            Bioenerji ve Bilim
          </h2>
          <p>
            Bioenerji çalışmaları, biyofoton araştırmaları ve kuantum biyolojisi
            alanlarıyla kesişir. İnsan bedeninin zayıf elektromanyetik alanlar
            yaydığı bilimsel olarak kanıtlanmıştır. Bioenerji terapistleri bu
            alanlarla çalışarak bedenin enerji dengesini yeniden kurma sürecini
            destekler.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
            {[
              { title: "Fiziksel Denge", desc: "Kronik ağrılar, sindirim sorunları ve bağışıklık sistemini destekler" },
              { title: "Duygusal Denge", desc: "Bastırılmış duyguları serbest bırakarak iç huzuru yeniden kurar" },
              { title: "Zihinsel Netlik", desc: "Zihinsel sissi kaldırarak odaklanma ve karar verme kapasitesini artırır" },
              { title: "Enerji Seviyesi", desc: "Tıkanmış enerji kanallarını açarak canlılık ve yaşam gücünü yükseltir" },
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
            İlk Seansına Hazırlan
          </h2>
          <p>
            Bioenerji seansına gelmeden önce yapman gereken özel bir hazırlık yok.
            Rahat kıyafetler giymen ve açık bir zihinle gelmen yeterli. Her seans
            kişiye özeldir — bedenin neye ihtiyaç duyuyorsa, o ortaya çıkar.
          </p>
          <p>
            Bedenin sana bir şeyler söylüyor. Onu dinlemeye hazır mısın?
          </p>

        </div>
        <BlogCta topic="Bioenerji" />
      </article>
    </main>
  )
}
