# ⚡ PIXELSTORE – NEO-BRUTALISM DIGITAL MARKETPLACE

> **"YOUR DIGITAL WORLD STARTS HERE."**  
> Platform marketplace penjualan produk digital modern dengan identitas visual **Neo-Brutalism** yang berani, ekspresif, colorful, dan berkinerja tinggi.

---

## 🎨 Design System (Neo-Brutalism)

PixelStore dibangun dengan sistem desain Neo-Brutalism yang konsisten di setiap halamannya:

- **Background Utama:** Off-white (`#F5F0E8`)
- **Warna Utama:** Electric Yellow (`#F9ED32`)
- **Warna Sekunder:** Bright Purple (`#A78BFA`)
- **Warna Aksen:** Cyan (`#55E6D1`)
- **Warna Tambahan:** Orange (`#FF7547`)
- **Teks & Outlines:** Hampir Hitam (`#171717`)
- **Border:** Tebal `2px - 3px` solid black
- **Shadow:** Hard offset shadow tanpa blur (`4px 4px 0px #171717` & `6px 6px 0px #171717`)
- **Border Radius:** `6px - 16px`
- **Tipografi:** Space Grotesk (Google Fonts)
- **Karakter Visual:** Bold typography, high contrast, offset shadows, playful stickers & floating geometric shapes, micro-interactions (hover lift & active press).

---

## 🚀 Fitur Unggulan

### 1. 🏠 Landing Page & Storefront
- **Hero Section:** Headline ekspresif *"YOUR DIGITAL WORLD STARTS HERE."*, floating cards showcase Windows 11 Pro, badges *"DIGITAL GOODS ONLY"*, *"100% INSTANT DELIVERY"*, dekorasi stiker & bintang geometris.
- **Running Marquee Ticker:** Ticker animasi berjalan dengan highlight produk digital.
- **Kategori Showcase:** 7 kategori dengan palet warna dan ikon tersendiri.
- **Fresh Drops & Digital Goods:** Grid katalog produk unggulan dengan filter tab interaktif.
- **Value Proposition:** 4 pilar layanan: Instant Delivery, 100% Genuine & Safe, Metode Pembayaran Lokal, 24/7 Support.
- **Stats Counter:** Statistik penjualan (10.000+ produk terjual, 99.9% uptime).
- **Interactive Call-to-Action:** Banner pendaftaran cepat.

### 2. 🛍️ Katalog Produk & Filter Multi-Kriteria
- **Live Search:** Pencarian nama produk & deskripsi real-time.
- **Kategori Filter:** Pilihan kategori interaktif (Software, PC Games, Productivity, Developer Tools, Design Assets, Templates, Utilities).
- **Price Range Slider:** Filter harga maksimal dinamis hingga Rp150.000.
- **Tipe / Badge Filter:** Filter Best Seller, New Arrival, Hot Deal, Diskon.
- **Sorting Dinamis:** Paling Populer, Terbaru, Harga Termurah, Harga Tertinggi.
- **Active Filter Chips & Reset All:** Hapus filter aktif dengan satu klik.

### 3. 🔍 Halaman Detail Produk Lengkap
- **Galeri Cover & Thumbnails:** Gambar produk beresolusi tinggi dengan thumbnail selector.
- **Informasi Lisensi & Kompatibilitas:** Platform OS (Windows, Mac, Linux), jenis lisensi (Retail, Lifetime), ukuran file, dan versi.
- **Rating & Ulasan:** Bintang rating, review count, dan testimoni pembeli terverifikasi.
- **Interactive Tabs:** Tab Deskripsi & Fitur, Spesifikasi Teknis, serta Ulasan Pelanggan.
- **Related Products:** Rekomendasi produk terkait dalam kategori yang sama.
- **Beli Sekarang & Tambah ke Keranjang:** Notifikasi toast pop-up dengan feedback suara/visual.

### 4. 🛒 Shopping Cart & Multi-Step Checkout
- **Keranjang Belanja Dinamis:** Tambah/kurang kuantitas item, hapus item, kosongkan keranjang, perhitungan subtotal otomatis (didukung state management **Zustand** dengan persistensi `localStorage`).
- **Sistem Voucher Diskon:**
  - `PIXEL20`: Diskon 20% otomatis
  - `NEWUSER`: Potongan langsung Rp10.000
- **Checkout Multi-Metode:**
  - **QRIS:** Otomatis verifikasi untuk semua Bank & E-Wallet (BCA, Mandiri, GoPay, OVO, ShopeePay, DANA).
  - **Virtual Account:** BCA & Mandiri VA.
  - **E-Wallet:** GoPay & DANA.
- **Struktur Pembayaran Terintegrasi:** Siap dihubungkan ke Midtrans, Xendit, atau Tripay.
- **Halaman Konfirmasi & Sukses:** Order ID unik, rincian biaya, dan direct link ke dashboard akses lisensi.

### 5. 🔐 Autentikasi & User Dashboard
- **Form Login, Register & Lupa Password:** Validasi form menggunakan **Zod** & **React Hook Form**, password strength meter, show/hide password toggle.
- **My Purchases (Produk & Lisensi Saya):**
  - Melihat semua produk yang pernah dibeli.
  - Fitur **1-Click Copy License Key** dengan mask toggle (`•••••-•••••`).
  - Direct download link / file cloud resmi.
- **Riwayat Pesanan:** Tabel transaksi dengan status (Selesai, Menunggu Verifikasi).
- **Pengaturan Profil:** Ubah nama, kontak WhatsApp, dan informasi akun.

### 6. ⚙️ Admin Dashboard (CRUD Lengkap)
- **Statistik KPI:** Total Pendapatan, Total Produk, Total Pelanggan, Total Transaksi.
- **Grafik Penjualan Recharts:** Tren pendapatan bulanan dengan visualisasi AreaChart dan Rupiah tooltip.
- **Manajemen Produk (CRUD):** Tambah produk baru via modal dialog, edit produk, hapus produk dengan konfirmasi, live filter & search.
- **Manajemen Kategori:** Tambah kategori dengan palet warna custom Neo-Brutalism.
- **Manajemen Pesanan:** Tabel pesanan pelanggan, filter status, dan tombol **Verifikasi Pembayaran Manual**.
- **Manajemen Pelanggan:** Database pengguna terdaftar dan riwayat belanja.
- **Manajemen Voucher:** Pembuatan kode promo (persen atau nominal tetap) dan monitor jumlah penggunaan.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + Neo-Brutalism Design Tokens & Utilities
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **State Management:** Zustand (with LocalStorage persist)
- **Form & Validation:** React Hook Form + Zod
- **Notifications:** React Hot Toast
- **Database Ready:** PostgreSQL schema via Supabase & Supabase Storage

---

## 💻 Cara Menjalankan Secara Lokal

1. Buka terminal di folder project:
   ```bash
   cd C:\Users\zatul\.gemini\antigravity\scratch\pixelstore
   ```

2. Jalankan development server:
   ```bash
   npm run dev
   ```

3. Buka browser di:
   - **Storefront:** [http://localhost:3000](http://localhost:3000)
   - **Katalog Produk:** [http://localhost:3000/products](http://localhost:3000/products)
   - **Keranjang Belanja:** [http://localhost:3000/cart](http://localhost:3000/cart)
   - **Dashboard Pengguna:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
   - **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
   - **Kelola Produk (Admin):** [http://localhost:3000/admin/products](http://localhost:3000/admin/products)

4. Build untuk Production:
   ```bash
   npm run build
   npm run start
   ```

---

## 🗄️ Database Schema (Supabase)

File migrasi database PostgreSQL lengkap tersedia di:
`supabase/schema.sql`

Untuk menghubungkan database sungguhan:
1. Buat project baru di [Supabase](https://supabase.com).
2. Jalankan isi `supabase/schema.sql` di Supabase SQL Editor. Untuk project yang sudah memiliki skema, jalankan `supabase/migrations/20261115000000_user_profiles.sql`.
3. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` di `.env.local` dan environment variables deployment.
4. Di Supabase Authentication > URL Configuration, atur Site URL ke URL aplikasi dan izinkan URL aplikasi lokal/deployment untuk redirect konfirmasi email.

Supabase Auth menyimpan kredensial secara aman; tabel `public.profiles` menyimpan profil pembeli dan otomatis dibuat saat akun didaftarkan. Row Level Security membatasi pembeli ke profil miliknya sendiri.

---

© 2024 **PixelStore**. All Rights Reserved.
