import { verifySession } from '@/app/actions/stripe';
import { redirect } from 'next/navigation';

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id: string; assessmentId: string }>;
}) {
    const sp = await searchParams;
    if (!sp.session_id) {
        redirect('/assessment');
    }

    const result = await verifySession(sp.session_id);

    if (result.success) {
        redirect('/assessment?unlocked=true');
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
            <div className="text-center text-white space-y-4">
                <h1 className="text-2xl font-bold text-red-400">Payment Verification Failed</h1>
                <p className="text-gray-400">
                    We couldn&apos;t verify your payment. Please contact support.
                </p>
                <a href="/assessment" className="text-blue-400 hover:underline">
                    Return to Assessment
                </a>
            </div>
        </div>
    );
}
