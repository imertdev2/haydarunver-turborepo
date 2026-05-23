"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Plus, Pencil, Trash2, X, Eye, EyeOff, Star } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import type { EventItem } from "@/lib/database.types"
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
  is_featured: boolean
  is_active: boolean
  sort_order: string
}

const emptyForm: FormState = {
  id: null,
  title: "",
  image_src: "",
  image_alt: "",
  is_featured: false,
  is_active: true,
  sort_order: "0",
}

function toForm(e: EventItem): FormState {
  return {
    id: e.id,
    title: e.title,
    image_src: e.image_src,
    image_alt: e.image_alt,
    is_featured: e.is_featured,
    is_active: e.is_active,
    sort_order: String(e.sort_order),
  }
}

export default function AdminEtkinliklerPage() {
  const { authedFetch } = useAdminAuth()
  const [items, setItems] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<FormState>(emptyForm)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authedFetch("/api/admin/events")
      if (res.ok) setItems((await res.json()).events ?? [])
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
        is_featured: form.is_featured,
        is_active: form.is_active,
        sort_order: Number(form.sort_order) || 0,
      }
      const res = form.id
        ? await authedFetch("/api/admin/events", {
            method: "PATCH",
            body: JSON.stringify({ id: form.id, ...payload }),
          })
        : await authedFetch("/api/admin/events", {
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

  const toggleActive = async (it: EventItem) => {
    await authedFetch("/api/admin/events", {
      method: "PATCH",
      body: JSON.stringify({ ...toForm(it), id: it.id, is_active: !it.is_active, sort_order: it.sort_order }),
    })
    load()
  }

  const remove = async (it: EventItem) => {
    if (!confirm(`"${it.title}" silinsin mi?`)) return
    await authedFetch(`/api/admin/events?id=${it.id}`, { method: "DELETE" })
    load()
  }

  return (
    <>
      <PageHeader
        title="Etkinlikler"
        subtitle={`${items.length} etkinlik · "Öne çıkan" işaretli ilk etkinlik büyük gösterilir`}
        action={
          <a href="/etkinlikler" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 underline-offset-4 hover:text-[#C8A96A] hover:underline">
            Public sayfayı aç →
          </a>
        }
      />

      <Card className="mb-10">
        <form onSubmit={submit}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {form.id ? "Etkinliği Düzenle" : "Yeni Etkinlik"}
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
            <Field>
              <Toggle checked={form.is_featured} onChange={(v) => setForm((f) => ({ ...f, is_featured: v }))} label="Öne çıkan" />
            </Field>
            <Field>
              <Toggle checked={form.is_active} onChange={(v) => setForm((f) => ({ ...f, is_active: v }))} label="Aktif" />
            </Field>
          </div>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
          <div className="mt-5 flex items-center gap-2">
            <Button type="submit" loading={saving}>
              {!form.id && !saving && <Plus className="size-4" />}
              {form.id ? "Güncelle" : "Ekle"}
            </Button>
            {form.id && (
              <Button variant="ghost" onClick={() => setForm(emptyForm)}>Vazgeç</Button>
            )}
          </div>
        </form>
      </Card>

      {items.length === 0 ? (
        <EmptyState loading={loading} message="Henüz etkinlik yok." />
      ) : (
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className={cn("flex items-center gap-3 rounded-xl border bg-[#141414] p-3", it.is_active ? "border-white/10" : "border-white/5 opacity-60")}>
              {it.image_src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.image_src} alt={it.image_alt} className="size-12 shrink-0 rounded-lg object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-white">{it.title}</h3>
                  {it.is_featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#C8A96A]/25 bg-[#C8A96A]/[0.06] px-2 py-0.5 text-[10px] text-[#C8A96A]">
                      <Star className="size-2.5" /> Öne çıkan
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-white/30">{it.image_src || "—"}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconBtn title={it.is_active ? "Pasifleştir" : "Aktifleştir"} onClick={() => toggleActive(it)}>
                  {it.is_active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </IconBtn>
                <IconBtn title="Düzenle" onClick={() => setForm(toForm(it))}>
                  <Pencil className="size-4" />
                </IconBtn>
                <IconBtn title="Sil" onClick={() => remove(it)} danger>
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
