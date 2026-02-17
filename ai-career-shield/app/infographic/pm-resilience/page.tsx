"use client";
// Force re-compile v2

import { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';

export default function InfographicPage() {
    useEffect(() => {
        // Aggressive UI Cleaning for Capture
        const cleanUI = () => {
            const allElements = document.querySelectorAll('*');
            allElements.forEach((el) => {
                const htmlEl = el as HTMLElement;

                // Safety check for className (SVGs use SVGAnimatedString)
                const className = typeof htmlEl.className === 'string' ? htmlEl.className : '';

                // Hide anything that isn't the frame or its parents
                if (
                    htmlEl.innerText &&
                    (htmlEl.innerText.includes('Invalid') || htmlEl.innerText.includes('website')) &&
                    !htmlEl.closest('#infographic-frame')
                ) {
                    htmlEl.style.display = 'none';
                    htmlEl.style.opacity = '0';
                    htmlEl.style.pointerEvents = 'none';
                }

                // Hide Next.js / Vercel badges
                if (htmlEl.id?.includes('nextjs') || className.includes('badge')) {
                    if (!htmlEl.closest('#infographic-frame')) {
                        htmlEl.style.display = 'none';
                    }
                }
            });

            // Hide common chat widgets & Crisp
            const chatWidgets = document.querySelectorAll('[class*="chat"], [id*="chat"], [class*="bubble"], #crisp-chat-box, .crisp-client');
            chatWidgets.forEach(w => {
                const widget = w as HTMLElement;
                if (!widget.closest('#infographic-frame')) {
                    widget.style.display = 'none';
                    widget.style.opacity = '0';
                    widget.style.visibility = 'hidden';
                }
            });
        };

        cleanUI();
        const interval = setInterval(cleanUI, 500); // Keep cleaning during hydration
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate-950 flex items-center justify-center p-12 min-h-screen" suppressHydrationWarning>
            {/* 1080x1350 LinkedIn Vertical Frame */}
            <div id="infographic-frame" className="w-[1080px] h-[1350px] bg-slate-900 overflow-hidden relative flex flex-col shadow-2xl border border-slate-800">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>

                {/* Section 1: The Hook (20%) */}
                <div className="h-[270px] flex flex-col items-center justify-center text-center px-16 relative z-10 border-b border-slate-800/50">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-px w-12 bg-indigo-500/50"></div>
                        <span className="text-indigo-400 font-bold tracking-[0.2em] text-sm uppercase">Market Intelligence</span>
                        <div className="h-px w-12 bg-indigo-500/50"></div>
                    </div>
                    <h1 className="text-7xl font-bold text-white mb-6 font-serif tracking-tighter leading-[1.1]">
                        Will AI Replace <br />Product Managers?
                    </h1>
                    <p className="text-2xl text-slate-400 max-w-3xl leading-relaxed">
                        The answer is <span className="text-white font-bold italic underline decoration-indigo-500 underline-offset-4">YES</span>... if you are an &quot;Operator.&quot;
                    </p>
                </div>

                {/* Section 2: The Great Divergence (40%) */}
                <div className="flex-1 flex flex-col relative z-10">
                    <div className="pt-12 text-center">
                        <h2 className="text-4xl font-bold text-white font-serif italic mb-2">The Great Divergence</h2>
                        <p className="text-slate-500 font-medium">Where the market is splitting today.</p>
                    </div>

                    <div className="flex-1 flex px-16 py-12 gap-12">
                        {/* Right: The Judgment Moat (Top/Primary) */}
                        <div className="flex-1 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/20 p-10 flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Icon name="shield" size={120} className="text-emerald-500" />
                            </div>
                            <div className="mb-8 p-4 rounded-2xl bg-emerald-500 text-slate-900 w-fit">
                                <Icon name="professional" size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-emerald-400 mb-6 uppercase tracking-widest text-sm">The Judgment Moat</h3>
                            <ul className="space-y-6 flex-1">
                                {[
                                    'Stakeholder Alignment',
                                    'Risk Tolerance (The &quot;Why&quot;)',
                                    'Navigating Ambiguity',
                                    'Strategic Trade-offs'
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-4 text-2xl text-slate-200 font-bold">
                                        <Icon name="check" size={24} className="text-emerald-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t border-emerald-500/20">
                                <p className="text-emerald-400/80 italic text-xl font-medium">&quot;Discretion cannot be prompted.&quot;</p>
                            </div>
                        </div>

                        {/* Left: The Volume Trap */}
                        <div className="flex-1 rounded-[3rem] bg-slate-800/30 border border-slate-700/50 p-10 flex flex-col relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                                <Icon name="warning" size={120} className="text-slate-400" />
                            </div>
                            <div className="mb-8 p-4 rounded-2xl bg-slate-700 text-slate-400 w-fit">
                                <Icon name="chevronDown" size={32} />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-500 mb-6 uppercase tracking-widest text-sm">The Volume Trap</h3>
                            <ul className="space-y-6 flex-1">
                                {[
                                    'Drafting PRDs & Stories',
                                    'Managing Jira Tickets',
                                    'Acceptance Criteria',
                                    'Status Updates'
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-4 text-2xl text-slate-500 py-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div> {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t border-slate-700/50">
                                <p className="text-slate-600 italic text-xl font-medium">&quot;AI removes the cost of execution.&quot;</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Resilience Index (25%) */}
                <div className="h-[340px] px-16 relative z-10 flex flex-col items-center justify-center border-t border-slate-800/50 bg-slate-900/50">
                    <h2 className="text-4xl font-bold text-white font-serif mb-8 italic">What is Your Resilience Index?</h2>

                    <div className="flex items-center gap-12 w-full max-w-4xl">
                        {/* Styled Gauge */}
                        <div className="relative w-72 h-36 overflow-hidden">
                            <div className="absolute top-0 left-0 w-72 h-72 rounded-full border-[32px] border-slate-800"></div>
                            <div className="absolute top-0 left-0 w-72 h-72 rounded-full border-[32px] border-emerald-500/40 border-l-transparent border-b-transparent rotate-[45deg]"></div>
                            <div className="absolute top-0 left-0 w-72 h-72 rounded-full border-[32px] border-emerald-500 border-l-transparent border-b-transparent border-r-transparent rotate-[25deg]"></div>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center leading-none">
                                <span className="text-5xl font-bold text-white">84%</span>
                                <span className="block text-xs font-bold text-emerald-400 uppercase mt-1 tracking-widest">Judgment</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <p className="text-2xl text-slate-400 leading-relaxed mb-6">
                                To survive, PMs must move from managing <span className="text-slate-200 font-bold italic">Outputs</span> to owning <span className="text-emerald-400 font-bold italic underline decoration-emerald-500/30 underline-offset-8">Proof of Judgment.</span>
                            </p>
                            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-lg italic">
                                &quot;AI can propose 10 features, but it cannot decide which one survives the CEO&apos;s risk tolerance.&quot;
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: CTA (bottom 15%) */}
                <div className="h-[200px] bg-indigo-600 flex flex-col items-center justify-center text-center relative z-10 px-16">
                    <h3 className="text-4xl font-bold text-white mb-4 italic font-serif tracking-tight">Stop Guessing. Measure Your Moat.</h3>
                    <div className="flex flex-col items-center gap-4">
                        <div className="px-10 py-5 bg-white text-indigo-900 text-3xl font-black rounded-3xl shadow-2xl flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
                            Calculate My Resilience Index <Icon name="arrowRight" size={32} />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-4 w-4 rounded-full bg-white/20"></div>
                            <span className="text-white text-2xl font-bold tracking-widest uppercase opacity-80">captori.ai/start</span>
                            <div className="h-4 w-4 rounded-full bg-white/20"></div>
                        </div>
                    </div>
                </div>

                {/* Brand Logo in Footer (Corner) */}
                <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 opacity-50">
                    <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center p-1.5 font-bold text-indigo-900 tracking-tighter text-sm">C</div>
                    <span className="text-lg font-bold text-white tracking-widest uppercase text-xs">Captori</span>
                </div>
            </div>
        </div>
    );
}
