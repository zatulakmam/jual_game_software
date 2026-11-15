'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { PRODUCTS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

const chartData = [
  { month: 'Jan', revenue: 2400000, orders: 45 },
  { month: 'Feb', revenue: 3100000, orders: 58 },
  { month: 'Mar', revenue: 4200000, orders: 72 },
  { month: 'Apr', revenue: 3800000, orders: 65 },
  { month: 'Mei', revenue: 5100000, orders: 90 },
  { month: 'Jun', revenue: 6400000, orders: 110 },
  { month: 'Jul', revenue: 5900000, orders: 104 },
  { month: 'Agu', revenue: 7200000, orders: 128 },
  { month: 'Sep', revenue: 6800000, orders: 119 },
  { month: 'Okt', revenue: 8100000, orders: 142 },
  { month: 'Nov', revenue: 8750000, orders: 156 },
];

const recentOrders = [
  {
    id: 'PS-992102',
    customer: 'Ahmad Faiz',
    email: 'faiz@gmail.com',
    product: 'Windows 11 Pro License',
    amount: 85000,
    status: 'Selesai',
    date: '10 menit yang lalu',
  },
  {
    id: 'PS-992101',
    customer: 'Nadia Putri',
    email: 'nadia@yahoo.com',
    product: 'Minecraft Java Edition',
    amount: 120000,
    status: 'Selesai',
    date: '35 menit yang lalu',
  },
  {
    id: 'PS-992100',
    customer: 'Reza Pratama',
    email: 'reza@outlook.com',
    product: 'FL Studio Producer Edition',
    amount: 75000,
    status: 'Menunggu Verifikasi',
    date: '1 jam yang lalu',
  },
  {
    id: 'PS-992099',
    customer: 'Indah Kusuma',
    email: 'indah@gmail.com',
    product: 'Adobe Creative Assets',
    amount: 45000,
    status: 'Selesai',
    date: '3 jam yang lalu',
  },
  {
    id: 'PS-992098',
    customer: 'Doni Firmansyah',
    email: 'doni@gmail.com',
    product: 'Productivity Notion Template',
    amount: 25000,
    status: 'Selesai',
    date: '5 jam yang lalu',
  },
];

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
            Rp8.750.000
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-green-900">
            <TrendingUp className="w-4 h-4" />
            <span>+18.4% bulan ini</span>
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
            47 Item
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-[#171717]">
            <span>7 kategori aktif</span>
          </div>
        </div>

        {/* Card 3: Total Customers */}
        <div className="bg-[#55E6D1] p-6 rounded-2xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase text-[#171717] tracking-wider">
              Total Pelanggan
            </span>
            <Users className="w-6 h-6 text-[#171717]" />
          </div>
          <div className="text-2xl lg:text-3xl font-black text-[#171717] mb-2">
            1.284 User
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-[#171717]">
            <span>+48 pendaftar baru</span>
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
            892 Pesanan
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black">
            <span>99.2% sukses terverifikasi</span>
          </div>
        </div>
      </div>

      {/* ================= RECHARTS SALES CHART ================= */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-[#171717]">
          <div>
            <h2 className="text-xl font-black text-[#171717] uppercase tracking-tight">
              GRAFIK TREN PENJUALAN TAHUN 2024
            </h2>
            <p className="text-xs text-gray-500 font-medium">Pertumbuhan omset produk digital per bulan</p>
          </div>
          <span className="text-xs font-black bg-[#F9ED32] text-[#171717] px-3 py-1 rounded border border-[#171717]">
            Revenue (IDR)
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F9ED32" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F9ED32" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#171717" fontSize={12} fontWeight="bold" />
              <YAxis
                stroke="#171717"
                fontSize={11}
                fontWeight="bold"
                tickFormatter={(val) => `Rp${val / 1000000}M`}
              />
              <Tooltip
                formatter={(value: any) => [formatPrice(Number(value)), 'Pendapatan']}
                contentStyle={{
                  backgroundColor: '#171717',
                  color: '#fff',
                  border: '2px solid #F9ED32',
                  borderRadius: '8px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 'bold',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#171717"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            </AreaChart>
          </ResponsiveContainer>
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
              Lihat Semua ({recentOrders.length}) →
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
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-black text-[#171717]">{ord.id}</td>
                    <td className="p-3">
                      <p className="font-bold text-[#171717]">{ord.customer}</p>
                      <p className="text-[10px] text-gray-400">{ord.date}</p>
                    </td>
                    <td className="p-3 font-medium text-gray-800 line-clamp-1">{ord.product}</td>
                    <td className="p-3 font-black text-[#171717]">{formatPrice(ord.amount)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                          ord.status === 'Selesai'
                            ? 'bg-[#55E6D1] text-[#171717] border-[#171717]'
                            : 'bg-[#F9ED32] text-[#171717] border-[#171717]'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
            {PRODUCTS.slice(0, 5).map((p, idx) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#171717] text-white flex items-center justify-center font-black text-xs flex-shrink-0">
                  {idx + 1}
                </span>
                <img
                  src={p.cover_image}
                  alt={p.name}
                  className="w-10 h-10 rounded-lg border border-[#171717] object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#171717] truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-500 font-bold">{p.sold_count} terjual</p>
                </div>
                <span className="text-xs font-black text-[#171717]">
                  {formatPrice(p.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
