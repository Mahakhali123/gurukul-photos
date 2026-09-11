import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#000000',
};

export const metadata: Metadata = {
  title: 'G-Arts Student Photo Gallery | Swaminarayan Gurukul',
  description:
    'Official student photography archive of Shree Swaminarayan Gurukul International School — Vidya, Sadvidya, Brahmavidya. Curated by the G-Arts media wing.',
  keywords: [
    'Swaminarayan Gurukul',
    'G-Arts',
    'Student Gallery',
    'School Photography',
    'Gurukul Events',
    'Annual Day',
    'Sports Meet',
    'Cultural Fest',
  ],
  authors: [{ name: 'G-Arts Media Wing, Swaminarayan Gurukul' }],
  openGraph: {
    title: 'G-Arts Student Photo Gallery | Swaminarayan Gurukul',
    description:
      'Capturing and preserving memorable moments of students at Swaminarayan Gurukul.',
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
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-white text-[#212121] font-sans selection:bg-[#17171c] selection:text-white">
        <Header />
        <main className="flex-1 bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
