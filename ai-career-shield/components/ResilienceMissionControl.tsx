'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';

interface DashboardStats {
    resilienceScore: number;
    judgmentMoat: number;
    contextualComplexity: number;
    automatedVolume: number;
}

interface ResilienceMissionControlProps {
    stats?: DashboardStats;
}

export function ResilienceMissionControl({ stats: passedStats }: ResilienceMissionControlProps) {
    const defaultStats: DashboardStats = {
        resilienceScore: 84,
        judgmentMoat: 92,
        contextualComplexity: 78,
        automatedVolume: 45,
    };

    const stats = passedStats || defaultStats;

    return (
        <div className="w-full max-w-7xl mx-auto p-8 space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Operational Command</h2>
                    <h1 className="text-4xl font-serif italic text-slate-900">Resilience Mission Control</h1>
                </div>
                <div className="flex gap-4">
                    <button className="neumorphic px-6 py-3 rounded-2xl text-xs font-bold text-slate-600 uppercase tracking-widest hover:text-slate-900 transition-all">
                        Export JSON-P
                    </button>
                    <button className="neumorphic-inset px-6 py-3 rounded-2xl text-xs font-bold text-indigo-600 uppercase tracking-widest bg-slate-50">
                        Live Feed: High-Stakes
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Resilience Gauge Card */}
                <div className="lg:col-span-1 neumorphic rounded-[40px] p-10 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon name="professional" size={80} />
                    </div>

                    <div className="relative mb-8">
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="12"
                                className="text-slate-100"
                            />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeDasharray={553}
                                initial={{ strokeDashoffset: 553 }}
                                animate={{ strokeDashoffset: 553 - (553 * stats.resilienceScore) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-indigo-600"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center cursor-help group/tooltip">
                            <span className="text-5xl font-bold tracking-tighter text-slate-900 group-hover/tooltip:text-indigo-600 transition-colors">
                                {stats.resilienceScore}%
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resilience</span>

                            {/* Hover Tooltip: Closing the Trust Loop */}
                            <div className="absolute top-full mt-4 w-48 p-3 bg-slate-900 text-white rounded-xl shadow-2xl opacity-0 group-hover/tooltip:opacity-100 transition-all pointer-events-none z-50">
                                <p className="text-[9px] font-medium leading-tight mb-2 opacity-80">
                                    Cryptographically Signed via W3C Standard.
                                </p>
                                <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                                    <Icon name="checkCircle" size={10} />
                                    Verify Signature
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-slate-500 max-w-[200px] leading-relaxed">
                        Your role is <span className="text-slate-900 font-bold">Defensible</span> against current model reasoning capabilities.
                    </p>
                </div>

                {/* Secondary Metrics & Comparison */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Judgment Moat Card */}
                        <div className="neumorphic rounded-3xl p-8 border border-white/50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <Icon name="audit" size={20} className="text-indigo-600" />
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+12% vs Industry</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Judgment Moat</h3>
                            <p className="text-xs text-slate-500 mb-4">High-stakes discretionary accountability segments identified.</p>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600" style={{ width: `${stats.judgmentMoat}%` }} />
                            </div>
                        </div>

                        {/* Contextual Complexity Card */}
                        <div className="neumorphic rounded-3xl p-8 border border-white/50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                                    <Icon name="search" size={20} className="text-slate-600" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Contextual Depth</h3>
                            <p className="text-xs text-slate-500 mb-4">Navigating unwritten rules and human relationship dynamics.</p>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900" style={{ width: `${stats.contextualComplexity}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Volume vs. Judgment Comparison Section */}
                    <div className="neumorphic-inset rounded-[40px] p-10 bg-slate-50/50 backdrop-blur-sm border border-slate-200/50">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-lg font-bold text-slate-900 font-serif italic">Operational Distribution</h3>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-indigo-600" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Judgment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Automated</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Automated Volume (45%)</p>
                                <ul className="space-y-2">
                                    {['Jira Ticket Processing', 'Standardized Reporting', 'Meeting Transcription Summary'].map((task, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] text-slate-500 opacity-60">
                                            <div className="h-1 w-1 rounded-full bg-slate-300" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest italic">Judgment Moat (55%)</p>
                                <ul className="space-y-2">
                                    {['Q3 Tech-Debt Allocation Pivot', 'Cross-Functional Ethics Review', 'Supplier Negotiation Under Sanctions'].map((task, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[11px] text-slate-900 font-medium">
                                            <div className="h-1 w-1 rounded-full bg-indigo-600" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
