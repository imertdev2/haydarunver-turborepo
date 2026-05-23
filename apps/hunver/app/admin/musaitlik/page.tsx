"use client"

import { useCallback, useEffect, useState } from "react"
import { Plus, Trash2, Check } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import type { Availability, BlockedDate } from "@/lib/database.types"
import {
  PageHeader,
  Card,
  Field,
  Input,
  Select,
  Toggle,
  Button,
  IconBtn,
  EmptyState,
} from "@/components/admin/ui"

const DAYS = [
  { value: "1", label: "Pazartesi" },
  { value: "2", label: "Salı" },
  { value: "3", label: "Çarşamba" },
  { value: "4", label: "Perşembe" },
  { value: "5", label: "Cuma" },
  { value: "6", label: "Cumartesi" },
  { value: "0", label: "Pazar" },
]

function dayLabel(d: number) {
  return DAYS.find((x) => Number(x.value) === d)?.label ?? "?"
}

export default function AdminMusaitlikPage() {
  const { authedFetch } = useAdminAuth()
  const [rows, setRows] = useState<Availability[]>([])
  const [blocked, setBlocked] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(false)

  // Yeni müsaitlik formu
  const [newDay, setNewDay] = useState("1")
  const [newStart, setNewStart] = useState("09:00")
  const [newEnd, setNewEnd] = useState("18:00")
  const [availError, setAvailError] = useState("")

  // Yeni blok formu
  const [blockDate, setBlockDate] = useState("")
  const [blockReason, setBlockReason] = useState("")
  const [blockError, setBlockError] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [aRes, bRes] = await Promise.all([
        authedFetch("/api/admin/availability"),
        authedFetch("/api/admin/blocked-dates"),
      ])
      if (aRes.ok) setRows((await aRes.json()).availability ?? [])
      if (bRes.ok) setBlocked((await bRes.json()).blocked ?? [])
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => {
    load()
  }, [load])

  const addAvailability = async () => {
    setAvailError("")
    const res = await authedFetch("/api/admin/availability", {
      method: "POST",
      body: JSON.stringify({
        day_of_week: Number(newDay),
        start_time: newStart,
        end_time: newEnd,
      }),
    })
    if (!res.ok) {
      setAvailError((await res.json().catch(() => ({}))).error || "Eklenemedi")
      return
    }
    load()
  }

  const patchAvailability = async (id: string, patch: Partial<Availability>) => {
    await authedFetch("/api/admin/availability", {
      method: "PATCH",
      body: JSON.stringify({ id, ...patch }),
    })
    load()
  }

  const deleteAvailability = async (id: string) => {
    if (!confirm("Bu aralık silinsin mi?")) return
    await authedFetch(`/api/admin/availability?id=${id}`, { method: "DELETE" })
    load()
  }

  const addBlocked = async () => {
    setBlockError("")
    if (!blockDate) {
      setBlockError("Tarih seçin")
      return
    }
    const res = await authedFetch("/api/admin/blocked-dates", {
      method: "POST",
      body: JSON.stringify({ date: blockDate, reason: blockReason }),
    })
    if (!res.ok) {
      setBlockError((await res.json().catch(() => ({}))).error || "Eklenemedi")
      return
    }
    setBlockDate("")
    setBlockReason("")
    load()
  }

  const deleteBlocked = async (id: string) => {
    await authedFetch(`/api/admin/blocked-dates?id=${id}`, { method: "DELETE" })
    load()
  }

  return (
    <>
      <PageHeader
        title="Müsaitlik"
        subtitle="Haftalık çalışma saatleri ve kapalı günler"
        action={
          <Button variant="ghost" onClick={load} loading={loading}>
            Yenile
          </Button>
        }
      />

      {/* Haftalık saatler */}
      <Card className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-white">Haftalık Çalışma Saatleri</h2>

        {rows.length === 0 ? (
          <EmptyState loading={loading} message="Henüz aralık yok." />
        ) : (
          <div className="mb-5 space-y-2">
            {rows.map((r) => (
              <div
                key={r.id}
                className="flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
              >
                <span className="w-24 text-sm text-white">{dayLabel(r.day_of_week)}</span>
                <input
                  type="time"
                  value={r.start_time.slice(0, 5)}
                  onChange={(e) => patchAvailability(r.id, { start_time: e.target.value })}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-sm text-white focus:border-[#C8A96A]/40 focus:outline-none"
                />
                <span className="text-white/30">—</span>
                <input
                  type="time"
                  value={r.end_time.slice(0, 5)}
                  onChange={(e) => patchAvailability(r.id, { end_time: e.target.value })}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-sm text-white focus:border-[#C8A96A]/40 focus:outline-none"
                />
                <div className="ml-auto flex items-center gap-3">
                  <Toggle
                    checked={r.is_active}
                    onChange={(v) => patchAvailability(r.id, { is_active: v })}
                    label="Aktif"
                  />
                  <IconBtn title="Sil" onClick={() => deleteAvailability(r.id)} danger>
                    <Trash2 className="size-4" />
                  </IconBtn>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yeni aralık */}
        <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-4">
          <Field label="Gün">
            <Select value={newDay} onChange={setNewDay} options={DAYS} />
          </Field>
          <Field label="Başlangıç">
            <Input type="time" value={newStart} onChange={setNewStart} />
          </Field>
          <Field label="Bitiş">
            <Input type="time" value={newEnd} onChange={setNewEnd} />
          </Field>
          <div className="flex items-end">
            <Button onClick={addAvailability}>
              <Plus className="size-4" /> Ekle
            </Button>
          </div>
        </div>
        {availError && <p className="mt-2 text-xs text-red-400">{availError}</p>}
      </Card>

      {/* Kapalı günler */}
      <Card>
        <h2 className="mb-4 text-sm font-semibold text-white">Kapalı Günler (Tatil / İzin)</h2>

        {blocked.length === 0 ? (
          <EmptyState loading={loading} message="Kapalı gün yok." />
        ) : (
          <div className="mb-5 space-y-2">
            {blocked.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
              >
                <span className="text-sm font-medium text-white">
                  {new Date(b.date + "T00:00").toLocaleDateString("tr-TR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                {b.reason && <span className="text-xs text-white/40">— {b.reason}</span>}
                <IconBtn title="Kaldır" onClick={() => deleteBlocked(b.id)} danger>
                  <Trash2 className="size-4" />
                </IconBtn>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
          <Field label="Tarih">
            <Input type="date" value={blockDate} onChange={setBlockDate} />
          </Field>
          <Field label="Sebep (opsiyonel)">
            <Input value={blockReason} onChange={setBlockReason} placeholder="Tatil, izin..." />
          </Field>
          <div className="flex items-end">
            <Button onClick={addBlocked}>
              <Check className="size-4" /> Blokla
            </Button>
          </div>
        </div>
        {blockError && <p className="mt-2 text-xs text-red-400">{blockError}</p>}
      </Card>
    </>
  )
}
