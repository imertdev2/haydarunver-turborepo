import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Service-role Supabase client.
 *
 * Env eksikse `null` döner — public içerik okuyucuları (`getEvents`,
 * `getBlogPosts` …) bu durumu yakalayıp boş dizi / statik fallback gösterir.
 * Admin / yazma rotaları null gelirse açıkça 500 ya da 401 dönmeli.
 */
export function createServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createSupabaseClient(url, key)
}

/**
 * Yazma yolu — env zorunlu. Yoksa açıklayıcı hata fırlatır.
 */
export function requireServiceClient(): SupabaseClient {
  const client = createServiceClient()
  if (!client) {
    throw new Error(
      "Supabase env eksik: NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY ayarlanmalı."
    )
  }
  return client
}
