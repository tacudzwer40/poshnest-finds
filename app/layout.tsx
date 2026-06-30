import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PoshNest Finds | Aesthetic Home & Decor Ideas',
    template: '%s · PoshNest Finds',
  },

  description:
    'Curated home décor finds, styling guides, and aesthetic living inspiration. Modern, warm, and unfussy.',
  keywords: [
    'home decor',
    'aesthetic decor',
    'interior design',
    'living room ideas',
    'bedroom decor',
    'Amazon home finds',
  ],
  authors: [{ name: 'PoshNest Finds' }],
  openGraph: {
    type: 'website',
    siteName: 'PoshNest Finds',
    title: 'PoshNest Finds | Aesthetic Home & Decor Ideas',

    description:
      'Curated home décor finds, styling guides, and aesthetic living inspiration.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PoshNest Finds | Aesthetic Home & Decor Ideas',

    description:
      'Curated home décor finds, styling guides, and aesthetic living inspiration.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
