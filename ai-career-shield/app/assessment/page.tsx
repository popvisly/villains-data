import { Suspense } from 'react';
import AssessmentClient from './AssessmentClient';
import { hasExecutionPackAccess } from '@/app/actions/stripe';

export const dynamic = 'force-dynamic';

export default async function AssessmentPage() {
  const hasAccess = await hasExecutionPackAccess();

  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <AssessmentClient initialHasAccess={hasAccess} />
    </Suspense>
  );
}
