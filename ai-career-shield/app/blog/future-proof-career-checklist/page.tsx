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
                    eyebrow="Checklist"
                    title="The Future-Proof Your Career Checklist (2025 Edition)"
                    subtitle="A 10-point audit to ensure your role remains judgment-heavy and automation-resilient."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative border-amber-100">
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full -mr-20 -mb-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium">
                            The market is shifting faster than the education cycle. To stay ahead, you need to audit your role twice a year against the <strong>Reality of Automation</strong>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The 10-Point Career Audit</h3>

                        <div className="space-y-6 my-10">
                            {[
                                { point: "Do I own a decision that AI cannot make?", sub: "AI can suggest, but owning the consequence is the moat." },
                                { point: "Have I shipped a 'Proof Artifact' this month?", sub: "A document that proves your strategic judgment and synthesis." },
                                { point: "Does my leadership see me as an 'Owner' or an 'Operator'?", sub: "Owners define goals; operators execute steps." },
                                { point: "Can my primary deliverable be simulated with a prompt?", sub: "If yes, your role is currently being commoditized." },
                                { point: "Do I have a 'Human Map' of my stakeholders?", sub: "Political navigation remains a strictly human high-leverage skill." },
                                { point: "Am I using 'Grounded AI' protocols?", sub: "Using AI to amplify judgment rather than replace it." },
                                { point: "Is my network built on 'Presence' or 'Proof'?", sub: "Being known for what you've shipped is more resilient than being known for who you are." },
                                { point: "Do I have a 30/60/90 Day Operation Plan?", sub: "Passive growth is a risk in 2025; you need a tactical roadmap." },
                                { point: "Am I moving toward ambiguity?", sub: "The more ambiguous the problem, the more 'Judgment' it requires." },
                                { point: "Would my role exist if the company went remote?", sub: "A test for true asset-based value vs. presence-based value." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start pb-6 border-b border-slate-100 last:border-0">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-amber-100 text-amber-700 text-xs font-bold font-sans">
                                        {(i + 1).toString().padStart(2, '0')}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 leading-tight mb-1 font-sans">{item.point}</h4>
                                        <p className="text-sm text-slate-500 font-sans">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-amber-500/10 text-center font-sans">
                            <h4 className="text-2xl font-bold mb-4">How many 'No' answers did you have?</h4>
                            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                                If you answered 'No' to more than 3, your career resilience score is likely in the danger zone.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-amber-500 px-8 font-bold text-slate-900 hover:bg-amber-400 transition-all font-sans"
                            >
                                Get My Resilience Report
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See how a Senior PM future-proofed their workflow.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline font-sans"
                    >
                        View Sample Future-Proof Roadmap <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER SAME AS MAIN */}
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
