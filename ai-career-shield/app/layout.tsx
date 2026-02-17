import type { Metadata } from 'next';
import { Inter, Lora, Raleway } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

import { APP_NAME, APP_PRODUCT, APP_TAGLINE, APP_URL } from '@/lib/brand';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Captori – Career Operating Plan | Personalized 30/60/90 Strategy',
  description:
    'Create a personalized Career Operating Plan with measurable outcomes, templates, and a tailored roadmap to grow your career or project.',
  keywords: [
    'career resilience',
    'career planning',
    'AI career strategy',
    '30/60/90 plan AI',
    'future-ready career',
    'AI job resilience assessment',
    'professional growth roadmap',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Captori – Career Operating Plan',
    description: 'Create a personalized Career Operating Plan with measurable outcomes, templates, and a tailored roadmap.',
    url: APP_URL,
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captori – Career Operating Plan',
    description: 'Create a personalized Career Operating Plan with measurable outcomes and templates.',
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
