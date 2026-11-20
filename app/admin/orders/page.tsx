'use client';

import React, { useState, useEffect } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface OrderItem {
  id: string;
  product?: { name: string; slug: string };
  quantity: number;
  price: number;
  license_key?: string;
}

interface OrderRecord {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  payment_method: string;
  payment_status: 'paid' | 'unpaid' | 'pending';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOrders(json.data);
        }
      }
    } catch (e) {
      console.error(e);
      toast.error('Gagal mengambil data pesanan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, status: string, paymentStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, payment_status: paymentStatus }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        toast.success(`Pesanan ${orderId} diverifikasi selesai!`, {
          style: { border: '2px solid #171717', background: '#55E6D1', color: '#171717' },
        });
        fetchOrders();
      } else {
        toast.error(json.message || 'Gagal mengubah status');
      }
    } catch {
      toast.error('Gagal menghubungi server');
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      (o.order_id || o.id || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.customer_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.customer_email || '').toLowerCase().includes(search.toLowerCase());

    const statusLabel = o.status === 'completed' ? 'Selesai' : o.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu Verifikasi';
    const matchStatus = filterStatus === 'all' || statusLabel === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 lg:p-10 space-y-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-3 py-1 bg-[#FF7547] text-white rounded text-xs font-black uppercase mb-2">
            TRANSAKSI MARKETPLACE
          </div>
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight">
            MANAJEMEN PESANAN & VERIFIKASI PEMBAYARAN ({orders.length})
          </h1>
        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2 bg-[#F9ED32] text-[#171717] font-black text-xs rounded-xl border-2 border-[#171717] shadow-[2px_2px_0px_#171717] uppercase hover-tactile"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          Segarkan Data
        </button>
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
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-bold">
                    {isLoading ? 'Memuat pesanan...' : 'Belum ada transaksi tercatat di database.'}
                  </td>
                </tr>
              ) : filtered.map((o) => {
                const isCompleted = o.status === 'completed';
                const orderDate = new Date(o.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const itemNames = (o.items || []).map((i) => i.product?.name || 'Produk Digital').join(', ');

                return (
                  <tr key={o.id || o.order_id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono font-black text-[#171717]">{o.order_id || o.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-[#171717]">{o.customer_name}</p>
                      <p className="text-[10px] text-gray-500">{o.customer_email}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-gray-800 line-clamp-1">{itemNames || 'Item Digital'}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{orderDate}</p>
                    </td>
                    <td className="p-4 font-black text-[#171717] text-sm">
                      {formatPrice(o.total_amount)}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 px-2 py-0.5 rounded border border-gray-300 font-bold text-[10px]">
                        {o.payment_method}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-black uppercase border ${
                          isCompleted
                            ? 'bg-[#55E6D1] text-[#171717] border-[#171717]'
                            : o.status === 'cancelled'
                            ? 'bg-[#FF7547] text-white border-[#171717]'
                            : 'bg-[#F9ED32] text-[#171717] border-[#171717]'
                        }`}
                      >
                        {isCompleted ? 'Selesai' : o.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu Verifikasi'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {!isCompleted && o.status !== 'cancelled' ? (
                        <button
                          onClick={() => handleUpdateStatus(o.order_id || o.id, 'completed', 'paid')}
                          className="px-3 py-1.5 bg-[#55E6D1] hover:bg-[#3ed0ba] text-[#171717] font-black text-[10px] rounded-lg border border-[#171717] shadow-[2px_2px_0px_#171717] uppercase tracking-wider hover-tactile"
                        >
                          ✓ Verifikasi Bayar
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs font-bold">
                          {isCompleted ? '✓ Terverifikasi' : 'Dibatalkan'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
