import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized, slugify } from "@/lib/admin-auth-server"

// Blog kategorileri (blog_categories) yönetimi.

interface CatPayload {
  id?: string
  slug?: string
  label?: string
  description?: string
  sort_order?: number
}

export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("sort_order", { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ categories: data ?? [] })
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const body = (await request.json()) as CatPayload
  const label = body.label?.trim()
  if (!label) return NextResponse.json({ error: "label zorunludur" }, { status: 400 })
  const payload = {
    slug: body.slug ? slugify(body.slug) : slugify(label),
    label,
    description: body.description?.trim() ?? "",
    sort_order: Number(body.sort_order) || 0,
  }
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("blog_categories")
    .insert(payload)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ category: data })
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const body = (await request.json()) as CatPayload
  if (!body.id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const update: Record<string, unknown> = {}
  if (body.label !== undefined) update.label = body.label.trim()
  if (body.slug !== undefined) update.slug = slugify(body.slug)
  if (body.description !== undefined) update.description = body.description.trim()
  if (body.sort_order !== undefined) update.sort_order = Number(body.sort_order) || 0
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("blog_categories")
    .update(update)
    .eq("id", body.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ category: data })
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const supabase = createServiceClient()
  const { error } = await supabase.from("blog_categories").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
