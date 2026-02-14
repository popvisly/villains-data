import { Suspense } from 'react';
import AssessmentClient from './AssessmentClient';

export const dynamic = 'force-dynamic';

export default function AssessmentPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <AssessmentClient />
    </Suspense>
  );
}
