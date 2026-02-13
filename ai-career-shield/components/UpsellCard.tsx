import { EXECUTION_PACK_PRICE_DISPLAY } from '@/lib/constants';

interface UpsellCardProps {
    onUnlock: () => void;
    isLoading?: boolean;
}

export function UpsellCard({ onUnlock, isLoading }: UpsellCardProps) {
    return (
        <div className="glass-panel p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">Want the execution kit?</h3>
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed max-w-xl">
                        Turn this roadmap into a portfolio with <span className="text-white font-medium">2 tailored project briefs</span> grounded in industry requirements and a <span className="text-white font-medium">personalized skill gap map</span>.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            <span className="text-xs text-gray-400">Grounded Project Briefs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            <span className="text-xs text-gray-400">Step-by-Step Deliverables</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            <span className="text-xs text-gray-400">Personalized Skill Gap Map</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                            <span className="text-xs text-gray-400">Interview Focus Points</span>
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
                            ? 'bg-blue-900/50 text-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Generating...
                            </span>
                        ) : 'Get Execution Kit →'}
                    </button>
                    <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                        Instant generation • no subscription
                    </p>
                </div>
            </div>
        </div>
    );
}
