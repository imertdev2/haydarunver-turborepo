import { NextResponse } from "next/server"
import { requireServiceClient as createServiceClient } from "@/lib/supabase-server"

// GET — aktif işletmeleri getir (kategori + bölge + arama filtreli)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const region = searchParams.get("region")
  const q = searchParams.get("q")?.trim()

  const supabase = createServiceClient()

  let query = supabase
    .from("businesses")
    .select(
      "id,name,slug,category,region,phone,whatsapp,website,instagram,address,description,features,photos,price_range"
    )
    .eq("is_active", true)
    .order("name", { ascending: true })

  if (category) query = query.eq("category", category)
  if (region) query = query.eq("region", region)
  if (q) query = query.ilike("name", `%${q}%`)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: "Veri alınamadı" }, { status: 500 })
  }

  return NextResponse.json({ businesses: data ?? [] })
}
