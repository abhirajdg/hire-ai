export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          description: string
          salary_range: string | null
          job_type: string
          experience_level: string
          category: string
          logo_url: string | null
          application_url: string | null
          created_at: string
          featured: boolean
          remote: boolean
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          description: string
          salary_range?: string | null
          job_type: string
          experience_level: string
          category: string
          logo_url?: string | null
          application_url?: string | null
          created_at?: string
          featured?: boolean
          remote?: boolean
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          description?: string
          salary_range?: string | null
          job_type?: string
          experience_level?: string
          category?: string
          logo_url?: string | null
          application_url?: string | null
          created_at?: string
          featured?: boolean
          remote?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}