'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Runtime Error:', error);
    }, [error]);

    const supportCode = `${new Date().toISOString().split('T')[0]}-${error.digest || 'UNKNOWN'}`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">
            <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-red-500/30 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">⚠️</span>
                </div>

                <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>

                <div className="bg-slate-900 rounded-lg p-4 mb-6 text-left">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Support Code</p>
                    <code className="text-red-400 font-mono text-sm break-all select-all">
                        {supportCode}
                    </code>
                </div>

                <p className="text-gray-400 mb-8">
                    We&apos;ve been notified of the issue. Please try again, or contact support with the code above.
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={reset}
                        className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition"
                    >
                        Try again
                    </button>
                    <a
                        href={`mailto:support@aicareershield.com?subject=Error Report: ${supportCode}`}
                        className="block w-full py-3 bg-white/5 text-gray-300 font-medium rounded-xl hover:bg-white/10 transition border border-white/10"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
