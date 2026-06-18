import Header from '@/components/Header';
import ViewCanvas from '@/components/three/ViewCanvas';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/Footer';

const alpino = localFont({
  src: '../public/fonts/Alpino-Variable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-alpino',
});

export const metadata: Metadata = {
  title: { default: 'Fizzi', template: '%s | Fizzi' },
  description:
    'Fizzi is a gut-friendly soda brand for gutsy people, delivering probiotic refreshment with real fruit flavor, low sugar, and natural ingredients.',
  authors: [{ name: 'Fizzi' }],
  creator: 'Fizzi',
  publisher: 'Fizzi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-production-url.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fizzi - Soda for Gutsy people',
    description:
      'Live Gutsy with Fizzi — a probiotic soda with real fruit, low sugar, and bold flavor for a happier gut.',
    url: 'https://your-production-url.com',
    siteName: 'Fizzi',
    images: [
      {
        url: '/bunched-cans.png',
        width: 1200,
        height: 630,
        alt: 'Fizzi soda cans',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fizzi - Soda for Gutsy people',
    description:
      'Live Gutsy with Fizzi — a probiotic soda with real fruit, low sugar, and bold flavor for a happier gut.',
    images: ['/bunched-cans.png'],
    creator: '@Theblackguy_1',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alpino.variable} h-full antialiased`}>
      <body className="overflow-x-hidden! bg-yellow-300">
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
        <Footer/>
      </body>
    </html>
  );
}
