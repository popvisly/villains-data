import React from 'react';
import type { MarketSignalData } from '@/types';

interface MarketSignalsProps {
    data: MarketSignalData;
}

export function MarketSignals({ data }: MarketSignalsProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl">📈</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-600/10 border border-emerald-200 flex items-center justify-center text-xl">
                    <span>📊</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-950">Global Market Signals</h3>
                    <p className="text-sm text-slate-700">Verified industry trends to watch</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Trending Roles */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Trending adjacent roles
                    </h4>
                    <div className="space-y-4">
                        {data.trendingRoles.map((role, i) => (
                            <div key={i} className="group/item">
                                <div className="font-semibold text-slate-900 group-hover/item:text-emerald-700 transition-colors flex items-center justify-between gap-2">
                                    <span>{role.title}</span>
                                    {role.topics && (
                                        <div className="flex gap-1">
                                            {role.topics.slice(0, 1).map((t: string) => (
                                                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-normal">
                                                    {t.replace('ai-', '')}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                                    {role.why}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skill Signals */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        Recurring skill signals
                    </h4>
                    <div className="space-y-4">
                        {data.recurringSkillSignals.map((signal, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3 hover:bg-slate-100 transition-colors">
                                <div className="text-sm font-medium text-slate-900 flex items-center justify-between gap-2">
                                    <span>{signal.skill}</span>
                                    {signal.topics && (
                                        <span className="text-[9px] text-emerald-800/70 font-mono">
                                            #{signal.topics[0].replace('ai-', '')}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-tight font-semibold">
                                    Impact: {signal.why.split(';')[0]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 italic">
                <span>{data.notes}</span>
                <span className="not-italic font-mono bg-slate-50 px-2 py-1 rounded border border-slate-200">Last Updated: {data.updatedAt}</span>
            </div>
        </div>
    );
}
