import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getBlogPost, getBlogCategories } from "@/lib/content"

// DB'den okunan blog yazıları için dinamik detay sayfası.
// Not: app/blog/<slug>/page.tsx şeklinde elle yazılmış statik sayfalar (nefes-terapisi,
// bioenerji, ses-meditasyonu) bu rotayı gölgeler ve kendi zengin içerikleriyle gösterilir.

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Haydar Ünver`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const categoryLabel =
    (await getBlogCategories()).find((c) => c.slug === post.category)?.label ?? post.category
  const paragraphs = post.body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        {post.image && (
          <Image src={post.image} alt={post.title} fill priority className="object-cover" />
        )}
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
                {categoryLabel}
              </span>
              {post.date && <span className="text-xs text-white/40">{post.date}</span>}
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        {post.excerpt && (
          <p className="mb-8 text-lg leading-relaxed text-white/70 md:text-xl">{post.excerpt}</p>
        )}
        <div className="space-y-5 text-sm leading-relaxed text-white/70 md:text-base">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p className="text-white/40">İçerik yakında eklenecek.</p>
          )}
        </div>
      </article>
    </main>
  )
}
