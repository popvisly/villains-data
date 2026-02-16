import { Suspense } from 'react';
import AssessmentClient from './AssessmentClient';
import { hasPlanAccess } from '@/app/actions/stripe';

export const dynamic = 'force-dynamic';

export default async function AssessmentPage() {
  const access = await hasPlanAccess();

  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <AssessmentClient initialHasAccess={access.hasAccess} initialTier={access.tier} />
    </Suspense>
  );
}
