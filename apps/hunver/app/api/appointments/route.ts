import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"

// GET — boş slotları getir (tarih + hizmet bazlı)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get("date")
  const serviceId = searchParams.get("serviceId")

  if (!date) {
    return NextResponse.json({ error: "date parametresi gerekli" }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Hangi gün?
  const dayOfWeek = new Date(date).getDay()

  // O gün müsait mi?
  const { data: availability } = await supabase
    .from("availability")
    .select("*")
    .eq("day_of_week", dayOfWeek)
    .eq("is_active", true)

  if (!availability || availability.length === 0) {
    return NextResponse.json({ slots: [], message: "Bu gün müsait değil" })
  }

  // Bloklanmış gün mü?
  const { data: blocked } = await supabase
    .from("blocked_dates")
    .select("id")
    .eq("date", date)

  if (blocked && blocked.length > 0) {
    return NextResponse.json({ slots: [], message: "Bu gün bloklanmış" })
  }

  // Hizmet süresini al
  let durationMinutes = 60
  if (serviceId) {
    const { data: service } = await supabase
      .from("services")
      .select("duration_minutes")
      .eq("id", serviceId)
      .single()
    if (service) durationMinutes = service.duration_minutes
  }

  // O günün mevcut randevularını al
  const { data: existingAppointments } = await supabase
    .from("appointments")
    .select("start_time, end_time")
    .eq("date", date)
    .in("status", ["pending", "confirmed"])

  // Slotları oluştur
  const slots: { start: string; end: string; available: boolean }[] = []

  for (const avail of availability) {
    const [startH, startM] = avail.start_time.split(":").map(Number)
    const [endH, endM] = avail.end_time.split(":").map(Number)
    const startMinutes = startH * 60 + startM
    const endMinutes = endH * 60 + endM

    for (let m = startMinutes; m + durationMinutes <= endMinutes; m += 60) {
      const slotStart = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`
      const slotEndM = m + durationMinutes
      const slotEnd = `${String(Math.floor(slotEndM / 60)).padStart(2, "0")}:${String(slotEndM % 60).padStart(2, "0")}`

      // Çakışma kontrolü
      const isBooked = (existingAppointments ?? []).some((apt) => {
        const aptStart = apt.start_time.slice(0, 5)
        const aptEnd = apt.end_time.slice(0, 5)
        return slotStart < aptEnd && slotEnd > aptStart
      })

      slots.push({ start: slotStart, end: slotEnd, available: !isBooked })
    }
  }

  return NextResponse.json({ slots })
}

// POST — yeni randevu oluştur
export async function POST(request: Request) {
  const body = await request.json()
  const { serviceId, customerName, customerPhone, customerEmail, customerNote, date, startTime, endTime } = body

  if (!serviceId || !customerName || !customerPhone || !date || !startTime || !endTime) {
    return NextResponse.json({ error: "Eksik bilgi" }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Çakışma kontrolü
  const { data: conflicts } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", date)
    .in("status", ["pending", "confirmed"])
    .lt("start_time", endTime)
    .gt("end_time", startTime)

  if (conflicts && conflicts.length > 0) {
    return NextResponse.json({ error: "Bu saat dolu, başka bir zaman seçin." }, { status: 409 })
  }

  // Randevu oluştur
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      service_id: serviceId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || null,
      customer_note: customerNote || null,
      date,
      start_time: startTime,
      end_time: endTime,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: "Randevu oluşturulamadı" }, { status: 500 })
  }

  return NextResponse.json({ appointment: data })
}
