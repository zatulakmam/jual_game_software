'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Tag,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductGrid } from '@/components/products/ProductGrid';
import { formatPrice } from '@/lib/utils';
import { useCatalog } from '@/lib/catalog-context';

export default function ProductsPage() {
  const { products } = useCatalog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(150000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('popular');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category
      const matchesCategory =
        selectedCategory === 'all' || product.category_id === selectedCategory;

      // Price
      const matchesPrice = product.price <= priceRange;

      // Badge
      const matchesBadge =
        selectedBadge === 'all' || product.badge === selectedBadge;

      return matchesSearch && matchesCategory && matchesPrice && matchesBadge;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return b.sold_count - a.sold_count; // 'popular'
    });
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, selectedBadge]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange(150000);
    setSortBy('popular');
    setSelectedBadge('all');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    priceRange < 150000 ||
    sortBy !== 'popular' ||
    selectedBadge !== 'all';

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-10 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="bg-[#A78BFA] p-8 md:p-12 rounded-2xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white text-xs font-black rounded uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F9ED32]" />
              Katalog Lengkap
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#171717] uppercase tracking-tight mb-2">
              EXPLORE ALL PRODUCTS.
            </h1>
            <p className="text-sm md:text-base font-semibold text-[#171717] opacity-90 max-w-xl">
              Temukan ribuan software berlisensi resmi, game PC original, dan aset digital produktif dengan aktivasi langsung.
            </p>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#F9ED32] rounded-full border-[3px] border-[#171717] opacity-60 hidden sm:block" />
        </div>

        {/* Main Grid: Filters Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ================= SIDEBAR FILTERS ================= */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] sticky top-24 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#171717]">
                <div className="flex items-center gap-2 font-black text-base uppercase text-[#171717]">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filter & Pencarian</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs font-bold text-[#FF7547] hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">
                  Cari Nama / Tag
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ketik nama software, game..."
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-lg text-xs font-bold text-[#171717] focus:outline-none focus:ring-2 focus:ring-[#F9ED32]"
                  />
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">
                  Kategori
                </label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-between ${
                      selectedCategory === 'all'
                        ? 'bg-[#F9ED32] border-[#171717] shadow-[2px_2px_0px_#171717]'
                        : 'border-transparent hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>Semua Kategori</span>
                    <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#171717]">
                      {products.length}
                    </span>
                  </button>

                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-[#F9ED32] border-[#171717] shadow-[2px_2px_0px_#171717]'
                          : 'border-transparent hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="line-clamp-1">{cat.name}</span>
                      <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#171717]">
                        {products.filter((p) => p.category_id === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Range */}
              <div>
                <div className="flex items-center justify-between text-xs font-black uppercase text-gray-700 mb-2">
                  <span>Maksimum Harga</span>
                  <span className="text-[#FF7547]">{formatPrice(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min={15000}
                  max={150000}
                  step={5000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#171717] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-bold mt-1">
                  <span>Rp15.000</span>
                  <span>Rp150.000</span>
                </div>
              </div>

              {/* Badge Filter */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">
                  Tipe Produk
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Semua', val: 'all' },
                    { label: 'Best Seller', val: 'best-seller' },
                    { label: 'New Arrival', val: 'new-arrival' },
                    { label: 'Hot Deal', val: 'hot' },
                    { label: 'Diskon', val: 'sale' },
                  ].map((b) => (
                    <button
                      key={b.val}
                      onClick={() => setSelectedBadge(b.val)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded border-2 transition-all ${
                        selectedBadge === b.val
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'bg-gray-100 text-[#171717] border-gray-300 hover:border-[#171717]'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= PRODUCTS CONTENT ================= */}
          <div className="lg:col-span-3">
            {/* Control Bar: Total Count & Sorting */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border-[3px] border-[#171717] shadow-[3px_3px_0px_#171717] mb-6">
              <div className="flex items-center gap-2 text-xs md:text-sm font-black text-[#171717]">
                <Tag className="w-4 h-4 text-[#FF7547]" />
                <span>Menampilkan {filteredProducts.length} produk</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600 hidden sm:inline">Urutkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'newest' | 'price-low' | 'price-high' | 'popular')
                  }
                  className="px-3 py-1.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-lg text-xs font-black text-[#171717] focus:outline-none cursor-pointer"
                >
                  <option value="popular">Paling Populer</option>
                  <option value="newest">Produk Terbaru</option>
                  <option value="price-low">Harga Termurah</option>
                  <option value="price-high">Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-bold text-gray-500">Filter Aktif:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-[#55E6D1] border border-[#171717]">
                    Kategori: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')} className="ml-1 text-xs">×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-[#F9ED32] border border-[#171717]">
                    Cari: &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => setSearchQuery('')} className="ml-1 text-xs">×</button>
                  </span>
                )}
                {priceRange < 150000 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-[#A78BFA] border border-[#171717]">
                    Max: {formatPrice(priceRange)}
                    <button onClick={() => setPriceRange(150000)} className="ml-1 text-xs">×</button>
                  </span>
                )}
                {selectedBadge !== 'all' && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-[#FF7547] text-white border border-[#171717]">
                    Tipe: {selectedBadge}
                    <button onClick={() => setSelectedBadge('all')} className="ml-1 text-xs">×</button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-red-600 underline ml-2"
                >
                  Hapus Semua
                </button>
              </div>
            )}

            {/* Product Grid Component */}
            <ProductGrid products={filteredProducts} columns={3} />
          </div>
        </div>
      </div>
    </div>
  );
}
