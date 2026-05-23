"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { CalendarDays, Store, Clock, ArrowRight } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import { PageHeader } from "@/components/admin/ui"

export default function AdminDashboardPage() {
  const { authedFetch } = useAdminAuth()
  const [pending, setPending] = useState<number | null>(null)
  const [businesses, setBusinesses] = useState<number | null>(null)

  const load = useCallback(async () => {
    const [aptRes, bizRes] = await Promise.all([
      authedFetch("/api/admin/appointments"),
      authedFetch("/api/admin/businesses"),
    ])
    if (aptRes.ok) {
      const d = await aptRes.json()
      setPending(
        (d.appointments ?? []).filter((a: { status: string }) => a.status === "pending").length
      )
    }
    if (bizRes.ok) {
      const d = await bizRes.json()
      setBusinesses((d.businesses ?? []).length)
    }
  }, [authedFetch])

  useEffect(() => {
    load()
  }, [load])

  return (
    <>
      <PageHeader title="Panel" subtitle="Çıralı / Hunver yönetim paneli" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          href="/admin/randevular"
          icon={CalendarDays}
          label="Bekleyen Randevu"
          value={pending}
          hint="Randevuları yönet"
        />
        <StatCard
          href="/admin/rehber"
          icon={Store}
          label="İşletme Sayısı"
          value={businesses}
          hint="Rehberi düzenle"
        />
        <StatCard
          href="/admin/musaitlik"
          icon={Clock}
          label="Müsaitlik"
          value={null}
          hint="Saatleri ve kapalı günleri düzenle"
        />
      </div>
    </>
  )
}

function StatCard({
  href,
  icon: Icon,
  label,
  value,
  hint,
  disabled,
}: {
  href: string
  icon: typeof CalendarDays
  label: string
  value: number | null
  hint: string
  disabled?: boolean
}) {
  const inner = (
    <div className="group rounded-2xl border border-white/10 bg-[#141414] p-5 transition-colors hover:border-[#C8A96A]/30">
      <div className="mb-4 flex items-center justify-between">
        <Icon className="size-5 text-[#C8A96A]" />
        {!disabled && (
          <ArrowRight className="size-4 text-white/20 transition-transform group-hover:translate-x-0.5 group-hover:text-[#C8A96A]" />
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value ?? "—"}</div>
      <div className="mt-1 text-sm text-white/50">{label}</div>
      <div className="mt-3 text-xs text-white/30">{hint}</div>
    </div>
  )
  if (disabled) return <div className="opacity-50">{inner}</div>
  return <Link href={href}>{inner}</Link>
}
