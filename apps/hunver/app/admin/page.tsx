"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Loader2, Check, X, Clock, ChevronLeft, ChevronRight } from "lucide-react"

interface Appointment {
  id: string
  customer_name: string
  customer_phone: string
  customer_email: string | null
  customer_note: string | null
  date: string
  start_time: string
  end_time: string
  status: string
  created_at: string
  services?: { name: string }
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Bekliyor", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: Clock },
  confirmed: { label: "Onaylandı", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: Check },
  cancelled: { label: "İptal", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: X },
  completed: { label: "Tamamlandı", color: "text-[#258989] bg-[#258989]/10 border-[#258989]/20", icon: Check },
}

const ADMIN_PIN = "1559" // Basit PIN — üretimde Supabase Auth kullan

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [weekOffset, setWeekOffset] = useState(0)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/appointments", {
        headers: { "x-admin-pin": ADMIN_PIN },
      })
      if (res.ok) {
        const data = await res.json()
        setAppointments(data.appointments || [])
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchAppointments()
  }, [authed, fetchAppointments])

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/appointments", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-pin": ADMIN_PIN,
      },
      body: JSON.stringify({ id, status }),
    })
    fetchAppointments()
  }

  // Week view dates
  const getWeekDates = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7) // Pazartesi başlangıç
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek)
      d.setDate(startOfWeek.getDate() + i)
      return d
    })
  }

  const weekDates = getWeekDates()
  const filteredAppointments =
    filter === "all" ? appointments : appointments.filter((a) => a.status === filter)

  // PIN girişi
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0D0D0D] px-4">
        <div className="w-full max-w-xs rounded-xl border border-white/10 bg-[#141414] p-6 text-center">
          <h1 className="mb-4 text-lg font-bold text-white">Admin Panel</h1>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && pin === ADMIN_PIN) setAuthed(true)
            }}
            placeholder="PIN giriniz"
            className="mb-3 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
          />
          <button
            onClick={() => {
              if (pin === ADMIN_PIN) setAuthed(true)
            }}
            className="w-full rounded-lg bg-[#C8A96A] py-2.5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a]"
          >
            Giriş
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-16 md:pt-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white md:text-2xl">Randevu Yönetimi</h1>
            <p className="mt-1 text-sm text-white/40">
              {appointments.filter((a) => a.status === "pending").length} bekleyen randevu
            </p>
          </div>
          <button
            onClick={fetchAppointments}
            disabled={loading}
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/50 transition-all hover:border-[#C8A96A]/30 hover:text-white"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Yenile"}
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { key: "all", label: "Tümü" },
            { key: "pending", label: "Bekleyen" },
            { key: "confirmed", label: "Onaylı" },
            { key: "cancelled", label: "İptal" },
            { key: "completed", label: "Tamamlanan" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                filter === f.key
                  ? "bg-[#C8A96A]/15 text-[#C8A96A]"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              {f.label}
              {f.key !== "all" && (
                <span className="ml-1 text-[10px]">
                  ({appointments.filter((a) => a.status === f.key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Week navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={() => setWeekOffset((w) => w - 1)} className="text-white/40 hover:text-white">
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex gap-1">
            {weekDates.map((d) => (
              <div
                key={d.toISOString()}
                className={cn(
                  "rounded-lg px-2 py-1 text-center text-[10px] md:px-3 md:text-xs",
                  d.toDateString() === new Date().toDateString()
                    ? "bg-[#C8A96A]/15 font-semibold text-[#C8A96A]"
                    : "text-white/30"
                )}
              >
                <div>{["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"][d.getDay()]}</div>
                <div className="font-semibold">{d.getDate()}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setWeekOffset((w) => w + 1)} className="text-white/40 hover:text-white">
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Appointments list */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-6 animate-spin text-[#C8A96A]" />
          </div>
        )}

        {!loading && filteredAppointments.length === 0 && (
          <p className="py-12 text-center text-sm text-white/30">
            Randevu bulunamadı.
          </p>
        )}

        {!loading && filteredAppointments.length > 0 && (
          <div className="space-y-3">
            {filteredAppointments
              .sort((a, b) => `${a.date}${a.start_time}`.localeCompare(`${b.date}${b.start_time}`))
              .map((apt) => {
                const st = STATUS_MAP[apt.status] ?? STATUS_MAP.pending!
                return (
                  <div
                    key={apt.id}
                    className="rounded-xl border border-white/10 bg-[#141414] p-4 md:p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white">
                            {apt.customer_name}
                          </h3>
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                              st.color
                            )}
                          >
                            {st.label}
                          </span>
                        </div>
                        <p className="text-xs text-white/50">
                          {apt.services?.name || "Hizmet"} —{" "}
                          {new Date(apt.date + "T00:00").toLocaleDateString("tr-TR", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          {apt.start_time.slice(0, 5)} - {apt.end_time.slice(0, 5)}
                        </p>
                        <p className="text-xs text-white/30">
                          Tel: {apt.customer_phone}
                          {apt.customer_email && ` — ${apt.customer_email}`}
                        </p>
                        {apt.customer_note && (
                          <p className="text-xs italic text-white/20">
                            &ldquo;{apt.customer_note}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-1.5">
                        {apt.status === "pending" && (
                          <>
                            <button
                              onClick={() => updateStatus(apt.id, "confirmed")}
                              className="rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400 transition-colors hover:bg-green-500/20"
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => updateStatus(apt.id, "cancelled")}
                              className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                            >
                              İptal
                            </button>
                          </>
                        )}
                        {apt.status === "confirmed" && (
                          <button
                            onClick={() => updateStatus(apt.id, "completed")}
                            className="rounded-lg bg-[#258989]/10 px-3 py-1.5 text-xs font-medium text-[#258989] transition-colors hover:bg-[#258989]/20"
                          >
                            Tamamla
                          </button>
                        )}
                        {/* WhatsApp link */}
                        <a
                          href={`https://wa.me/90${apt.customer_phone.replace(/\D/g, "").replace(/^0/, "")}?text=${encodeURIComponent(
                            apt.status === "pending"
                              ? `Merhaba ${apt.customer_name}, randevunuz onaylanmıştır. Tarih: ${apt.date}, Saat: ${apt.start_time.slice(0, 5)}`
                              : `Merhaba ${apt.customer_name}, randevunuz hakkında bilgilendirme.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                        >
                          WA
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>
    </main>
  )
}
