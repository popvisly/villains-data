'use client';

import { useState } from 'react';
import { TrendingUp, X, Info } from 'lucide-react';
import { FRONTIER_ROLES } from '@/data/frontierRoles';

export function TrendingRoles() {
    const [page, setPage] = useState(0);
    const [selectedRole, setSelectedRole] = useState<(typeof FRONTIER_ROLES)[0] | null>(null);

    // Filter for high-growth roles
    const trending = FRONTIER_ROLES.filter(r =>
        r.growth.includes('YoY') ||
        r.growth.includes('High') ||
        r.growth.includes('Very High') ||
        r.growth.includes('Emerging') // Added to ensure enough items
    );

    const ITEMS_PER_PAGE = 3;
    const totalPages = Math.ceil(trending.length / ITEMS_PER_PAGE);
    const visibleRoles = trending.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    return (
        <div className="relative bg-white/90 backdrop-blur-md border border-slate-200/60 rounded-3xl p-5 shadow-lg shadow-slate-200/20 max-w-xs w-full overflow-hidden transition-all duration-300">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                        <TrendingUp className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Fastest Growing</h3>
                </div>
            </div>

            {/* List */}
            <div className="space-y-3 min-h-[180px]">
                {visibleRoles.map((role, i) => (
                    <button
                        key={role.title}
                        onClick={() => setSelectedRole(role)}
                        className="w-full text-left group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-300 font-mono w-4">
                                {(page * ITEMS_PER_PAGE) + i + 1 < 10 ? `0${(page * ITEMS_PER_PAGE) + i + 1}` : (page * ITEMS_PER_PAGE) + i + 1}
                            </span>
                            <div>
                                <div className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors line-clamp-1">
                                    {role.title}
                                </div>
                                <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                    {role.growth}
                                </div>
                            </div>
                        </div>
                        <Info className="w-3 h-3 text-slate-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                ))}
            </div>

            {/* Pagination / Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page {page + 1}/{totalPages}</span>
                <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => {
                                e.stopPropagation();
                                setPage(i);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${page === i ? 'bg-emerald-400 scale-110' : 'bg-slate-200 hover:bg-slate-300'
                                }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Detail Popup Overlay */}
            <div className={`absolute inset-0 bg-white z-20 p-5 transition-all duration-300 ease-in-out ${selectedRole ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
                }`}>
                {selectedRole && (
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                                {selectedRole.growth}
                            </div>
                            <button
                                onClick={() => setSelectedRole(null)}
                                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                            {selectedRole.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow overflow-y-auto">
                            {selectedRole.summary}
                        </p>

                        <div className="space-y-2 pt-4 border-t border-slate-100">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-slate-400 uppercase">Impact</span>
                                <span className="font-medium text-slate-700 text-right">{selectedRole.impact}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-slate-400 uppercase">Avg Salary</span>
                                <span className="font-bold text-emerald-600">{selectedRole.salary}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
