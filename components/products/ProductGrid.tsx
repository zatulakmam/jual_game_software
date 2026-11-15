'use client';

import React from 'react';
import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  columns = 4,
  className = '',
}) => {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  if (loading) {
    return (
      <div className={`grid ${colClass} gap-6 ${className}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white rounded-xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] p-4 flex flex-col gap-3"
          >
            <div className="w-full h-44 bg-gray-200 rounded-lg border-2 border-gray-300" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-8 bg-gray-200 rounded w-full mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          title="Tidak Ada Produk Ditemukan"
          description="Coba ubah kata kunci pencarian atau reset filter untuk menemukan produk yang kamu inginkan."
          action={{
            label: 'Lihat Semua Produk',
            href: '/products',
            variant: 'primary',
          }}
        />
      </div>
    );
  }

  return (
    <div className={`grid ${colClass} gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
