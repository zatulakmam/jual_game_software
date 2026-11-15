'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronDown, User, Search, LogOut } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase';
import { getUserDisplayName, useCurrentUser } from '@/lib/useCurrentUser';

const CATEGORIES = [
  { name: 'Software', slug: 'software' },
  { name: 'Game PC', slug: 'games' },
  { name: 'Produktivitas', slug: 'productivity' },
  { name: 'Tools Developer', slug: 'developer' },
  { name: 'Aset Desain', slug: 'design' },
  { name: 'Template', slug: 'templates' },
  { name: 'Utilitas', slug: 'utilities' },
];

export const Navbar: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = useCurrentUser();
  const userName = user ? getUserDisplayName(user) : '';

  const handleSignOut = async () => {
    try {
      const { error } = await createClient().auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }

      setMobileOpen(false);
      toast.success('Kamu sudah keluar dari akun.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal keluar dari akun.');
    }
  };

  // SSR-safe cart count from zustand
  useEffect(() => {
    const loadStore = async () => {
      try {
        const { useCartStore } = await import('@/lib/store');
        const unsubscribe = useCartStore.subscribe((state) => {
          setCartCount(state.items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0));
        });
        // initial
        const state = useCartStore.getState();
        setCartCount(state.items.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0));
        return unsubscribe;
      } catch {
        // store not ready yet
      }
    };
    loadStore();
  }, []);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  const navLinkStyle: React.CSSProperties = {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: '14px',
    color: '#171717',
    textDecoration: 'none',
    padding: '6px 8px',
    borderRadius: '6px',
    transition: 'background 0.15s',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    whiteSpace: 'nowrap',
  };

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: '#F5F0E8',
          borderBottom: '2px solid #171717',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
            <div
              style={{
                width: 36,
                height: 36,
                backgroundColor: '#F9ED32',
                border: '2px solid #171717',
                boxShadow: '2px 2px 0px #171717',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 15,
                color: '#171717',
              }}
            >
              SS
            </div>
            <span style={{ fontWeight: 900, fontSize: '20px', color: '#171717', letterSpacing: '-0.5px' }}>
              Sinzo Store
            </span>
          </Link>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 1, minWidth: 0 }} className="hidden-mobile">
            <Link href="/" style={navLinkStyle} className="nav-link">Beranda</Link>
            <Link href="/explore" style={navLinkStyle} className="nav-link">Jelajahi</Link>

            {/* Categories dropdown */}
            <div ref={categoryRef} style={{ position: 'relative' }}>
              <button
                style={{ ...navLinkStyle, border: 'none', background: 'none', cursor: 'pointer' }}
                onClick={() => setCategoryOpen((o) => !o)}
              >
                Kategori <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: categoryOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              {categoryOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    backgroundColor: '#F5F0E8',
                    border: '2px solid #171717',
                    boxShadow: '4px 4px 0px #171717',
                    borderRadius: '8px',
                    minWidth: 200,
                    overflow: 'hidden',
                    zIndex: 200,
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#171717',
                        textDecoration: 'none',
                        borderBottom: '1px solid #E5E7EB',
                        transition: 'background 0.1s',
                      }}
                      onClick={() => setCategoryOpen(false)}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#F9ED32'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/purchases" style={navLinkStyle} className="nav-link">Pembelian Saya</Link>
          </div>

          {/* Search - desktop */}
          <div style={{ flex: '1 1 180px', maxWidth: 320, minWidth: 160 }} className="hidden-mobile">
            <SearchBar placeholder="Cari produk..." onSearch={handleSearch} size="sm" />
          </div>

          {/* Right side actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto', flexShrink: 0 }}>
            {/* Mobile search toggle */}
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none', color: '#171717' }}
              className="show-mobile"
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Cari produk"
            >
              <Search size={22} />
            </button>

            {/* Cart */}
            <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', color: '#171717' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: '2px solid #171717',
                  boxShadow: '2px 2px 0px #171717',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                }}
              >
                <ShoppingCart size={20} />
              </div>
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    minWidth: 20,
                    height: 20,
                    backgroundColor: '#FF7547',
                    border: '1.5px solid #171717',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#171717',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Account actions - desktop */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="hidden-mobile">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    title="Buka akun"
                    style={{
                      ...navLinkStyle,
                      maxWidth: 150,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <User size={17} />
                    {userName}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    aria-label="Keluar dari akun"
                    title="Keluar"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#171717', display: 'flex' }}
                  >
                    <LogOut size={18} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    style={{
                      padding: '8px 16px',
                      border: '2px solid #171717',
                      borderRadius: '6px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#171717',
                      textDecoration: 'none',
                      backgroundColor: 'transparent',
                    }}
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    style={{
                      padding: '8px 16px',
                      border: '2px solid #171717',
                      borderRadius: '6px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '14px',
                      color: '#171717',
                      textDecoration: 'none',
                      backgroundColor: '#F9ED32',
                      boxShadow: '2px 2px 0px #171717',
                    }}
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger - mobile */}
            <button
              style={{
                background: 'none',
                border: '2px solid #171717',
                borderRadius: '6px',
                width: 40,
                height: 40,
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#171717',
              }}
              className="show-mobile"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Buka menu navigasi"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div style={{ padding: '12px 24px', borderTop: '1px solid #E5E7EB' }} className="show-mobile">
            <SearchBar placeholder="Cari produk..." onSearch={handleSearch} />
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              borderTop: '2px solid #171717',
              backgroundColor: '#F5F0E8',
              padding: '16px 24px',
            }}
            className="show-mobile"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Jelajahi', href: '/explore' },
                { label: 'Pembelian Saya', href: '/purchases' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '12px 0',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#171717',
                    textDecoration: 'none',
                    borderBottom: '1px solid #E5E7EB',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ paddingTop: 8 }}>
                <p style={{ fontWeight: 700, fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', marginBottom: 8 }}>Kategori</p>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    style={{
                      display: 'block',
                      padding: '10px 0',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: '15px',
                      color: '#171717',
                      textDecoration: 'none',
                      borderBottom: '1px solid #F3F4F6',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16 }}>
                  <Link
                    href="/dashboard"
                    style={{ ...navLinkStyle, padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <User size={18} />
                    {userName}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 0', border: 'none', background: 'none', color: '#171717', font: 'inherit', fontWeight: 700, cursor: 'pointer' }}
                  >
                    <LogOut size={18} />
                    Keluar
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 12, paddingTop: 16 }}>
                  <Link
                    href="/login"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '12px',
                      border: '2px solid #171717',
                      borderRadius: '6px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#171717',
                      textDecoration: 'none',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      padding: '12px',
                      border: '2px solid #171717',
                      borderRadius: '6px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#171717',
                      textDecoration: 'none',
                      backgroundColor: '#F9ED32',
                      boxShadow: '2px 2px 0px #171717',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1100px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 1101px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
        .nav-link:hover { background-color: #F9ED32 !important; }
      `}</style>
    </>
  );
};

export default Navbar;
