import type { Metadata } from 'next';
import { Inter, Lora, Raleway } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });

import { APP_NAME, APP_PRODUCT, APP_TAGLINE, APP_URL } from '@/lib/brand';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Captori – AI-Driven Career Action Plan | Personalized 30/60/90 Strategy',
  description:
    'Create a personalized AI-Life Plan with measurable outcomes, templates, and a tailored roadmap to grow your career or project.',
  keywords: [
    'career resilience',
    'career planning',
    'AI career strategy',
    '30/60/90 plan AI',
    'future-ready career',
    'AI job risk assessment',
    'professional growth roadmap',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Captori – AI-Driven Career Action Plan',
    description: 'Create a personalized AI-Life Plan with measurable outcomes, templates, and a tailored roadmap.',
    url: APP_URL,
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Captori – AI-Driven Career Action Plan',
    description: 'Create a personalized AI-Life Plan with measurable outcomes and templates.',
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
        <Script id="crisp-widget" strategy="afterInteractive">
          {`
            window.$crisp=[];window.CRISP_WEBSITE_ID="6ec2802d-0797-4560-a8d8-26f59066601f";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
          `}
        </Script>
      </body>
    </html>
  );
}
