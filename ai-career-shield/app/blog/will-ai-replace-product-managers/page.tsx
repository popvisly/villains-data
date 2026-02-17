'use client';

import Link from 'next/link';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Icon } from '@/components/ui/Icon';
import { CtaBlock } from '@/components/blog/CtaBlock';

export default function BlogPost() {
    return (
        <main className="min-h-screen subtle-noise">
            <Nav />

            <article className="mx-auto max-w-4xl px-6 py-16 md:py-24">
                <SectionTitle
                    eyebrow="Market Analysis"
                    title="Will AI Replace Product Managers?"
                    subtitle="The answer isn&apos;t a simple yes or no. It depends on whether you&apos;re a &lsquo;volume owner&rsquo; or a &lsquo;judgment owner&rsquo;."
                />

                <div className="mt-16 glass-panel rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-20 -mt-20"></div>

                    <div className="prose prose-slate prose-lg max-w-none">
                        <p className="lead text-xl text-slate-700 font-medium">
                            If your day as a Product Manager is 80% Jira tickets, PRD drafting, and status updates, the answer is uncomfortably close to <strong>yes</strong>.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Volume Compression</h3>
                        <p>
                            AI is a volume machine. It can draft a PRD from a three-sentence prompt. It can translate business requirements into user stories. It can even suggest acceptance criteria. In this world, the &ldquo;operator PM&rdquo;&mdash;the one who justifies their salary through sheer output volume&mdash;is facing a commoditization crisis.
                        </p>

                        <div className="my-10 p-8 rounded-3xl bg-indigo-50 border border-indigo-100 italic text-indigo-900 font-medium">
                            &ldquo;AI removes the overhead. But in doing so, it exposes the lack of judgment.&rdquo;
                        </div>

                        <CtaBlock />

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">The Judgment Moat</h3>
                        <p>
                            The roles that thrive are those built on <strong>Strategic Judgment</strong>. This is the ability to make high-stakes decisions with incomplete data—decisions that have actual consequences.
                        </p>
                        <p>
                            Product Management is shifting from &ldquo;managing the backlog&rdquo; to &ldquo;owning the discretion.&rdquo; AI can propose 10 features, but it cannot (yet) deeply understand the political capital of your stakeholder map, the specific risk tolerance of your CEO, or the subtle market tailwinds that haven&apos;t hit the data yet.
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-serif">How to Build Leverage</h3>
                        <p>
                            To survive the shift, PMs must move from <em>&ldquo;outputs&rdquo;</em> to <em>&ldquo;proof of judgment.&rdquo;</em> You need to document your decision architecture. Why did you say no to that high-priority request? What were the constraints?
                        </p>

                        <div className="mt-12 p-8 rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-indigo-500/10">
                            <h4 className="text-xl font-bold mb-4">Tactical Shift: The 90-Day PM Plan</h4>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex gap-3">
                                    <Icon name="checkCircle" size={18} className="text-emerald-400 shrink-0" />
                                    <span><strong>Assess Exposure:</strong> Map your weekly tasks. Which ones are &ldquo;outputs&rdquo; and which are &ldquo;decisions&rdquo;?</span>
                                </li>
                                <li className="flex gap-3">
                                    <Icon name="checkCircle" size={18} className="text-emerald-400 shrink-0" />
                                    <span><strong>Build Proof Artifacts:</strong> Start documenting the &ldquo;Why&rdquo; behind your decisions in a way that is shippable to leadership.</span>
                                </li>
                                <li className="flex gap-3">
                                    <Icon name="checkCircle" size={18} className="text-emerald-400 shrink-0" />
                                    <span><strong>Reposition:</strong> Move toward roles with higher ambiguity and higher consequence.</span>
                                </li>
                            </ul>

                            <div className="mt-8 border-t border-slate-700 pt-8">
                                <p className="mb-6 font-bold text-lg">Want to see exactly where your role stands?</p>
                                <Link
                                    href="/career-resilience"
                                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[hsl(var(--cta))] px-8 font-bold text-[hsl(var(--cta-foreground))] hover:scale-[1.02] transition-all shadow-lg shadow-emerald-500/20"
                                >
                                    Get Your Resilience Index
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RELATED CONTENT / CTA */}
                <div className="mt-16">
                    <div className="text-center">
                        <p className="text-slate-500 font-medium mb-6">Want more of the Captori POV?</p>
                        <Link
                            href="/example"
                            className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
                        >
                            Check out the Example Plan <Icon name="arrowRight" size={16} />
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {[{
                            title: 'How to stay relevant in the AI era',
                            href: '/blog/how-to-stay-relevant-in-the-ai-era',
                        }, {
                            title: 'Product Manager Leverage Map',
                            href: '/blog/product-manager-leverage-map',
                        }, {
                            title: 'AI Job Risk Assessment (2-minute audit)',
                            href: '/blog/ai-job-risk-assessment',
                        }].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="glass-panel rounded-3xl p-6 hover:shadow-xl transition-all"
                            >
                                <div className="text-sm font-bold text-slate-900">{item.title}</div>
                                <div className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-slate-600">
                                    Read <Icon name="arrowRight" size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </article>

            {/* FOOTER SAME AS MAIN */}
            <footer className="border-t border-slate-200 bg-white px-6 py-12 md:py-20">
                <div className="mx-auto max-w-7xl text-center">
                    <div className="flex items-center justify-center gap-3 mb-6 opacity-50 grayscale">
                        <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center">
                            <img src="/icon.svg" alt="Captori" className="h-4 w-4" style={{ filter: 'invert(1)' }} />
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
