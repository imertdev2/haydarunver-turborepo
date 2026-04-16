import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

interface BlogPost {
  title: string
  excerpt: string
  category: string
  date: string
  href: string
  image: { src: string; alt: string }
}

interface BlogSectionProps {
  subtitle?: string
  title?: string
  posts?: BlogPost[]
}

const defaultPosts: BlogPost[] = [
  {
    title: "Nefes Terapisi Nedir ve Nasıl Çalışır?",
    excerpt: "Nefes, sadece yaşamın değil, dönüşümün de anahtarıdır. Bilinçli nefes ile sinir sistemini nasıl regüle edebileceğini keşfet.",
    category: "Nefes",
    date: "12 Nisan 2026",
    href: "/blog/nefes-terapisi",
    image: { src: "/images/blog-1.jpg", alt: "Nefes Terapisi" },
  },
  {
    title: "Bioenerji ile Bedenin Dilini Anlamak",
    excerpt: "Bedenin sana sürekli mesajlar gönderiyor. Bioenerji çalışmaları ile bu mesajları duymayı ve yanıtlamayı öğren.",
    category: "Bioenerji",
    date: "8 Nisan 2026",
    href: "/blog/bioenerji",
    image: { src: "/images/blog-2.jpg", alt: "Bioenerji" },
  },
  {
    title: "Ses Meditasyonu: İçsel Sessizliğe Yolculuk",
    excerpt: "Kadim çanakların ve sesin titreşimi ile zihinsel gürültüyü sustur, derinlere in.",
    category: "Meditasyon",
    date: "3 Nisan 2026",
    href: "/blog/ses-meditasyonu",
    image: { src: "/images/blog-3.jpg", alt: "Ses Meditasyonu" },
  },
]

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white/[0.04] text-xs text-white/20">
      {label}
    </div>
  )
}

export function BlogSection({
  subtitle = "Yazılar",
  title = "Blogdan Seçmeler",
  posts = defaultPosts,
}: BlogSectionProps) {
  return (
    <section className="bg-[#0D0D0D] py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between md:mb-12">
          <div>
            <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:mb-3 md:text-base">
              {subtitle}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {title}
            </h2>
          </div>
          <Button
            asChild
            variant="ghost"
            className="hidden gap-1 text-sm text-[#C8A96A] hover:bg-white/5 hover:text-[#C8A96A] sm:inline-flex"
          >
            <Link href="/blog">
              Tümünü Gör
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Blog cards */}
        <div className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.href}
              className="group overflow-hidden rounded-xl border border-[#C8A96A]/10 bg-[#141414] transition-colors hover:border-[#C8A96A]/25"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#258989]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#258989] md:text-xs">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-white/30 md:text-xs">
                    {post.date}
                  </span>
                </div>

                <h3 className="mb-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-[#C8A96A] md:text-base">
                  {post.title}
                </h3>

                <p className="line-clamp-2 text-xs leading-relaxed text-white/50 md:text-sm">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 text-center sm:hidden">
          <Button
            asChild
            variant="ghost"
            className="gap-1 text-sm text-[#C8A96A] hover:bg-white/5 hover:text-[#C8A96A]"
          >
            <Link href="/blog">
              Tümünü Gör
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
