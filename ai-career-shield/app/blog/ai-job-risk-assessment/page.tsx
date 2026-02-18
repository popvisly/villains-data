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
                    eyebrow="Risk Assessment"
                    title="Is Your Role Commoditizing?"
                    subtitle="AI doesn't replace people. It replaces repeatable tasks. Find out where your role sits on the automation spectrum."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium font-sans">
                            Commoditization happens slowly, then all at once. If your daily workflow is built on "repackaging" existing information, you are at the highest risk of AI disruption.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Automation Spectrum</h3>
                        <p>
                            To assess your risk, you must look at your tasks through the lens of <strong>repeatability vs. discretion</strong>.
                        </p>

                        <div className="my-10 space-y-4">
                            {[
                                { level: 'High Risk (Repeatable)', desc: 'Data entry, basic report drafting, status updates, initial research aggregation.', color: 'text-rose-600 bg-rose-50' },
                                { level: 'Medium Risk (Hybrid)', desc: 'User story writing, standard PRDs, technical documentation, schedule management.', color: 'text-amber-600 bg-amber-50' },
                                { level: 'Low Risk (Discretionary)', desc: 'Political navigation, strategic bets, defining risk tolerance, innovative architecture.', color: 'text-emerald-600 bg-emerald-50' }
                            ].map((item) => (
                                <div key={item.level} className={`p-5 rounded-2xl border border-current/10 ${item.color}`}>
                                    <h4 className="font-bold mb-1 font-sans">{item.level}</h4>
                                    <p className="text-sm opacity-80 font-sans">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The AI Job Risk Assessment</h3>
                        <p>
                            How do you know if you're safe? Ask yourself three questions:
                        </p>
                        <ol>
                            <li><strong>Would the project fail if a random person executed my tasks using a high-quality prompt?</strong> (If no, you are replaceable).</li>
                            <li><strong>Do I own the "Why" or just the "How"?</strong> (Owning the why is your moat).</li>
                            <li><strong>Do I have shippable proof of value from the last 90 days?</strong> (If no, you are invisible).</li>
                        </ol>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Stop Guessing. Start Measuring.</h3>
                        <p>
                            The most dangerous thing you can do is "wait and see." Transitioning from a volume-based role to a judgment-based role takes time and a deliberate plan.
                        </p>

                        <div className="mt-12 p-8 rounded-[2.5rem] bg-[hsl(var(--primary))] text-white shadow-2xl shadow-indigo-500/40 text-center font-sans">
                            <h4 className="text-2xl font-bold mb-4">Get your 100% free Risk Assessment</h4>
                            <p className="opacity-90 mb-8 max-w-lg mx-auto">
                                We've analyzed 5,000+ professional tasks to build the most accurate AI Job Risk engine in the market. See where you stand in 2 minutes.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-10 text-lg font-bold text-slate-900 hover:bg-slate-50 transition-all shadow-xl"
                            >
                                Start Assessment <Icon name="sparkles" size={18} className="ml-2 text-indigo-600" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">See a sample AI Job Risk report and career roadmap.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View Sample Assessment Output <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
