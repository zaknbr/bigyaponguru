import type { Metadata, Viewport } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { JargonModal } from '@/components/JargonModal';

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const SITE_URL = 'https://adguru.smartconverterbd.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'বিজ্ঞাপন গুরু | ফেসবুক ও টিকটক অ্যাডস গাইড বাংলাদেশ (Meta & TikTok Ads Guide)',
  description:
    'বাংলাদেশের নতুন উদ্যোক্তা ও এফ-কমার্স বিক্রেতাদের জন্য এজেন্সির মতো ফেসবুক ও টিকটক বিজ্ঞাপন চালানোর সম্পূর্ণ বাংলা গাইড। বাজেট নির্ধারণ, অ্যাড কপি বিল্ডার ও সমস্যা সমাধান।',
  keywords: [
    'বিজ্ঞাপন গুরু',
    'ফেসবুক বিজ্ঞাপন বাংলাদেশ',
    'টিকটক বিজ্ঞাপন বাংলাদেশ',
    'Meta Ads Bangladesh',
    'TikTok Ads Bangladesh',
    'F-commerce Bangladesh',
    'ফেসবুক বুস্ট বনাম অ্যাডস ম্যানেজার',
    'ফেসবুক অ্যাড কপিরাইটিং বাংলা',
    'বিজ্ঞাপন সমস্যা সমাধান',
    'adguru smartconverterbd',
  ],
  authors: [{ name: 'বিজ্ঞাপন গুরু টিম', url: SITE_URL }],
  creator: 'বিজ্ঞাপন গুরু',
  publisher: 'SmartConverter BD',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: SITE_URL,
    siteName: 'বিজ্ঞাপন গুরু',
    title: 'বিজ্ঞাপন গুরু | ফেসবুক ও টিকটক অ্যাডস গাইড বাংলাদেশ',
    description:
      'বাংলাদেশের নতুন উদ্যোক্তা ও এফ-কমার্স বিক্রেতাদের জন্য সহজ ও কার্যকর ফেসবুক এবং টিকটক বিজ্ঞাপন গাইড।',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বিজ্ঞাপন গুরু | ফেসবুক ও টিকটক অ্যাডস গাইড বাংলাদেশ',
    description:
      'বাংলাদেশের নতুন উদ্যোক্তা ও এফ-কমার্স বিক্রেতাদের জন্য সম্পূর্ণ বাংলায় তৈরি বিজ্ঞাপন সহায়িকা।',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#059669',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'বিজ্ঞাপন গুরু (Bigyaponguru)',
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  inLanguage: 'bn',
  description:
    'বাংলাদেশের উদ্যোক্তা ও অনলাইন বিক্রেতাদের জন্য ফেসবুক ও টিকটক বিজ্ঞাপন শেখার সহজ ও প্রফেশনাল বাংলা গাইড ও টুল।',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'BDT',
  },
  creator: {
    '@type': 'Organization',
    name: 'SmartConverter BD',
    url: 'https://smartconverterbd.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-100/70 text-slate-900 min-h-screen font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <AppProvider>
          {children}
          <JargonModal />
        </AppProvider>
      </body>
    </html>
  );
}

