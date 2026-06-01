import { NextResponse } from "next/server"
import { requireServiceClient as createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized } from "@/lib/admin-auth-server"

// Bloklanmış günler (tatil / kapalı gün) yönetimi.

// GET — tüm bloklanmış günler (tarihe göre)
export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .order("date", { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ blocked: data ?? [] })
}

// POST — gün blokla
export async function POST(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const body = (await request.json()) as { date?: string; reason?: string | null }
  if (!body.date) {
    return NextResponse.json({ error: "date zorunludur" }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from("blocked_dates")
    .insert({ date: body.date, reason: body.reason?.trim() || null })
    .select()
    .single()

  if (error) {
    // unique ihlali (zaten bloklu) okunabilir mesaj
    if (error.code === "23505") {
      return NextResponse.json({ error: "Bu tarih zaten bloklu" }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ blocked: data })
}

// DELETE — bloğu kaldır
export async function DELETE(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "id gerekli" }, { status: 400 })

  const supabase = createServiceClient()
  const { error } = await supabase.from("blocked_dates").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
