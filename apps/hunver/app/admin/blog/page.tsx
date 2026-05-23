"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import type { BlogPost, BlogCategory } from "@/lib/database.types"
import {
  PageHeader,
  Card,
  Field,
  Input,
  Textarea,
  Select,
  Toggle,
  Button,
  IconBtn,
  EmptyState,
} from "@/components/admin/ui"

interface FormState {
  id: string | null
  title: string
  slug: string
  category: string
  date: string
  image: string
  excerpt: string
  body: string
  is_published: boolean
  sort_order: string
}

const emptyForm: FormState = {
  id: null,
  title: "",
  slug: "",
  category: "",
  date: "",
  image: "",
  excerpt: "",
  body: "",
  is_published: true,
  sort_order: "0",
}

function toForm(p: BlogPost): FormState {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    date: p.date,
    image: p.image,
    excerpt: p.excerpt,
    body: p.body,
    is_published: p.is_published,
    sort_order: String(p.sort_order),
  }
}

export default function AdminBlogPage() {
  const { authedFetch } = useAdminAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState<FormState>(emptyForm)

  // Kategori yönetimi
  const [catLabel, setCatLabel] = useState("")
  const [catError, setCatError] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [pRes, cRes] = await Promise.all([
        authedFetch("/api/admin/blog"),
        authedFetch("/api/admin/blog-categories"),
      ])
      if (pRes.ok) setPosts((await pRes.json()).posts ?? [])
      if (cRes.ok) setCategories((await cRes.json()).categories ?? [])
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
    if (!form.category) return setError("Kategori seçin.")
    setSaving(true)
    try {
      const payload = {
        title: form.title,
        slug: form.slug || form.title,
        category: form.category,
        date: form.date,
        image: form.image,
        excerpt: form.excerpt,
        body: form.body,
        is_published: form.is_published,
        sort_order: Number(form.sort_order) || 0,
      }
      const res = form.id
        ? await authedFetch("/api/admin/blog", {
            method: "PATCH",
            body: JSON.stringify({ id: form.id, ...payload }),
          })
        : await authedFetch("/api/admin/blog", {
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

  const togglePublish = async (p: BlogPost) => {
    await authedFetch("/api/admin/blog", {
      method: "PATCH",
      body: JSON.stringify({ ...toForm(p), id: p.id, is_published: !p.is_published, sort_order: p.sort_order }),
    })
    load()
  }

  const remove = async (p: BlogPost) => {
    if (!confirm(`"${p.title}" silinsin mi?`)) return
    await authedFetch(`/api/admin/blog?id=${p.id}`, { method: "DELETE" })
    load()
  }

  const addCategory = async () => {
    setCatError("")
    if (!catLabel.trim()) return
    const res = await authedFetch("/api/admin/blog-categories", {
      method: "POST",
      body: JSON.stringify({ label: catLabel }),
    })
    if (!res.ok) {
      setCatError((await res.json().catch(() => ({}))).error || "Eklenemedi")
      return
    }
    setCatLabel("")
    load()
  }

  const removeCategory = async (id: string) => {
    if (!confirm("Kategori silinsin mi? (Yazılar silinmez ama kategorisiz kalır)")) return
    await authedFetch(`/api/admin/blog-categories?id=${id}`, { method: "DELETE" })
    load()
  }

  const catOptions = categories.map((c) => ({ value: c.slug, label: c.label }))

  return (
    <>
      <PageHeader
        title="Blog Yönetimi"
        subtitle={`${posts.length} yazı · ${categories.length} kategori`}
        action={
          <a
            href="/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 underline-offset-4 hover:text-[#C8A96A] hover:underline"
          >
            Public sayfayı aç →
          </a>
        }
      />

      {/* Kategoriler */}
      <Card className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-white">Kategoriler</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-white/70"
            >
              {c.label}
              <button
                onClick={() => removeCategory(c.id)}
                className="text-white/30 hover:text-red-400"
                title="Sil"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
          {categories.length === 0 && (
            <span className="text-xs text-white/30">Henüz kategori yok.</span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={catLabel}
            onChange={(e) => setCatLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            placeholder="Yeni kategori adı"
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-[#C8A96A]/40 focus:outline-none"
          />
          <Button onClick={addCategory}>
            <Plus className="size-4" /> Ekle
          </Button>
        </div>
        {catError && <p className="mt-2 text-xs text-red-400">{catError}</p>}
      </Card>

      {/* Yazı formu */}
      <Card className="mb-10">
        <form onSubmit={submit}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {form.id ? "Yazıyı Düzenle" : "Yeni Yazı"}
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
            <Field label="Başlık" required>
              <Input value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            </Field>
            <Field label="Slug (boş bırakılırsa başlıktan üretilir)">
              <Input value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} placeholder="nefes-terapisi" />
            </Field>
            <Field label="Kategori" required>
              <Select
                value={form.category}
                onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                options={[{ value: "", label: "— seçin —" }, ...catOptions]}
              />
            </Field>
            <Field label="Tarih (metin)">
              <Input value={form.date} onChange={(v) => setForm((f) => ({ ...f, date: v }))} placeholder="12 Nisan 2026" />
            </Field>
            <Field label="Görsel URL" full>
              <Input value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} placeholder="/images/..." />
            </Field>
            <Field label="Özet" full>
              <Textarea value={form.excerpt} onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))} rows={2} />
            </Field>
            <Field label="İçerik (paragrafları boş satırla ayır)" full>
              <Textarea value={form.body} onChange={(v) => setForm((f) => ({ ...f, body: v }))} rows={10} />
            </Field>
            <Field label="Sıra">
              <Input type="number" value={form.sort_order} onChange={(v) => setForm((f) => ({ ...f, sort_order: v }))} />
            </Field>
            <Field full>
              <Toggle
                checked={form.is_published}
                onChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
                label="Yayında"
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
      {posts.length === 0 ? (
        <EmptyState loading={loading} message="Henüz yazı yok." />
      ) : (
        <div className="space-y-2">
          {posts.map((p) => (
            <div
              key={p.id}
              className={cn(
                "rounded-xl border bg-[#141414] p-3 md:p-4",
                p.is_published ? "border-white/10" : "border-white/5 opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">{p.title}</h3>
                    <span className="rounded-full border border-[#C8A96A]/25 bg-[#C8A96A]/[0.06] px-2 py-0.5 text-[10px] text-[#C8A96A]">
                      {categories.find((c) => c.slug === p.category)?.label ?? p.category}
                    </span>
                    {p.date && (
                      <span className="text-[10px] text-white/30">{p.date}</span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-white/40">/{p.slug}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <IconBtn
                    title={p.is_published ? "Yayından kaldır" : "Yayınla"}
                    onClick={() => togglePublish(p)}
                  >
                    {p.is_published ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  </IconBtn>
                  <IconBtn title="Düzenle" onClick={() => setForm(toForm(p))}>
                    <Pencil className="size-4" />
                  </IconBtn>
                  <IconBtn title="Sil" onClick={() => remove(p)} danger>
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
