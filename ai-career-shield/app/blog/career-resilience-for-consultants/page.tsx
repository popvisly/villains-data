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
                    eyebrow="Persona Spotlight"
                    title="Career Resilience for Senior Consultants"
                    subtitle="How high-discretion advisors are using AI to shift from 'billable hours' to 'leveraged outcomes'."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium">
                            The consulting model is under siege. Clients are no longer willing to pay for "slides and research" that they can generate with a prompt. The value is shifting to <strong>Implementation Judgment</strong>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Death of the Research Phase</h3>
                        <p>
                            If you charge for information aggregation, your revenue is at risk. AI can scan 1,000 PDFs and find the consensus in seconds. As a consultant, your new value point is the <strong>Synthesis of Constraints</strong>—the ability to tell a client why the AI's consensus is actually wrong for their specific political or technical reality.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Consultant Resilience Benchmarks</h3>
                        <p>
                            To maintain executive-level billing, you need to transition your workflow:
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 my-10">
                            {[
                                { title: '80% Discretion', desc: 'Move away from data gathering; focus on risk tolerance and stakeholder ego management.' },
                                { title: 'Asset-Based Billing', desc: 'Charge for the "Judgment Artifacts" (Strategic Roadmaps, Decision Logs) rather than hours.' },
                                { title: 'AI Orchestration', desc: 'Promote yourself as the one who manages the AI agents that do the low-level volume work.' },
                                { title: 'Political Moat', desc: 'Double down on the human relationships that AI cannot navigate.' }
                            ].map((item) => (
                                <div key={item.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-10 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl shadow-indigo-500/20 text-center">
                            <h4 className="text-2xl font-bold mb-4 font-serif">Protect your consulting practice.</h4>
                            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                                Captori's 'Executive Plan' is designed for consultants who need to prove high-discretion value to their clients.
                            </p>
                            <Link
                                href="/#pricing"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))] px-8 font-bold text-white hover:scale-[1.02] transition-all"
                            >
                                Get the Executive Strategy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See an example of an AI-era Consultant's roadmap.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View Consultant Roadmap Example <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
