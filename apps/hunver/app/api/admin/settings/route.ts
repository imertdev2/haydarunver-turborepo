import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase-server"
import { checkAuth, unauthorized } from "@/lib/admin-auth-server"

// Site ayarları (site_settings key/value tablosu) yönetimi.

// GET — tüm ayarlar { key: value } map olarak
export async function GET(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const supabase = createServiceClient()
  const { data, error } = await supabase.from("site_settings").select("key, value")
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const settings: Record<string, string> = {}
  for (const row of data ?? []) settings[row.key] = row.value
  return NextResponse.json({ settings })
}

// PATCH — birden çok anahtarı upsert et { settings: { key: value, ... } }
export async function PATCH(request: Request) {
  if (!checkAuth(request)) return unauthorized()

  const body = (await request.json()) as { settings?: Record<string, string> }
  if (!body.settings || typeof body.settings !== "object") {
    return NextResponse.json({ error: "settings objesi gerekli" }, { status: 400 })
  }

  const rows = Object.entries(body.settings).map(([key, value]) => ({
    key,
    value: value ?? "",
    updated_at: new Date().toISOString(),
  }))

  if (rows.length === 0) {
    return NextResponse.json({ error: "Güncellenecek ayar yok" }, { status: 400 })
  }

  const supabase = createServiceClient()
  const { error } = await supabase
    .from("site_settings")
    .upsert(rows, { onConflict: "key" })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
