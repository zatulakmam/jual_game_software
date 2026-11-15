'use client';

import React, { useState } from 'react';
import { Tag, Plus, Trash2, X, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Voucher {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minSpend: number;
  usageCount: number;
  status: 'Aktif' | 'Nonaktif';
}

const INITIAL_VOUCHERS: Voucher[] = [
  {
    id: 'v-1',
    code: 'PIXEL20',
    type: 'percent',
    value: 20,
    minSpend: 50000,
    usageCount: 142,
    status: 'Aktif',
  },
  {
    id: 'v-2',
    code: 'NEWUSER',
    type: 'fixed',
    value: 10000,
    minSpend: 25000,
    usageCount: 89,
    status: 'Aktif',
  },
  {
    id: 'v-3',
    code: 'SALE50',
    type: 'percent',
    value: 50,
    minSpend: 100000,
    usageCount: 24,
    status: 'Aktif',
  },
];

export default function AdminVouchersPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percent' | 'fixed'>('percent');
  const [value, setValue] = useState(15);
  const [minSpend, setMinSpend] = useState(50000);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newV: Voucher = {
      id: `v-${Date.now()}`,
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      minSpend: Number(minSpend),
      usageCount: 0,
      status: 'Aktif',
    };

    setVouchers((prev) => [newV, ...prev]);
    setIsModalOpen(false);
    setCode('');
    toast.success(`Voucher ${newV.code} berhasil dibuat!`);
  };

  const handleDelete = (id: string, vCode: string) => {
    if (confirm(`Hapus voucher ${vCode}?`)) {
      setVouchers((prev) => prev.filter((v) => v.id !== id));
      toast('Voucher dihapus', { icon: '🗑️' });
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-[#F9ED32] text-[#171717] rounded text-xs font-black uppercase mb-2">
            PROMOSI & DISKON
          </div>
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight">
            MANAJEMEN KODE VOUCHER ({vouchers.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Voucher Baru</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F0E8] border-b-2 border-[#171717] font-black uppercase text-gray-700">
              <tr>
                <th className="p-4">Kode Voucher</th>
                <th className="p-4">Tipe Diskon</th>
                <th className="p-4">Nilai Diskon</th>
                <th className="p-4">Min. Pembelian</th>
                <th className="p-4">Dipakai</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 font-semibold">
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-mono font-black text-sm text-[#171717] bg-[#F9ED32] px-2.5 py-1 rounded border border-[#171717]">
                      {v.code}
                    </span>
                  </td>
                  <td className="p-4 uppercase text-gray-600">
                    {v.type === 'percent' ? 'Persentase (%)' : 'Potongan Tetap (Rp)'}
                  </td>
                  <td className="p-4 font-black text-[#171717] text-sm">
                    {v.type === 'percent' ? `${v.value}%` : formatPrice(v.value)}
                  </td>
                  <td className="p-4 text-gray-700">{formatPrice(v.minSpend)}</td>
                  <td className="p-4 font-bold">{v.usageCount} kali</td>
                  <td className="p-4">
                    <span className="bg-[#55E6D1] text-[#171717] px-2 py-0.5 rounded border border-[#171717] font-black text-[10px]">
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(v.id, v.code)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Create Voucher */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] w-full max-w-md p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#171717]">
              <h2 className="text-lg font-black uppercase text-[#171717]">Buat Voucher Baru</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block uppercase text-gray-700 mb-1">Kode Voucher *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: FLASH50"
                  className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase text-gray-700 mb-1">Tipe Diskon</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl"
                  >
                    <option value="percent">Persen (%)</option>
                    <option value="fixed">Nominal (Rp)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-gray-700 mb-1">Besar Diskon</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-gray-700 mb-1">Min. Belanja (Rp)</label>
                <input
                  type="number"
                  value={minSpend}
                  onChange={(e) => setMinSpend(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F9ED32] text-[#171717] rounded-lg border-2 border-[#171717] font-black uppercase"
                >
                  Simpan Voucher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
