'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Star,
  ShoppingCart,
  Zap,
  Download,
  Key,
  Share2,
  Heart,
  ChevronRight,
  ArrowLeft,
  Layers,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { CATEGORIES } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { ProductCard } from '@/components/products/ProductCard';
import { useCatalog } from '@/lib/catalog-context';

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { products } = useCatalog();

  const product = products.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);

  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.cover_image || ''
  );

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="bg-white p-8 rounded-2xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] max-w-md">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-black text-[#171717] mb-2 uppercase">Produk Tidak Ditemukan</h1>
          <p className="text-sm text-gray-600 mb-6 font-medium">
            Produk yang kamu cari mungkin telah dihapus atau tautan tidak valid.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F9ED32] text-[#171717] font-black text-sm rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.category_id);
  const relatedProducts = products.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`${product.name} berhasil ditambahkan ke keranjang!`, {
      style: {
        border: '2px solid #171717',
        borderRadius: '8px',
        boxShadow: '4px 4px 0px #171717',
        background: '#F9ED32',
        color: '#171717',
        fontWeight: 'bold',
      },
      icon: '🛒',
    });
  };

  const handleBuyNow = () => {
    addItem(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-8 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#171717]">Beranda</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/products" className="hover:text-[#171717]">Produk</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          {category && (
            <>
              <Link href={`/categories/${category.slug}`} className="hover:text-[#171717]">
                {category.name}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            </>
          )}
          <span className="text-[#171717] font-black truncate max-w-xs">{product.name}</span>
        </nav>

        {/* ================= PRODUCT HERO CARD ================= */}
        <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] p-6 lg:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Gallery */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative w-full h-72 sm:h-96 rounded-2xl border-[3px] border-[#171717] overflow-hidden bg-[#F5F0E8] shadow-[4px_4px_0px_#171717]">
                <img
                  src={selectedImage || product.cover_image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge variant={product.badge} />
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-1">
                {[product.cover_image, ...(product.images || [])].map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all ${
                      (selectedImage || product.cover_image) === imgUrl
                        ? 'border-[#171717] ring-2 ring-[#F9ED32] shadow-[2px_2px_0px_#171717]'
                        : 'border-gray-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Purchase Status */}
              <div className="bg-[#F5F0E8] p-4 rounded-xl border-2 border-[#171717] flex items-start gap-3 mt-2">
                <Info className="w-6 h-6 text-[#171717] flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-black text-[#171717] uppercase">Info Pembelian</p>
                  <p className="text-gray-700 font-medium mt-0.5">
                    Checkout masih simulasi. Pembayaran, pengiriman lisensi, dan unduhan belum diproses.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Info & Purchase Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <Link
                    href={`/categories/${category?.slug || 'software'}`}
                    className="inline-block px-3 py-1 bg-[#55E6D1] text-[#171717] border border-[#171717] rounded-md text-xs font-black uppercase tracking-wider hover:opacity-90"
                  >
                    {category?.name || 'Digital Asset'}
                  </Link>

                  <div className="flex items-center gap-1.5 bg-[#F9ED32] px-2.5 py-1 rounded-md border border-[#171717] text-xs font-black text-[#171717]">
                    {product.review_count > 0 ? (
                      <>
                        <Star className="w-4 h-4 fill-[#171717] text-[#171717]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-gray-700 font-medium">({product.review_count} ulasan)</span>
                      </>
                    ) : (
                      <span className="text-gray-700 font-medium">Belum ada ulasan</span>
                    )}
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-700 font-medium">{product.sold_count} terjual</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight leading-tight mb-4">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 p-4 bg-[#F5F0E8] rounded-xl border-2 border-[#171717] mb-6 shadow-[3px_3px_0px_#171717]">
                  <span className="text-3xl sm:text-4xl font-black text-[#171717]">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && product.original_price > product.price && (
                    <span className="text-base text-gray-500 line-through font-bold">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                  {product.discount_percentage && (
                    <span className="text-xs font-black bg-[#FF7547] text-white px-2 py-0.5 rounded border border-[#171717]">
                      Hemat {product.discount_percentage}%
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-sm text-gray-800 font-medium leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Quick Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  <div className="p-3 bg-[#F5F0E8] rounded-lg border border-[#171717]">
                    <span className="block text-[10px] font-bold uppercase text-gray-500">Platform</span>
                    <span className="text-xs font-black text-[#171717]">{product.platform.join(', ')}</span>
                  </div>
                  <div className="p-3 bg-[#F5F0E8] rounded-lg border border-[#171717]">
                    <span className="block text-[10px] font-bold uppercase text-gray-500">Tipe Lisensi</span>
                    <span className="text-xs font-black text-[#171717]">{product.license_type}</span>
                  </div>
                  <div className="p-3 bg-[#F5F0E8] rounded-lg border border-[#171717]">
                    <span className="block text-[10px] font-bold uppercase text-gray-500">Ukuran / Versi</span>
                    <span className="text-xs font-black text-[#171717]">
                      {product.file_size || 'Cloud / Serial'} ({product.version || 'Latest'})
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase Action Buttons */}
              <div className="pt-6 border-t-2 border-[#171717]">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-base rounded-xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider"
                  >
                    <Zap className="w-5 h-5 fill-[#171717]" />
                    <span>Beli Sekarang</span>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-white hover:bg-gray-100 text-[#171717] font-black text-base rounded-xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>+ Masukkan Keranjang</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ================= TABS: DESCRIPTION, SPECS, REVIEWS ================= */}
        <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] p-6 lg:p-8 mb-16">
          {/* Tab Navigation */}
          <div className="flex border-b-[3px] border-[#171717] gap-2 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 px-5 text-sm font-black uppercase tracking-wider border-b-4 transition-all -mb-[3px] ${
                activeTab === 'desc'
                  ? 'border-[#171717] text-[#171717] bg-[#F9ED32]'
                  : 'border-transparent text-gray-500 hover:text-[#171717]'
              }`}
            >
              Deskripsi & Fitur
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 px-5 text-sm font-black uppercase tracking-wider border-b-4 transition-all -mb-[3px] ${
                activeTab === 'specs'
                  ? 'border-[#171717] text-[#171717] bg-[#55E6D1]'
                  : 'border-transparent text-gray-500 hover:text-[#171717]'
              }`}
            >
              Spesifikasi & Kompatibilitas
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-5 text-sm font-black uppercase tracking-wider border-b-4 transition-all -mb-[3px] ${
                activeTab === 'reviews'
                  ? 'border-[#171717] text-[#171717] bg-[#A78BFA]'
                  : 'border-transparent text-gray-500 hover:text-[#171717]'
              }`}
            >
              Ulasan Pelanggan ({product.review_count})
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'desc' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-[#171717] mb-3 uppercase">Tentang Produk</h3>
                <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium">
                  {product.long_description || product.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-black text-[#171717] mb-4 uppercase">Fitur Utama</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-[#F5F0E8] rounded-xl border-2 border-[#171717]"
                    >
                      <div className="w-6 h-6 rounded-md bg-[#F9ED32] border border-[#171717] flex items-center justify-center font-bold text-xs flex-shrink-0">
                        ✓
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#171717]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specs */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-[#171717] mb-4 uppercase">Detail Spesifikasi</h3>
              <div className="border-2 border-[#171717] rounded-xl overflow-hidden">
                <table className="w-full text-xs sm:text-sm text-left">
                  <tbody className="divide-y-2 divide-[#171717]">
                    <tr className="bg-[#F5F0E8]">
                      <td className="p-3 font-black text-[#171717] w-1/3">Kompatibilitas</td>
                      <td className="p-3 font-semibold text-gray-800">{product.compatibility}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-black text-[#171717]">Sistem Operasi</td>
                      <td className="p-3 font-semibold text-gray-800">{product.platform.join(', ')}</td>
                    </tr>
                    <tr className="bg-[#F5F0E8]">
                      <td className="p-3 font-black text-[#171717]">Jenis Lisensi</td>
                      <td className="p-3 font-semibold text-gray-800">{product.license_type}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-black text-[#171717]">Versi Produk</td>
                      <td className="p-3 font-semibold text-gray-800">{product.version || 'Versi Rilis Terbaru'}</td>
                    </tr>
                    <tr className="bg-[#F5F0E8]">
                      <td className="p-3 font-black text-[#171717]">Ukuran File</td>
                      <td className="p-3 font-semibold text-gray-800">{product.file_size || 'Digital Key (Akses Langsung)'}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-black text-[#171717]">Mekanisme Pengiriman</td>
                      <td className="p-3 font-semibold text-gray-800">Terkirim otomatis ke Dashboard Pengguna & Email</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#171717] uppercase">Ulasan Pembeli Terverifikasi</h3>
                  <p className="text-xs text-gray-600 font-medium">
                    {product.review_count > 0
                      ? `Rating rata-rata: ${product.rating} dari 5.0 bintang`
                      : 'Belum ada ulasan untuk produk ini.'}
                  </p>
                </div>
              </div>

              {/* Review List */}
              <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center text-sm font-bold text-gray-500">
                Belum ada ulasan pelanggan.
              </div>
            </div>
          )}
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#171717] uppercase tracking-tight">
                PRODUK TERKAIT LAINNYA.
              </h2>
              <Link
                href={`/categories/${category?.slug || 'software'}`}
                className="text-xs font-bold text-[#171717] hover:underline"
              >
                Lihat di Kategori Ini →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F0E8]">
          <div className="w-10 h-10 border-4 border-[#171717] border-t-[#F9ED32] rounded-full animate-spin" />
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}
