'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  items: string[];
  total: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  orderStatus: 'Selesai' | 'Menunggu Verifikasi' | 'Dibatalkan';
  date: string;
}

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const orders: AdminOrder[] = [];

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.orderStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 lg:p-10 space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div>
        <div className="inline-block px-3 py-1 bg-[#FF7547] text-white rounded text-xs font-black uppercase mb-2">
          TRANSAKSI MARKETPLACE
        </div>
        <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight">
          MANAJEMEN PESANAN & VERIFIKASI PEMBAYARAN
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Cari ID pesanan, nama pembeli..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-black focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Status</option>
            <option value="Selesai">Selesai</option>
            <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>

        <span className="text-xs font-black text-gray-500">
          Total: {filtered.length} Pesanan
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F0E8] border-b-2 border-[#171717] font-black uppercase text-gray-700">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Pembeli</th>
                <th className="p-4">Produk Dibeli</th>
                <th className="p-4">Total</th>
                <th className="p-4">Metode Bayar</th>
                <th className="p-4">Status Pesanan</th>
                <th className="p-4 text-center">Verifikasi Manual</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 font-semibold">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Belum ada pesanan.
                  </td>
                </tr>
              ) : filtered.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono font-black text-[#171717]">{o.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-[#171717]">{o.customer}</p>
                    <p className="text-[10px] text-gray-500">{o.email}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800 line-clamp-1">{o.items.join(', ')}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{o.date}</p>
                  </td>
                  <td className="p-4 font-black text-[#171717] text-sm">
                    {formatPrice(o.total)}
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-300 font-bold text-[10px]">
                      {o.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border ${
                        o.orderStatus === 'Selesai'
                          ? 'bg-[#55E6D1] text-[#171717] border-[#171717]'
                          : 'bg-[#F9ED32] text-[#171717] border-[#171717]'
                      }`}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {o.orderStatus === 'Menunggu Verifikasi' ? (
                      <button
                        className="px-3 py-1.5 bg-[#55E6D1] hover:bg-[#3ed0ba] text-[#171717] font-black text-[10px] rounded-lg border border-[#171717] shadow-[2px_2px_0px_#171717] uppercase tracking-wider"
                      >
                        ✓ Verifikasi Bayar
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs font-bold">Terverifikasi</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
