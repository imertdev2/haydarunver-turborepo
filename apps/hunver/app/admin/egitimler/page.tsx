"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import type { Training } from "@/lib/database.types"
import {
  PageHeader,
  Card,
  Field,
  Input,
  Toggle,
  Button,
  IconBtn,
  EmptyState,
} from "@/components/admin/ui"

interface FormState {
  id: string | null
  title: string
  image_src: string
  image_alt: string
  is_active: boolean
  sort_order: string
}

const emptyForm: FormState = {
  id: null,
  title: "",
  image_src: "",
  image_alt: "",
  is_active: true,
  sort_order: "0",
}

function toForm(t: Training): FormState {
  return {
    id: t.id,
    title: t.title,
    image_src: t.image_src,
    image_alt: t.image_alt,
    is_active: t.is_active,
    sort_order: String(t.sort_order),
  }
}

export default function AdminEgitimlerPage() {
  const { authedFetch } = useAdminAuth()
  const [items, setItems] = useState<Training[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<FormState>(emptyForm)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authedFetch("/api/admin/trainings")
      if (res.ok) setItems((await res.json()).trainings ?? [])
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
    if (!form.title.trim()) return setError("Başlık zorunludur.")
    setSaving(true)
    try {
      const payload = {
        title: form.title,
        image_src: form.image_src,
        image_alt: form.image_alt || form.title,
        is_active: form.is_active,
        sort_order: Number(form.sort_order) || 0,
      }
      const res = form.id
        ? await authedFetch("/api/admin/trainings", {
            method: "PATCH",
            body: JSON.stringify({ id: form.id, ...payload }),
          })
        : await authedFetch("/api/admin/trainings", {
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

  const toggleActive = async (t: Training) => {
    await authedFetch("/api/admin/trainings", {
      method: "PATCH",
      body: JSON.stringify({ ...toForm(t), id: t.id, is_active: !t.is_active, sort_order: t.sort_order }),
    })
    load()
  }

  const remove = async (t: Training) => {
    if (!confirm(`"${t.title}" silinsin mi?`)) return
    await authedFetch(`/api/admin/trainings?id=${t.id}`, { method: "DELETE" })
    load()
  }

  return (
    <>
      <PageHeader
        title="Eğitimler"
        subtitle={`${items.length} eğitim`}
        action={
          <a href="/egitimler" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 underline-offset-4 hover:text-[#C8A96A] hover:underline">
            Public sayfayı aç →
          </a>
        }
      />

      <Card className="mb-10">
        <form onSubmit={submit}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {form.id ? "Eğitimi Düzenle" : "Yeni Eğitim"}
            </h2>
            {form.id && (
              <button type="button" onClick={() => setForm(emptyForm)} className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white">
                <X className="size-3" /> Yeni kayıt
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Başlık" required>
              <Input value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            </Field>
            <Field label="Sıra">
              <Input type="number" value={form.sort_order} onChange={(v) => setForm((f) => ({ ...f, sort_order: v }))} />
            </Field>
            <Field label="Görsel URL" full>
              <Input value={form.image_src} onChange={(v) => setForm((f) => ({ ...f, image_src: v }))} placeholder="/images/..." />
            </Field>
            <Field label="Görsel açıklaması (alt)" full>
              <Input value={form.image_alt} onChange={(v) => setForm((f) => ({ ...f, image_alt: v }))} placeholder="Boş bırakılırsa başlık kullanılır" />
            </Field>
            <Field full>
              <Toggle checked={form.is_active} onChange={(v) => setForm((f) => ({ ...f, is_active: v }))} label="Aktif" />
            </Field>
          </div>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          <div className="mt-5 flex items-center gap-2">
            <Button type="submit" loading={saving}>
              {!form.id && !saving && <Plus className="size-4" />}
              {form.id ? "Güncelle" : "Ekle"}
            </Button>
            {form.id && <Button variant="ghost" onClick={() => setForm(emptyForm)}>Vazgeç</Button>}
          </div>
        </form>
      </Card>

      {items.length === 0 ? (
        <EmptyState loading={loading} message="Henüz eğitim yok." />
      ) : (
        <div className="space-y-2">
          {items.map((t) => (
            <div key={t.id} className={cn("flex items-center gap-3 rounded-xl border bg-[#141414] p-3", t.is_active ? "border-white/10" : "border-white/5 opacity-60")}>
              {t.image_src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.image_src} alt={t.image_alt} className="size-12 shrink-0 rounded-lg object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-white">{t.title}</h3>
                <p className="truncate text-xs text-white/30">{t.image_src || "—"}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconBtn title={t.is_active ? "Pasifleştir" : "Aktifleştir"} onClick={() => toggleActive(t)}>
                  {t.is_active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </IconBtn>
                <IconBtn title="Düzenle" onClick={() => setForm(toForm(t))}>
                  <Pencil className="size-4" />
                </IconBtn>
                <IconBtn title="Sil" onClick={() => remove(t)} danger>
                  <Trash2 className="size-4" />
                </IconBtn>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
