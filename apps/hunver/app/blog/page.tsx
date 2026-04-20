import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Blog | Haydar Ünver — Nefes, Bioenerji ve Meditasyon Yazıları",
  description:
    "Nefes terapisi, bioenerji, ses meditasyonu ve bilinçli yaşam üzerine yazılar. Haydar Ünver'in deneyimlerinden ilham al.",
  openGraph: {
    title: "Blog | Haydar Ünver",
    description:
      "Nefes terapisi, bioenerji, ses meditasyonu ve bilinçli yaşam üzerine yazılar.",
  },
}

const posts = [
  {
    title: "Nefes Terapisi Nedir ve Nasıl Çalışır?",
    excerpt:
      "Nefes, sadece yaşamın değil, dönüşümün de anahtarıdır. Bilinçli nefes ile sinir sistemini nasıl regüle edebileceğini keşfet.",
    category: "Nefes",
    date: "12 Nisan 2026",
    href: "/blog/nefes-terapisi",
    image: "/images/nefes-terapisi.png",
  },
  {
    title: "Bioenerji ile Bedenin Dilini Anlamak",
    excerpt:
      "Bedenin sana sürekli mesajlar gönderiyor. Bioenerji çalışmaları ile bu mesajları duymayı ve yanıtlamayı öğren.",
    category: "Bioenerji",
    date: "8 Nisan 2026",
    href: "/blog/bioenerji",
    image: "/images/bio-enerji.png",
  },
  {
    title: "Ses Meditasyonu: İçsel Sessizliğe Yolculuk",
    excerpt:
      "Kadim çanakların ve sesin titreşimi ile zihinsel gürültüyü sustur, derinlere in.",
    category: "Meditasyon",
    date: "3 Nisan 2026",
    href: "/blog/ses-meditasyonu",
    image: "/images/ses-meditasyonu.png",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Yazılar
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Blog
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-white/50 md:text-base">
            Nefes, enerji ve bilinçli yaşam üzerine yazılar.
          </p>
        </div>

        {/* Posts */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group overflow-hidden rounded-xl border border-[#C8A96A]/10 bg-[#141414] transition-colors hover:border-[#C8A96A]/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#258989]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#258989] md:text-xs">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-white/30 md:text-xs">
                    {post.date}
                  </span>
                </div>
                <h2 className="mb-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-[#C8A96A] md:text-base">
                  {post.title}
                </h2>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/50 md:text-sm">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
