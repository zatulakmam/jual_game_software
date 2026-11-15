import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

type Database = {
  public: {
    Tables: {
      product_deletions: {
        Row: {
          slug: string
          deleted_by: string | null
          deleted_at: string
        }
        Insert: {
          slug: string
          deleted_by?: string | null
          deleted_at?: string
        }
        Update: {
          slug?: string
          deleted_by?: string | null
          deleted_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}

const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const configuredAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  configuredUrl &&
    configuredAnonKey &&
    !configuredUrl.includes('placeholder') &&
    !configuredAnonKey.includes('placeholder')
)

const supabaseUrl = configuredUrl || 'https://placeholder.supabase.co'
const supabaseAnonKey = configuredAnonKey || 'placeholder_key'

if (!isSupabaseConfigured && process.env.NODE_ENV !== 'test') {
  console.warn(
    '[Sinzo Store] Supabase belum dikonfigurasi. Atur NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local.'
  )
}

// Browser client (singleton)
let browserClient: SupabaseClient<Database> | null = null

export function createClient(): SupabaseClient<Database> {
  if (browserClient) return browserClient
  browserClient = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
  return browserClient
}

// Server client (new instance per request for server components)
export function createServerClient(): SupabaseClient<Database> {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Default export for convenience
export const supabase = createClient()
