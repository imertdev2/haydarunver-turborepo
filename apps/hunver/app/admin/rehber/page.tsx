"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Pencil, Trash2, Plus, X, Eye, EyeOff } from "lucide-react"
import {
  BUSINESS_CATEGORIES,
  BUSINESS_REGIONS,
  PRICE_RANGES,
  type Business,
  type BusinessCategory,
  type BusinessRegion,
  type PriceRange,
} from "@/lib/database.types"
import { useAdminAuth } from "@/lib/admin-auth"
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
  FilterTabs,
  EmptyState,
} from "@/components/admin/ui"

interface FormState {
  id: string | null
  name: string
  category: BusinessCategory
  region: BusinessRegion
  phone: string
  whatsapp: string
  website: string
  instagram: string
  address: string
  description: string
  features: string // virgülle ayrılmış
  photos: string // satır başlı URL listesi
  price_range: PriceRange | ""
  is_active: boolean
}

const emptyForm: FormState = {
  id: null,
  name: "",
  category: "konaklama",
  region: "cirali",
  phone: "",
  whatsapp: "",
  website: "",
  instagram: "",
  address: "",
  description: "",
  features: "",
  photos: "",
  price_range: "",
  is_active: true,
}

function businessToForm(b: Business): FormState {
  return {
    id: b.id,
    name: b.name,
    category: b.category,
    region: b.region,
    phone: b.phone ?? "",
    whatsapp: b.whatsapp ?? "",
    website: b.website ?? "",
    instagram: b.instagram ?? "",
    address: b.address ?? "",
    description: b.description,
    features: b.features.join(", "),
    photos: b.photos.join("\n"),
    price_range: b.price_range ?? "",
    is_active: b.is_active,
  }
}

function formToPayload(f: FormState) {
  return {
    name: f.name,
    category: f.category,
    region: f.region,
    phone: f.phone || null,
    whatsapp: f.whatsapp || null,
    website: f.website || null,
    instagram: f.instagram || null,
    address: f.address || null,
    description: f.description,
    features: f.features
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    photos: f.photos
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean),
    price_range: f.price_range || null,
    is_active: f.is_active,
  }
}

export default function AdminRehberPage() {
  const { authedFetch } = useAdminAuth()
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all")
  const [form, setForm] = useState<FormState>(emptyForm)

  const fetchBusinesses = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authedFetch("/api/admin/businesses")
      if (res.ok) {
        const data = await res.json()
        setBusinesses(data.businesses ?? [])
      }
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => {
    fetchBusinesses()
  }, [fetchBusinesses])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!form.name.trim()) {
      setError("İşletme adı zorunludur.")
      return
    }
    setSaving(true)
    try {
      const payload = formToPayload(form)
      const res = form.id
        ? await authedFetch("/api/admin/businesses", {
            method: "PATCH",
            body: JSON.stringify({ id: form.id, ...payload }),
          })
        : await authedFetch("/api/admin/businesses", {
            method: "POST",
            body: JSON.stringify(payload),
          })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Kayıt başarısız")
        return
      }
      setForm(emptyForm)
      fetchBusinesses()
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id: string) => {
    if (!confirm("Bu işletme silinsin mi?")) return
    await authedFetch(`/api/admin/businesses?id=${id}`, { method: "DELETE" })
    fetchBusinesses()
  }

  const toggleActive = async (b: Business) => {
    await authedFetch("/api/admin/businesses", {
      method: "PATCH",
      body: JSON.stringify({
        id: b.id,
        ...formToPayload(businessToForm(b)),
        is_active: !b.is_active,
      }),
    })
    fetchBusinesses()
  }

  const startEdit = (b: Business) => {
    setForm(businessToForm(b))
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const filtered =
    filter === "all"
      ? businesses
      : businesses.filter((b) => (filter === "active" ? b.is_active : !b.is_active))

  return (
    <>
      <PageHeader
        title="Rehber Yönetimi"
        subtitle={`${businesses.length} işletme · ${businesses.filter((b) => b.is_active).length} aktif`}
        action={
          <a
            href="/rehber"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/40 underline-offset-4 hover:text-[#C8A96A] hover:underline"
          >
            Public sayfayı aç →
          </a>
        }
      />

      {/* Form */}
      <Card className="mb-10">
        <form onSubmit={submit}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {form.id ? "İşletmeyi Düzenle" : "Yeni İşletme Ekle"}
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
            <Field label="İşletme Adı" required>
              <Input
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                placeholder="Örn: Olympos Bungalow"
              />
            </Field>

            <Field label="Bölge" required>
              <Select
                value={form.region}
                onChange={(v) => setForm((f) => ({ ...f, region: v as BusinessRegion }))}
                options={BUSINESS_REGIONS.map((r) => ({ value: r.value, label: r.label }))}
              />
            </Field>

            <Field label="Kategori" required>
              <Select
                value={form.category}
                onChange={(v) => setForm((f) => ({ ...f, category: v as BusinessCategory }))}
                options={BUSINESS_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
              />
            </Field>

            <Field label="Fiyat Aralığı">
              <Select
                value={form.price_range}
                onChange={(v) => setForm((f) => ({ ...f, price_range: v as PriceRange | "" }))}
                options={[
                  { value: "", label: "—" },
                  ...PRICE_RANGES.map((p) => ({ value: p, label: p })),
                ]}
              />
            </Field>

            <Field label="Telefon">
              <Input
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                placeholder="+90 555 555 55 55"
              />
            </Field>

            <Field label="WhatsApp">
              <Input
                value={form.whatsapp}
                onChange={(v) => setForm((f) => ({ ...f, whatsapp: v }))}
                placeholder="+90 555 555 55 55"
              />
            </Field>

            <Field label="Web Sitesi">
              <Input
                value={form.website}
                onChange={(v) => setForm((f) => ({ ...f, website: v }))}
                placeholder="https://..."
              />
            </Field>

            <Field label="Instagram">
              <Input
                value={form.instagram}
                onChange={(v) => setForm((f) => ({ ...f, instagram: v }))}
                placeholder="@kullaniciadi"
              />
            </Field>

            <Field label="Konum / Adres" full>
              <Input
                value={form.address}
                onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                placeholder="Çıralı Mah., Kemer / Antalya"
              />
            </Field>

            <Field label="Açıklama" full>
              <Textarea
                value={form.description}
                onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                placeholder="Kısa açıklama..."
              />
            </Field>

            <Field label="Özellikler (virgülle ayır)" full>
              <Input
                value={form.features}
                onChange={(v) => setForm((f) => ({ ...f, features: v }))}
                placeholder="Wi-Fi, Otopark, Kahvaltı, Deniz manzarası"
              />
            </Field>

            <Field label="Fotoğraflar (her satıra bir URL)" full>
              <Textarea
                value={form.photos}
                onChange={(v) => setForm((f) => ({ ...f, photos: v }))}
                placeholder={"https://...jpg\nhttps://...jpg"}
                mono
              />
            </Field>

            <Field full>
              <Toggle
                checked={form.is_active}
                onChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
                label="Aktif (rehberde görünsün)"
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
      <div className="mb-4 flex items-center justify-between">
        <FilterTabs
          value={filter}
          onChange={setFilter}
          tabs={[
            { key: "all", label: "Tümü" },
            { key: "active", label: "Aktif" },
            { key: "inactive", label: "Pasif" },
          ]}
        />
        <Button variant="ghost" onClick={fetchBusinesses} loading={loading}>
          Yenile
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState loading={loading} message="Henüz işletme yok." />
      ) : (
        <div className="space-y-2">
          {filtered.map((b) => (
            <div
              key={b.id}
              className={cn(
                "rounded-xl border bg-[#141414] p-3 md:p-4",
                b.is_active ? "border-white/10" : "border-white/5 opacity-60"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">{b.name}</h3>
                    <span className="rounded-full border border-[#C8A96A]/25 bg-[#C8A96A]/[0.06] px-2 py-0.5 text-[10px] text-[#C8A96A]">
                      {BUSINESS_CATEGORIES.find((c) => c.value === b.category)?.label}
                    </span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/55">
                      {BUSINESS_REGIONS.find((r) => r.value === b.region)?.label}
                    </span>
                    {b.price_range && (
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] tracking-wider text-white/70">
                        {b.price_range}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-white/40">
                    {[b.phone, b.whatsapp, b.website, b.instagram, b.address]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <IconBtn title={b.is_active ? "Gizle" : "Göster"} onClick={() => toggleActive(b)}>
                    {b.is_active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                  </IconBtn>
                  <IconBtn title="Düzenle" onClick={() => startEdit(b)}>
                    <Pencil className="size-4" />
                  </IconBtn>
                  <IconBtn title="Sil" onClick={() => remove(b.id)} danger>
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
