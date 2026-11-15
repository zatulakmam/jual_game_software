'use client';

import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  Star,
  ExternalLink,
  Filter,
} from 'lucide-react';
import { PRODUCTS as INITIAL_PRODUCTS, CATEGORIES } from '@/lib/data';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(CATEGORIES[0].id);
  const [formPrice, setFormPrice] = useState(50000);
  const [formOriginalPrice, setFormOriginalPrice] = useState(75000);
  const [formBadge, setFormBadge] = useState<'best-seller' | 'new-arrival' | 'hot' | 'sale' | undefined>(
    'new-arrival'
  );
  const [formDesc, setFormDesc] = useState('');
  const [formPlatform, setFormPlatform] = useState('Windows, Mac, Web');
  const [formLicense, setFormLicense] = useState('Lifetime Retail Key');
  const [formImage, setFormImage] = useState(
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
  );

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCat === 'all' || p.category_id === selectedCat;
    return matchSearch && matchCat;
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory(CATEGORIES[0].id);
    setFormPrice(50000);
    setFormOriginalPrice(75000);
    setFormBadge('new-arrival');
    setFormDesc('');
    setFormPlatform('Windows, Mac');
    setFormLicense('Lifetime Activation Key');
    setFormImage(
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
    );
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category_id);
    setFormPrice(p.price);
    setFormOriginalPrice(p.original_price || p.price);
    setFormBadge(p.badge);
    setFormDesc(p.description);
    setFormPlatform(p.platform.join(', '));
    setFormLicense(p.license_type);
    setFormImage(p.cover_image);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Produk "${name}" berhasil dihapus`, {
        style: { border: '2px solid #171717', background: '#FF7547', color: '#fff' },
      });
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formName.trim()) {
      toast.error('Nama produk wajib diisi!');
      return;
    }

    if (editingProduct) {
      // Update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formName,
                category_id: formCategory,
                price: Number(formPrice),
                original_price: Number(formOriginalPrice),
                badge: formBadge,
                description: formDesc,
                platform: formPlatform.split(',').map((s) => s.trim()),
                license_type: formLicense,
                cover_image: formImage,
              }
            : p
        )
      );
      toast.success('Produk berhasil diperbarui!');
    } else {
      // Create New
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formDesc,
        long_description: formDesc,
        price: Number(formPrice),
        original_price: Number(formOriginalPrice),
        discount_percentage: Math.round(
          ((Number(formOriginalPrice) - Number(formPrice)) / Number(formOriginalPrice)) * 100
        ),
        category_id: formCategory,
        images: [formImage],
        cover_image: formImage,
        features: ['Lisensi Original', 'Support 24/7', 'Aktivasi Instan'],
        platform: formPlatform.split(',').map((s) => s.trim()),
        compatibility: 'Windows / Mac / Modern OS',
        license_type: formLicense,
        rating: 0,
        review_count: 0,
        sold_count: 0,
        is_featured: true,
        badge: formBadge,
        tags: ['software', 'digital'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success('Produk baru berhasil ditambahkan ke katalog!');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="p-6 lg:p-10 space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-[#F9ED32] text-[#171717] rounded text-xs font-black uppercase mb-2">
            MANAJEMEN KATALOG
          </div>
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight">
            KELOLA PRODUK DIGITAL ({products.length})
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border-[3px] border-[#171717] shadow-[4px_4px_0px_#171717] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Cari nama produk atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold text-[#171717] focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-black text-[#171717] focus:outline-none cursor-pointer"
          >
            <option value="all">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-black text-gray-500">
          Ditemukan {filteredProducts.length} produk
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[6px_6px_0px_#171717] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F5F0E8] border-b-2 border-[#171717] font-black uppercase text-gray-700">
              <tr>
                <th className="p-4">Cover</th>
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga Jual</th>
                <th className="p-4">Badge</th>
                <th className="p-4">Terjual</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100 font-semibold">
              {filteredProducts.map((p) => {
                const cat = CATEGORIES.find((c) => c.id === p.category_id);
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <img
                        src={p.cover_image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg border-2 border-[#171717] object-cover bg-gray-100"
                      />
                    </td>
                    <td className="p-4">
                      <p className="font-black text-sm text-[#171717]">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono">/{p.slug}</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-[#55E6D1] text-[#171717] px-2 py-0.5 rounded border border-[#171717] text-[10px] font-black">
                        {cat?.name || 'Digital'}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-black text-[#171717] text-sm">{formatPrice(p.price)}</p>
                      {p.original_price && p.original_price > p.price && (
                        <p className="text-[10px] text-gray-400 line-through">
                          {formatPrice(p.original_price)}
                        </p>
                      )}
                    </td>
                    <td className="p-4">
                      {p.badge ? (
                        <span className="bg-[#F9ED32] text-[#171717] px-2 py-0.5 rounded border border-[#171717] text-[10px] font-black uppercase">
                          {p.badge}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[10px]">-</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-700 font-bold">{p.sold_count} terjual</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 bg-[#55E6D1] hover:bg-[#42d1bc] text-[#171717] rounded-lg border border-[#171717] shadow-[1px_1px_0px_#171717]"
                          title="Edit Produk"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 bg-[#FF7547] hover:bg-[#f36332] text-white rounded-lg border border-[#171717] shadow-[1px_1px_0px_#171717]"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ADD / EDIT PRODUCT ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#171717]">
              <h2 className="text-xl font-black text-[#171717] uppercase">
                {editingProduct ? 'Edit Data Produk Digital' : 'Tambah Produk Digital Baru'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-bold text-gray-800">
              <div>
                <label className="block uppercase text-gray-700 mb-1">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Windows 11 Pro Retail License"
                  className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-gray-700 mb-1">Kategori *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase text-gray-700 mb-1">Badge Produk</label>
                  <select
                    value={formBadge || 'none'}
                    onChange={(e) =>
                      setFormBadge(e.target.value === 'none' ? undefined : (e.target.value as any))
                    }
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="none">Tanpa Badge</option>
                    <option value="best-seller">Best Seller</option>
                    <option value="new-arrival">New Arrival</option>
                    <option value="hot">Hot Deal</option>
                    <option value="sale">Sale / Diskon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-gray-700 mb-1">Harga Jual (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase text-gray-700 mb-1">Harga Asli / Coret (Rp)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Deskripsi singkat produk untuk card..."
                  className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase text-gray-700 mb-1">Platform Kompatibel</label>
                  <input
                    type="text"
                    value={formPlatform}
                    onChange={(e) => setFormPlatform(e.target.value)}
                    placeholder="Contoh: Windows 10/11, macOS"
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase text-gray-700 mb-1">Tipe Lisensi / Akses</label>
                  <input
                    type="text"
                    value={formLicense}
                    onChange={(e) => setFormLicense(e.target.value)}
                    placeholder="Contoh: Lifetime Activation Key"
                    className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase text-gray-700 mb-1">URL Cover Gambar Produk</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-[#F5F0E8] border-2 border-[#171717] rounded-xl text-xs font-bold focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-gray-200 text-[#171717] rounded-xl border border-gray-400 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717] font-black uppercase tracking-wider"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
