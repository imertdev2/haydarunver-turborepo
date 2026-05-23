import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"
import { checkAuth, slugify } from "@/lib/admin-auth-server"

interface BusinessPayload {
  name?: string
  slug?: string | null
  category?: string
  region?: string
  phone?: string | null
  whatsapp?: string | null
  website?: string | null
  instagram?: string | null
  address?: string | null
  lat?: number | null
  lng?: number | null
  description?: string
  features?: string[]
  photos?: string[]
  price_range?: string | null
  is_active?: boolean
}

function normalize(body: BusinessPayload) {
  const trimNullable = (v: string | null | undefined) => {
    if (v === null || v === undefined) return null
    const t = v.trim()
    return t === "" ? null : t
  }

  return {
    name: body.name?.trim(),
    slug: body.slug ? slugify(body.slug) : body.name ? slugify(body.name) : null,
    category: body.category,
    region: body.region,
    phone: trimNullable(body.phone),
    whatsapp: trimNullable(body.whatsapp),
    website: trimNullable(body.website),
    instagram: trimNullable(body.instagram),
    address: trimNullable(body.address),
    lat: body.lat ?? null,
    lng: body.lng ?? null,
    description: body.description?.trim() ?? "",
    features: Array.isArray(body.features) ? body.features.filter(Boolean) : [],
    photos: Array.isArray(body.photos) ? body.photos.filter(Boolean) : [],
    price_range: trimNullable(body.price_range ?? null),
    is_active: body.is_active ?? true,
  }
}

// GET — tüm işletmeler (admin görünümü, aktif/pasif dahil)
export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 })
  }
  return NextResponse.json({ businesses: data ?? [] })
}

// POST — yeni işletme
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  const body = (await request.json()) as BusinessPayload
  const payload = normalize(body)

  if (!payload.name || !payload.category || !payload.region) {
    return NextResponse.json(
      { error: "name, category ve region zorunludur" },
      { status: 400 }
    )
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("businesses")
    .insert(payload)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ business: data })
}

// PATCH — güncelle
export async function PATCH(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  const body = (await request.json()) as BusinessPayload & { id: string }
  if (!body.id) {
    return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  }

  const payload = normalize(body)
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("businesses")
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq("id", body.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ business: data })
}

// DELETE — kalıcı sil
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) {
    return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error } = await supabase.from("businesses").delete().eq("id", id)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
