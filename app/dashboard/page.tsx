'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Key, User as UserIcon, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { getUserDisplayName, useCurrentUser } from '@/lib/useCurrentUser';

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<'purchases' | 'orders' | 'profile'>('purchases');
  const user = useCurrentUser();
  const displayName = user ? getUserDisplayName(user) : '';

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-10 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* User Welcome Card */}
        <div className="bg-[#171717] text-white p-6 sm:p-10 rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#F9ED32] mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F9ED32] border-2 border-white text-[#171717] flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#fff]">
              {displayName.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase bg-[#55E6D1] text-[#171717] px-2 py-0.5 rounded">
                  AKUN PENGGUNA
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                {user ? `Halo, ${displayName}!` : 'Dashboard Pengguna'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                {user?.email ?? 'Kelola profil akun dan lihat aktivitas kamu di sini.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="px-4 py-2.5 bg-[#A78BFA] hover:bg-[#9270f8] text-[#171717] font-black text-xs rounded-xl border-2 border-white shadow-[2px_2px_0px_#fff] uppercase tracking-wider transition-all"
            >
              ⚙️ Admin Panel
            </Link>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b-[3px] border-[#171717] gap-2 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`flex items-center gap-2 pb-3 px-6 text-sm font-black uppercase tracking-wider border-b-4 transition-all -mb-[3px] ${
              activeTab === 'purchases'
                ? 'border-[#171717] text-[#171717] bg-[#F9ED32] rounded-t-lg'
                : 'border-transparent text-gray-500 hover:text-[#171717]'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Produk & Lisensi Saya (0)</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 pb-3 px-6 text-sm font-black uppercase tracking-wider border-b-4 transition-all -mb-[3px] ${
              activeTab === 'orders'
                ? 'border-[#171717] text-[#171717] bg-[#55E6D1] rounded-t-lg'
                : 'border-transparent text-gray-500 hover:text-[#171717]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Riwayat Pesanan</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 pb-3 px-6 text-sm font-black uppercase tracking-wider border-b-4 transition-all -mb-[3px] ${
              activeTab === 'profile'
                ? 'border-[#171717] text-[#171717] bg-[#A78BFA] rounded-t-lg'
                : 'border-transparent text-gray-500 hover:text-[#171717]'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Pengaturan Akun</span>
          </button>
        </div>

        {/* ================= TAB 1: PURCHASES & LICENSES ================= */}
        {activeTab === 'purchases' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#171717] uppercase tracking-tight">
                  PRODUK DIGITAL AKTIF
                </h2>
                <p className="text-xs text-gray-600 font-medium">Produk dan lisensi yang dibeli akan muncul di sini.</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center text-sm font-bold text-gray-500">
              Belum ada pembelian yang tercatat.
            </div>
          </div>
        )}

        {/* ================= TAB 2: ORDER HISTORY ================= */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] overflow-hidden">
            <div className="p-6 border-b-2 border-[#171717]">
              <h2 className="text-xl font-black text-[#171717] uppercase">RIWAYAT TRANSAKSI</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-[#F5F0E8] border-b-2 border-[#171717] uppercase font-black text-gray-700">
                  <tr>
                    <th className="p-4">No. Pesanan</th>
                    <th className="p-4">Tanggal Transaksi</th>
                    <th className="p-4">Jumlah Item</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Metode</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100 font-semibold">
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Belum ada pesanan yang tercatat.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PROFILE SETTINGS ================= */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-2xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-black text-[#171717] uppercase pb-4 border-b-2 border-[#171717]">
              PENGATURAN PROFIL
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.error('Pengaturan profil belum terhubung ke penyimpanan akun.');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Nama lengkap"
                  className="w-full px-4 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                  Alamat Email
                </label>
                <input
                  type="email"
                  placeholder="Email akun"
                  disabled
                  className="w-full px-4 py-2.5 bg-gray-100 border-2 border-gray-300 rounded-xl text-xs font-bold text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                  No. Handphone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="Nomor handphone"
                  className="w-full px-4 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
