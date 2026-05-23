import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized } from "@/lib/admin-auth-server"

// Haftalık müsaitlik saatleri (availability tablosu) yönetimi.

interface AvailabilityPayload {
  id?: string
  day_of_week?: number
  start_time?: string
  end_time?: string
  is_active?: boolean
}

// GET — tüm haftalık satırlar (gün sırasına göre)
export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("availability")
    .select("*")
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ availability: data ?? [] })
}

// POST — yeni müsaitlik aralığı
export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const body = (await request.json()) as AvailabilityPayload
  if (
    body.day_of_week === undefined ||
    !body.start_time ||
    !body.end_time
  ) {
    return NextResponse.json(
      { error: "day_of_week, start_time ve end_time zorunludur" },
      { status: 400 }
    )
  }
  if (body.start_time >= body.end_time) {
    return NextResponse.json(
      { error: "Başlangıç saati bitişten önce olmalı" },
      { status: 400 }
    )
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("availability")
    .insert({
      day_of_week: body.day_of_week,
      start_time: body.start_time,
      end_time: body.end_time,
      is_active: body.is_active ?? true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ availability: data })
}

// PATCH — güncelle
export async function PATCH(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const body = (await request.json()) as AvailabilityPayload
  if (!body.id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })
  if (body.start_time && body.end_time && body.start_time >= body.end_time) {
    return NextResponse.json(
      { error: "Başlangıç saati bitişten önce olmalı" },
      { status: 400 }
    )
  }

  const update: Record<string, unknown> = {}
  if (body.day_of_week !== undefined) update.day_of_week = body.day_of_week
  if (body.start_time) update.start_time = body.start_time
  if (body.end_time) update.end_time = body.end_time
  if (body.is_active !== undefined) update.is_active = body.is_active

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("availability")
    .update(update)
    .eq("id", body.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ availability: data })
}

// DELETE — sil
export async function DELETE(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })

  const supabase = createServiceClient()
  const { error } = await supabase.from("availability").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
