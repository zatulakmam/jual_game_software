'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { CategoryCard } from '@/components/products/CategoryCard';
import { useCatalog } from '@/lib/catalog-context';

export default function CategoriesPage() {
  const { products } = useCatalog();

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-12 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="bg-[#55E6D1] p-8 md:p-14 rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] mb-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded font-black text-xs uppercase mb-3">
              <Layers className="w-3.5 h-3.5 text-[#F9ED32]" />
              SEMUA KATEGORI
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#171717] uppercase tracking-tight mb-4">
              JELAJAHI BERDASARKAN KEBUTUHANMU.
            </h1>
            <p className="text-base sm:text-lg text-[#171717] font-medium max-w-xl">
              Pilih kategori produk digital yang kamu cari, mulai dari lisensi software kerja, game PC, template produktivitas, hingga aset desain.
            </p>
          </div>
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#F9ED32] rounded-full border-[3px] border-[#171717] opacity-60 hidden sm:block" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={{
                ...category,
                product_count: products.filter((product) => product.category_id === category.id).length,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
