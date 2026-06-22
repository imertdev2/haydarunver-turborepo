import { createServiceClient } from "@/lib/supabase-server"
import {
  BLOG_CATEGORIES_FALLBACK,
  BLOG_POSTS_FALLBACK,
} from "@/lib/blog-fallback"
import type {
  BlogPost,
  BlogCategory,
  EventItem,
  Training,
  GalleryImage,
  Property,
} from "@/lib/database.types"

// Sunucu tarafı public içerik okuyucuları. Server component'lerden çağrılır.
// Env / hata / boş → []. Çağıran taraf statik fallback'e düşebilir.

export async function getBlogCategories(): Promise<BlogCategory[]> {
  const supabase = createServiceClient()
  if (!supabase) return BLOG_CATEGORIES_FALLBACK
  try {
    const { data } = await supabase
      .from("blog_categories")
      .select("*")
      .order("sort_order", { ascending: true })
    if (!data || data.length === 0) return BLOG_CATEGORIES_FALLBACK
    return data
  } catch {
    return BLOG_CATEGORIES_FALLBACK
  }
}

export async function getBlogPosts(category?: string): Promise<BlogPost[]> {
  const filterByCategory = (posts: BlogPost[]) =>
    category ? posts.filter((p) => p.category === category) : posts

  const supabase = createServiceClient()
  if (!supabase) return filterByCategory(BLOG_POSTS_FALLBACK)
  try {
    let q = supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
    if (category) q = q.eq("category", category)
    const { data } = await q
    if (!data || data.length === 0) return filterByCategory(BLOG_POSTS_FALLBACK)
    return data
  } catch {
    return filterByCategory(BLOG_POSTS_FALLBACK)
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = createServiceClient()
  if (!supabase) return null
  try {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
    return data ?? null
  } catch {
    return null
  }
}

export async function getEvents(): Promise<EventItem[]> {
  const supabase = createServiceClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}

export async function getTrainings(): Promise<Training[]> {
  const supabase = createServiceClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("trainings")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = createServiceClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}

export async function getProperties(): Promise<Property[]> {
  const supabase = createServiceClient()
  if (!supabase) return []
  try {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
    return data ?? []
  } catch {
    return []
  }
}
