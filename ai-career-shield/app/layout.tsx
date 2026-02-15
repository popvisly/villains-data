import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Career Portal | Build Strategic Resilience',
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
  openGraph: {
    title: 'AI Career Portal | Strategic Workflow Audit',
    description: 'Audit your role and generate a 30/60/90-day resilience sequence.',
    url: 'https://ai-career-portal.vercel.app',
    siteName: 'AI Career Portal',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Career Portal | Strategic Workflow Audit',
    description: 'Stay valuable in the AI-era with a definitive execution sequence.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
