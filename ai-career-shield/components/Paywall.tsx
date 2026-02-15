'use client';

import React, { useState, useEffect } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { trackEvent } from '@/lib/analytics-client';

interface PaywallProps {
    hasAccess: boolean;
    assessmentId: string;
    children: React.ReactNode;
}

export const Paywall: React.FC<PaywallProps> = ({ hasAccess, assessmentId, children }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!hasAccess) {
            trackEvent('paywall_view', { assessmentId });
        }
    }, [hasAccess, assessmentId]);

    const handleUnlock = async (tier: 'execution' | 'executive' = 'execution') => {
        trackEvent('pricing_plan_click', { tier, assessmentId });
        trackEvent('checkout_started', { tier, assessmentId });
        setIsLoading(true);
        try {
            const result = await createCheckoutSession(assessmentId, tier);
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

            {/* Unlock Cards - Centered */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 z-20">
                <div className="grid md:grid-cols-2 gap-6 pb-20">
                    {/* Tier 1: Execution Pack */}
                    <div className="rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-sm p-8 shadow-xl relative overflow-hidden flex flex-col">
                        <div className="mb-6">
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">Most Popular</span>
                            <h3 className="text-2xl font-bold text-slate-950 mt-3">Execution Pack</h3>
                            <p className="text-sm text-emerald-700 mt-1 font-medium">Instant 7‑day resilience roadmap.</p>
                        </div>

                        <div className="flex-1 space-y-4 mb-8">
                            {[
                                { title: "Leverage Map (30/60/90)", desc: "Concrete execution sequence." },
                                { title: "Noise Filter (Skill-gap analysis)", desc: "Precise audit vs target role." },
                                { title: "AI role matcher", desc: "Scan resume vs 10 frontier roles." },
                                { title: "Elite Career Assets", desc: "Resume bullets & LinkedIn headline." }
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

                        <div className="mt-auto">
                            <div className="text-3xl font-bold text-slate-950 tracking-tight mb-4">
                                $39 <span className="text-sm text-slate-500 font-normal">one-time access</span>
                            </div>
                            <button
                                onClick={() => handleUnlock('execution')}
                                disabled={isLoading}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : 'Unlock the Execution Pack'}
                            </button>
                            <p className="mt-3 text-[10px] text-center text-slate-400">One-time purchase. Includes 12 months of updates.</p>
                        </div>
                    </div>

                    {/* Tier 2: Executive License */}
                    <div className="rounded-3xl border-2 border-indigo-200 bg-white/95 backdrop-blur-sm p-8 shadow-2xl relative overflow-hidden flex flex-col ring-4 ring-indigo-50/50">
                        <div className="absolute top-0 right-0 px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">
                            Elite Authority
                        </div>
                        <div className="mb-6">
                            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">Full Access</span>
                            <h3 className="text-2xl font-bold text-slate-950 mt-3">Executive License</h3>
                            <p className="text-sm text-slate-500 mt-1">For senior professionals & leaders.</p>
                        </div>

                        <div className="flex-1 space-y-4 mb-8">
                            {[
                                { title: "Everything in Execution Pack", desc: "All core audit & matching tools." },
                                { title: "Project brief library", desc: "Professional proof-of-work library." },
                                { title: "Failure-Mode interview simulations", desc: "High-stakes practice for backlash prep." },
                                { title: "Executive Blueprint PDF", desc: "Share-ready strategy briefing." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
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

                        <div className="mt-auto">
                            <div className="text-3xl font-bold text-slate-950 tracking-tight mb-4">
                                $99 <span className="text-sm text-slate-500 font-normal">one-time access</span>
                            </div>
                            <button
                                onClick={() => handleUnlock('executive')}
                                disabled={isLoading}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : 'Unlock Executive License'}
                            </button>
                            <p className="mt-3 text-[10px] text-center text-slate-400">One-time purchase. Includes 12 months of updates. Designed for higher-leverage roles.</p>
                        </div>
                    </div>
                </div>

                {/* Transparency Note: Forbes-style trustworthiness anchor */}
                <div className="mt-12 max-w-2xl mx-auto text-center">
                    <p className="text-xs text-slate-500 leading-relaxed italic">
                        &ldquo;Job discovery isn’t magic—it’s sourcing. If a platform can’t show where a listing came from, you shouldn’t trust it. We analyze roles you provide (LinkedIn, Indeed, company pages) and always link to the source so the evaluation is verifiable.&rdquo;
                    </p>
                </div>
            </div>
        </div>
    );
};
