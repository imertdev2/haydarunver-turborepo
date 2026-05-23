"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import type { Service } from "@/lib/database.types"
import {
  PageHeader,
  Card,
  Field,
  Input,
  Textarea,
  Toggle,
  Button,
  IconBtn,
  EmptyState,
} from "@/components/admin/ui"

interface FormState {
  id: string | null
  name: string
  description: string
  duration_minutes: string
  price: string
  is_active: boolean
}

const emptyForm: FormState = {
  id: null,
  name: "",
  description: "",
  duration_minutes: "60",
  price: "0",
  is_active: true,
}

function toForm(s: Service): FormState {
  return {
    id: s.id,
    name: s.name,
    description: s.description,
    duration_minutes: String(s.duration_minutes),
    price: String(s.price),
    is_active: s.is_active,
  }
}

export default function AdminHizmetlerPage() {
  const { authedFetch } = useAdminAuth()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<FormState>(emptyForm)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authedFetch("/api/admin/services")
      if (res.ok) setServices((await res.json()).services ?? [])
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => {
    load()
  }, [load])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.name.trim()) {
      setError("Hizmet adı zorunludur.")
      return
    }
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        description: form.description,
        duration_minutes: Number(form.duration_minutes) || 60,
        price: Number(form.price) || 0,
        is_active: form.is_active,
      }
      const res = form.id
        ? await authedFetch("/api/admin/services", {
            method: "PATCH",
            body: JSON.stringify({ id: form.id, ...payload }),
          })
        : await authedFetch("/api/admin/services", {
            method: "POST",
            body: JSON.stringify(payload),
          })
      if (!res.ok) {
        setError((await res.json().catch(() => ({}))).error || "Kayıt başarısız")
        return
      }
      setForm(emptyForm)
      load()
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (s: Service) => {
    await authedFetch("/api/admin/services", {
      method: "PATCH",
      body: JSON.stringify({ id: s.id, is_active: !s.is_active }),
    })
    load()
  }

  const remove = async (s: Service) => {
    if (
      !confirm(
        `"${s.name}" silinsin mi? Bu hizmete bağlı tüm randevular da silinir. Sadece gizlemek için "pasif" yapın.`
      )
    )
      return
    await authedFetch(`/api/admin/services?id=${s.id}`, { method: "DELETE" })
    load()
  }

  return (
    <>
      <PageHeader
        title="Hizmetler"
        subtitle={`${services.length} hizmet · randevu akışını besler`}
      />

      {/* Form */}
      <Card className="mb-10">
        <form onSubmit={submit}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {form.id ? "Hizmeti Düzenle" : "Yeni Hizmet Ekle"}
            </h2>
            {form.id && (
              <button
                type="button"
                onClick={() => setForm(emptyForm)}
                className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white"
              >
                <X className="size-3" /> Yeni kayıt
              </button>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Hizmet Adı" required>
              <Input
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Örn: Nefes Terapisi"
              />
            </Field>
            <Field label="Süre (dakika)">
              <Input
                type="number"
                value={form.duration_minutes}
                onChange={(v) => setForm((f) => ({ ...f, duration_minutes: v }))}
                placeholder="60"
              />
            </Field>
            <Field label="Fiyat (₺)">
              <Input
                type="number"
                value={form.price}
                onChange={(v) => setForm((f) => ({ ...f, price: v }))}
                placeholder="0"
              />
            </Field>
            <Field label="" />
            <Field label="Açıklama" full>
              <Textarea
                value={form.description}
                onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                placeholder="Kısa açıklama..."
              />
            </Field>
            <Field full>
              <Toggle
                checked={form.is_active}
                onChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
                label="Aktif (randevu sayfasında görünsün)"
              />
            </Field>
          </div>

          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

          <div className="mt-5 flex items-center gap-2">
            <Button type="submit" loading={saving}>
              {!form.id && !saving && <Plus className="size-4" />}
              {form.id ? "Güncelle" : "Ekle"}
            </Button>
            {form.id && (
              <Button variant="ghost" onClick={() => setForm(emptyForm)}>
                Vazgeç
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Liste */}
      {services.length === 0 ? (
        <EmptyState loading={loading} message="Henüz hizmet yok." />
      ) : (
        <div className="space-y-2">
          {services.map((s) => (
            <div
              key={s.id}
              className={cn(
                "rounded-xl border bg-[#141414] p-3 md:p-4",
                s.is_active ? "border-white/10" : "border-white/5 opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">{s.name}</h3>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/55">
                      {s.duration_minutes} dk
                    </span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/70">
                      {s.price > 0 ? `${s.price} ₺` : "Ücretsiz"}
                    </span>
                  </div>
                  {s.description && (
                    <p className="mt-1 truncate text-xs text-white/40">{s.description}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <IconBtn
                    title={s.is_active ? "Pasifleştir" : "Aktifleştir"}
                    onClick={() => toggleActive(s)}
                  >
                    {s.is_active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  </IconBtn>
                  <IconBtn title="Düzenle" onClick={() => setForm(toForm(s))}>
                    <Pencil className="size-4" />
                  </IconBtn>
                  <IconBtn title="Sil" onClick={() => remove(s)} danger>
                    <Trash2 className="size-4" />
                  </IconBtn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
