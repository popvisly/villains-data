'use client';

import React from 'react';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';
import { APP_NAME, ROUTES } from '@/lib/brand';

export default function CapacityComingSoon() {
    return (
        <main className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full p-12 rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                    <span className="bg-amber-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Module 4
                    </span>
                </div>

                <div className="mb-8 mx-auto w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Icon name="zap" size={32} />
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-4">Capacity Plan</h1>
                <p className="text-slate-600 mb-8 leading-relaxed font-medium">
                    Sustainability is the ultimate differentiator. This is a leverage plan, not a schedule. Design your energy budget and protect your peak output hours.
                </p>

                <div className="space-y-4 mb-10 text-left">
                    <div className="flex gap-3">
                        <Icon name="check" size={18} className="text-emerald-500 shrink-0" />
                        <p className="text-sm text-slate-700"><strong>Energy Budget</strong>: Align tasks to peaks/troughs.</p>
                    </div>
                    <div className="flex gap-3">
                        <Icon name="check" size={18} className="text-emerald-500 shrink-0" />
                        <p className="text-sm text-slate-700"><strong>Guardrails</strong>: Digital boundaries for the AI era.</p>
                    </div>
                    <div className="flex gap-3">
                        <Icon name="check" size={18} className="text-emerald-500 shrink-0" />
                        <p className="text-sm text-slate-700"><strong>Log-off Step</strong>: Integrated offline recovery ritual.</p>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-10">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Stay in the loop</p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                            Notify me
                        </button>
                    </div>
                </div>

                <Link href={ROUTES.START} className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center justify-center gap-2">
                    <Icon name="arrowRight" size={14} className="rotate-180" /> Back to Suite
                </Link>
            </div>

            <p className="mt-12 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{APP_NAME} | Sustain layer v1.0-alpha</p>
        </main>
    );
}
