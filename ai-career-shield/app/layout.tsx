import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Career Portal | Build Career Resilience',
  description:
    'Get clarity on how work is changing — plus a practical 30/60/90-day plan to stay valuable in your field.',
  keywords: [
    'career resilience',
    'career planning',
    'career change',
    'future-ready skills',
    'what to study in college',
  ],
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
