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
                    eyebrow="AI Ethics & Strategy"
                    title="The Grounded AI Protocol for Professionals"
                    subtitle="How to use AI to amplify your judgment without losing your agency or your career value."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium">
                            The greatest risk of AI isn't that it replaces you. It's that it <strong>hollows you out</strong>. If you let AI do the thinking, you lose the "Judgment Muscle" that makes you valuable.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">What is Grounded AI?</h3>
                        <p>
                            Grounded AI is a set of protocols designed to ensure that human judgment remains the <em>anchor</em> of the work, while AI acts as the <em>engine</em>.
                        </p>

                        <div className="my-10 space-y-8">
                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4 font-sans uppercase tracking-widest text-xs">Protocol 1: Draft Before Prompt</h4>
                                <p className="text-slate-600 mb-0 font-sans">
                                    Never start with an empty prompt. Always draft the <strong>Logic Architecture</strong> or <strong>Strategic Constraints</strong> yourself first. AI should fill the volume, not define the direction.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4 font-sans uppercase tracking-widest text-xs">Protocol 2: The Discretion Gap</h4>
                                <p className="text-slate-600 mb-0 font-sans">
                                    Identify the "Grey Areas" in a problem—the parts where data is missing or stakeholders are conflicted. Specifically tell the AI to <em>ignore</em> those parts so you can apply your human judgment there.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4 font-sans uppercase tracking-widest text-xs">Protocol 3: Verification of Consequence</h4>
                                <p className="text-slate-600 mb-0 font-sans">
                                    Every AI output must be audited for <strong>Political and Strategic Alignment</strong>. If the AI suggests a feature, you must be the one to sign off as the "Consequence Owner."
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Moving From Operator to Owner</h3>
                        <p>
                            Operators use AI to get more work done. Owners use AI to spend more time thinking about high-impact decisions.
                        </p>

                        <div className="mt-12 p-10 rounded-[2.5rem] bg-emerald-950 text-white shadow-2xl shadow-emerald-500/20 text-center font-sans">
                            <h4 className="text-2xl font-bold mb-4 font-serif italic text-emerald-200">The shift starts with your roadmap.</h4>
                            <p className="text-emerald-400/80 mb-8 max-w-sm mx-auto">
                                Captori's 'Grounded Protocol' module helps you redesign your week to prioritize judgment-building tasks.
                            </p>
                            <Link
                                href="/#pricing"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-500 px-8 font-bold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/40"
                            >
                                Get the Grounded Protocol Plan
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See a plan built with Grounded AI principles.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline font-sans"
                    >
                        Check out the Senior PM Roadmap <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
