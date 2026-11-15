'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Download,
  Key,
  Copy,
  CheckCircle2,
  PackageCheck,
  Clock,
  User as UserIcon,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<'purchases' | 'orders' | 'profile'>('purchases');
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  // Mock Purchased Digital Goods
  const purchases = [
    {
      id: 'purch-1',
      orderId: 'PS-892102',
      product: PRODUCTS[0], // Windows 11 Pro License
      licenseKey: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
      downloadUrl: 'https://www.microsoft.com/software-download/windows11',
      date: '14 Nov 2024',
      status: 'Aktif',
    },
    {
      id: 'purch-2',
      orderId: 'PS-712891',
      product: PRODUCTS[1], // Minecraft Java Edition
      licenseKey: 'MCFT-9821-KLA9-9012-XPLQ',
      downloadUrl: 'https://www.minecraft.net/download',
      date: '02 Nov 2024',
      status: 'Aktif',
    },
    {
      id: 'purch-3',
      orderId: 'PS-643019',
      product: PRODUCTS[5], // Productivity Notion Template
      licenseKey: 'TEMPL-NOTION-ULTIMATE-2024',
      downloadUrl: 'https://notion.so/templates/pixelstore-workspace',
      date: '28 Okt 2024',
      status: 'Aktif',
    },
  ];

  // Mock Orders History
  const orders = [
    {
      id: 'PS-892102',
      date: '14 Nov 2024, 15:30',
      total: 85000,
      paymentMethod: 'QRIS',
      status: 'Selesai',
      itemCount: 1,
    },
    {
      id: 'PS-712891',
      date: '02 Nov 2024, 11:20',
      total: 120000,
      paymentMethod: 'BCA VA',
      status: 'Selesai',
      itemCount: 1,
    },
    {
      id: 'PS-643019',
      date: '28 Okt 2024, 09:14',
      total: 25000,
      paymentMethod: 'GOPAY',
      status: 'Selesai',
      itemCount: 1,
    },
  ];

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin!`, {
      style: {
        border: '2px solid #171717',
        background: '#F9ED32',
        fontWeight: 'bold',
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] py-10 px-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        {/* User Welcome Card */}
        <div className="bg-[#171717] text-white p-6 sm:p-10 rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#F9ED32] mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F9ED32] border-2 border-white text-[#171717] flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#fff]">
              B
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase bg-[#55E6D1] text-[#171717] px-2 py-0.5 rounded">
                  MEMBER TERVERIFIKASI
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                HALO, BUDI SANTOSO! 👋
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">budi.santoso@example.com</p>
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
            <span>Produk & Lisensi Saya ({purchases.length})</span>
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
                <p className="text-xs text-gray-600 font-medium">
                  Salin lisensi serial key atau unduh file instalasi resmi produk digitalmu.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {purchases.map((item) => {
                const isKeyShown = visibleKeys[item.id];
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border-[3px] border-[#171717] shadow-[5px_5px_0px_#171717] p-5 sm:p-7 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
                  >
                    {/* Product Basic Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.cover_image}
                        alt={item.product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 border-[#171717] object-cover bg-gray-100 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase bg-[#F9ED32] px-2 py-0.5 rounded border border-[#171717]">
                            {item.status}
                          </span>
                          <span className="text-xs text-gray-500 font-bold">Dibeli: {item.date}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-[#171717]">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-600 font-medium">
                          Order ID: <span className="font-mono font-bold text-[#171717]">{item.orderId}</span>
                        </p>
                      </div>
                    </div>

                    {/* License Key Box & Action */}
                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      {/* Key Box */}
                      <div className="bg-[#F5F0E8] p-3 rounded-xl border-2 border-[#171717] flex items-center justify-between gap-3 min-w-[260px]">
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-500">KODE LISENSI</p>
                          <p className="font-mono font-black text-xs text-[#171717] tracking-wider">
                            {isKeyShown ? item.licenseKey : '•••••-•••••-•••••-•••••'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleKeyVisibility(item.id)}
                            className="p-1.5 text-gray-600 hover:text-[#171717]"
                            title={isKeyShown ? 'Sembunyikan' : 'Tampilkan'}
                          >
                            {isKeyShown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(item.licenseKey, 'Kode Lisensi')}
                            className="p-1.5 text-gray-600 hover:text-[#171717]"
                            title="Salin Lisensi"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Download File / Open Access */}
                      <a
                        href={item.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-[#55E6D1] hover:bg-[#43d3bd] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase tracking-wider"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh / Akses</span>
                      </a>
                    </div>
                  </div>
                );
              })}
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
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono font-black text-[#171717]">{ord.id}</td>
                      <td className="p-4 text-gray-600">{ord.date}</td>
                      <td className="p-4">{ord.itemCount} Produk</td>
                      <td className="p-4 font-black text-[#171717]">{formatPrice(ord.total)}</td>
                      <td className="p-4">
                        <span className="bg-gray-100 px-2 py-1 rounded border border-gray-300 font-bold text-xs">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-[#55E6D1] text-[#171717] px-2.5 py-1 rounded border border-[#171717] font-black text-xs">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
                toast.success('Profil berhasil diperbarui!');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  defaultValue="Budi Santoso"
                  className="w-full px-4 py-2.5 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-700 mb-1.5">
                  Alamat Email
                </label>
                <input
                  type="email"
                  defaultValue="budi.santoso@example.com"
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
                  defaultValue="081234567890"
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
