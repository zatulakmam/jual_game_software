'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Tag,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    discountType: 'percent' | 'fixed';
    value: number;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F5F0E8]">
        <div className="w-10 h-10 border-4 border-[#171717] border-t-[#F9ED32] rounded-full animate-spin" />
      </div>
    );
  }

  const subtotal = getTotal();

  // Voucher calculation
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.round((subtotal * appliedVoucher.value) / 100);
    } else {
      discountAmount = appliedVoucher.value;
    }
  }
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherCode.trim().toUpperCase();

    if (!code) return;

    if (code === 'PIXEL20') {
      setAppliedVoucher({ code: 'PIXEL20', discountType: 'percent', value: 20 });
      toast.success('Voucher diskon 20% berhasil diterapkan!', {
        style: {
          border: '2px solid #171717',
          background: '#F9ED32',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
        },
      });
    } else if (code === 'NEWUSER') {
      setAppliedVoucher({ code: 'NEWUSER', discountType: 'fixed', value: 10000 });
      toast.success('Voucher Rp10.000 pengguna baru berhasil diterapkan!', {
        style: {
          border: '2px solid #171717',
          background: '#55E6D1',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
        },
      });
    } else {
      toast.error('Kode voucher tidak valid atau sudah kadaluarsa', {
        style: {
          border: '2px solid #171717',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
        },
      });
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherCode('');
    toast('Voucher dihapus', { icon: 'ℹ️' });
  };

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F5F0E8]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="bg-white p-8 sm:p-12 rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] max-w-lg text-center">
          <div className="w-20 h-20 bg-[#F9ED32] rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-[#171717]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#171717] uppercase tracking-tight mb-2">
            Keranjangmu Masih Kosong
          </h1>
          <p className="text-sm text-gray-600 font-medium mb-8">
            Belum ada produk digital yang kamu tambahkan. Jelajahi katalog kami dan temukan software atau game terbaik!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-base rounded-xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] hover:-translate-y-0.5 transition-all"
          >
            <span>Mulai Belanja</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-10 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-[#F9ED32] text-[#171717] border border-[#171717] rounded text-xs font-black uppercase mb-2">
              SHOPPING CART
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#171717] uppercase tracking-tight">
              KERANJANG BELANJA ({items.length} ITEM)
            </h1>
          </div>

          <button
            onClick={() => {
              if (confirm('Yakin ingin mengosongkan keranjang?')) {
                clearCart();
                toast('Keranjang dikosongkan', { icon: '🗑️' });
              }
            }}
            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Kosongkan Keranjang
          </button>
        </div>

        {/* Layout Split: Left Items, Right Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] p-4 sm:p-6 flex flex-col sm:flex-row gap-5 items-center justify-between"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-[#171717] overflow-hidden flex-shrink-0 bg-[#F5F0E8]">
                    <img
                      src={product.cover_image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[11px] font-black uppercase bg-[#55E6D1] px-2 py-0.5 rounded border border-[#171717]">
                      {product.license_type}
                    </span>
                    <Link href={`/products/${product.slug}`} className="block mt-1">
                      <h3 className="font-black text-base sm:text-lg text-[#171717] hover:text-[#FF7547] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 font-medium">Platform: {product.platform.join(', ')}</p>
                    <p className="text-sm font-black text-[#171717] mt-2">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                {/* Right: Quantity Controls & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-200">
                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-[#F5F0E8] border-2 border-[#171717] rounded-lg shadow-[2px_2px_0px_#171717]">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 hover:bg-gray-200 text-[#171717] disabled:opacity-30"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-[#171717]">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 hover:bg-gray-200 text-[#171717] disabled:opacity-30"
                      disabled={quantity >= 5}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtotal Item */}
                  <div className="text-right min-w-[90px]">
                    <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                    <p className="text-base font-black text-[#171717]">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      removeItem(product.id);
                      toast('Produk dihapus dari keranjang', { icon: '🗑️' });
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Hapus Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Back to Products */}
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-black text-[#171717] hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Tambah Produk Digital Lainnya
              </Link>
            </div>
          </div>

          {/* ================= RIGHT: ORDER SUMMARY ================= */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] p-6 sticky top-24 space-y-6">
              <h2 className="text-xl font-black text-[#171717] uppercase pb-4 border-b-2 border-[#171717]">
                Ringkasan Belanja
              </h2>

              {/* Subtotal */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between font-bold text-gray-700">
                  <span>Subtotal ({items.length} item)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                {appliedVoucher && (
                  <div className="flex justify-between font-bold text-green-700 bg-green-50 p-2 rounded-lg border border-green-300">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Diskon ({appliedVoucher.code})
                    </span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between font-bold text-gray-700">
                  <span>Biaya Layanan & Pengiriman</span>
                  <span className="text-green-600 uppercase font-black">Gratis (Instan)</span>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-gray-300 flex justify-between items-baseline">
                  <span className="text-base font-black text-[#171717]">Total Pembayaran</span>
                  <span className="text-2xl font-black text-[#171717]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Voucher Form */}
              <div className="pt-2">
                <label className="block text-xs font-black uppercase text-gray-700 mb-2">
                  Punya Kode Voucher?
                </label>
                {appliedVoucher ? (
                  <div className="flex items-center justify-between p-3 bg-[#55E6D1] rounded-xl border-2 border-[#171717]">
                    <div>
                      <p className="text-xs font-black text-[#171717]">{appliedVoucher.code} Aktif</p>
                      <p className="text-[11px] font-bold text-[#171717] opacity-80">
                        Hemat {formatPrice(discountAmount)}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveVoucher}
                      className="text-xs font-black text-red-600 hover:underline"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyVoucher} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Contoh: PIXEL20"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="flex-1 px-3 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-black text-[#171717] uppercase placeholder:normal-case focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5"
                    >
                      Terapkan
                    </button>
                  </form>
                )}
                <p className="text-[10px] text-gray-500 font-bold mt-1.5">
                  Coba kode promo demo: <code className="bg-gray-100 px-1 py-0.5 rounded text-[#171717]">PIXEL20</code> atau{' '}
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-[#171717]">NEWUSER</code>
                </p>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-base rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider"
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="space-y-2 pt-2 border-t border-gray-200 text-xs font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Enkripsi checkout 256-bit aman</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#FF7547]" />
                  <span>File & serial langsung tersedia di akun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
