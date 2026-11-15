'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'
import { PRODUCTS as INITIAL_PRODUCTS } from '@/lib/data'
import type { Product } from '@/lib/types'

type CatalogContextValue = {
  products: Product[]
  deletedSlugs: ReadonlySet<string>
  deleteProduct: (slug: string) => Promise<void>
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [deletedSlugs, setDeletedSlugs] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let active = true

    const loadDeletedProducts = async () => {
      try {
        const { data, error } = await createClient()
          .from('product_deletions')
          .select('slug')

        if (!active) return
        if (error) {
          console.error('Unable to load deleted products from Supabase:', error)
          return
        }

        setDeletedSlugs((current) =>
          new Set([...current, ...(data ?? []).map(({ slug }) => slug)])
        )
      } catch (error) {
        if (active) {
          console.error('Unable to load deleted products from Supabase:', error)
        }
      }
    }

    void loadDeletedProducts()

    return () => {
      active = false
    }
  }, [])

  const deleteProduct = useCallback(async (slug: string) => {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase belum dikonfigurasi. Produk tidak dihapus.')
    }

    const client = createClient()
    const {
      data: { user },
      error: userError,
    } = await client.auth.getUser()

    if (userError) throw userError
    if (!user) throw new Error('Masuk ke akun admin sebelum menghapus produk.')

    const { error } = await client
      .from('product_deletions')
      .insert({ slug, deleted_by: user.id })

    if (error && error.code !== '23505') {
      if (error.code === '42501') {
        throw new Error('Akun ini belum memiliki izin admin di Supabase.')
      }

      throw error
    }

    setDeletedSlugs((current) => new Set(current).add(slug))
  }, [])

  const products = useMemo(
    () => INITIAL_PRODUCTS.filter((product) => !deletedSlugs.has(product.slug)),
    [deletedSlugs]
  )

  const value = useMemo(
    () => ({ products, deletedSlugs, deleteProduct }),
    [products, deletedSlugs, deleteProduct]
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

export function useCatalog() {
  const catalog = useContext(CatalogContext)
  if (!catalog) throw new Error('useCatalog must be used within CatalogProvider.')
  return catalog
}
