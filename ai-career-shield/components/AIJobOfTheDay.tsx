'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

import { FRONTIER_ROLES } from '@/data/frontierRoles';

export function AIJobOfTheDay() {
    const [role] = useState(() => {
        // Seed selection based on the day of the year to ensure consistency
        if (typeof window === 'undefined') return FRONTIER_ROLES[0]; // Server-side default

        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 0);
        const diff = today.getTime() - startOfYear.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);

        const index = dayOfYear % FRONTIER_ROLES.length;
        return FRONTIER_ROLES[index];
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full max-w-sm mx-auto md:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <div className="relative group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">

                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-[hsl(var(--cta))]/10 text-[hsl(var(--cta))]">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Analyst Briefing</span>
                    </div>
                </div>

                {/* content */}
                <div className="p-5">
                    <div className="mb-6">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-indigo-50 text-indigo-700 mb-2">Daily Briefing</span>
                        <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                            {role.title}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {role.summary}
                        </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold mb-1">Salary Signal</p>
                            <p className="text-sm font-bold text-emerald-600">{role.salary}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-[10px] uppercase tracking-wide text-slate-400 font-bold mb-1">Strategic Value</p>
                            <p className="text-sm font-medium text-slate-700 truncate">{role.impact}</p>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {role.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 text-[11px] font-medium shadow-sm">
                                {tag}
                            </span>
                        ))}
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center gap-1 border border-emerald-100">
                            <TrendingUp className="w-3 h-3" />
                            {role.growth}
                        </span>
                    </div>

                    {/* CTA */}
                    <Link
                        href="/assessment"
                        className="flex items-center justify-center w-full py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-[hsl(var(--primary))] transition-all group-hover:shadow-md group-hover:translate-y-[-1px]"
                    >
                        Audit Your Role
                        <ArrowRight className="w-4 h-4 ml-2 opacity-80" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
