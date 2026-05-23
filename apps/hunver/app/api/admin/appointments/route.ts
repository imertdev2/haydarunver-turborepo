import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"
import { sendCustomerStatusEmail } from "@/lib/email"
import { buildIcs } from "@/lib/ics"

function checkAuth(request: Request) {
  const expected = process.env.ADMIN_PIN
  if (!expected) {
    console.warn("[admin] ADMIN_PIN env not set — refusing all requests")
    return false
  }
  const pin = request.headers.get("x-admin-pin")
  return pin === expected
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

  const { data: updated, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select("*, services(name)")
    .single()

  if (error || !updated) {
    return NextResponse.json({ error: "Güncelleme başarısız" }, { status: 500 })
  }

  // Müşteriye status bildirimi (sadece confirmed/cancelled, email varsa)
  if ((status === "confirmed" || status === "cancelled") && updated.customer_email) {
    const serviceName = (updated.services as { name: string } | null)?.name ?? "Hizmet"
    try {
      const ics =
        status === "confirmed"
          ? buildIcs({
              uid: `${updated.id}@hunver`,
              title: `${serviceName} — Randevunuz`,
              description: "Onaylanmış randevu",
              date: updated.date,
              startTime: updated.start_time.slice(0, 5),
              endTime: updated.end_time.slice(0, 5),
              organizerName: "Haydar Ünver",
              organizerEmail: process.env.ADMIN_EMAIL,
              attendeeName: updated.customer_name,
              attendeeEmail: updated.customer_email,
            })
          : undefined

      await sendCustomerStatusEmail(
        {
          serviceName,
          customerName: updated.customer_name,
          customerPhone: updated.customer_phone,
          customerEmail: updated.customer_email,
          customerNote: updated.customer_note,
          date: updated.date,
          startTime: updated.start_time.slice(0, 5),
          endTime: updated.end_time.slice(0, 5),
        },
        status,
        ics
      )
    } catch (e) {
      console.error("[admin appointments] customer email failed:", e)
    }
  }

  return NextResponse.json({ success: true })
}
