'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { ProductGrid } from '@/components/products/ProductGrid';

function CategoryDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="bg-white p-8 rounded-2xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] max-w-md">
          <div className="text-5xl mb-4">📂</div>
          <h1 className="text-2xl font-black text-[#171717] mb-2 uppercase">Kategori Tidak Ditemukan</h1>
          <p className="text-sm text-gray-600 mb-6 font-medium">
            Kategori yang kamu cari tidak tersedia di katalog kami.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F9ED32] text-[#171717] font-black text-sm rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717]"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Semua Kategori
          </Link>
        </div>
      </div>
    );
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category_id === category.id);

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-8 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#171717]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/categories" className="hover:text-[#171717]">Kategori</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[#171717] font-black">{category.name}</span>
        </nav>

        {/* Category Header Card */}
        <div
          className="p-8 md:p-12 rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] mb-10 relative overflow-hidden"
          style={{ backgroundColor: category.color || '#F9ED32' }}
        >
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-[#171717] text-white text-xs font-black uppercase rounded mb-3">
              {categoryProducts.length} Produk Tersedia
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[#171717] uppercase tracking-tight mb-3">
              {category.name}.
            </h1>
            <p className="text-sm md:text-base text-[#171717] font-semibold max-w-xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={categoryProducts} columns={4} />
      </div>
    </div>
  );
}

export default function CategoryDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F0E8]">
          <div className="w-10 h-10 border-4 border-[#171717] border-t-[#F9ED32] rounded-full animate-spin" />
        </div>
      }
    >
      <CategoryDetailContent />
    </Suspense>
  );
}
