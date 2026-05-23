import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BLOG_CATEGORIES, BLOG_POSTS, getCategoryLabel } from "./_data"

export const metadata: Metadata = {
  title: "Blog — Nefes, Bioenerji ve Meditasyon Yazıları",
  description:
    "Nefes terapisi, bioenerji, ses meditasyonu ve bilinçli yaşam üzerine yazılar.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Haydar Ünver",
    description:
      "Nefes terapisi, bioenerji, ses meditasyonu ve bilinçli yaşam üzerine yazılar.",
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Yazılar
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Blog
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            Nefes, enerji ve bilinçli yaşam üzerine yazılar.
          </p>
        </div>

        {/* Kategoriler */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <Link
            href="/blog"
            className="rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/10 px-3 py-1.5 text-xs font-medium text-[#C8A96A] md:text-sm"
          >
            Tümü
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/kategori/${c.slug}`}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/55 transition-colors hover:border-[#C8A96A]/25 hover:text-white md:text-sm"
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Posts */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-xl border border-[#C8A96A]/10 bg-[#141414] transition-colors hover:border-[#C8A96A]/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full bg-[#258989]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#258989] md:text-xs">
                    {getCategoryLabel(post.category)}
                  </span>
                  <span className="text-[10px] text-white/30 md:text-xs">{post.date}</span>
                </div>
                <h2 className="mb-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-[#C8A96A] md:text-base">
                  {post.title}
                </h2>
                <p className="line-clamp-2 text-xs leading-relaxed text-white/55 md:text-sm">
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
