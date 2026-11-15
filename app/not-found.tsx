import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 bg-[#F5F0E8]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] max-w-lg text-center">
        <div className="inline-block px-4 py-1.5 bg-[#FF7547] text-white font-black text-sm uppercase rounded-lg border-2 border-[#171717] shadow-[3px_3px_0px_#171717] mb-6">
          ERROR 404
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#171717] uppercase tracking-tight mb-3">
          HALAMAN HILANG!
        </h1>
        <p className="text-sm text-gray-600 font-semibold mb-8">
          Halaman atau produk digital yang kamu tuju tidak ditemukan di server PixelStore.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3.5 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-sm rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider"
          >
            <Home className="w-4 h-4" />
            <span>Ke Beranda</span>
          </Link>
          <Link
            href="/products"
            className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-100 text-[#171717] font-black text-sm rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider"
          >
            <span>Katalog Produk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
