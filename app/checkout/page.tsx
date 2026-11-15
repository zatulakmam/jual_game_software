'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  ArrowRight,
  ArrowLeft,
  Copy,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

type PaymentMethodType = 'qris' | 'bca' | 'mandiri' | 'gopay' | 'dana';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Steps: 1 = Form & Payment, 2 = Success Confirmation
  const [step, setStep] = useState<1 | 2>(1);

  // Buyer Info Form State
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('qris');
  const [isProcessing, setIsProcessing] = useState(false);

  // Confirmed Order State
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderId: string;
    total: number;
    items: typeof items;
    paymentMethod: string;
    date: string;
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

  // If cart is empty and not on step 2, redirect or prompt
  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F5F0E8]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <div className="bg-white p-8 rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] max-w-md text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-2xl font-black text-[#171717] mb-2 uppercase">Keranjang Belanja Kosong</h1>
          <p className="text-sm text-gray-600 mb-6 font-medium">
            Silakan pilih produk digital terlebih dahulu sebelum melakukan checkout.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F9ED32] text-[#171717] font-black text-sm rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717]"
          >
            Buka Katalog Produk
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const total = subtotal;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName || !buyerEmail || !buyerPhone) {
      toast.error('Mohon lengkapi semua data pembeli');
      return;
    }

    setIsProcessing(true);

    // This only completes the local checkout simulation.
    setTimeout(() => {
      const orderId = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmedOrder({
        orderId,
        total,
        items: [...items],
        paymentMethod: paymentMethod.toUpperCase(),
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      });

      clearCart();
      setIsProcessing(false);
      setStep(2);

      toast.success('Simulasi checkout selesai. Transaksi belum dicatat.', {
        style: {
          border: '2px solid #171717',
          background: '#55E6D1',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
        },
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-10 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        {/* ================= STEP 1: CHECKOUT FORM & PAYMENT ================= */}
        {step === 1 && (
          <div>
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-xs font-black text-gray-600 hover:text-[#171717] mb-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Keranjang
              </Link>
              <h1 className="text-3xl md:text-5xl font-black text-[#171717] uppercase tracking-tight">
                CHECKOUT PRODUK DIGITAL.
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form & Payment Choice */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Buyer Information */}
                <div className="bg-white p-6 rounded-3xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717]">
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b-2 border-[#171717]">
                    <div className="w-8 h-8 rounded-lg bg-[#F9ED32] border-2 border-[#171717] flex items-center justify-center font-black text-xs">
                      1
                    </div>
                    <h2 className="text-lg font-black uppercase text-[#171717]">
                      Informasi Pembeli & Akun
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                        Alamat Email (Pengiriman Lisensi)
                      </label>
                      <input
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-none"
                      />
                      <p className="text-[10px] text-gray-500 font-bold mt-1">
                        Email ini hanya untuk simulasi; tidak ada lisensi atau tautan unduhan yang dikirim.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                        Nomor WhatsApp / Telepon
                      </label>
                      <input
                        type="tel"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method */}
                <div className="bg-white p-6 rounded-3xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717]">
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b-2 border-[#171717]">
                    <div className="w-8 h-8 rounded-lg bg-[#55E6D1] border-2 border-[#171717] flex items-center justify-center font-black text-xs">
                      2
                    </div>
                    <h2 className="text-lg font-black uppercase text-[#171717]">
                      Pilih Opsi Simulasi
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {/* QRIS */}
                    <label
                      onClick={() => setPaymentMethod('qris')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'qris'
                          ? 'bg-[#F9ED32] border-[#171717] shadow-[3px_3px_0px_#171717]'
                          : 'bg-[#F5F0E8] border-gray-300 hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <QrCode className="w-6 h-6 text-[#171717]" />
                        <div>
                          <p className="text-xs font-black text-[#171717]">QRIS (Semua Bank & E-Wallet)</p>
                          <p className="text-[10px] font-bold text-gray-600">BCA, Mandiri, GoPay, OVO, ShopeePay</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase bg-[#171717] text-white px-2 py-0.5 rounded">
                        OTOMATIS
                      </span>
                    </label>

                    {/* BCA Virtual Account */}
                    <label
                      onClick={() => setPaymentMethod('bca')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'bca'
                          ? 'bg-[#F9ED32] border-[#171717] shadow-[3px_3px_0px_#171717]'
                          : 'bg-[#F5F0E8] border-gray-300 hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-[#171717]" />
                        <div>
                          <p className="text-xs font-black text-[#171717]">BCA Virtual Account</p>
                          <p className="text-[10px] font-bold text-gray-600">Simulasi pembayaran</p>
                        </div>
                      </div>
                    </label>

                    {/* Mandiri VA */}
                    <label
                      onClick={() => setPaymentMethod('mandiri')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'mandiri'
                          ? 'bg-[#F9ED32] border-[#171717] shadow-[3px_3px_0px_#171717]'
                          : 'bg-[#F5F0E8] border-gray-300 hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-[#171717]" />
                        <div>
                          <p className="text-xs font-black text-[#171717]">Mandiri Virtual Account</p>
                          <p className="text-[10px] font-bold text-gray-600">Simulasi pembayaran</p>
                        </div>
                      </div>
                    </label>

                    {/* GoPay */}
                    <label
                      onClick={() => setPaymentMethod('gopay')}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === 'gopay'
                          ? 'bg-[#F9ED32] border-[#171717] shadow-[3px_3px_0px_#171717]'
                          : 'bg-[#F5F0E8] border-gray-300 hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="w-6 h-6 text-[#171717]" />
                        <div>
                          <p className="text-xs font-black text-[#171717]">GoPay / GoPay Later</p>
                          <p className="text-[10px] font-bold text-gray-600">Simulasi pembayaran</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Payment Gateway Notice */}
                  <div className="mt-4 p-3 bg-[#F5F0E8] rounded-xl border border-dashed border-[#171717] text-[11px] text-gray-600 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF7547] flex-shrink-0" />
                    <span>
                      Pembayaran belum aktif. Checkout ini hanya simulasi dan tidak membuat transaksi atau mengirim lisensi.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary & Confirmation Button */}
              <div className="lg:col-span-5">
                <div className="bg-white p-6 rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] sticky top-24 space-y-6">
                  <h2 className="text-xl font-black text-[#171717] uppercase pb-3 border-b-2 border-[#171717]">
                    Ringkasan Pesanan
                  </h2>

                  {/* Items list */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-gray-100">
                    {items.map(({ product, quantity }) => (
                      <div key={product.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={product.cover_image}
                            alt={product.name}
                            className="w-10 h-10 rounded border border-[#171717] object-cover"
                          />
                          <div>
                            <p className="font-black text-[#171717] line-clamp-1">{product.name}</p>
                            <p className="text-gray-500 font-semibold">Qty: {quantity}</p>
                          </div>
                        </div>
                        <span className="font-black text-[#171717]">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total calculation */}
                  <div className="pt-4 border-t-2 border-dashed border-gray-300 space-y-2 text-xs font-bold text-gray-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pengiriman Digital</span>
                      <span className="text-green-600 font-black">GRATIS</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                      <span className="text-base font-black text-[#171717]">Total Tagihan</span>
                      <span className="text-2xl font-black text-[#171717]">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleProcessPayment}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-base rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-[#171717] border-t-transparent rounded-full animate-spin" />
                        <span>Memproses Transaksi...</span>
                      </div>
                    ) : (
                      <>
                        <span>Lanjutkan Simulasi ({formatPrice(total)})</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-gray-500 text-center font-medium">
                    Dengan menekan tombol di atas, kamu menyetujui Ketentuan Layanan Sinzo Store.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CONFIRMATION / SUCCESS ================= */}
        {step === 2 && confirmedOrder && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] text-center">
              {/* Success Badge */}
              <div className="w-20 h-20 bg-[#55E6D1] rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#171717]" />
              </div>

              <div className="inline-block px-3 py-1 bg-[#F9ED32] text-[#171717] rounded border border-[#171717] text-xs font-black uppercase mb-3">
                SIMULASI CHECKOUT
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight mb-2">
                SIMULASI SELESAI
              </h1>
              <p className="text-sm text-gray-600 font-semibold mb-8">
                Belum ada pembayaran, pesanan, atau lisensi yang dibuat. Transaksi baru akan tercatat setelah sistem pembayaran aktif.
              </p>

              {/* Order Info Box */}
              <div className="bg-[#F5F0E8] p-5 rounded-2xl border-2 border-[#171717] text-left mb-8 space-y-3">
                <div className="flex justify-between text-xs font-bold border-b border-gray-300 pb-2">
                  <span className="text-gray-500 uppercase">Nomor Simulasi</span>
                  <span className="font-mono font-black text-[#171717]">{confirmedOrder.orderId}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-gray-300 pb-2">
                  <span className="text-gray-500 uppercase">Metode Pilihan</span>
                  <span className="font-black text-[#171717]">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-xs font-bold border-b border-gray-300 pb-2">
                  <span className="text-gray-500 uppercase">Waktu Simulasi</span>
                  <span className="font-semibold text-[#171717]">{confirmedOrder.date}</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500 uppercase">Total Harga Simulasi</span>
                  <span className="font-black text-[#171717] text-sm">
                    {formatPrice(confirmedOrder.total)}
                  </span>
                </div>
              </div>

              {/* Next Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-sm rounded-xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Dashboard</span>
                </Link>

                <Link
                  href="/products"
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-white hover:bg-gray-100 text-[#171717] font-black text-sm rounded-xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] uppercase tracking-wider"
                >
                  <span>Belanja Lagi</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
