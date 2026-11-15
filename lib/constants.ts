export const SITE_NAME = 'Sinzo Store'
export const SITE_DESCRIPTION = 'Tempat cari game, software, dan item digital.'

export const PAYMENT_METHODS = [
  { id: 'bca', name: 'BCA Transfer', icon: '🏦', type: 'bank' },
  { id: 'bni', name: 'BNI Transfer', icon: '🏦', type: 'bank' },
  { id: 'mandiri', name: 'Mandiri Transfer', icon: '🏦', type: 'bank' },
  { id: 'gopay', name: 'GoPay', icon: '💚', type: 'ewallet' },
  { id: 'ovo', name: 'OVO', icon: '💜', type: 'ewallet' },
  { id: 'dana', name: 'DANA', icon: '💙', type: 'ewallet' },
  { id: 'qris', name: 'QRIS', icon: '📱', type: 'qr' },
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
  twitter: 'https://twitter.com/pixelstore',
  instagram: 'https://instagram.com/pixelstore',
  discord: 'https://discord.gg/pixelstore',
  github: 'https://github.com/pixelstore',
}
