import { createServiceClient } from "@/lib/supabase-server"
import type {
  BlogPost,
  BlogCategory,
  EventItem,
  Training,
  GalleryImage,
} from "@/lib/database.types"

// Sunucu tarafı public içerik okuyucuları. Server component'lerden çağrılır.
// Hata/boş durumda [] döner; çağıran taraf statik fallback'e düşebilir.

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("blog_categories")
    .select("*")
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  const supabase = createServiceClient()
  let q = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
  if (category) q = q.eq("category", category)
  const { data } = await q
  return data ?? []
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()
  return data ?? null
}

export async function getEvents(): Promise<EventItem[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getTrainings(): Promise<Training[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("trainings")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = createServiceClient()
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  return data ?? []
}
