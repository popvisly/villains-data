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
                <div className="blur-[6px] opacity-50 pointer-events-none grayscale transition-all duration-700">
                    {children}
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950 z-10" />
            </div>

            {/* Unlock Card - Absolute Center/Bottom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 z-20">
                <div className="glass-panel border-2 border-blue-500/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="text-center space-y-6 relative z-10">
                        <div className="mx-auto w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-2">
                            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Unlock Your Execution Pack</h3>
                            <p className="text-gray-400 text-sm">
                                Get the complete 30/60/90 day plan, detailed role adjacencies, and specific immediate actions tailored to your risk profile.
                            </p>
                        </div>

                        <div className="text-3xl font-bold text-white tracking-tight">
                            {EXECUTION_PACK_PRICE_DISPLAY} <span className="text-sm text-gray-500 font-normal">one-time</span>
                        </div>

                        <button
                            onClick={handleUnlock}
                            disabled={isLoading}
                            className="w-full py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-xl transition-all relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Unlock Full Access'
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                            <span>Secure Payment via Stripe</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span>Instant Access</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
