'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { APP_NAME } from '@/lib/brand';

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white py-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-12 transition-colors">
                    <Icon name="arrowRight" size={16} className="rotate-180" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 mb-8 font-serif">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                    <p className="text-sm font-medium italic">Last Updated: February 16, 2026</p>

                    <p>At {APP_NAME}, we take your privacy seriously. This policy outlines how we handle your data.</p>

                    <h2 className="text-xl font-bold text-slate-900">1. Data Collection</h2>
                    <p>We do not store your assessment inputs by default. Your inputs are used in-session to generate your Career Operating Plan and are not persisted to our database unless you explicitly save them to your account (future feature).</p>

                    <h2 className="text-xl font-bold text-slate-900">2. Cookies and Tracking</h2>
                    <p>We use lightweight analytics to understand how users interact with our site. This helps us improve our modules and user experience. We do not use invasive tracking or sell your data to third parties.</p>

                    <h2 className="text-xl font-bold text-slate-900">3. Payments</h2>
                    <p>Payments are handled securely via Stripe. We do not store your credit card information on our servers.</p>

                    <h2 className="text-xl font-bold text-slate-900">4. Contact</h2>
                    <p>If you have any questions about this policy, please contact us at support@captori.com.</p>
                </div>
            </div>
        </main>
    );
}
