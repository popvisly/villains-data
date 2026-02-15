'use client';

import React, { useState } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';

import { EXECUTION_PACK_PRICE_DISPLAY } from '@/lib/constants';

interface PaywallProps {
    hasAccess: boolean;
    assessmentId: string;
    children: React.ReactNode;
}

export const Paywall: React.FC<PaywallProps> = ({ hasAccess, assessmentId, children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUnlock = async () => {
        setIsLoading(true);
        try {
            const result = await createCheckoutSession(assessmentId);
            if (result.url) {
                window.location.href = result.url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setIsLoading(false);
            alert('Failed to start checkout. Please try again.');
        }
    };

    if (hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className="relative">
            {/* Blurred Preview Content */}
            <div className="relative h-[400px] overflow-hidden select-none" aria-hidden="true">
                <div className="blur-[6px] opacity-60 pointer-events-none grayscale transition-all duration-700">
                    {children}
                </div>
                {/* Light overlay (warm minimal) */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(248,250,252,0.85)] to-[rgba(248,250,252,0.96)] z-10" />
            </div>

            {/* Unlock Card - Absolute Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 z-20">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden">
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-600/10 border border-emerald-200 flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-slate-950 mb-2">Secure Your Execution Sequence</h3>
                            <div className="space-y-4 text-left mt-6">
                                {[
                                    { title: "Strategic Roadmap", desc: "A definitive 30/60/90-day sequence for operational resilience." },
                                    { title: "Portfolio Deliverables", desc: "2 high-impact project briefs ready for your professional record." },
                                    { title: "Market Adjacencies", desc: "Precise role pivots mapped to current institutional demand." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{item.title}</p>
                                            <p className="text-xs text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-3xl font-bold text-slate-950 tracking-tight">
                            {EXECUTION_PACK_PRICE_DISPLAY}{' '}
                            <span className="text-sm text-slate-500 font-normal">one-time (no subscription)</span>
                        </div>

                        <button
                            onClick={handleUnlock}
                            disabled={isLoading}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Redirecting…
                                </span>
                            ) : (
                                'Continue to checkout'
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                            <span>Instant access</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span>One-time payment via Stripe</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
