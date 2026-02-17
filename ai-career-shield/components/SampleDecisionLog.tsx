'use client';

import React from 'react';
import { Icon } from '@/components/ui/Icon';

export function SampleDecisionLog() {
    return (
        <div className="neumorphic rounded-3xl p-6 max-w-sm border border-white/40">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-slate-900 flex items-center justify-center">
                        <Icon name="audit" size={14} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Decision Record #402</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-wider border border-emerald-100 italic">Strategic</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 mb-2 font-serif italic">Subject: Q3 Architecture Pivot</h4>

            <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Constraint Map</p>
                    <p className="text-[11px] text-slate-600 leading-tight">Regulatory deadline (GDPR) vs. Technical debt load (70%).</p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/30 border border-indigo-100/50">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Judgment Logic</p>
                    <p className="text-[11px] text-indigo-700 leading-tight font-medium">Prioritized &ldquo;GDPR Zero-Knowledge&rdquo; over feature velocity to maintain &ldquo;Accountable Leader&rdquo; status during board review.</p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <div className="flex -space-x-2">
                        <div className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">ME</div>
                        <div className="h-6 w-6 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-indigo-600">AI</div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Verified by Captori Protocol</span>
                </div>
            </div>
        </div>
    );
}
