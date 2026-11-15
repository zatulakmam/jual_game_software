'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Grid,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react'

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Produk', icon: Package },
  { href: '/admin/categories', label: 'Kategori', icon: Grid },
  { href: '/admin/orders', label: 'Pesanan', icon: ShoppingBag },
  { href: '/admin/customers', label: 'Pelanggan', icon: Users },
  { href: '/admin/vouchers', label: 'Voucher', icon: Tag },
  { href: '/admin/settings', label: 'Pengaturan', icon: Settings },
]

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div
      style={{ backgroundColor: '#171717', width: '240px', minHeight: '100vh' }}
      className="flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <Link href="/admin" className="flex items-center gap-2">
          <div
            style={{ backgroundColor: '#F9ED32', border: '2px solid #F9ED32' }}
            className="w-8 h-8 flex items-center justify-center rounded"
          >
            <Zap size={16} color="#171717" fill="#171717" />
          </div>
          <span
            style={{ color: '#F9ED32', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}
          >
            SINZO<span style={{ color: '#fff' }}> STORE</span>
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Tutup menu admin"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.15s',
                backgroundColor: isActive ? 'rgba(249,237,50,0.12)' : 'transparent',
                color: isActive ? '#F9ED32' : '#9ca3af',
                border: isActive ? '1px solid rgba(249,237,50,0.3)' : '1px solid transparent',
              }}
            >
              <Icon size={18} color={isActive ? '#F9ED32' : '#9ca3af'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            color: '#f87171',
            width: '100%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(248,113,113,0.1)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
          }}
        >
          <LogOut size={18} color="#f87171" />
          Keluar
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin] = useState(true)
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F5F0E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            border: '2px solid #171717',
            boxShadow: '6px 6px 0px #171717',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              marginBottom: '16px',
            }}
          >
            🚫
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#171717',
              marginBottom: '8px',
            }}
          >
            AKSES DITOLAK
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            Kamu tidak memiliki izin untuk membuka panel admin.
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#F9ED32',
              border: '2px solid #171717',
              boxShadow: '4px 4px 0px #171717',
              borderRadius: '8px',
              padding: '12px 24px',
              fontWeight: 700,
              color: '#171717',
              textDecoration: 'none',
            }}
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#F5F0E8',
        fontFamily: 'Space Grotesk, sans-serif',
      }}
    >
      {desktopSidebarOpen && (
        <div className="hidden lg:flex" style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 50 }}>
          <Sidebar onClose={() => setDesktopSidebarOpen(false)} />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 100 }}
          className="lg:hidden"
        >
          <div
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0 }}>
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        style={{ flex: 1, minWidth: 0 }}
        className={`transition-[margin] duration-200 ${desktopSidebarOpen ? 'lg:ml-[240px]' : 'lg:ml-0'}`}
      >
        <div
          style={{
            backgroundColor: '#171717',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: '#F9ED32', fontWeight: 800, fontSize: '16px' }}>SINZO STORE</span>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden"
            style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Buka menu admin"
            aria-expanded={mobileSidebarOpen}
          >
            <Menu size={24} />
          </button>
          <button
            onClick={() => setDesktopSidebarOpen((open) => !open)}
            className="hidden lg:block"
            style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label={desktopSidebarOpen ? 'Tutup menu admin' : 'Buka menu admin'}
            aria-expanded={desktopSidebarOpen}
          >
            {desktopSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
