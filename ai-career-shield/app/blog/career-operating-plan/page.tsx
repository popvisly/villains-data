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
                    eyebrow="Systems"
                    title="Why You Need a Career Operating Plan"
                    subtitle="Moving from passive growth to intentional workflow design in a market where 'output' is no longer a differentiator."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium font-sans">
                            Most professionals treat their career like a side effect of their job. They work hard, wait for a review, and hope for a promotion. This is a <strong>Passive Growth</strong> model, and it's dangerous.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">What is a Career Operating Plan?</h3>
                        <p>
                            A Career Operating Plan (COP) is a technical document that defines the <em>inputs</em> and <em>assets</em> you need to create to ensure your role remains judgment-heavy. It's a shift from being a "resource" to being an "asset."
                        </p>

                        <div className="my-10 p-8 rounded-3xl bg-slate-900 text-white font-sans">
                            <h4 className="text-xl font-bold mb-6">The COP Architecture</h4>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <Icon name="checkCircle" size={20} className="text-indigo-400 shrink-0" />
                                    <div>
                                        <span className="block font-bold">Input Audit:</span>
                                        <span className="text-sm text-slate-400">Filtering your daily tasks to maximize those requiring high-consequence judgment.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <Icon name="checkCircle" size={20} className="text-indigo-400 shrink-0" />
                                    <div>
                                        <span className="block font-bold">Asset Log:</span>
                                        <span className="text-sm text-slate-400">A prioritized list of 'Proof Artifacts' you intend to ship this quarter.</span>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <Icon name="checkCircle" size={20} className="text-indigo-400 shrink-0" />
                                    <div>
                                        <span className="block font-bold">Resilience Benchmarks:</span>
                                        <span className="text-sm text-slate-400">Target scores for your automation exposure and leverage index.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Owning the Workflow</h3>
                        <p>
                            A COP ensures that even if your company changes its strategy or AI automates a chunk of your department, your <strong>Value Architecture</strong> remains intact. You aren't just doing a job; you are running an operation.
                        </p>

                        <div className="mt-12 p-8 rounded-[2rem] bg-indigo-100 border border-indigo-200 text-center font-sans">
                            <h4 className="text-2xl font-bold text-indigo-900 mb-2">Build your COP in 2 minutes.</h4>
                            <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                                Captori is the first 'Operating System' for your career. We generate your plan, your benchmarks, and your asset log automatically.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 font-bold text-white hover:bg-indigo-700 transition-all shadow-lg"
                            >
                                Generate My COP
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See a sample Career Operating Plan for a Director-level role.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline font-sans"
                    >
                        View Executive Plan Example <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
