export const SITE_NAME = 'PixelStore'
export const SITE_DESCRIPTION = 'Your Digital World Starts Here.'

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
  { label: 'Home', href: '/' },
  { label: 'Explore Products', href: '/explore' },
  { label: 'Categories', href: '/categories', hasDropdown: true },
  { label: 'My Purchases', href: '/purchases' },
] as const

export const FOOTER_LINKS = {
  categories: [
    { label: 'Software & Apps', href: '/categories/software' },
    { label: 'PC Games', href: '/categories/games' },
    { label: 'Productivity', href: '/categories/productivity' },
    { label: 'Developer Tools', href: '/categories/developer' },
    { label: 'Design Assets', href: '/categories/design' },
    { label: 'Templates', href: '/categories/templates' },
    { label: 'Utilities', href: '/categories/utilities' },
  ],
  quickLinks: [
    { label: 'Home', href: '/' },
    { label: 'Explore Products', href: '/explore' },
    { label: 'New Arrivals', href: '/explore?badge=new-arrival' },
    { label: 'Best Sellers', href: '/explore?badge=best-seller' },
  ],
  helpCenter: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Refund Policy', href: '/refund' },
  ],
}

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/pixelstore',
  instagram: 'https://instagram.com/pixelstore',
  discord: 'https://discord.gg/pixelstore',
  github: 'https://github.com/pixelstore',
}
