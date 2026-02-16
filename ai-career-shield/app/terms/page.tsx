'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { APP_NAME } from '@/lib/brand';

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white py-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-12 transition-colors">
                    <Icon name="arrowRight" size={16} className="rotate-180" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 mb-8 font-serif">Terms of Service</h1>
                <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
                    <p className="text-sm font-medium italic">Last Updated: February 16, 2026</p>

                    <p>By using {APP_NAME}, you agree to the following terms.</p>

                    <h2 className="text-xl font-bold text-slate-900">1. Service Description</h2>
                    <p>{APP_NAME} provides a strategic assessment and operating plan based on user inputs. The results are based on AI models and should be treated as strategic guidance, not professional advice or a guarantee of outcomes.</p>

                    <h2 className="text-xl font-bold text-slate-900">2. Use of Service</h2>
                    <p>You agree to use the service for personal or professional growth and not for any unlawful purposes. You are responsible for any decisions made based on the plans generated.</p>

                    <h2 className="text-xl font-bold text-slate-900">3. Payments and Refunds</h2>
                    <p>The AI-Life Plan Suite Unlock is a one-time purchase. Due to the digital nature of the product, refunds are generally not provided once the plan is generated, but we handle cases on a case-by-case basis via support.</p>

                    <h2 className="text-xl font-bold text-slate-900">4. Limitation of Liability</h2>
                    <p>{APP_NAME} and Villains At Large are not liable for any career outcomes, financial losses, or decisions made based on the use of this tool.</p>
                </div>
            </div>
        </main>
    );
}
