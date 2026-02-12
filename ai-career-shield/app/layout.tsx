import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Career Shield | Future-Proof Your Career',
  description:
    "Don't let AI take your job. Discover your AI risk score and get a personalized roadmap to an AI-proof career.",
  keywords: [
    'AI job risk',
    'AI-proof careers',
    'career change',
    'what to study in college',
    'future-proof jobs',
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
