"use client"

import { useCallback, useEffect, useState } from "react"
import { Check } from "lucide-react"
import { useAdminAuth } from "@/lib/admin-auth"
import {
  PageHeader,
  Card,
  Field,
  Input,
  Textarea,
  Toggle,
  Button,
  Spinner,
} from "@/components/admin/ui"

// Yönetilen ayar anahtarları. site_settings.sql ile uyumlu.
type FieldType = "text" | "textarea" | "toggle"

interface SettingField {
  key: string
  label: string
  type: FieldType
  placeholder?: string
}

const GROUPS: { title: string; fields: SettingField[] }[] = [
  {
    title: "İletişim",
    fields: [
      { key: "contact_phone", label: "Telefon", type: "text", placeholder: "+90 555 555 55 55" },
      { key: "contact_email", label: "E-posta", type: "text", placeholder: "info@..." },
      { key: "contact_whatsapp", label: "WhatsApp", type: "text", placeholder: "+90 555 555 55 55" },
      { key: "contact_address", label: "Adres", type: "textarea", placeholder: "Çıralı Mah., Kemer / Antalya" },
    ],
  },
  {
    title: "Sosyal Medya",
    fields: [
      { key: "social_instagram", label: "Instagram", type: "text", placeholder: "@kullaniciadi" },
      { key: "social_youtube", label: "YouTube", type: "text", placeholder: "https://youtube.com/@..." },
      { key: "social_facebook", label: "Facebook", type: "text", placeholder: "https://facebook.com/..." },
    ],
  },
  {
    title: "Genel",
    fields: [
      { key: "site_title", label: "Site Başlığı", type: "text", placeholder: "Haydar Ünver" },
      { key: "site_description", label: "Site Açıklaması (SEO)", type: "textarea" },
      { key: "booking_enabled", label: "Randevu alımı açık", type: "toggle" },
    ],
  },
]

export default function AdminAyarlarPage() {
  const { authedFetch } = useAdminAuth()
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authedFetch("/api/admin/settings")
      if (res.ok) setValues((await res.json()).settings ?? {})
    } finally {
      setLoading(false)
    }
  }, [authedFetch])

  useEffect(() => {
    load()
  }, [load])

  const set = (key: string, value: string) => {
    setValues((v) => ({ ...v, [key]: value }))
    setSaved(false)
  }

  const save = async () => {
    setError("")
    setSaving(true)
    try {
      const res = await authedFetch("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({ settings: values }),
      })
      if (!res.ok) {
        setError((await res.json().catch(() => ({}))).error || "Kaydedilemedi")
        return
      }
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <>
      <PageHeader title="Site Ayarları" subtitle="İletişim, sosyal medya ve genel ayarlar" />

      <div className="space-y-6">
        {GROUPS.map((group) => (
          <Card key={group.title}>
            <h2 className="mb-4 text-sm font-semibold text-white">{group.title}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {group.fields.map((f) => {
                const val = values[f.key] ?? ""
                if (f.type === "toggle") {
                  return (
                    <Field key={f.key} full>
                      <Toggle
                        checked={val === "true"}
                        onChange={(v) => set(f.key, v ? "true" : "false")}
                        label={f.label}
                      />
                    </Field>
                  )
                }
                return (
                  <Field
                    key={f.key}
                    label={f.label}
                    full={f.type === "textarea"}
                  >
                    {f.type === "textarea" ? (
                      <Textarea value={val} onChange={(v) => set(f.key, v)} placeholder={f.placeholder} />
                    ) : (
                      <Input value={val} onChange={(v) => set(f.key, v)} placeholder={f.placeholder} />
                    )}
                  </Field>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button onClick={save} loading={saving}>
          <Check className="size-4" /> Kaydet
        </Button>
        {saved && <span className="text-xs text-green-400">Kaydedildi ✓</span>}
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
    </>
  )
}
