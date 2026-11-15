'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  CreditCard,
  Headphones,
  Flame,
  CheckCircle2,
  Download,
  Star,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/products/CategoryCard';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category_id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F5F0E8] overflow-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative border-b-[3px] border-[#171717] bg-[#F5F0E8] px-4 py-12 md:py-20 lg:py-28 overflow-hidden">
        {/* Decorative Floating Neo-Brutalist Shapes */}
        <div className="absolute top-6 left-8 w-14 h-14 bg-[#FF7547] rounded-full border-2 border-[#171717] shadow-[3px_3px_0px_#171717] opacity-80 hidden md:block" />
        <div className="absolute top-20 right-12 w-20 h-20 bg-[#55E6D1] rotate-12 rounded-lg border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] opacity-80 hidden lg:block" />
        <div className="absolute bottom-8 left-1/4 w-10 h-10 bg-[#A78BFA] -rotate-6 rounded-md border-2 border-[#171717] shadow-[3px_3px_0px_#171717] hidden sm:block" />

        {/* Decorative Stars */}
        <div className="absolute top-1/3 right-1/3 text-3xl font-black text-[#F9ED32] drop-shadow-[2px_2px_0px_#171717] select-none">
          ✦
        </div>
        <div className="absolute bottom-16 right-16 text-4xl font-black text-[#FF7547] drop-shadow-[2px_2px_0px_#171717] select-none">
          ★
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F9ED32] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] mb-6">
                <Sparkles className="w-4 h-4 text-[#171717]" />
                <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#171717]">
                  DIGITAL GOODS ONLY · INSTANT DELIVERY
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#171717] tracking-tight leading-[1.05] uppercase mb-6">
                YOUR DIGITAL <br />
                <span className="relative inline-block">
                  <span className="relative z-10 px-2 bg-[#F9ED32] border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] rounded-lg -rotate-1 inline-block">
                    WORLD STARTS
                  </span>
                </span>{' '}
                <br />
                HERE.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl font-medium text-gray-800 max-w-xl mb-8 leading-relaxed">
                Discover software, games, and digital essentials. Everything you need, all in one place with instant license activation and trusted guarantees.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/products"
                  className="flex items-center gap-2 px-7 py-4 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] text-base md:text-lg font-black rounded-xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] hover:shadow-[7px_7px_0px_#171717] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  href="/categories"
                  className="flex items-center gap-2 px-6 py-4 bg-white hover:bg-gray-100 text-[#171717] text-base md:text-lg font-black rounded-xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] hover:shadow-[7px_7px_0px_#171717] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <Layers className="w-5 h-5" />
                  <span>Browse Categories</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t-2 border-dashed border-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#55E6D1] border-2 border-[#171717] flex items-center justify-center font-black text-xs">
                    ✓
                  </div>
                  <span className="text-xs md:text-sm font-bold text-[#171717]">100% Produk Legal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#A78BFA] border-2 border-[#171717] flex items-center justify-center font-black text-xs">
                    ⚡
                  </div>
                  <span className="text-xs md:text-sm font-bold text-[#171717]">Pengiriman Otomatis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FF7547] border-2 border-[#171717] flex items-center justify-center font-black text-xs">
                    🛡️
                  </div>
                  <span className="text-xs md:text-sm font-bold text-[#171717]">Garansi 30 Hari</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Showcase Card */}
                <div className="bg-white rounded-2xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] p-5 relative z-10">
                  {/* Window Bar */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#171717]">
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#FF7547] border border-[#171717]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#F9ED32] border border-[#171717]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#55E6D1] border border-[#171717]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider bg-[#A78BFA] px-2 py-0.5 rounded border border-[#171717]">
                      PROMO SPESIAL
                    </span>
                  </div>

                  {/* Product Highlight Banner */}
                  <div className="relative h-40 w-full rounded-xl border-2 border-[#171717] overflow-hidden mb-4 bg-gray-100">
                    <img
                      src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop"
                      alt="Windows 11 Pro"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#F9ED32] text-[#171717] text-xs font-black px-2.5 py-1 rounded border-2 border-[#171717] shadow-[2px_2px_0px_#171717]">
                      🔥 TERLARIS
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-gray-500">Software & OS</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-[#171717]">
                        <Star className="w-3.5 h-3.5 fill-[#F9ED32] text-[#171717]" />
                        <span>4.9 (1.2k+ reviews)</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-[#171717]">
                      Windows 11 Pro Retail License
                    </h3>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-xs text-gray-400 line-through mr-2 font-bold">Rp120.000</span>
                        <span className="text-2xl font-black text-[#171717]">Rp85.000</span>
                      </div>
                      <Link
                        href="/products/windows-11-pro-license"
                        className="px-4 py-2 bg-[#55E6D1] hover:bg-[#40d2be] text-[#171717] text-xs font-black rounded-lg border-2 border-[#171717] shadow-[3px_3px_0px_#171717] transition-all"
                      >
                        Beli Sekarang
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 - Top Left */}
                <div className="absolute -top-6 -left-6 bg-[#A78BFA] text-[#171717] p-3 rounded-xl border-2 border-[#171717] shadow-[4px_4px_0px_#171717] z-20 rotate-[-8deg] hidden sm:block">
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase">Download Instan</p>
                      <p className="text-xs font-black">Langsung Aktif</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2 - Bottom Right */}
                <div className="absolute -bottom-6 -right-4 bg-[#55E6D1] text-[#171717] p-3 rounded-xl border-2 border-[#171717] shadow-[4px_4px_0px_#171717] z-20 rotate-[6deg]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase">Keamanan</p>
                      <p className="text-xs font-black">100% Terverifikasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== RUNNING MARQUEE TICKER ===================== */}
      <div className="border-b-[3px] border-[#171717] bg-[#171717] py-3.5 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-[#F9ED32] font-black text-sm md:text-base tracking-widest uppercase">
              <span>SOFTWARE & APPS</span>
              <span>✦</span>
              <span>PC GAMES & STEAM</span>
              <span>✦</span>
              <span>PRODUCTIVITY TOOLS</span>
              <span>✦</span>
              <span>NOTION TEMPLATES</span>
              <span>✦</span>
              <span>DEVELOPER UTILITIES</span>
              <span>✦</span>
              <span>DESIGN ASSETS</span>
              <span>✦</span>
              <span>INSTANT DELIVERY 24/7</span>
              <span>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== CATEGORIES SECTION ===================== */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-[#55E6D1] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] rounded font-black text-xs uppercase mb-3">
              KATEGORI PRODUK
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#171717] uppercase tracking-tight">
              EXPLORE BY CATEGORY.
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-black text-sm md:text-base text-[#171717] hover:text-[#FF7547] underline underline-offset-4 decoration-2"
          >
            <span>Lihat Semua Kategori ({CATEGORIES.length})</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS SECTION ===================== */}
      <section className="py-16 md:py-24 px-4 bg-white border-y-[3px] border-[#171717]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-[#FF7547] text-white border-2 border-[#171717] shadow-[2px_2px_0px_#171717] rounded font-black text-xs uppercase mb-3">
                KATALOG UNGGULAN
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight">
                FRESH DROPS. <br className="hidden sm:inline" />
                <span className="bg-[#F9ED32] px-2 border-2 border-[#171717] shadow-[3px_3px_0px_#171717] rounded inline-block">
                  DIGITAL GOODS.
                </span>
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 text-xs md:text-sm font-black rounded-lg border-2 border-[#171717] transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-[#171717] text-white shadow-[3px_3px_0px_#F9ED32]'
                    : 'bg-[#F5F0E8] text-[#171717] hover:bg-gray-200 shadow-[2px_2px_0px_#171717]'
                }`}
              >
                Semua Produk
              </button>
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs md:text-sm font-black rounded-lg border-2 border-[#171717] transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#171717] text-white shadow-[3px_3px_0px_#F9ED32]'
                      : 'bg-[#F5F0E8] text-[#171717] hover:bg-gray-200 shadow-[2px_2px_0px_#171717]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center pt-6">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] text-base font-black rounded-xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] hover:shadow-[7px_7px_0px_#171717] hover:-translate-y-1 transition-all"
            >
              <span>Jelajahi Seluruh Katalog ({PRODUCTS.length}+ Produk)</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== WHY PIXELSTORE (FEATURES) ===================== */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-[#A78BFA] text-[#171717] border-2 border-[#171717] shadow-[2px_2px_0px_#171717] rounded font-black text-xs uppercase mb-3">
            MENGAPA PIXELSTORE?
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171717] uppercase tracking-tight mb-4">
            TRANSAKSI CEPAT, AMAN, DAN TANPA RIBET.
          </h2>
          <p className="text-base text-gray-700 font-medium">
            Platform modern yang dirancang khusus untuk kenyamanan transaksi produk digital Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#F9ED32] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center mb-5">
              <Zap className="w-7 h-7 text-[#171717]" />
            </div>
            <h3 className="font-black text-xl text-[#171717] mb-2">Instant Delivery</h3>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Akses file unduhan dan lisensi serial langsung terbuka otomatis setelah pembayaran terverifikasi.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#55E6D1] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center mb-5">
              <ShieldCheck className="w-7 h-7 text-[#171717]" />
            </div>
            <h3 className="font-black text-xl text-[#171717] mb-2">100% Genuine & Safe</h3>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Semua produk dicek dan diverifikasi legalitasnya. Bebas virus, malware, dan resiko keamanan.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#FF7547] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center mb-5 text-white">
              <CreditCard className="w-7 h-7 text-[#171717]" />
            </div>
            <h3 className="font-black text-xl text-[#171717] mb-2">Metode Lokal</h3>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Bayar mudah menggunakan QRIS (semua bank & e-wallet), BCA, Mandiri, BNI, GoPay, OVO, dan DANA.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white rounded-xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] hover:-translate-y-1 transition-all">
            <div className="w-14 h-14 rounded-xl bg-[#A78BFA] border-2 border-[#171717] shadow-[3px_3px_0px_#171717] flex items-center justify-center mb-5">
              <Headphones className="w-7 h-7 text-[#171717]" />
            </div>
            <h3 className="font-black text-xl text-[#171717] mb-2">Dukungan 24/7</h3>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Tim support siap membantu kendala instalasi lisensi dan aktivasi software Anda kapan pun dibutuhkan.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== STATS BANNER ===================== */}
      <section className="bg-[#171717] text-white border-y-[3px] border-[#171717] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 border-2 border-dashed border-gray-700 rounded-xl">
              <p className="text-3xl md:text-5xl font-black text-[#F9ED32] mb-1">10.000+</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300">
                Produk Terjual
              </p>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-700 rounded-xl">
              <p className="text-3xl md:text-5xl font-black text-[#55E6D1] mb-1">5.000+</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300">
                Pelanggan Puas
              </p>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-700 rounded-xl">
              <p className="text-3xl md:text-5xl font-black text-[#FF7547] mb-1">99.9%</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300">
                Aktivasi Berhasil
              </p>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-700 rounded-xl">
              <p className="text-3xl md:text-5xl font-black text-[#A78BFA] mb-1">7+</p>
              <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300">
                Kategori Digital
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION ===================== */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-center">
        <div className="bg-[#F9ED32] p-8 md:p-14 rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-[#171717] text-white rounded font-black text-xs uppercase mb-4">
              SIAP MEMULAI?
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#171717] uppercase tracking-tight mb-6">
              UPGRADE PERANGKAT DIGITALMU SEKARANG.
            </h2>
            <p className="text-base sm:text-lg text-[#171717] font-medium max-w-2xl mx-auto mb-8">
              Dapatkan lisensi original, tool produktivitas terkini, dan game favorit dengan harga terbaik serta proteksi garansi penuh.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-[#171717] hover:bg-gray-800 text-white font-black text-base rounded-xl border-2 border-[#171717] shadow-[4px_4px_0px_#fff] hover:-translate-y-1 transition-all"
              >
                Buka Katalog Lengkap
              </Link>
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-white hover:bg-gray-100 text-[#171717] font-black text-base rounded-xl border-2 border-[#171717] shadow-[4px_4px_0px_#171717] hover:-translate-y-1 transition-all"
              >
                Buat Akun Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
