'use client'

import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    const client = createClient()
    let active = true
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    client.auth.getSession().then(({ data, error }) => {
      if (!active) return
      if (error) {
        console.error('Unable to read the current Supabase session:', error)
        return
      }

      setUser(data.session?.user ?? null)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  return user
}

export function getUserDisplayName(user: User | null) {
  const name = user?.user_metadata?.name

  if (typeof name === 'string' && name.trim()) return name.trim()
  return user?.email?.split('@')[0] || 'Akun'
}
