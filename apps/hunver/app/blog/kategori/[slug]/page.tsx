import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  BLOG_CATEGORIES,
  getCategory,
  getCategoryLabel,
  getPostsByCategory,
} from "../../_data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return {
    title: `${category.label} — Blog`,
    description: category.description,
    alternates: { canonical: `/blog/kategori/${category.slug}` },
  }
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const posts = getPostsByCategory(slug)

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-[#C8A96A]"
        >
          <ArrowLeft className="size-3.5" />
          Tüm Yazılar
        </Link>

        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Kategori
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {category.label}
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-white/55 md:text-base">
            {category.description}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="py-16 text-center text-sm text-white/40">
            Bu kategoride henüz yazı yok.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
                    <span className="rounded-full bg-[#258989]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#258989]">
                      {getCategoryLabel(post.category)}
                    </span>
                    <span className="text-[10px] text-white/30">{post.date}</span>
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
        )}
      </div>
    </main>
  )
}
