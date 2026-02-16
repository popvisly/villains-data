import { Suspense } from 'react';
import PlaybookClient from '@/app/playbook/PlaybookClient';
import { hasPlanAccess } from '@/app/actions/stripe';

export const dynamic = 'force-dynamic';

export default async function PlaybookPage() {
    const access = await hasPlanAccess();

    return (
        <Suspense fallback={<main className="min-h-screen subtle-noise bg-slate-50/50" />}>
            <PlaybookClient initialHasAccess={access.hasAccess} />
        </Suspense>
    );
}
