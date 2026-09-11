import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#CC0000',
};

export const metadata: Metadata = {
  title: 'G-Arts Student Photo Gallery | Swaminarayan Gurukul',
  description: 'Capturing and preserving memorable moments of students at Swaminarayan Gurukul. Official student photography gallery curated for Gurukul.',
  keywords: [
    'Swaminarayan Gurukul',
    'G-Arts',
    'Student Gallery',
    'School Photography',
    'Gurukul Events',
    'Annual Day',
    'Sports Meet',
    'Cultural Fest'
  ],
  authors: [{ name: 'G-Arts Media Wing, Swaminarayan Gurukul' }],
  openGraph: {
    title: 'G-Arts Student Photo Gallery | Swaminarayan Gurukul',
    description: 'Capturing and preserving memorable moments of students at Swaminarayan Gurukul.',
    type: 'website',
    locale: 'en_US',
    siteName: 'G-Arts Gurukul Gallery',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-[#212529] font-sans selection:bg-[#CC0000] selection:text-white">
        <Header />
        <main className="flex-1 bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
