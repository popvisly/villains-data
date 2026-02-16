'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/lib/brand';

export function AILifePlanBriefing() {
    return (
        <div className="w-full max-w-lg mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="relative group overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl shadow-indigo-500/5 transition-all duration-300">

                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-indigo-600 text-white shadow-sm shadow-indigo-200">
                                <Icon name="sparkles" size={14} />
                            </div>
                            <span className="text-[13px] font-bold uppercase tracking-wider text-slate-900">AI‑Life Plan Briefing (Example): <span className="text-indigo-600">Leverage Climber</span></span>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Built from constraints • Not a prediction</span>
                </div>

                {/* 2x2 Grid Content */}
                <div className="p-5 grid grid-cols-2 gap-4">

                    {/* Module 1: Career */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                            <Icon name="professional" size={12} /> Career
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                            <p className="text-[10px] leading-tight text-slate-600 font-medium">&ldquo;Compounding: judgment + domain ownership&rdquo;</p>
                            <div className="h-px bg-slate-200" />
                            <p className="text-[10px] leading-tight text-slate-900 font-bold italic">&ldquo;Next 90 days: ship 3 proof artifacts&rdquo;</p>
                        </div>
                    </div>

                    {/* Module 2: Attention */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                            <Icon name="eyeOff" size={12} /> Attention
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                            <p className="text-[10px] leading-tight text-slate-600 font-medium">&ldquo;No‑slop rules: 3&rdquo;</p>
                            <div className="h-px bg-slate-200" />
                            <p className="text-[10px] leading-tight text-slate-900 font-bold italic">&ldquo;Signal Sprint: 1 read + 1 artifact&rdquo;</p>
                        </div>
                    </div>

                    {/* Module 3: Identity */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                            <Icon name="shield" size={12} /> Identity
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                            <p className="text-[10px] leading-tight text-slate-600 font-medium">&ldquo;Positioning: 1‑sentence thesis&rdquo;</p>
                            <div className="h-px bg-slate-200" />
                            <p className="text-[10px] leading-tight text-slate-900 font-bold italic">&ldquo;Proof archive: 3 receipts to publish&rdquo;</p>
                        </div>
                    </div>

                    {/* Module 4: Capacity */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                            <Icon name="time" size={12} /> Capacity
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                            <p className="text-[10px] leading-tight text-slate-600 font-medium">&ldquo;Guarded hours: 90‑min block&rdquo;</p>
                            <div className="h-px bg-slate-200" />
                            <p className="text-[10px] leading-tight text-slate-900 font-bold italic">&ldquo;Minimum viable day: 3 steps&rdquo;</p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="px-5 pb-5 pt-1">
                    <Link
                        href={ROUTES.START}
                        className="flex items-center justify-center w-full py-3.5 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
                    >
                        Generate My AI‑Life Plan
                        <Icon name="arrowRight" size={16} className="ml-2 opacity-80" />
                    </Link>
                    <div className="mt-4 text-center">
                        <Link
                            href={ROUTES.CAREER}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
                        >
                            Start with Career instead
                            <Icon name="arrowRight" size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
