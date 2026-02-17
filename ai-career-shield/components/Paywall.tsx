'use client';

import React, { useState, useEffect } from 'react';
import { createCheckoutSession } from '@/app/actions/stripe';
import { trackEvent } from '@/lib/analytics-client';
import { Icon } from '@/components/ui/Icon';

interface PaywallProps {
    hasAccess: boolean;
    planId: string;
    type: 'career' | 'attention' | 'identity';
    children: React.ReactNode;
}

export const Paywall: React.FC<PaywallProps> = ({ hasAccess, planId, type, children }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!hasAccess) {
            trackEvent('paywall_view', { planId, type });
        }
    }, [hasAccess, planId, type]);

    const handleUnlock = async (tier: 'execution' | 'executive' = 'execution') => {
        trackEvent('pricing_plan_click', { tier, planId, type });
        trackEvent('checkout_started', { tier, planId, type });
        setIsLoading(true);
        try {
            const result = await createCheckoutSession(planId, type, tier);
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
        <div className="relative group">
            {/* Blurred Preview Content & Unlock Cards Stack */}
            <div className="relative isolate">
                {/* Background: Blurred Preview (fades out) */}
                <div className="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none" aria-hidden="true">
                    <div className="blur-[40px] opacity-5 grayscale transition-all duration-700 h-full scale-105">
                        {children}
                    </div>
                    {/* Clean white fade-up to remove 'smudge' artifacts */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/80 to-white" />
                </div>

                {/* Foreground: Unlock Content */}
                <div className="relative z-20 mx-auto max-w-5xl px-4 py-8 md:py-12">
                    {/* 5-Year Outlook Module (editorial bridge) */}
                    <div className="mb-12 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 bg-white/90 backdrop-blur-2xl shadow-xl shadow-slate-200/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl"></div>
                        <div className="relative">
                            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-2">5-Year Outlook (for your role)</h3>
                            <p className="text-sm text-slate-500 mb-8">A practical read on what’s getting cheaper—and what’s gaining leverage.</p>

                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="space-y-2">
                                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Getting commoditized</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">First‑pass execution and template work will be cheaper and faster.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--primary))]">Gaining leverage</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">Judgment, prioritization, and accountable decisions will command the premium.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-600">Your next move</div>
                                    <p className="text-sm text-slate-600 leading-relaxed">Use the roadmap to shift 1–2 workstreams toward higher‑discretion ownership.</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50/50 text-indigo-600 transition-all hover:bg-indigo-50 cursor-pointer"
                                    onClick={() => handleUnlock('execution')}
                                >
                                    <Icon name="zap" size={14} className="animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                        Unlock the 30/60/90 roadmap + assets
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                        {/* Tier 1: Suite Unlock */}
                        <div className="rounded-3xl border border-slate-200 bg-white/95 backdrop-blur-sm p-8 shadow-xl relative overflow-hidden flex flex-col">
                            <div className="mb-6">
                                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">Suite Unlock</span>
                                <h3 className="text-2xl font-bold text-slate-950 mt-3">Strategic Operating Plan</h3>
                                <p className="text-sm text-indigo-600 mt-1 font-medium italic">Buy once. Unlock Career + Attention + Identity Hub.</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {[
                                    { title: "Leverage Map", desc: "Identify your high-discretion growth surface." },
                                    { title: "30/60/90 Build Plan", desc: "Concrete execution sequence for your next move." },
                                    { title: "Proof-of-Work Briefs", desc: "Artifact blueprints to prove your leverage." },
                                    { title: "Attention Plan", desc: "Anti-Slop + Grounded AI protocols." },
                                    { title: "Identity Hub", desc: "Proof Archive + Positioning Generator." },
                                    { title: "AI Leverage Playbook (Core)", desc: "3 tailored workflows + checklists to turn AI into proof." },
                                    { title: "Capacity Plan (Recovery)", desc: "Energy budget + guardrails (included when released)." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Icon name="check" size={12} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 leading-tight">{item.title}</p>
                                            <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
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
                                    {isLoading ? 'Processing...' : 'Unlock the Suite'}
                                </button>
                                <p className="mt-3 text-[10px] text-center text-slate-500 font-bold uppercase tracking-tight">One-time purchase. Execute alongside a full-time job.</p>
                            </div>
                        </div>

                        {/* Tier 2: Executive License */}
                        <div className="rounded-3xl border-2 border-indigo-100 bg-white/95 backdrop-blur-sm p-8 shadow-2xl shadow-indigo-500/10 relative overflow-hidden flex flex-col ring-4 ring-indigo-50/30">
                            <div className="mb-6">
                                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">Full Suite Access</span>
                                <h3 className="text-2xl font-bold text-slate-950 mt-3">Executive Proof Suite</h3>
                                <p className="text-sm text-slate-500 mt-1">Unlock Career + Attention + Identity Suite.</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {[
                                    { title: "Proof Kit (recommended)", desc: "Executive narrative, brief, and interview frameworks." },
                                    { title: "Pressure‑test simulations", desc: "Failure-mode questions that screen for senior judgment." },
                                    { title: "AI Leverage Library (Executive)", desc: "10 workflows + advanced verification + failure-mode simulations." },
                                    { title: "Proof‑of‑work library", desc: "Professional templates you can ship and show." },
                                    { title: "Executive Blueprint PDF", desc: "A clean briefing for LinkedIn, networking, and interviews." },
                                    { title: "Everything in Suite Unlock", desc: "All core modules and matching tools." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3">
                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                            <Icon name="check" size={12} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 leading-tight">{item.title}</p>
                                            <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
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
                                    {isLoading ? 'Processing...' : 'Unlock Executive Suite'}
                                </button>
                                <p className="mt-3 text-[10px] text-center text-slate-500 font-bold uppercase tracking-tight">One-time purchase. Execute alongside a full-time job.</p>
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
        </div>
    );
};
