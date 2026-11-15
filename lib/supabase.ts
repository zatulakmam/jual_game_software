import { createClient as createSupabaseClient } from '@supabase/supabase-js'

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
