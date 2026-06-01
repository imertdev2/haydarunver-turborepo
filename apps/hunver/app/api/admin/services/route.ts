import { NextResponse } from "next/server"
import { requireServiceClient as createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized } from "@/lib/admin-auth-server"

// Hizmetler (services tablosu) yönetimi — randevu akışındaki hizmetleri besler.

interface ServicePayload {
  id?: string
  name?: string
  description?: string
  duration_minutes?: number
  price?: number
  is_active?: boolean
}

function normalize(body: ServicePayload) {
  return {
    name: body.name?.trim(),
    description: body.description?.trim() ?? "",
    duration_minutes: Number(body.duration_minutes) || 60,
    price: Number(body.price) || 0,
    is_active: body.is_active ?? true,
  }
}

// GET — tüm hizmetler (aktif/pasif dahil)
export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ services: data ?? [] })
}

// POST — yeni hizmet
export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const payload = normalize((await request.json()) as ServicePayload)
  if (!payload.name) {
    return NextResponse.json({ error: "name zorunludur" }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("services")
    .insert(payload)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ service: data })
}

// PATCH — güncelle
export async function PATCH(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const body = (await request.json()) as ServicePayload
  if (!body.id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })

  const payload = normalize(body)
  if (!payload.name) {
    return NextResponse.json({ error: "name zorunludur" }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("services")
    .update(payload)
    .eq("id", body.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ service: data })
}

// DELETE — sil (ilişkili randevular cascade ile silinir)
export async function DELETE(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })

  const supabase = createServiceClient()
  const { error } = await supabase.from("services").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
