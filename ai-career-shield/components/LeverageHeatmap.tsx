import React from 'react';
import { TrendingUp, Zap, HelpCircle } from 'lucide-react';

interface HeatmapCell {
    label: string;
    state: 'melting' | 'compounding' | 'stable';
    discretion: number; // 1-10
    automation: number; // 2-10
    why: string;
}

export const LeverageHeatmap: React.FC<{ cells: HeatmapCell[] }> = ({ cells }) => {
    return (
        <div className="glass-panel rounded-3xl p-8 border-slate-200">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">Leverage Heatmap</h3>
                    <p className="text-sm text-slate-500">Visualizing value-retention vs AI-susceptibility.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-red-600 uppercase">
                        <Zap className="w-3 h-3" /> Melting
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase">
                        <TrendingUp className="w-3 h-3" /> Compounding
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cells.map((cell, i) => (
                    <div
                        key={i}
                        className={`p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-default group relative ${cell.state === 'melting' ? 'bg-red-50 border-red-100' :
                            cell.state === 'compounding' ? 'bg-emerald-50 border-emerald-100' :
                                'bg-slate-50 border-slate-100'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-900">{cell.label}</span>
                            <HelpCircle className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="flex gap-1 h-1 bg-slate-200 rounded-full overflow-hidden mt-4">
                            <div
                                className={`h-full ${cell.state === 'melting' ? 'bg-red-400' : 'bg-emerald-400'}`}
                                style={{ width: `${cell.discretion * 10}%` }}
                            />
                        </div>
                        <p className="mt-2 text-[9px] text-slate-500 leading-tight opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                            {cell.why}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 italic">
                    * Melting workstreams are being commoditized by AI. Compounding workstreams are where your judgment provides the moat.
                </p>
            </div>
        </div>
    );
};
