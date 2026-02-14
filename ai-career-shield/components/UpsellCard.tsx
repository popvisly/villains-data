import { EXECUTION_PACK_PRICE_DISPLAY } from '@/lib/constants';

interface UpsellCardProps {
    onUnlock: () => void;
    isLoading?: boolean;
}

export function UpsellCard({ onUnlock, isLoading }: UpsellCardProps) {
    return (
        <div className="glass-panel p-8 rounded-2xl border border-emerald-400/15 bg-emerald-500/5 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">Make this actionable</h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-xl">
                        Unlock a ready-to-use Execution Pack: <span className="text-white font-medium">2 portfolio-ready project briefs</span>, step-by-step deliverables, and interview prep tailored to your target role.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            <span className="text-xs text-gray-400">2 portfolio-ready project briefs (with README templates)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            <span className="text-xs text-gray-400">Step-by-step deliverables + success criteria</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            <span className="text-xs text-gray-400">Skill priorities (what to learn first)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                            <span className="text-xs text-gray-400">Interview prep + “ideal answer” examples</span>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-auto text-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                    <div className="mb-4">
                        <span className="text-3xl font-bold text-white">{EXECUTION_PACK_PRICE_DISPLAY}</span>
                        <span className="text-gray-500 text-xs ml-2 italic">one-time payment</span>
                    </div>
                    <button
                        onClick={onUnlock}
                        disabled={isLoading}
                        className={`w-full md:w-56 px-6 py-3 rounded-xl transition-all font-bold text-sm shadow-lg ${isLoading
                            ? 'bg-emerald-950/40 text-emerald-200 cursor-not-allowed'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Preparing…
                            </span>
                        ) : 'Unlock Execution Pack →'}
                    </button>
                    <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                        One-time purchase • instant access
                    </p>
                </div>
            </div>
        </div>
    );
}
