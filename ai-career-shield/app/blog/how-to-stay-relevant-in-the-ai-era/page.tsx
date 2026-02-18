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
                    eyebrow="Career Strategy"
                    title="How to Stay Relevant in the AI Era"
                    subtitle="Software is eating the world, and AI is digesting it. To stay relevant, you need to build a career moat based on judgment, not output."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none">
                        <p className="lead text-xl text-slate-700 font-medium font-sans">
                            The era of "working harder" is over. In a world where AI can generate infinite volume, the only thing that retains value is <strong>discretion</strong>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Core Philosophy: Leverage vs. Volume</h3>
                        <p className="font-sans">
                            Traditional career advice tells you to be more productive. "Use AI to write faster emails," they say. "Use it to code 10x more." This is a trap. If your value is tied to the volume of your code, your emails, or your designs, you are in a race to the bottom against a machine that doesn't sleep.
                        </p>
                        <p className="font-sans">
                            The shift we are seeing is from <em>execution</em> to <em>orchestration</em>. Staying relevant requires moving up the stack from the person who does the work to the person who defines the constraints and validates the outcome.
                        </p>

                        <div className="my-10 p-8 rounded-3xl bg-emerald-50 border border-emerald-100 italic text-emerald-900 font-medium font-sans">
                            "Leverage is the ability to produce massive results while minimizing your own time spent on execution. In the AI era, leverage is built on judgment."
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Resilience Index Framework</h3>
                        <p className="font-sans">
                            At Captori, we measure this shift through the <strong>Resilience Index</strong>. This index analyzes your role across four critical dimensions:
                        </p>

                        <div className="grid gap-6 md:grid-cols-2 my-10">
                            {[
                                { title: 'Judgment Density', desc: 'The percentage of your week spent making decisions with actual consequences.' },
                                { title: 'Workflow Ownership', desc: 'How much of the end-to-end outcome do you actually drive vs. just executing a task?' },
                                { title: 'Stakeholder Complexity', desc: 'The degree of political and human navigation required in your role.' },
                                { title: 'Artifact Proof', desc: 'Your ability to ship evidence of value that AI cannot simulate.' }
                            ].map((item) => (
                                <div key={item.title} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <h4 className="font-bold text-slate-900 mb-1 font-sans">{item.title}</h4>
                                    <p className="text-sm text-slate-600 font-sans">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Three Steps to Build Your Moat</h3>
                        <p className="font-sans">
                            If you want to protect your career from the next wave of automation, you must start building your moat today.
                        </p>

                        <div className="mt-12 p-8 rounded-[2rem] bg-indigo-950 text-white shadow-2xl shadow-indigo-500/20 font-sans">
                            <h4 className="text-xl font-bold mb-6">Tactical Protocol: Career Resilience</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs shrink-0">1</div>
                                    <span><strong>Stop Documenting Outputs:</strong> Nobody cares how many tickets you closed. Start documenting the <em>Judgment Calls</em> you made to resolve them.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs shrink-0">2</div>
                                    <span><strong>Own the Constraints:</strong> The most valuable people are those who can define what "Success" looks like when the path is ambiguous.</span>
                                </li>
                                <li className="flex gap-4">
                                    <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs shrink-0">3</div>
                                    <span><strong>Ship Proof:</strong> Use artifacts (case studies, framework drafts, decision logs) to prove your value to leadership.</span>
                                </li>
                            </ul>

                            <div className="mt-10 border-t border-indigo-900 pt-8">
                                <p className="mb-6 font-bold text-lg">Curious where your role ranks on the index?</p>
                                <Link
                                    href="/start"
                                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))] px-8 font-bold text-white hover:scale-[1.02] transition-all shadow-lg shadow-indigo-500/40"
                                >
                                    Calculate My Resilience Index
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See a real-world example of an AI-era career roadmap.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View Sample 90-Day Plan <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
