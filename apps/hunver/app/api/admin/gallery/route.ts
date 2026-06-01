import { NextResponse } from "next/server"
import { requireServiceClient as createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized } from "@/lib/admin-auth-server"

// Galeri görselleri (gallery_images) yönetimi.

interface GalleryPayload {
  id?: string
  src?: string
  alt?: string
  category?: string
  is_active?: boolean
  sort_order?: number
}

function normalize(body: GalleryPayload) {
  return {
    src: body.src?.trim() ?? "",
    alt: body.alt?.trim() ?? "",
    category: body.category?.trim() || "Doğa",
    is_active: body.is_active ?? true,
    sort_order: Number(body.sort_order) || 0,
  }
}

export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ images: data ?? [] })
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const payload = normalize((await request.json()) as GalleryPayload)
  if (!payload.src) return NextResponse.json({ error: "src zorunludur" }, { status: 400 })
  const supabase = createServiceClient()
  const { data, error } = await supabase.from("gallery_images").insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ image: data })
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const body = (await request.json()) as GalleryPayload
  if (!body.id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("gallery_images")
    .update(normalize(body))
    .eq("id", body.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ image: data })
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const supabase = createServiceClient()
  const { error } = await supabase.from("gallery_images").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
