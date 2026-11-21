'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center p-6 bg-[#F5F0E8]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <div className="bg-white p-8 sm:p-12 rounded-3xl border-[3px] border-[#171717] shadow-[8px_8px_0px_#171717] max-w-lg text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF7547] text-white font-black text-sm uppercase rounded-lg border-2 border-[#171717] shadow-[3px_3px_0px_#171717] mb-6">
          <AlertTriangle className="w-4 h-4" />
          <span>TERJADI KESALAHAN</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight mb-3">
          UPS! ADA GANGGUAN SISTEM
        </h1>

        <p className="text-sm text-gray-600 font-semibold mb-8">
          Halaman mengalami kendala saat memuat data. Silakan coba muat ulang atau kembali ke halaman beranda.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#F9ED32] hover:bg-[#ffe500] text-[#171717] font-black text-sm rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Muat Ulang</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-gray-100 text-[#171717] font-black text-sm rounded-xl border-2 border-[#171717] shadow-[3px_3px_0px_#171717] uppercase tracking-wider transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
