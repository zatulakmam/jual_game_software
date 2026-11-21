export const SITE_NAME = 'Sinzo Store'
export const SITE_DESCRIPTION = 'Tempat cari game, software, dan item digital.'

export const PAYMENT_METHODS = [
  { id: 'bca', name: 'BCA Transfer', icon: 'ðŸ¦', type: 'bank' },
  { id: 'bni', name: 'BNI Transfer', icon: 'ðŸ¦', type: 'bank' },
  { id: 'mandiri', name: 'Mandiri Transfer', icon: 'ðŸ¦', type: 'bank' },
  { id: 'gopay', name: 'GoPay', icon: 'ðŸ’š', type: 'ewallet' },
  { id: 'ovo', name: 'OVO', icon: 'ðŸ’œ', type: 'ewallet' },
  { id: 'dana', name: 'DANA', icon: 'ðŸ’™', type: 'ewallet' },
  { id: 'qris', name: 'QRIS', icon: 'ðŸ“±', type: 'qr' },
] as const

export const ORDER_STATUSES = {
  pending: { label: 'Menunggu Pembayaran', color: 'brand-orange', bg: '#FFF3ED' },
  processing: { label: 'Sedang Diproses', color: 'brand-purple', bg: '#F3EEFF' },
  completed: { label: 'Selesai', color: '#16A34A', bg: '#F0FDF4' },
  cancelled: { label: 'Dibatalkan', color: '#DC2626', bg: '#FEF2F2' },
  refunded: { label: 'Dikembalikan', color: '#6B7280', bg: '#F9FAFB' },
} as const

export const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Jelajahi Produk', href: '/explore' },
  { label: 'Kategori', href: '/categories', hasDropdown: true },
  { label: 'Pembelian Saya', href: '/purchases' },
] as const

export const FOOTER_LINKS = {
  categories: [
    { label: 'Software & Aplikasi', href: '/categories/software' },
    { label: 'Game PC', href: '/categories/games' },
    { label: 'Produktivitas', href: '/categories/productivity' },
    { label: 'Tools Developer', href: '/categories/developer' },
    { label: 'Aset Desain', href: '/categories/design' },
    { label: 'Template Digital', href: '/categories/templates' },
    { label: 'Utilitas', href: '/categories/utilities' },
  ],
  quickLinks: [
    { label: 'Beranda', href: '/' },
    { label: 'Semua Produk', href: '/products' },
    { label: 'Kategori', href: '/categories' },
    { label: 'Keranjang', href: '/cart' },
  ],
  helpCenter: [
    { label: 'Tanya Jawab', href: '/faq' },
    { label: 'Kontak', href: '/contact' },
    { label: 'Syarat dan Ketentuan', href: '/terms' },
    { label: 'Kebijakan Privasi', href: '/privacy' },
    { label: 'Kebijakan Pengembalian', href: '/refund-policy' },
  ],
}

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/sinzostore',
  instagram: 'https://instagram.com/sinzostore',
  discord: 'https://discord.gg/sinzostore',
  github: 'https://github.com/sinzostore',
}

