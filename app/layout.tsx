import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'PixelStore – Digital Product Marketplace',
  description:
    'Your Digital World Starts Here. Discover software licenses, PC games, productivity tools, and digital templates with instant delivery.',
  keywords: [
    'digital products',
    'software license',
    'pc games',
    'developer tools',
    'notion templates',
    'neo-brutalism marketplace',
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
