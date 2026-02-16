import { Suspense } from 'react';
import IdentityClient from '@/app/identity/IdentityClient';
import { hasPlanAccess } from '@/app/actions/stripe';

export const dynamic = 'force-dynamic';

export default async function IdentityPage() {
    const access = await hasPlanAccess();

    return (
        <Suspense fallback={<main className="min-h-screen subtle-noise bg-slate-50/50" />}>
            <IdentityClient initialHasAccess={access.hasAccess} />
        </Suspense>
    );
}
