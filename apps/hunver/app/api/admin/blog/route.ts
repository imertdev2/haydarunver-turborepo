import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized, slugify } from "@/lib/admin-auth-server"

// Blog yazıları (blog_posts) yönetimi.

interface PostPayload {
  id?: string
  slug?: string
  title?: string
  excerpt?: string
  body?: string
  category?: string
  date?: string
  image?: string
  is_published?: boolean
  sort_order?: number
}

function normalize(body: PostPayload) {
  return {
    slug: body.slug ? slugify(body.slug) : body.title ? slugify(body.title) : "",
    title: body.title?.trim() ?? "",
    excerpt: body.excerpt?.trim() ?? "",
    body: body.body ?? "",
    category: body.category ?? "",
    date: body.date?.trim() ?? "",
    image: body.image?.trim() ?? "",
    is_published: body.is_published ?? true,
    sort_order: Number(body.sort_order) || 0,
  }
}

export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data ?? [] })
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const payload = normalize((await request.json()) as PostPayload)
  if (!payload.title || !payload.slug || !payload.category) {
    return NextResponse.json(
      { error: "title, slug ve category zorunludur" },
      { status: 400 }
    )
  }
  const supabase = createServiceClient()
  const { data, error } = await supabase.from("blog_posts").insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const body = (await request.json()) as PostPayload
  if (!body.id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const payload = normalize(body)
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", body.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data })
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const supabase = createServiceClient()
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
