import React from 'react';
import type { MarketSignalData } from '@/types';

interface MarketSignalsProps {
    data: MarketSignalData;
}

export function MarketSignals({ data }: MarketSignalsProps) {
    return (
        <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl">📈</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl">
                    <span className="animate-pulse">📊</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Global Market Signals</h3>
                    <p className="text-sm text-cyan-300/70">Verified industry trends to watch</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Trending Roles */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Trending Adjacent Roles
                    </h4>
                    <div className="space-y-4">
                        {data.trendingRoles.map((role, i) => (
                            <div key={i} className="group/item">
                                <div className="font-semibold text-gray-100 group-hover/item:text-cyan-400 transition-colors flex items-center justify-between gap-2">
                                    <span>{role.title}</span>
                                    {role.topics && (
                                        <div className="flex gap-1">
                                            {role.topics.slice(0, 1).map((t: string) => (
                                                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500 font-normal">
                                                    {t.replace('ai-', '')}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                                    {role.why}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skill Signals */}
                <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        Recurring Skill Signals
                    </h4>
                    <div className="space-y-4">
                        {data.recurringSkillSignals.map((signal, i) => (
                            <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/10 transition-colors">
                                <div className="text-sm font-medium text-gray-200 flex items-center justify-between gap-2">
                                    <span>{signal.skill}</span>
                                    {signal.topics && (
                                        <span className="text-[9px] text-cyan-500/50 font-mono">
                                            #{signal.topics[0].replace('ai-', '')}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tight font-semibold">
                                    Impact: {signal.why.split(';')[0]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 italic">
                <span>{data.notes}</span>
                <span className="not-italic font-mono bg-white/5 px-2 py-1 rounded">Last Updated: {data.updatedAt}</span>
            </div>
        </div>
    );
}
