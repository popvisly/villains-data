'use client';

import React from 'react';

interface ShareBriefCardProps {
    jobTitle: string;
    riskScore: number;
    topFactor: string;
    titleOverride?: string;
}

export function ShareBriefCard({ jobTitle, riskScore, topFactor, titleOverride }: ShareBriefCardProps) {
    const getBand = (score: number) => {
        if (score >= 80) return { label: 'High Resilience', color: 'text-emerald-700', bg: 'bg-emerald-50' };
        if (score >= 50) return { label: 'Moderate Resilience', color: 'text-blue-700', bg: 'bg-blue-50' };
        return { label: 'Exposure Risk', color: 'text-amber-700', bg: 'bg-amber-50' };
    };

    const band = getBand(riskScore);

    return (
        <div id="share-brief-card" className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xl max-w-md mx-auto overflow-hidden relative group">
            {/* Minimalist Watermark/Branding */}
            <div className="absolute top-4 right-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                AI Career Portal • Audit Brief
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-tighter text-slate-500 mb-1">Strategic Workflow Audit</h3>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                        {titleOverride || jobTitle}
                    </h2>
                </div>

                <div className="flex items-end justify-between gap-4">
                    <div className="space-y-1">
                        <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${band.bg} ${band.color}`}>
                            {band.label}
                        </div>
                        <div className="text-4xl font-extrabold text-slate-950 tracking-tighter">
                            {riskScore}%
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium uppercase">Resilience Index</div>
                    </div>

                    <div className="w-16 h-16 relative">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={176} strokeDashoffset={176 - (176 * riskScore) / 100} className="text-emerald-500" />
                        </svg>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Key Resilience Driver</p>
                    <p className="text-sm text-slate-800 leading-relaxed italic">
                        &quot;{topFactor}&quot;
                    </p>
                </div>

                <div className="text-[9px] text-slate-400 mt-4 text-center">
                    Verify your resilience at aicareerportal.com
                </div>
            </div>
        </div>
    );
}
