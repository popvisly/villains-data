'use client';

import Link from 'next/link';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Icon } from '@/components/ui/Icon';

export default function BlogPost() {
    return (
        <main className="min-h-screen subtle-noise">
            <Nav />

            <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
                <SectionTitle
                    eyebrow="Resources"
                    title="The 30/60/90 Day Career Development Plan Template for the AI Era"
                    subtitle="Stop using generic templates. Your career development plan needs to account for the shifting landscape of automated volume and premium judgment."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium font-sans">
                            A career development plan is not a wish list. It is a tactical operation plan designed to build your value moat over the next three months.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Why Standard Plans Fail</h3>
                        <p>
                            Most templates focus on "learning skills." They tell you to take a Python course or a PM certification. In a world where AI can execute many of those skills at near-zero cost, "learning" isn't enough. You need to <strong>ship proof</strong>.
                        </p>
                        <p>
                            A successful plan in 2025 focuses on accumulating <em>artifacts of judgment</em>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The AI-Proof 30/60/90 Framework</h3>

                        <div className="space-y-12 my-12">
                            {/* 30 Days */}
                            <div className="relative pl-8 border-l-2 border-indigo-100">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-indigo-500 shadow-lg shadow-indigo-200" />
                                <h4 className="text-xl font-bold text-indigo-900 mb-4">Phase 1: The Audit (0-30 Days)</h4>
                                <p className="text-slate-600 mb-4">Focus on identifying your exposure and mapping your existing leverage.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-2"><strong>Goal:</strong> Calculate your current Resilience Index.</li>
                                    <li className="flex gap-2"><strong>Action:</strong> Audit your schedule. Mark every task as "Volume" (AI-capable) or "Judgment" (Discretion-heavy).</li>
                                    <li className="flex gap-2"><strong>Artifact:</strong> Create a 'Roles & Constraints' map for your current position.</li>
                                </ul>
                            </div>

                            {/* 60 Days */}
                            <div className="relative pl-8 border-l-2 border-emerald-100">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200" />
                                <h4 className="text-xl font-bold text-emerald-900 mb-4">Phase 2: The Proof Archive (31-60 Days)</h4>
                                <p className="text-slate-600 mb-4">Focus on shipping publicly documented evidence of your value.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-2"><strong>Goal:</strong> Ship 2 major proof artifacts to leadership.</li>
                                    <li className="flex gap-2"><strong>Action:</strong> Use the "Decision Log" protocol to document the 'Why' behind every risky initiative.</li>
                                    <li className="flex gap-2"><strong>Artifact:</strong> A 'Strategic Recommendation' deck that identifies a market shift AI hasn't seen yet.</li>
                                </ul>
                            </div>

                            {/* 90 Days */}
                            <div className="relative pl-8 border-l-2 border-slate-200">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-slate-900 shadow-lg shadow-slate-200" />
                                <h4 className="text-xl font-bold text-slate-900 mb-4">Phase 3: Leverage Pivot (61-90 Days)</h4>
                                <p className="text-slate-600 mb-4">Moving from performance to power.</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-2"><strong>Goal:</strong> Reposition your role around high-ambiguity task ownership.</li>
                                    <li className="flex gap-2"><strong>Action:</strong> Negotiate for ownership of a new vertical or cross-functional strategy.</li>
                                    <li className="flex gap-2"><strong>Artifact:</strong> Your personalized 90-day progress report showing decreased volume and increased impact.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-16 p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 text-center">
                            <h4 className="text-2xl font-bold text-indigo-900 mb-2 font-serif">Don't build this plan by hand.</h4>
                            <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                                Captori analyzes your specific job data and generates this 90-day roadmap for you in under 2 minutes.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-14 items-center justify-center rounded-2xl bg-indigo-600 px-10 text-lg font-bold text-white hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20"
                            >
                                Generate My Plan Now <Icon name="arrowRight" size={18} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">Want to see what a completed AI-era plan looks like?</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        Check out the Example Report <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
            <footer className="border-t border-slate-200 bg-white px-6 py-12 md:py-20">
                <div className="mx-auto max-w-7xl text-center font-sans">
                    <div className="flex items-center justify-center gap-3 mb-6 opacity-50 grayscale">
                        <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center p-1.5 font-bold text-white tracking-tighter">
                            C
                        </div>
                        <div className="text-lg font-bold tracking-tighter text-slate-900">Captori</div>
                    </div>
                    <p className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Captori. Built for the AI Era.
                    </p>
                </div>
            </footer>
        </main>
    );
}
