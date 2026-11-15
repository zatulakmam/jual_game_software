import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

// Check if we're using real credentials
const isConfigured =
  supabaseUrl !== 'https://placeholder.supabase.co' &&
  supabaseAnonKey !== 'placeholder_key'

if (!isConfigured && process.env.NODE_ENV !== 'test') {
  console.warn(
    '[PixelStore] Supabase not configured. Using placeholder values. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  )
}

// Browser client (singleton)
let browserClient: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  if (browserClient) return browserClient
  browserClient = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
  return browserClient
}

// Server client (new instance per request for server components)
export function createServerClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Default export for convenience
export const supabase = createClient()
