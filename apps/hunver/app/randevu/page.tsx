"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase-browser"
import type { Service } from "@/lib/database.types"

interface TimeSlot {
  start: string
  end: string
  available: boolean
}

const DAYS_TR = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]
const MONTHS_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
]

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export default function RandevuPage() {
  const [step, setStep] = useState(1) // 1=hizmet, 2=tarih+saat, 3=bilgi, 4=onay
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Hizmetleri çek
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .then(({ data }) => {
        if (data) setServices(data)
      })
  }, [])

  // Slotları çek
  const fetchSlots = useCallback(async (date: string, serviceId: string) => {
    setSlotsLoading(true)
    setSelectedSlot(null)
    try {
      const res = await fetch(`/api/appointments?date=${date}&serviceId=${serviceId}`)
      const data = await res.json()
      setSlots(data.slots || [])
    } catch {
      setSlots([])
    } finally {
      setSlotsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedDate && selectedService) {
      fetchSlots(selectedDate, selectedService.id)
    }
  }, [selectedDate, selectedService, fetchSlots])

  // Takvim
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const startDay = monthStart.getDay()
  const daysInMonth = monthEnd.getDate()

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < startDay; i++) calendarDays.push(null)
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i)

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

  const handleDateClick = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (d < today) return
    setSelectedDate(formatDate(d))
  }

  // Form gönder
  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedSlot) return
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Ad ve telefon zorunludur.")
      return
    }

    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          customerName: form.name.trim(),
          customerPhone: form.phone.trim(),
          customerEmail: form.email.trim() || null,
          customerNote: form.note.trim() || null,
          date: selectedDate,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Bir hata oluştu.")
        return
      }

      setSuccess(true)
      setStep(4)
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 text-center md:mb-12">
          <p className="mb-2 font-serif text-sm italic tracking-wide text-[#C8A96A] md:text-base">
            Randevu
          </p>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            Seans Planla
          </h1>
          <p className="text-sm text-white/50 md:text-base">
            Hizmet seç, tarih ve saat belirle, hemen randevunu oluştur.
          </p>
        </div>

        {/* Steps indicator */}
        <div className="mb-8 flex items-center justify-center gap-2 md:mb-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  step >= s
                    ? "bg-[#C8A96A] text-[#0D0D0D]"
                    : "border border-white/10 text-white/30"
                )}
              >
                {step > s ? <Check className="size-4" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={cn(
                    "h-[2px] w-6 rounded-full md:w-10",
                    step > s ? "bg-[#C8A96A]" : "bg-white/10"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1 — Hizmet Seçimi */}
        {step === 1 && (
          <div className="space-y-3">
            <h2 className="mb-4 text-lg font-semibold text-white">Hizmet Seçin</h2>
            {services.length === 0 && (
              <p className="py-8 text-center text-sm text-white/40">
                Hizmetler yükleniyor...
              </p>
            )}
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service)
                  setStep(2)
                }}
                className={cn(
                  "w-full rounded-xl border p-4 text-left transition-all md:p-5",
                  selectedService?.id === service.id
                    ? "border-[#C8A96A]/50 bg-[#C8A96A]/[0.06]"
                    : "border-white/10 bg-[#141414] hover:border-[#C8A96A]/25"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white md:text-base">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-xs text-white/50 md:text-sm">
                      {service.description}
                    </p>
                  </div>
                  <div className="ml-4 shrink-0 text-right">
                    <span className="text-xs text-[#258989]">
                      {service.duration_minutes} dk
                    </span>
                    {service.price > 0 && (
                      <p className="mt-0.5 text-sm font-semibold text-[#C8A96A]">
                        {service.price} ₺
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2 — Tarih & Saat Seçimi */}
        {step === 2 && selectedService && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="mb-4 text-sm text-white/40 transition-colors hover:text-[#C8A96A]"
            >
              ← Hizmet Değiştir
            </button>

            <div className="mb-6 rounded-xl border border-white/10 bg-[#141414] p-4 md:p-5">
              <p className="text-xs text-white/40">Seçilen hizmet</p>
              <p className="text-sm font-semibold text-white">{selectedService.name}</p>
            </div>

            {/* Takvim */}
            <div className="mb-6 rounded-xl border border-white/10 bg-[#141414] p-4 md:p-5">
              <div className="mb-4 flex items-center justify-between">
                <button onClick={prevMonth} className="text-white/40 hover:text-white">
                  <ChevronLeft className="size-5" />
                </button>
                <h3 className="text-sm font-semibold text-white">
                  {MONTHS_TR[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button onClick={nextMonth} className="text-white/40 hover:text-white">
                  <ChevronRight className="size-5" />
                </button>
              </div>

              <div className="mb-2 grid grid-cols-7 gap-1">
                {DAYS_TR.map((d) => (
                  <div key={d} className="py-1 text-center text-[10px] font-medium text-white/30">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, i) => {
                  if (day === null) return <div key={`e-${i}`} />
                  const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  const dateStr = formatDate(d)
                  const isPast = d < today
                  const isSelected = selectedDate === dateStr
                  const isToday = formatDate(today) === dateStr

                  return (
                    <button
                      key={dateStr}
                      disabled={isPast}
                      onClick={() => handleDateClick(day)}
                      className={cn(
                        "aspect-square rounded-lg text-xs font-medium transition-all md:text-sm",
                        isPast && "cursor-not-allowed text-white/10",
                        !isPast && !isSelected && "text-white/60 hover:bg-white/5 hover:text-white",
                        isSelected && "bg-[#C8A96A] text-[#0D0D0D]",
                        isToday && !isSelected && "border border-[#258989]/30 text-[#258989]"
                      )}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Saat Slotları */}
            {selectedDate && (
              <div className="rounded-xl border border-white/10 bg-[#141414] p-4 md:p-5">
                <h3 className="mb-3 text-sm font-semibold text-white">Uygun Saatler</h3>

                {slotsLoading && (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="size-5 animate-spin text-[#C8A96A]" />
                  </div>
                )}

                {!slotsLoading && slots.length === 0 && (
                  <p className="py-4 text-center text-xs text-white/40">
                    Bu tarihte uygun saat bulunmuyor.
                  </p>
                )}

                {!slotsLoading && slots.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {slots.map((slot) => (
                      <button
                        key={slot.start}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "rounded-lg px-2 py-2.5 text-xs font-medium transition-all md:text-sm",
                          !slot.available && "cursor-not-allowed bg-white/[0.02] text-white/15 line-through",
                          slot.available &&
                            selectedSlot?.start !== slot.start &&
                            "border border-white/10 text-white/60 hover:border-[#C8A96A]/30 hover:text-white",
                          selectedSlot?.start === slot.start &&
                            "border border-[#C8A96A] bg-[#C8A96A]/10 text-[#C8A96A]"
                        )}
                      >
                        {slot.start}
                      </button>
                    ))}
                  </div>
                )}

                {selectedSlot && (
                  <button
                    onClick={() => setStep(3)}
                    className="mt-4 w-full rounded-lg bg-[#C8A96A] py-2.5 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a]"
                  >
                    Devam Et
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Bilgi Formu */}
        {step === 3 && selectedService && selectedDate && selectedSlot && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="mb-4 text-sm text-white/40 transition-colors hover:text-[#C8A96A]"
            >
              ← Tarih Değiştir
            </button>

            {/* Özet */}
            <div className="mb-6 rounded-xl border border-white/10 bg-[#141414] p-4 md:p-5">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-[10px] text-white/30">Hizmet</p>
                  <p className="text-xs font-semibold text-white">{selectedService.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30">Tarih</p>
                  <p className="text-xs font-semibold text-white">
                    {new Date(selectedDate + "T00:00").toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30">Saat</p>
                  <p className="text-xs font-semibold text-white">
                    {selectedSlot.start} - {selectedSlot.end}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 rounded-xl border border-white/10 bg-[#141414] p-4 md:p-5">
              <h3 className="text-sm font-semibold text-white">Bilgileriniz</h3>

              <div>
                <label className="mb-1 block text-xs text-white/40">
                  Ad Soyad <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Adınız Soyadınız"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-white/40">
                  Telefon <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="05XX XXX XX XX"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-white/40">E-posta</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="ornek@mail.com"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-white/40">Not</label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  placeholder="Eklemek istediğiniz bir not..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8A96A] py-3 text-sm font-semibold text-[#0D0D0D] transition-all hover:bg-[#d4b87a] disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  "Randevuyu Onayla"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4 — Başarılı */}
        {step === 4 && success && (
          <div className="rounded-xl border border-[#258989]/20 bg-[#258989]/[0.06] p-6 text-center md:p-8">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#258989]/20">
              <Check className="size-8 text-[#258989]" />
            </div>
            <h2 className="mb-2 text-lg font-bold text-white md:text-xl">
              Randevunuz Alındı!
            </h2>
            <p className="mb-1 text-sm text-white/60">
              <strong className="text-white">{selectedService?.name}</strong> için randevunuz oluşturuldu.
            </p>
            <p className="mb-6 text-sm text-white/60">
              {selectedDate &&
                new Date(selectedDate + "T00:00").toLocaleDateString("tr-TR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}{" "}
              — {selectedSlot?.start} - {selectedSlot?.end}
            </p>
            <p className="mb-6 text-xs text-white/40">
              En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/908503031559?text=${encodeURIComponent(
                  `Merhaba, ${selectedService?.name} için ${selectedDate} tarihinde ${selectedSlot?.start} saatine randevu aldım. İsmim: ${form.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.243-1.214l-.252-.149-2.868.852.852-2.868-.149-.252A8 8 0 1 1 12 20z" />
                </svg>
                WhatsApp ile Bildir
              </a>
              <button
                onClick={() => {
                  setStep(1)
                  setSelectedService(null)
                  setSelectedDate(null)
                  setSelectedSlot(null)
                  setForm({ name: "", phone: "", email: "", note: "" })
                  setSuccess(false)
                }}
                className="text-sm text-white/40 transition-colors hover:text-[#C8A96A]"
              >
                Yeni Randevu Al
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
