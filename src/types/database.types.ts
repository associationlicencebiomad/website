export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      buro: {
        Row: {
          created_at: string
          display: boolean
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display?: boolean
          id: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display?: boolean
          id?: string
          role?: string
          updated_at?: string
        }
      }
      godparents: {
        Row: {
          godparent_id: string
          is_adopted: boolean
          user_id: string
        }
        Insert: {
          godparent_id: string
          is_adopted?: boolean
          user_id: string
        }
        Update: {
          godparent_id?: string
          is_adopted?: boolean
          user_id?: string
        }
      }
      memberships: {
        Row: {
          amount: number
          date: string
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          date: string
          id: string
          user_id: string
        }
        Update: {
          amount?: number
          date?: string
          id?: string
          user_id?: string
        }
      }
      migrations: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
      }
      professors: {
        Row: {
          courses: string[]
          full_name: string
          id: number
          image_url: string | null
        }
        Insert: {
          courses: string[]
          full_name: string
          id?: number
          image_url?: string | null
        }
        Update: {
          courses?: string[]
          full_name?: string
          id?: number
          image_url?: string | null
        }
      }
      professors_ranking: {
        Row: {
          professor_id: number
          ranking: number
          user_id: string
        }
        Insert: {
          professor_id: number
          ranking: number
          user_id: string
        }
        Update: {
          professor_id?: number
          ranking?: number
          user_id?: string
        }
      }
      profiles: {
        Row: {
          about: string | null
          avatar: string | null
          best_memory: string | null
          better_promo: string | null
          birthday: string
          created_at: string
          first_name: string
          fts: unknown | null
          id: string
          last_name: string
          links: Json | null
          promo_id: number
          strong_points: string | null
          timeline: Json | null
          updated_at: string
        }
        Insert: {
          about?: string | null
          avatar?: string | null
          best_memory?: string | null
          better_promo?: string | null
          birthday: string
          created_at?: string
          first_name: string
          fts?: unknown | null
          id: string
          last_name: string
          links?: Json | null
          promo_id: number
          strong_points?: string | null
          timeline?: Json | null
          updated_at?: string
        }
        Update: {
          about?: string | null
          avatar?: string | null
          best_memory?: string | null
          better_promo?: string | null
          birthday?: string
          created_at?: string
          first_name?: string
          fts?: unknown | null
          id?: string
          last_name?: string
          links?: Json | null
          promo_id?: number
          strong_points?: string | null
          timeline?: Json | null
          updated_at?: string
        }
      }
      promo_key: {
        Row: {
          id: number
          key: string
        }
        Insert: {
          id: number
          key: string
        }
        Update: {
          id?: number
          key?: string
        }
      }
      promos: {
        Row: {
          id: number
          name: string
          year: number
        }
        Insert: {
          id?: number
          name: string
          year: number
        }
        Update: {
          id?: number
          name?: string
          year?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_professors_ranking: {
        Args: { param_user_id: string }
        Returns: {
          id: number
          full_name: string
          image_url: string
          courses: string[]
          ranking: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

