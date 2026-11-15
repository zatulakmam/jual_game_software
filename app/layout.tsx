import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Sinzo Store – Game & Software Digital',
  description:
    'Temukan game, software, dan item digital di Sinzo Store. Cek informasi serta harga produk sebelum memilih.',
  keywords: [
    'produk digital',
    'software',
    'game PC',
    'tools developer',
    'template digital',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F5F0E8] text-[#171717] antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              border: '2px solid #171717',
              borderRadius: '8px',
              boxShadow: '4px 4px 0px #171717',
              fontFamily: "'Space Grotesk', sans-serif",
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
