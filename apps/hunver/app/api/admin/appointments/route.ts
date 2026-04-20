import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"

const ADMIN_PIN = "1559"

function checkAuth(request: Request) {
  const pin = request.headers.get("x-admin-pin")
  return pin === ADMIN_PIN
}

// GET — tüm randevuları getir
export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from("appointments")
    .select("*, services(name)")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true })

  if (error) {
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 })
  }

  return NextResponse.json({ appointments: data })
}

// PATCH — randevu durumunu güncelle
export async function PATCH(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
  }

  const { id, status } = await request.json()

  if (!id || !status) {
    return NextResponse.json({ error: "id ve status gerekli" }, { status: 400 })
  }

  const validStatuses = ["pending", "confirmed", "cancelled", "completed"]
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 })
  }

  const supabase = createServiceClient()

  const { error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: "Güncelleme başarısız" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
