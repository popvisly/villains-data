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
                    eyebrow="Templates"
                    title="The Product Manager Leverage Map Template"
                    subtitle="A tactical guide to mapping your discretion-heavy tasks and protecting your role from AI commoditization."
                />

                <div className="mt-16 glass-panel rounded-[3rem] p-8 md:p-12 overflow-hidden relative border-indigo-100">
                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium">
                            If you can prompt it, it's not a moat. For Product Managers, your moat is built on <strong>Leverage</strong>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">What is a Leverage Map?</h3>
                        <p>
                            A Leverage Map is a diagnostic tool used to separate "Repetitive Overhead" (which AI will handle) from "Discretionary Judgment" (which builds your career).
                        </p>

                        <div className="my-10 p-10 rounded-[2.5rem] bg-slate-900 text-white font-sans">
                            <h4 className="text-xl font-bold mb-8 border-b border-slate-800 pb-4">The PM Leverage Template</h4>
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="font-bold text-indigo-400">Task Category</div>
                                    <div className="font-bold text-slate-400">AI Contribution</div>
                                    <div className="font-bold text-emerald-400">Your Leverage Point</div>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6 border-b border-slate-800 pb-6">
                                    <div className="font-medium">PRD Drafting</div>
                                    <p className="text-xs text-slate-500">Writing the stories, formatting, and requirements.</p>
                                    <p className="text-xs text-white">Defining the <em>Risk Tolerance</em> of the feature bet.</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6 border-b border-slate-800 pb-6">
                                    <div className="font-medium">Market Research</div>
                                    <p className="text-xs text-slate-500">Aggregating trends and competitor features.</p>
                                    <p className="text-xs text-white">Synthesizing <em>Political Capital</em> required for launch.</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6 border-b border-slate-800 pb-6">
                                    <div className="font-medium">Stakeholder Sync</div>
                                    <p className="text-xs text-slate-500">Summarizing nodes and next steps.</p>
                                    <p className="text-xs text-white">Navigating <em>Ego and Incentives</em> in the room.</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">How to Fill Your Map</h3>
                        <ol>
                            <li><strong>Track your week:</strong> Group items by category.</li>
                            <li><strong>Apply the AI Filter:</strong> If you gave GPT-O1 your context, could it suggest the next move? If yes, that's volume.</li>
                            <li><strong>Identify the 'Gap':</strong> Where does GPT-O1 fail? (Usually politics, deep empathy, or high-risk bets). That's your leverage.</li>
                        </ol>

                        <div className="mt-16 p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 text-center">
                            <p className="text-emerald-900 font-bold mb-4">Want your Leverage Map generated automatically?</p>
                            <Link
                                href="/start"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-8 font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                            >
                                Generate My Leverage Map
                            </Link>
                        </div>
                    </div>
                </div>
            </article>

            {/* FOOTER */}
            <footer className="py-20 text-center font-sans text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Captori. Built for Product Leaders.
            </footer>
        </main>
    );
}
