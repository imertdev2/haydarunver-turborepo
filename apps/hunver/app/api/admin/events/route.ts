import { NextResponse } from "next/server"
import { requireServiceClient as createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized } from "@/lib/admin-auth-server"

// Etkinlikler (events) yönetimi.

interface EventPayload {
  id?: string
  title?: string
  image_src?: string
  image_alt?: string
  is_featured?: boolean
  is_active?: boolean
  sort_order?: number
}

function normalize(body: EventPayload) {
  return {
    title: body.title?.trim() ?? "",
    image_src: body.image_src?.trim() ?? "",
    image_alt: body.image_alt?.trim() ?? body.title?.trim() ?? "",
    is_featured: body.is_featured ?? false,
    is_active: body.is_active ?? true,
    sort_order: Number(body.sort_order) || 0,
  }
}

export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("sort_order", { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data ?? [] })
}

export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const payload = normalize((await request.json()) as EventPayload)
  if (!payload.title) return NextResponse.json({ error: "title zorunludur" }, { status: 400 })
  const supabase = createServiceClient()
  const { data, error } = await supabase.from("events").insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ event: data })
}

export async function PATCH(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const body = (await request.json()) as EventPayload
  if (!body.id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("events")
    .update(normalize(body))
    .eq("id", body.id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ event: data })
}

export async function DELETE(request: Request) {
  if (!checkAuth(request)) return unauthorized()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  const supabase = createServiceClient()
  const { error } = await supabase.from("events").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
