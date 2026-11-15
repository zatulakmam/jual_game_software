'use client';

import React, { useState } from 'react';
import { Users, Search, Mail, Phone, ShoppingBag, ShieldCheck } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  const customers = [
    {
      id: 'cust-1',
      name: 'Budi Santoso',
      email: 'budi.santoso@example.com',
      phone: '081234567890',
      ordersCount: 3,
      totalSpent: 230000,
      joined: '12 Okt 2024',
      status: 'Aktif',
    },
    {
      id: 'cust-2',
      name: 'Ahmad Faiz',
      email: 'faiz@gmail.com',
      phone: '081398765432',
      ordersCount: 5,
      totalSpent: 450000,
      joined: '01 Nov 2024',
      status: 'Aktif',
    },
    {
      id: 'cust-3',
      name: 'Nadia Putri',
      email: 'nadia@yahoo.com',
      phone: '085712345678',
      ordersCount: 2,
      totalSpent: 165000,
      joined: '05 Nov 2024',
      status: 'Aktif',
    },
    {
      id: 'cust-4',
      name: 'Reza Pratama',
      email: 'reza@outlook.com',
      phone: '082199887766',
      ordersCount: 1,
      totalSpent: 75000,
      joined: '10 Nov 2024',
      status: 'Aktif',
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-10 space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div>
        <div className="inline-block px-3 py-1 bg-[#A78BFA] text-[#171717] rounded text-xs font-black uppercase mb-2">
          DATABASE PENGGUNA
        </div>
        <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight">
          MANAJEMEN PELANGGAN ({customers.length})
        </h1>
      </div>

      <div className="bg-white p-4 rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] max-w-md relative">
        <input
          type="text"
          placeholder="Cari nama atau email pengguna..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
        />
        <Search className="w-4 h-4 text-gray-500 absolute left-7 top-6" />
      </div>

      <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F0E8] border-b-2 border-[#171717] font-black uppercase text-gray-700">
              <tr>
                <th className="p-4">Pelanggan</th>
                <th className="p-4">Kontak</th>
                <th className="p-4">Total Pesanan</th>
                <th className="p-4">Total Belanja</th>
                <th className="p-4">Bergabung</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 font-semibold">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F9ED32] border border-[#171717] flex items-center justify-center font-black text-sm">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-sm text-[#171717]">{c.name}</p>
                        <p className="text-[10px] text-gray-500 font-mono">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-gray-800">{c.email}</p>
                    <p className="text-gray-500 text-[10px]">{c.phone}</p>
                  </td>
                  <td className="p-4">{c.ordersCount} Transaksi</td>
                  <td className="p-4 font-black text-[#171717]">
                    {formatPrice(c.totalSpent)}
                  </td>
                  <td className="p-4 text-gray-500">{c.joined}</td>
                  <td className="p-4">
                    <span className="bg-[#55E6D1] text-[#171717] px-2 py-0.5 rounded border border-[#171717] font-black text-[10px] uppercase">
                      {c.status}
                    </span>
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
