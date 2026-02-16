import type { Metadata } from 'next';
import { Inter, Lora, Raleway } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

import { APP_NAME, APP_TAGLINE, APP_URL } from '@/lib/brand';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: `${APP_NAME} | ${APP_TAGLINE}`,
  description:
    'Audit your role and generate a strategic resilience roadmap. Get a precise 30/60/90-day execution sequence to stay valuable in the AI-era.',
  keywords: [
    'career resilience',
    'career planning',
    'career change',
    'future-ready skills',
    'AI job risk',
    'executive roadmap',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${APP_NAME} | ${APP_TAGLINE}`,
    description: 'Audit your role and generate a 30/60/90-day resilience sequence.',
    url: APP_URL,
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} | ${APP_TAGLINE}`,
    description: 'Stay valuable in the AI-era with a definitive execution sequence.',
  },
};

import SEO from '@/components/SEO';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${lora.variable} ${raleway.variable} font-sans`}>
        <SEO />
        {children}
      </body>
    </html>
  );
}
