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
                    eyebrow="Tactics"
                    title="How to Show Strategic Judgment in Interviews"
                    subtitle="Stop answering 'Tell me about a time...' with stories. Start answering with Proof Artifacts."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -ml-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium">
                            Interviews are shifting. Hiring managers are becoming wary of the "polished storyteller" because stories can be rehearsed (or prompted). They want to see <strong>Proof of Work</strong>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Death of the STAR Method</h3>
                        <p>
                            The STAR (Situation, Task, Action, Result) method is built on claims. In the AI era, recruiters are looking for the "Deep Work" behind the claims. They want to know <em>how</em> you decided, not just what you did.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The "Artifact" Response Strategy</h3>
                        <p>
                            When asked a behavioral question, don't just speak. If the interview is remote, offer to shared a <strong>Decision Architecture</strong> document. If in person, describe your <strong>Constraint Map</strong>.
                        </p>

                        <div className="my-10 grid gap-6 md:grid-cols-2">
                            <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                                <h4 className="font-bold text-indigo-900 mb-2">Claim (Weak)</h4>
                                <p className="text-sm italic">"I led the redesign and it resulted in a 40% uptick in conversion."</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                                <h4 className="font-bold text-emerald-900 mb-2">Proof (Strong)</h4>
                                <p className="text-sm">"I can walk you through the Decision Log from the redesign. We actually ignored the top-requested user feature because the political risk of the pivot was too high. Here is how I mapped that constraint..."</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">3 Artifacts to Bring to Every Interview</h3>
                        <ol className="space-y-4">
                            <li><strong>The Constraint Map:</strong> Analysis of how you navigated technical or political boundaries on your most complex project.</li>
                            <li><strong>The Decision Architecture:</strong> A breakdown of a high-risk bet you made and the signals you used to validate it.</li>
                            <li><strong>The Judgment Audit:</strong> Your 90-day Resilience Index (proves you are aware of your leverage points).</li>
                        </ol>

                        <div className="mt-16 p-10 rounded-[2.5rem] bg-indigo-950 text-white shadow-2xl shadow-indigo-500/20 text-center">
                            <h4 className="text-2xl font-bold mb-4 font-serif italic text-indigo-200">Win the interview before you walk in.</h4>
                            <p className="text-indigo-300 mb-8 max-w-lg mx-auto">
                                Captori generates these artifacts for you as part of our Executive Plan. Use our templates to turn your job history into a Proof Portfolio.
                            </p>
                            <Link
                                href="/#pricing"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-500 px-8 font-bold text-white hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/40"
                            >
                                Build My Portfolio Assets
                            </Link>
                        </div>
                    </div>
                </div>
            </article>

            {/* FOOTER */}
            <footer className="py-20 text-center font-sans text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Captori. Proof-ready career strategy.
            </footer>
        </main>
    );
}
