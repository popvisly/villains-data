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
                    eyebrow="Career Leverage"
                    title="Building Your Career Proof Portfolio"
                    subtitle="In the AI era, the resume is dead. The only currency that matters is shippable proof of judgment."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium font-sans">
                            The "Resume" is a 20th-century technology. It's a list of claims that anyone—including an AI—can write. A <strong>Proof Portfolio</strong> is a list of outcomes that only a human could have navigated.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Claims vs. Proof</h3>
                        <p>
                            A claim is: "I managed a team of 10 and increased revenue by 20%."
                        </p>
                        <p>
                            Proof is: "Here is the Decision Log for the Q3 strategy pivot. Here are the constraints we faced, the data we ignored, and the judgment call that led to the 20% increase."
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">What Goes Into a Proof Portfolio?</h3>
                        <p>
                            Every professional should be building an archive of these four high-leverage artifacts:
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 my-10">
                            {[
                                { title: 'The Framework Draft', desc: 'A document where you define the logic for a new process or strategy from scratch.' },
                                { title: 'The Decision Log', desc: 'A trace of a complex choice made under ambiguity, documenting what was at stake.' },
                                { title: 'The Constraint Map', desc: 'Analysis of a project where you navigated political or technical boundaries successfully.' },
                                { title: 'The Judgment Artifact', desc: 'A piece of work where your specific "taste" or "experience" was the deciding factor.' }
                            ].map((item) => (
                                <div key={item.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                                    <h4 className="font-bold text-slate-900 mb-2 font-sans">{item.title}</h4>
                                    <p className="text-sm text-slate-600 font-sans">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">How to Start Your Archive</h3>
                        <p>
                            You don't need a fancy website. You need a <strong>Decision Journal</strong>. Every time you make a call that has a risk attached to it, write it down.
                        </p>

                        <div className="mt-12 p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-indigo-500/20 font-sans text-center">
                            <h4 className="text-2xl font-bold mb-4">Want a shortcut to your first proof archive?</h4>
                            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                The Captori 'Executive Plan' includes a custom Proof Template library that helps you export your career judgment into shippable artifacts.
                            </p>
                            <Link
                                href="/#pricing"
                                className="inline-flex h-14 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-10 text-lg font-bold text-white hover:scale-[1.02] transition-all"
                            >
                                Unlock Your Proof Portfolio <Icon name="arrowRight" size={18} className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See how a Proof Portfolio changes your Resilience Index.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View the Proof-Ready Roadmap <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
