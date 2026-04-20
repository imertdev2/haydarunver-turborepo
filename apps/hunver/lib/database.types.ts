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
    }
  }
}

export type Service = Database["public"]["Tables"]["services"]["Row"]
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"]
export type Availability = Database["public"]["Tables"]["availability"]["Row"]
