'use client';

import React, { useState } from 'react';
import {
  Grid,
  Plus,
  Pencil,
  Trash2,
  X,
  Layers,
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATS } from '@/lib/data';
import type { Category } from '@/lib/types';
import toast from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('#F9ED32');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: desc,
      icon: 'Layers',
      color,
      bg_color: '#171717',
      product_count: 0,
    };

    setCategories((prev) => [...prev, newCat]);
    setIsModalOpen(false);
    setName('');
    setDesc('');
    toast.success('Kategori baru berhasil dibuat!');
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Yakin ingin menghapus kategori "${catName}"?`)) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast('Kategori dihapus', { icon: '🗑️' });
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-[#55E6D1] text-[#171717] rounded text-xs font-black uppercase mb-2">
            PENGATURAN KATEGORI
          </div>
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight">
            KELOLA KATEGORI PRODUK ({categories.length})
          </h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kategori</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex flex-col justify-between"
            style={{ backgroundColor: c.color }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black px-2 py-0.5 rounded bg-[#171717] text-white">
                  {c.product_count} Produk
                </span>
                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="p-1 text-gray-700 hover:text-red-700"
                  title="Hapus Kategori"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-black text-[#171717] mb-1">{c.name}</h3>
              <p className="text-xs font-semibold text-[#171717] opacity-80 mb-4 line-clamp-2">
                {c.description}
              </p>
            </div>

            <span className="text-[10px] font-mono font-bold text-gray-800">
              Slug: /{c.slug}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] w-full max-w-md p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-[#171717]">
              <h2 className="text-lg font-black uppercase text-[#171717]">Tambah Kategori</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block uppercase text-gray-700 mb-1">Nama Kategori *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Mobile Apps"
                  className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl"
                />
              </div>

              <div>
                <label className="block uppercase text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl"
                />
              </div>

              <div>
                <label className="block uppercase text-gray-700 mb-1">Warna Kartu Neo-Brutalism</label>
                <div className="flex gap-2">
                  {['#F9ED32', '#A78BFA', '#55E6D1', '#FF7547', '#E5E7EB'].map((clr) => (
                    <button
                      key={clr}
                      type="button"
                      onClick={() => setColor(clr)}
                      className={`w-8 h-8 rounded-lg border-2 border-[#171717] ${
                        color === clr ? 'ring-2 ring-black' : ''
                      }`}
                      style={{ backgroundColor: clr }}
                    />
                  ))}
                </div>
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
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
