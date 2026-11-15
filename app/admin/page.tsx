'use client';

import Link from 'next/link';
import {
  Package,
  Users,
  ShoppingBag,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

export default function AdminDashboardPage() {
  return (
    <div className="p-6 lg:p-10 space-y-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-[#171717] text-white rounded text-xs font-black uppercase mb-2">
            ADMINISTRATOR OVERVIEW
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-[#171717] uppercase tracking-tight">
            DASHBOARD STATISTIK PENJUALAN
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider"
          >
            + Tambah Produk Baru
          </Link>
        </div>
      </div>

      {/* ================= 4 KPI STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Revenue */}
        <div className="bg-[#F9ED32] p-6 rounded-2xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase text-[#171717] tracking-wider">
              Total Pendapatan
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#171717] text-white flex items-center justify-center font-bold text-xs">
              Rp
            </div>
          </div>
          <div className="text-2xl lg:text-3xl font-black text-[#171717] mb-2">
            {formatPrice(0)}
          </div>
          <div className="text-xs font-black text-green-900">
            Belum ada transaksi
          </div>
        </div>

        {/* Card 2: Total Products */}
        <div className="bg-[#A78BFA] p-6 rounded-2xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase text-[#171717] tracking-wider">
              Total Produk Digital
            </span>
            <Package className="w-6 h-6 text-[#171717]" />
          </div>
          <div className="text-2xl lg:text-3xl font-black text-[#171717] mb-2">
            {PRODUCTS.length} Item
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-[#171717]">
            <span>{CATEGORIES.length} kategori tersedia</span>
          </div>
        </div>

        {/* Card 3: Total Customers */}
        <div className="bg-[#55E6D1] p-6 rounded-2xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase text-[#171717] tracking-wider">
              Total Pembeli
            </span>
            <Users className="w-6 h-6 text-[#171717]" />
          </div>
          <div className="text-2xl lg:text-3xl font-black text-[#171717] mb-2">
            0 User
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-[#171717]">
            <span>Belum ada data pelanggan</span>
          </div>
        </div>

        {/* Card 4: Total Orders */}
        <div className="bg-[#FF7547] p-6 rounded-2xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider">
              Total Transaksi
            </span>
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl lg:text-3xl font-black mb-2">
            0 Pesanan
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black">
            <span>Belum ada transaksi</span>
          </div>
        </div>
      </div>

      {/* ================= RECHARTS SALES CHART ================= */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-[#171717]">
          <div>
            <h2 className="text-xl font-black text-[#171717] uppercase tracking-tight">
              GRAFIK TREN PENJUALAN
            </h2>
            <p className="text-xs text-gray-500 font-medium">Data transaksi yang tercatat</p>
          </div>
          <span className="text-xs font-black bg-[#F9ED32] text-[#171717] px-3 py-1 rounded border border-[#171717]">
            Revenue: {formatPrice(0)}
          </span>
        </div>

        <div className="flex h-72 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 text-sm font-bold text-gray-500">
          Belum ada transaksi untuk ditampilkan.
        </div>
      </div>

      {/* ================= SPLIT SECTION: RECENT ORDERS & TOP PRODUCTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#171717]">
            <h2 className="text-lg font-black text-[#171717] uppercase">
              Pesanan Terbaru
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-black text-[#171717] hover:underline"
            >
              Lihat Semua (0) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F5F0E8] border-b-2 border-[#171717] font-black uppercase text-gray-700">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Pelanggan</th>
                  <th className="p-3">Produk</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold">
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada pesanan.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="lg:col-span-4 bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#171717]">
            <h2 className="text-lg font-black text-[#171717] uppercase">
              Top Best Seller
            </h2>
            <Link
              href="/admin/products"
              className="text-xs font-black text-[#171717] hover:underline"
            >
              Kelola
            </Link>
          </div>

          <div className="space-y-4">
            <p className="py-8 text-center text-sm font-bold text-gray-500">
              Belum ada produk terjual.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
