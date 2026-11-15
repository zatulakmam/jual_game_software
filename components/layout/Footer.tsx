'use client';

import React from 'react';
import Link from 'next/link';
const footerLinkStyle: React.CSSProperties = {
  display: 'block',
  color: '#D1D5DB',
  textDecoration: 'none',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 500,
  fontSize: '14px',
  marginBottom: '10px',
  transition: 'color 0.15s',
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 800,
  fontSize: '14px',
  color: '#F9ED32',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '16px',
};

export const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: '#171717', color: '#D1D5DB', fontFamily: "'Space Grotesk', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 40px' }}>
        {/* Top section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: '#F9ED32',
                  border: '2px solid #F9ED32',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: 15,
                  color: '#171717',
                  flexShrink: 0,
                }}
              >
                SS
              </div>
              <span style={{ fontWeight: 900, fontSize: '20px', color: '#ffffff', letterSpacing: '-0.5px' }}>
                Sinzo Store
              </span>
            </Link>
            <p style={{ fontSize: '14px', fontWeight: 500, color: '#9CA3AF', lineHeight: 1.7, maxWidth: 240 }}>
              Tempat cari game, software, dan item digital.
            </p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: 16 }}>
              Cek detail dan harga produk sebelum memilih.
            </p>
          </div>

          {/* Product Categories */}
          <div>
            <p style={headingStyle}>Kategori Produk</p>
            {[
              { label: 'Software & Aplikasi', href: '/categories/software' },
              { label: 'Game PC', href: '/categories/games' },
              { label: 'Produktivitas', href: '/categories/productivity' },
              { label: 'Tools Developer', href: '/categories/developer' },
              { label: 'Aset Desain', href: '/categories/design' },
              { label: 'Template Digital', href: '/categories/templates' },
              { label: 'Utilitas', href: '/categories/utilities' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={footerLinkStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F9ED32'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#D1D5DB'; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <p style={headingStyle}>Jelajahi</p>
            {[
              { label: 'Beranda', href: '/' },
              { label: 'Semua Produk', href: '/products' },
              { label: 'Kategori', href: '/categories' },
              { label: 'Keranjang', href: '/cart' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={footerLinkStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F9ED32'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#D1D5DB'; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Help Center */}
          <div>
            <p style={headingStyle}>Bantuan</p>
            {[
              { label: 'Tanya Jawab', href: '/faq' },
              { label: 'Kontak', href: '/contact' },
              { label: 'Syarat dan Ketentuan', href: '/terms' },
              { label: 'Kebijakan Privasi', href: '/privacy' },
              { label: 'Kebijakan Pengembalian', href: '/refund-policy' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={footerLinkStyle}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F9ED32'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#D1D5DB'; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div>
            <p style={headingStyle}>Akun</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Pembelian Saya', href: '/purchases' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#D1D5DB',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F9ED32'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#D1D5DB'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #374151',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            © Sinzo Store.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/terms" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Ketentuan</Link>
            <Link href="/privacy" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Privasi</Link>
            <Link href="/refund-policy" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Pengembalian</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
