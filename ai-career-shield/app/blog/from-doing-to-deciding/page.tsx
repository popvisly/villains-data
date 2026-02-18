'use client';

import Link from 'next/link';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Icon } from '@/components/ui/Icon';

export default function BlogPost() {
    return (
        <main className="min-h-screen subtle-noise">
            <Nav />

            <article className="mx-auto max-w-4xl px-6 py-16 md:py-24 font-sans">
                <SectionTitle
                    eyebrow="Market Shift"
                    title="From 'Doing' to 'Deciding': The AI Career Shift"
                    subtitle="In the age of generative volume, your income will be tied to the risks you take, not the hours you work."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative border-indigo-100">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none">
                        <p className="lead text-xl text-slate-700 font-medium">
                            The industrial era was about <strong>Standardization</strong>. The digital era was about <strong>Information</strong>. The AI era is about <strong>Discretion</strong>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Erosion of "Doing"</h3>
                        <p>
                            For decades, we've defined our value by our ability to "do" things. We "wrote" code. We "designed" interfaces. We "drafted" strategies. Today, an AI agent can do 80% of those activities at zero marginal cost.
                        </p>
                        <p>
                            The problem is that many professionals are still trying to compete on "doing-volume." They are trying to be faster 10x engineers or more prolific PMs. This is a losing strategy.
                        </p>

                        <div className="my-10 p-10 rounded-[2.5rem] bg-indigo-950 text-white shadow-2xl shadow-indigo-500/10">
                            <h4 className="text-xl font-bold mb-4 font-serif text-indigo-300 italic">"AI removes the cost of execution, making the value of judgment infinite."</h4>
                            <p className="text-slate-400 mb-0">The more 'stuff' AI creates, the more valuable the human who decides which 'stuff' is actually right becomes.</p>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Automation Pivot</h3>
                        <p>
                            To survive the shift, you must intentionally move away from "Volume Tasks" and toward "Decision Tasks."
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 my-10">
                            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                <h4 className="font-bold text-indigo-600 mb-2">The 'Doing' Trap</h4>
                                <ul className="text-sm space-y-2 text-slate-500">
                                    <li>• Repetitive aggregation</li>
                                    <li>• Formatting & Styling</li>
                                    <li>• Standardized drafts</li>
                                    <li>• Rule-based execution</li>
                                </ul>
                            </div>
                            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                <h4 className="font-bold text-emerald-600 mb-2">The 'Deciding' Moat</h4>
                                <ul className="text-sm space-y-2 text-slate-500">
                                    <li>• Stakeholder alignment</li>
                                    <li>• Risk tolerance modeling</li>
                                    <li>• Strategic synthesis</li>
                                    <li>• Ethics & Consequence ownership</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-16 p-8 rounded-[2rem] bg-slate-900 text-white text-center">
                            <h4 className="text-2xl font-bold mb-4">Are you ready to shift?</h4>
                            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                                Captori analyzes your current role and identifies the specific tasks where you can move from execution to decision ownership.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 font-bold text-slate-900 hover:bg-emerald-400 transition-all font-sans"
                            >
                                Build My Decision Roadmap
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See a 30/60/90 Day plan built on the 'Deciding' model.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View Sample Plan Output <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
