'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, MessageSquare, Terminal, Send } from 'lucide-react';

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
                PS
              </div>
              <span style={{ fontWeight: 900, fontSize: '20px', color: '#ffffff', letterSpacing: '-0.5px' }}>
                PixelStore
              </span>
            </Link>
            <p style={{ fontSize: '14px', fontWeight: 500, color: '#9CA3AF', lineHeight: 1.7, maxWidth: 240 }}>
              Your digital world, delivered instantly.
            </p>
            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: 16 }}>
              The best place to buy digital products at unbeatable prices.
            </p>
          </div>

          {/* Product Categories */}
          <div>
            <p style={headingStyle}>Product Categories</p>
            {[
              { label: 'Software & Apps', href: '/categories/software' },
              { label: 'PC Games', href: '/categories/games' },
              { label: 'Productivity', href: '/categories/productivity' },
              { label: 'Developer Tools', href: '/categories/developer' },
              { label: 'Design Assets', href: '/categories/design' },
              { label: 'Templates', href: '/categories/templates' },
              { label: 'Utilities', href: '/categories/utilities' },
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
            <p style={headingStyle}>Quick Links</p>
            {[
              { label: 'Home', href: '/' },
              { label: 'Explore Products', href: '/explore' },
              { label: 'New Arrivals', href: '/explore?filter=new-arrival' },
              { label: 'Best Sellers', href: '/explore?filter=best-seller' },
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
            <p style={headingStyle}>Help Center</p>
            {[
              { label: 'FAQ', href: '/faq' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Refund Policy', href: '/refund-policy' },
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

          {/* Connect */}
          <div>
            <p style={headingStyle}>Connect</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Twitter / X', href: 'https://twitter.com', icon: <Send size={18} /> },
                { label: 'Instagram', href: 'https://instagram.com', icon: <Globe size={18} /> },
                { label: 'Discord', href: 'https://discord.com', icon: <MessageSquare size={18} /> },
                { label: 'GitHub', href: 'https://github.com', icon: <Terminal size={18} /> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: '#D1D5DB',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F9ED32'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#D1D5DB'; }}
                >
                  {social.icon}
                  {social.label}
                </a>
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
            Copyright © 2024 PixelStore. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/terms" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Terms</Link>
            <Link href="/privacy" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/refund-policy" style={{ fontSize: '13px', color: '#6B7280', textDecoration: 'none' }}>Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
