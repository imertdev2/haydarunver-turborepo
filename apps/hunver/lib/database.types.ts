export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          name: string
          description: string
          duration_minutes: number
          price: number
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["services"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>
      }
      availability: {
        Row: {
          id: string
          day_of_week: number // 0=Pazar, 1=Pazartesi, ... 6=Cumartesi
          start_time: string // "09:00"
          end_time: string // "17:00"
          is_active: boolean
        }
        Insert: Omit<Database["public"]["Tables"]["availability"]["Row"], "id">
        Update: Partial<Database["public"]["Tables"]["availability"]["Insert"]>
      }
      appointments: {
        Row: {
          id: string
          service_id: string
          customer_name: string
          customer_phone: string
          customer_email: string | null
          customer_note: string | null
          date: string // "2026-04-20"
          start_time: string // "10:00"
          end_time: string // "11:00"
          status: "pending" | "confirmed" | "cancelled" | "completed"
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["appointments"]["Row"], "id" | "created_at" | "status">
        Update: {
          service_id?: string
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          customer_note?: string | null
          date?: string
          start_time?: string
          end_time?: string
          status?: "pending" | "confirmed" | "cancelled" | "completed"
        }
      }
      blocked_dates: {
        Row: {
          id: string
          date: string
          reason: string | null
        }
        Insert: Omit<Database["public"]["Tables"]["blocked_dates"]["Row"], "id">
        Update: Partial<Database["public"]["Tables"]["blocked_dates"]["Insert"]>
      }
      site_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
        }
        Insert: { key: string; value: string }
        Update: { value?: string }
      }
      blog_categories: {
        Row: {
          id: string
          slug: string
          label: string
          description: string
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["blog_categories"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["blog_categories"]["Insert"]>
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          body: string
          category: string
          date: string
          image: string
          is_published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database["public"]["Tables"]["blog_posts"]["Row"],
          "id" | "created_at" | "updated_at"
        >
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>
      }
      events: {
        Row: {
          id: string
          title: string
          image_src: string
          image_alt: string
          is_featured: boolean
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>
      }
      trainings: {
        Row: {
          id: string
          title: string
          image_src: string
          image_alt: string
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["trainings"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["trainings"]["Insert"]>
      }
      gallery_images: {
        Row: {
          id: string
          src: string
          alt: string
          category: string
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["gallery_images"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["gallery_images"]["Insert"]>
      }
      businesses: {
        Row: {
          id: string
          name: string
          slug: string | null
          category: BusinessCategory
          region: BusinessRegion
          phone: string | null
          whatsapp: string | null
          website: string | null
          instagram: string | null
          address: string | null
          lat: number | null
          lng: number | null
          description: string
          features: string[]
          photos: string[]
          price_range: PriceRange | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<
          Database["public"]["Tables"]["businesses"]["Row"],
          "id" | "created_at" | "updated_at"
        >
        Update: Partial<Database["public"]["Tables"]["businesses"]["Insert"]>
      }
    }
  }
}

export type Service = Database["public"]["Tables"]["services"]["Row"]
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"]
export type Availability = Database["public"]["Tables"]["availability"]["Row"]
export type Business = Database["public"]["Tables"]["businesses"]["Row"]
export type SiteSetting = Database["public"]["Tables"]["site_settings"]["Row"]
export type BlockedDate = Database["public"]["Tables"]["blocked_dates"]["Row"]
export type BlogCategory = Database["public"]["Tables"]["blog_categories"]["Row"]
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"]
export type EventItem = Database["public"]["Tables"]["events"]["Row"]
export type Training = Database["public"]["Tables"]["trainings"]["Row"]
export type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"]

// İşletme rehberi sabit listeleri
export type BusinessCategory =
  | "konaklama"
  | "restoran"
  | "tekne_turu"
  | "dalis"
  | "rehber"
  | "macera"
  | "wellness"
  | "ulasim"
  | "diger"

export type BusinessRegion = "cirali" | "olympos" | "adrasan" | "kemer"

export type PriceRange = "₺" | "₺₺" | "₺₺₺" | "₺₺₺₺"

export const BUSINESS_CATEGORIES: { value: BusinessCategory; label: string }[] = [
  { value: "konaklama", label: "Konaklama" },
  { value: "restoran", label: "Restoran / Kafe" },
  { value: "tekne_turu", label: "Tekne Turu" },
  { value: "dalis", label: "Dalış Merkezi" },
  { value: "rehber", label: "Yürüyüş / Trekking Rehberi" },
  { value: "macera", label: "Macera (Jeep / Rafting)" },
  { value: "wellness", label: "Yoga / Wellness" },
  { value: "ulasim", label: "Ulaşım / Transfer" },
  { value: "diger", label: "Diğer" },
]

export const BUSINESS_REGIONS: { value: BusinessRegion; label: string }[] = [
  { value: "cirali", label: "Çıralı" },
  { value: "olympos", label: "Olympos" },
  { value: "adrasan", label: "Adrasan" },
  { value: "kemer", label: "Kemer" },
]

export const PRICE_RANGES: PriceRange[] = ["₺", "₺₺", "₺₺₺", "₺₺₺₺"]
