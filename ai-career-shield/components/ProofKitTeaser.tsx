import React from 'react';
import { Icon } from '@/components/ui/Icon';
import type { ExecutiveNarrative } from '@/types/executionPack';

interface ProofKitTeaserProps {
    narrative: ExecutiveNarrative;
    onUpgrade: () => void;
}

export function ProofKitTeaser({ narrative, onUpgrade }: ProofKitTeaserProps) {
    const proof = narrative.proofPoints[0];
    const interview = narrative.teaserInterviewQuestion;

    return (
        <div data-testid="proofkit-teaser" className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm mb-8">
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon name="sparkles" size={16} className="text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">Free Preview: Proof Kit (Excerpt)</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">Executive Grade</span>
                </div>
            </div>

            <div className="p-8 space-y-8">
                {/* Thesis Section */}
                <section>
                    <div className="flex items-center gap-2 mb-3">
                        <Icon name="shield" size={16} className="text-slate-400" />
                        <span className="text-xs font-bold uppercase tracking-tight text-slate-500">Positioning Thesis</span>
                    </div>
                    <p className="text-xl font-serif font-bold text-slate-950 leading-snug">
                        &quot;{narrative.positioningThesis}&quot;
                    </p>
                </section>

                {/* Proof Point Section */}
                <section className="p-4 rounded-xl bg-slate-50 border border-slate-100 italic">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Validated Proof Point</span>
                        {proof.source === 'user' ? (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">User Sourced</span>
                        ) : (
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">Suggested Framing</span>
                        )}
                    </div>
                    <p className="text-slate-800 text-sm leading-relaxed mb-2">
                        &quot;{proof.bullet}&quot;
                    </p>
                    {proof.evidence && (
                        <p className="text-[11px] text-slate-500">
                            <span className="font-bold">Provenance:</span> Based on your input: &quot;{proof.evidence}&quot;
                        </p>
                    )}
                </section>

                {/* Interview Teaser */}
                {interview && (
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Icon name="message" size={16} className="text-slate-400" />
                            <span className="text-xs font-bold uppercase tracking-tight text-slate-500">Interview Pack Preview</span>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                                <p className="text-sm font-bold text-slate-900 mb-3">Question 1: {interview.question}</p>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-bold uppercase text-indigo-600">Strong Answer Includes:</p>
                                    <ul className="space-y-1.5">
                                        {interview.strongAnswerBullets.map((bullet, i) => (
                                            <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                                                <span className="text-indigo-400 mt-1">•</span>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Upgrade Callout */}
                <div className="pt-4 border-t border-slate-100">
                    <p className="text-sm text-center text-slate-600 mb-6">
                        Unlock the <span className="font-bold text-slate-900">Proof Kit</span> to generate your full narrative,
                        professional project briefs, and full 5-question failure-mode interview pack.
                    </p>
                    <button
                        onClick={onUpgrade}
                        className="w-full py-4 rounded-xl bg-slate-950 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200 group"
                    >
                        Unlock Executive License
                        <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
