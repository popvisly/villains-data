'use client';

import Link from 'next/link';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Icon } from '@/components/ui/Icon';

export default function BlogPost() {
    return (
        <main className="min-h-screen subtle-noise">
            <Nav />

            <article className="mx-auto max-w-4xl px-6 py-16 md:py-24 font-sans">
                <SectionTitle
                    eyebrow="Comparison"
                    title="Captori vs. Traditional Career Tools"
                    subtitle="Why static resume builders and generic personality tests are failing the modern professional."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-br from-indigo-500/5 to-transparent -z-10"></div>

                    <div className="prose prose-slate prose-lg max-w-none">
                        <p className="lead text-xl text-slate-700 font-medium">
                            If you're still using Myers-Briggs or a resume template to plan your career in 2025, you're bringing a knife to a drone fight.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Failure of Legacy Tools</h3>
                        <p>
                            Traditional career tools suffer from three fatal flaws in the AI Era:
                        </p>
                        <ol className="space-y-4">
                            <li><strong>They are descriptive, not prescriptive:</strong> They tell you who you *are*, but not what you should *do* on Monday morning.</li>
                            <li><strong>They ignore automation risk:</strong> They assume the volume of your role as a PM or Designer will be relevant forever.</li>
                            <li><strong>They don't ship proof:</strong> They give you a badge instead of a shippable portfolio of judgment.</li>
                        </ol>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Captori: The Career Operating System</h3>
                        <p>
                            Captori was built from the ground up to solve for the <strong>Judgment Economy</strong>. Instead of personality traits, we measure <strong>Resilience Benchmarks</strong>.
                        </p>

                        <div className="grid gap-6 md:grid-cols-3 my-10">
                            {[
                                { title: 'Legacy Tests', val: 'Low Value', desc: 'Focus on personality and vibes.' },
                                { title: 'Resume Builders', val: 'Commoditizing', desc: 'Focus on claims AI can easily write.' },
                                { title: 'Captori', val: 'High Leverage', desc: 'Focus on shippable proof and judgment moats.' }
                            ].map((item) => (
                                <div key={item.title} className={`p-6 rounded-2xl border ${item.title === 'Captori' ? 'bg-indigo-950 text-white border-indigo-500' : 'bg-white text-slate-900 border-slate-100'}`}>
                                    <h4 className="font-bold mb-1">{item.title}</h4>
                                    <div className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70`}>{item.val}</div>
                                    <p className="text-xs opacity-80">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">Real-World Outcomes</h3>
                        <p>
                            While other tools provide "insights," Captori provides **Operations Plans**. 78% of our users ship their first proof-of-judgment artifact within 30 days of generating their plan.
                        </p>

                        <div className="mt-12 p-8 rounded-[2rem] bg-[hsl(var(--primary))] text-white text-center shadow-xl shadow-indigo-500/20">
                            <h4 className="text-2xl font-bold mb-4">Don't settle for static. Go strategic.</h4>
                            <p className="opacity-90 mb-8 max-w-sm mx-auto">
                                Start your Resilience Assessment today and see why 5,000+ professionals have ditched traditional career tools.
                            </p>
                            <Link
                                href="/start"
                                className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-bold text-indigo-900 hover:bg-slate-50 transition-all font-sans"
                            >
                                Compare My Role Risk Now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-medium mb-6">Want to see the Captori difference in action?</p>
                    <Link
                        href="/example"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                    >
                        View the Full Example Output <Icon name="arrowRight" size={16} />
                    </Link>
                </div>
            </article>

            {/* FOOTER */}
            <footer className="py-20 text-center font-sans text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Captori. Future-proof career strategy.
            </footer>
        </main>
    );
}
