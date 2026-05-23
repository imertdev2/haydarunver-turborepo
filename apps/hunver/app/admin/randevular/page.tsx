"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Check, X, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import {
  PageHeader,
  FilterTabs,
  Button,
  EmptyState,
  Spinner,
} from "@/components/admin/ui"

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

export default function AdminAppointmentsPage() {
  const { authedFetch } = useAdminAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const [weekOffset, setWeekOffset] = useState(0)

  const fetchAppointments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authedFetch("/api/admin/appointments")
      if (res.ok) {
        const data = await res.json()
        setAppointments(data.appointments || [])
      }
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const updateStatus = async (id: string, status: string) => {
    await authedFetch("/api/admin/appointments", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
    })
    fetchAppointments()
  }

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

  return (
    <>
      <PageHeader
        title="Randevu Yönetimi"
        subtitle={`${appointments.filter((a) => a.status === "pending").length} bekleyen randevu`}
        action={
          <Button variant="ghost" onClick={fetchAppointments} loading={loading}>
            Yenile
          </Button>
        }
      />

      <div className="mb-6">
        <FilterTabs
          value={filter}
          onChange={setFilter}
          tabs={[
            { key: "all", label: "Tümü" },
            { key: "pending", label: "Bekleyen", count: appointments.filter((a) => a.status === "pending").length },
            { key: "confirmed", label: "Onaylı", count: appointments.filter((a) => a.status === "confirmed").length },
            { key: "cancelled", label: "İptal", count: appointments.filter((a) => a.status === "cancelled").length },
            { key: "completed", label: "Tamamlanan", count: appointments.filter((a) => a.status === "completed").length },
          ]}
        />
      </div>

      {/* Hafta navigasyonu */}
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

      {loading && <Spinner />}

      {!loading && filteredAppointments.length === 0 && (
        <EmptyState message="Randevu bulunamadı." />
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
                        <h3 className="text-sm font-semibold text-white">{apt.customer_name}</h3>
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
    </>
  )
}
