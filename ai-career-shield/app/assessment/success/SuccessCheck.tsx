'use client';

import { useEffect, useState } from 'react';
import { verifySession } from '@/app/actions/stripe';
import { useRouter } from 'next/navigation';

export default function SuccessCheck({ sessionId }: { sessionId: string }) {
    const router = useRouter();
    const [status, setStatus] = useState<'verifying' | 'error'>('verifying');

    useEffect(() => {
        let mounted = true;

        async function verify() {
            try {
                // Determine if we are in Mock Mode via URL or passed prop?
                // The verifySession logic already has the mock bypass if we kept it.
                // We did keep it.

                const result = await verifySession(sessionId);

                if (!mounted) return;

                if (result.success) {
                    // Cookie is set! Redirect to assessment to see unlocked state.
                    router.push('/assessment');
                    router.refresh(); // Ensure the layout refreshes to pick up the cookie
                } else {
                    console.error('Verification failed:', result.error);
                    setStatus('error');
                }
            } catch (err) {
                console.error('Verify error:', err);
                if (mounted) setStatus('error');
            }
        }

        verify();

        return () => { mounted = false; };
    }, [sessionId, router]);

    if (status === 'error') {
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

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-8">
            <div className="text-center text-white space-y-4">
                <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
                <h1 className="text-xl font-semibold">Verifying your access...</h1>
                <p className="text-gray-500 text-sm">Do not close this window.</p>
            </div>
        </div>
    );
}
