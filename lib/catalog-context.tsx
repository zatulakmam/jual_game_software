'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '@/lib/data';
import type { Product } from '@/lib/types';
import toast from 'react-hot-toast';

type CatalogContextValue = {
  products: Product[];
  isLoading: boolean;
  addProduct: (productData: Partial<Product> & { name: string; price: number }) => Promise<Product>;
  updateProduct: (idOrSlug: string, updates: Partial<Product>) => Promise<Product>;
  deleteProduct: (idOrSlug: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        }
      }
    } catch (err) {
      console.warn('[Catalog] Error fetching from API, using cached data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (productData: Partial<Product> & { name: string; price: number }): Promise<Product> => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal menambahkan produk');
      }

      const created: Product = json.data;

      // Update local state immediately
      setProducts((current) => [created, ...current.filter((p) => p.id !== created.id)]);
      return created;
    } catch (error) {
      console.error('[Catalog] Add product error:', error);
      throw error;
    }
  }, []);

  const updateProduct = useCallback(async (idOrSlug: string, updates: Partial<Product>): Promise<Product> => {
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(idOrSlug)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal memperbarui produk');
      }

      const updated: Product = json.data;

      setProducts((current) =>
        current.map((p) => (p.id === idOrSlug || p.slug === idOrSlug ? updated : p))
      );

      return updated;
    } catch (error) {
      console.error('[Catalog] Update product error:', error);
      throw error;
    }
  }, []);

  const deleteProduct = useCallback(async (idOrSlug: string): Promise<void> => {
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(idOrSlug)}`, {
        method: 'DELETE',
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal menghapus produk');
      }

      // Remove from state immediately
      setProducts((current) =>
        current.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug)
      );
    } catch (error) {
      console.error('[Catalog] Delete product error:', error);
      throw error;
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    setIsLoading(true);
    await fetchProducts();
  }, [fetchProducts]);

  return (
    <CatalogContext.Provider
      value={{
        products,
        isLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}
