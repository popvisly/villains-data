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
                    eyebrow="Market Comparison"
                    title="Strategic Career Planning vs. Traditional Coaching"
                    subtitle="Why data-driven plans are replacing high-cost human generalists in the AI era."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none font-sans">
                        <p className="lead text-xl text-slate-700 font-medium font-sans">
                            Until recently, high-level career strategy was a luxury reserved for those who could afford $500/hour executive coaches. That model is breaking.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Limits of Human Coaching</h3>
                        <p>
                            Traditional coaches are great for emotional support and "accountability." But for tactical, data-driven career planning in a rapidly automating market, they have a major limitation: <strong>Lack of role-specific data architecture.</strong>
                        </p>
                        <p>
                            A generalist coach can't tell you exactly which technical tasks in your PM or Engineering workflow are at the highest risk of commoditization by GPT-5. They use intuition. We use data.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Enter the Strategic Career Planning Tool</h3>
                        <p>
                            Platforms like Captori represent a new category: <strong>Automated Strategic Planning</strong>. Here is how they compare:
                        </p>

                        <div className="overflow-x-auto my-10">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="py-4 font-bold text-slate-900">Feature</th>
                                        <th className="py-4 font-bold text-slate-900">Generalist Coach</th>
                                        <th className="py-4 font-bold text-slate-900">Captori (AI Strategy)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-600">
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 font-medium">Cost</td>
                                        <td className="py-4">$2,000 - $10,000 /yr</td>
                                        <td className="py-4">$39 - $99 (One-time)</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 font-medium">Speed to Plan</td>
                                        <td className="py-4">4 - 6 Weeks</td>
                                        <td className="py-4">2 Minutes</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 font-medium">Data Model</td>
                                        <td className="py-4">Subjective Intuition</td>
                                        <td className="py-4">Automation Benchmarks</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-4 font-medium">Deliverable</td>
                                        <td className="py-4">Conversation</td>
                                        <td className="py-4">30/60/90 Operation Plan</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">When to use which?</h3>
                        <p>
                            Use a coach when you need to navigate a specific interpersonal conflict or work on soft skills like public speaking.
                        </p>
                        <p>
                            Use a strategic planning tool when you need a <strong>Hard Assets Roadmap</strong>—when you need to know exactly what to build, ship, and prove to leadership to remain indispensable.
                        </p>

                        <div className="mt-12 p-8 rounded-[2rem] bg-[hsl(var(--primary))] text-white shadow-2xl shadow-indigo-500/20 text-center font-sans">
                            <h4 className="text-2xl font-bold mb-4">Ready for a Strategic Upgrade?</h4>
                            <p className="opacity-90 mb-8 max-w-lg mx-auto">
                                Skip the 4-week onboarding. Get your 90-day Resilience Plan in the next 120 seconds.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-bold text-indigo-600 hover:bg-slate-50 transition-all shadow-xl"
                            >
                                Start Your Strategy Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">Want to see the difference? Check out an AI-generated plan.</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View Sample 90-Day Output <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
        </main>
    );
}
