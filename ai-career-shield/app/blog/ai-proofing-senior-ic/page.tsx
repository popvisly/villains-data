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
                    eyebrow="Senior IC Roles"
                    title="AI-Proofing Your Role as a Senior IC"
                    subtitle="Why the jump from 'doing' to 'deciding' is the only survival path for Senior Engineers and PMs."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-br from-indigo-500/5 to-transparent -z-10"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium">
                            The "Senior Individual Contributor" track is being squeezed by AI. When a junior dev with an AI agent can produce as much volume as a senior dev, the seniority gap narrows—unless you shift your value point.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Seniority Compression</h3>
                        <p>
                            Historically, seniority was tied to <strong>Volume of Context</strong>. You knew where the bodies were buried, you knew the legacy code, you were faster. AI now provides context to juniors instantly. To remain "Senior," you must now be tied to <strong>Consequence of Choice</strong>.
                        </p>

                        <div className="my-10 p-10 rounded-3xl bg-indigo-950 text-white font-sans">
                            <h4 className="text-xl font-bold mb-6 text-indigo-200">The Senior IC Moat: Judgment Artifacts</h4>
                            <p className="text-slate-300 mb-8">Stop optimizing for code/tickets. Start optimizing for these three judgment-heavy areas:</p>
                            <div className="space-y-6">
                                <div className="border-l-2 border-indigo-500 pl-4">
                                    <h5 className="font-bold text-white mb-1">Architecture Constraints</h5>
                                    <p className="text-sm text-slate-400">Defining the 'Why' behind technical bets that avoid future debt.</p>
                                </div>
                                <div className="border-l-2 border-indigo-500 pl-4">
                                    <h5 className="font-bold text-white mb-1">Risk Mitigation</h5>
                                    <p className="text-sm text-slate-400">Identifying market or political shifts that AI's historical data won't catch.</p>
                                </div>
                                <div className="border-l-2 border-indigo-500 pl-4">
                                    <h5 className="font-bold text-white mb-1">Political Buy-In</h5>
                                    <p className="text-sm text-slate-400">Navigating the human incentives required to ship a complex feature.</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Executive Strategy</h3>
                        <p>
                            Moving from "Senior" to "Staff" or "Principal" levels in 2025 requires a <strong>Proof Portfolio</strong>. You need evidence that you didn't just write the code—you were the one who made the decision that saved the project millions in debt.
                        </p>

                        <div className="mt-12 p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100 text-center font-sans">
                            <h4 className="text-2xl font-bold text-indigo-900 mb-4">Are you building leverage or just volume?</h4>
                            <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                                Use Captori to audit your IC workflow and build a 90-day plan to move up the judgment stack.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 font-bold text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700"
                            >
                                AI-Proof My IC Role
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See an example roadmap for a Senior Engineeer/PM.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View Sample Senior Strategy <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
