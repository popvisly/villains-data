import { Suspense } from 'react';
import AttentionClient from './AttentionClient';
import { hasPlanAccess } from '@/app/actions/stripe';

export const dynamic = 'force-dynamic';

export default async function AttentionPage() {
    const access = await hasPlanAccess();

    return (
        <Suspense fallback={<main className="min-h-screen bg-white" />}>
            <main className="min-h-screen bg-slate-50">
                <AttentionClient hasAccess={access.hasAccess} />
            </main>
        </Suspense>
    );
}
