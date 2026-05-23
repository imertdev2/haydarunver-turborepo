"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import type { GalleryImage } from "@/lib/database.types"
import {
  PageHeader,
  Card,
  Field,
  Input,
  Toggle,
  Button,
  IconBtn,
  FilterTabs,
  EmptyState,
} from "@/components/admin/ui"

interface FormState {
  id: string | null
  src: string
  alt: string
  category: string
  is_active: boolean
  sort_order: string
}

const emptyForm: FormState = {
  id: null,
  src: "",
  alt: "",
  category: "Doğa",
  is_active: true,
  sort_order: "0",
}

function toForm(g: GalleryImage): FormState {
  return {
    id: g.id,
    src: g.src,
    alt: g.alt,
    category: g.category,
    is_active: g.is_active,
    sort_order: String(g.sort_order),
  }
}

export default function AdminGaleriPage() {
  const { authedFetch } = useAdminAuth()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<FormState>(emptyForm)
  const [filter, setFilter] = useState("all")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authedFetch("/api/admin/gallery")
      if (res.ok) setImages((await res.json()).images ?? [])
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => {
    load()
  }, [load])

  const categories = useMemo(() => {
    const set = new Set(images.map((i) => i.category))
    return Array.from(set)
  }, [images])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.src.trim()) return setError("Görsel URL zorunludur.")
    setSaving(true)
    try {
      const payload = {
        src: form.src,
        alt: form.alt,
        category: form.category || "Doğa",
        is_active: form.is_active,
        sort_order: Number(form.sort_order) || 0,
      }
      const res = form.id
        ? await authedFetch("/api/admin/gallery", {
            method: "PATCH",
            body: JSON.stringify({ id: form.id, ...payload }),
          })
        : await authedFetch("/api/admin/gallery", {
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

  const toggleActive = async (g: GalleryImage) => {
    await authedFetch("/api/admin/gallery", {
      method: "PATCH",
      body: JSON.stringify({ ...toForm(g), id: g.id, is_active: !g.is_active, sort_order: g.sort_order }),
    })
    load()
  }

  const remove = async (g: GalleryImage) => {
    if (!confirm("Görsel silinsin mi?")) return
    await authedFetch(`/api/admin/gallery?id=${g.id}`, { method: "DELETE" })
    load()
  }

  const filtered = filter === "all" ? images : images.filter((i) => i.category === filter)

  return (
    <>
      <PageHeader
        title="Galeri"
        subtitle={`${images.length} görsel`}
        action={
          <a href="/galeri" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 underline-offset-4 hover:text-[#C8A96A] hover:underline">
            Public sayfayı aç →
          </a>
        }
      />

      <Card className="mb-8">
        <form onSubmit={submit}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {form.id ? "Görseli Düzenle" : "Yeni Görsel"}
            </h2>
            {form.id && (
              <button type="button" onClick={() => setForm(emptyForm)} className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white">
                <X className="size-3" /> Yeni kayıt
              </button>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Görsel URL" required full>
              <Input value={form.src} onChange={(v) => setForm((f) => ({ ...f, src: v }))} placeholder="/images/galleries/..." />
            </Field>
            <Field label="Açıklama (alt)">
              <Input value={form.alt} onChange={(v) => setForm((f) => ({ ...f, alt: v }))} />
            </Field>
            <Field label="Kategori">
              <Input value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} placeholder="Festival, Nefes, Doğa..." />
            </Field>
            <Field label="Sıra">
              <Input type="number" value={form.sort_order} onChange={(v) => setForm((f) => ({ ...f, sort_order: v }))} />
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
            {form.id && <Button variant="ghost" onClick={() => setForm(emptyForm)}>Vazgeç</Button>}
          </div>
        </form>
      </Card>

      <div className="mb-4">
        <FilterTabs
          value={filter}
          onChange={setFilter}
          tabs={[{ key: "all", label: "Tümü" }, ...categories.map((c) => ({ key: c, label: c }))]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState loading={loading} message="Henüz görsel yok." />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((g) => (
            <div key={g.id} className={cn("group relative overflow-hidden rounded-xl border bg-[#141414]", g.is_active ? "border-white/10" : "border-white/5 opacity-50")}>
              <div className="relative aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} className="size-full object-cover" />
              </div>
              <div className="flex items-center justify-between gap-1 p-2">
                <span className="truncate text-[10px] text-white/50">{g.category}</span>
                <div className="flex shrink-0 gap-0.5">
                  <IconBtn title={g.is_active ? "Gizle" : "Göster"} onClick={() => toggleActive(g)}>
                    {g.is_active ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
                  </IconBtn>
                  <IconBtn title="Düzenle" onClick={() => setForm(toForm(g))}>
                    <Pencil className="size-3.5" />
                  </IconBtn>
                  <IconBtn title="Sil" onClick={() => remove(g)} danger>
                    <Trash2 className="size-3.5" />
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
