'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics-client';
import { APP_NAME, APP_PRODUCT, ROUTES } from '@/lib/brand';

function Nav() {
    return (
        <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm uppercase tracking-widest">
                        <Icon name="arrowRight" size={14} className="rotate-180" />
                        Back to Home
                    </Link>
                </div>

                <nav className="flex items-center gap-4 md:gap-8 text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">
                    <Link href="/#how" className="hover:text-[hsl(var(--primary))] transition-colors hidden md:block">
                        How it works
                    </Link>
                    <Link href="/start" className="hover:text-[hsl(var(--primary))] transition-colors">
                        Generate Plan
                    </Link>
                </nav>
            </div>
        </header>
    );
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <div id={id} className={`mx-auto max-w-5xl px-6 py-16 md:py-24 ${className}`}>
            {children}
        </div>
    );
}

export default function ExamplePage() {
    useEffect(() => {
        trackEvent('example_viewed');
    }, []);

    return (
        <main className="min-h-screen subtle-noise bg-white selection:bg-indigo-100 selection:text-indigo-900">
            <Nav />

            {/* Hero / Above the Fold */}
            <section className="bg-slate-50 border-b border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/50 to-transparent pointer-events-none" />
                <Section className="text-center relative z-10">
                    <div className="mb-8 inline-flex flex-col items-center">
                        <div className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 border border-indigo-100 mb-3 shadow-sm">
                            Example Career Operating Plan
                        </div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            Generated: Jan 15, 2025 &bull; Real output from a Product Manager (Series B SaaS)
                        </p>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-slate-900 mb-8 font-serif [text-wrap:balance] italic">
                        Captori Proof Page
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl md:text-2xl text-slate-600 leading-relaxed mb-12">
                        What you actually get from Captori in ~2 minutes. <br className="hidden md:block" />
                        <span className="font-bold text-slate-900 underline decoration-indigo-500/30 underline-offset-8">No login. No email.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={ROUTES.START}
                            className="group inline-flex h-16 items-center justify-center rounded-2xl bg-slate-900 px-10 text-lg font-bold text-white transition-all hover:bg-slate-800 shadow-2xl shadow-slate-900/10 active:scale-95"
                        >
                            Generate My Plan <Icon name="arrowRight" size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/#pricing"
                            className="inline-flex h-16 items-center justify-center rounded-2xl border border-slate-200 bg-white px-10 text-lg font-bold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
                        >
                            View Pricing
                        </Link>
                    </div>

                    <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Redacted for privacy &bull; Non-evergreen data snapshot
                    </p>
                </Section>
            </section>

            {/* Section 1: Resilience Index (The Diagnosis) */}
            <Section id="resilience">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div>
                        <div className="mb-6 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 border border-emerald-100">
                            01. Resilience Index (The Diagnosis)
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8 font-serif italic">How the model sees you.</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Calculated from task mix + leverage drivers. Drivers show why the score moved—providing the roadmap for professional validation.
                        </p>

                        <div className="space-y-6">
                            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200 shadow-sm">
                                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6">Leverage Drivers</h3>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    {[
                                        { label: 'Discretion', score: '8/10', color: 'bg-indigo-500', desc: 'Owning trade-offs with ambiguous data' },
                                        { label: 'Repetition', score: '4/10', color: 'bg-slate-300', desc: 'Low rote task surface' },
                                        { label: 'Stakes', score: '7/10', color: 'bg-amber-500', desc: 'Failure affects product velocity' },
                                        { label: 'Ambiguity', score: '6/10', color: 'bg-emerald-500', desc: 'Operating in unclear specs' },
                                    ].map((driver) => (
                                        <div key={driver.label} className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-slate-900">{driver.label}</span>
                                                <span className="text-xs font-bold text-slate-900">{driver.score}</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                                <div className={`${driver.color} h-full`} style={{ width: `${(parseInt(driver.score) / 10) * 100}%` }}></div>
                                            </div>
                                            <p className="text-[9px] text-slate-500 leading-tight">{driver.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 text-[11px] leading-relaxed text-indigo-900 font-medium">
                                <Icon name="zap" size={14} className="mb-2" />
                                <strong>Translation:</strong> Your leverage comes from judgment in messy contexts. <br />
                                <strong>Risk surface:</strong> Any work that becomes &ldquo;fill in the template.&rdquo;
                            </div>
                        </div>
                    </div>

                    <div className="relative isolate">
                        <div className="absolute -inset-10 bg-indigo-100/50 rounded-full blur-3xl opacity-50 pointer-events-none -z-10" />
                        <div className="flex flex-col items-center justify-center p-16 md:p-24 rounded-[4rem] bg-white ring-1 ring-slate-200 shadow-2xl relative">
                            <div className="absolute top-8 right-12 text-[10px] font-bold uppercase tracking-widest text-slate-400">Score Rating</div>
                            <div className="text-[12rem] md:text-[14rem] font-bold text-slate-900 font-serif tracking-tighter leading-none mb-4">74%</div>
                            <div className="text-xl font-bold uppercase tracking-[0.4em] text-emerald-600">Resilient</div>
                            <p className="mt-8 text-xs font-medium text-slate-400 text-center max-w-[180px] leading-relaxed italic">
                                Calculated against Series B PM benchmark peer group.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Section 2: Leverage Map */}
            <div className="bg-slate-950 text-white overflow-hidden relative border-y border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(79,70,229,0.1),transparent)] pointer-events-none" />
                <Section id="leverage-map">
                    <div className="text-center mb-20">
                        <div className="mb-6 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-400 border border-white/10 backdrop-blur-sm">
                            02. Leverage Map
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif italic text-balance">The Shift: Documenting Decision Logic.</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">What&apos;s compounding vs. commoditizing in the next 24 months.</p>
                    </div>

                    <div className="mx-auto max-w-4xl">
                        <div className="grid grid-cols-2 gap-8 md:gap-16 mb-8 px-8">
                            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">Commoditizing (Cheap)</div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-indigo-400">Compounding (Valuable)</div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { left: 'Status reports', right: 'Roadmap triage + sequencing' },
                                { left: 'Meeting agendas', right: 'Stakeholder alignment strategy' },
                                { left: 'Feature specs (draft)', right: 'Trade-off frameworks' },
                                { left: 'Sprint grooming', right: 'Risk mitigation logic' },
                                { left: 'Dashboard creation', right: 'Cross-functional negotiation' },
                                { left: 'Interview transcripts', right: 'Signal synthesis' },
                            ].map((pair, i) => (
                                <div key={i} className="grid grid-cols-2 gap-4 md:gap-8 group">
                                    <div className="p-6 md:p-8 rounded-[2rem] bg-white/5 border border-white/5 text-sm md:text-base text-slate-500 transition-all group-hover:bg-white/[0.08]">
                                        {pair.left}
                                    </div>
                                    <div className="p-6 md:p-8 rounded-[2rem] bg-indigo-600/10 border border-indigo-500/20 text-sm md:text-base font-bold text-white shadow-xl shadow-indigo-900/10 transition-all group-hover:bg-indigo-600/20 group-hover:border-indigo-500/40">
                                        {pair.right}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 rounded-[2.5rem] bg-indigo-600 text-white text-center shadow-2xl shadow-indigo-600/20 max-w-2xl mx-auto border border-white/10 relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform group-hover:scale-150" />
                            <p className="relative z-10 text-lg md:text-xl font-bold leading-relaxed italic">
                                &ldquo;Stop being the scribe; become the referee. Shift from &lsquo;documenting decisions&rsquo; to &lsquo;owning the decision logic.&rsquo;&rdquo;
                            </p>
                        </div>
                    </div>
                </Section>
            </div>

            {/* Section 3: 30/60/90 Build Plan */}
            <Section id="build-plan">
                <div className="text-center mb-24">
                    <div className="mb-6 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200">
                        03. Build Plan (Execution)
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold font-serif italic mb-6">The 90‑Day Trajectory.</h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">Specific artifacts you ship to build permanent leverage. Not templates—proof.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-slate-100 -z-10" />

                    {[
                        {
                            day: '30',
                            title: 'Proof Foundation',
                            goal: 'Ship one artifact that shows strategic judgment',
                            weeks: [
                                { title: 'W1-2: Build Framework', desc: 'Document trade-off logic from last 3 roadmap decisions.', artifact: '"How I Score Features" doc' },
                                { title: 'W3-4: Run High-Stakes Triage', desc: 'Lead prioritization using your framework.', artifact: '"Why We Cut X to Ship Y" memo' },
                            ]
                        },
                        {
                            day: '60',
                            title: 'Proof Depth',
                            goal: 'Turn tactical wins into repeatable leverage',
                            weeks: [
                                { title: 'W5-6: Templatize Judgment', desc: 'Scale logic across junior team members.', artifact: 'PM Decision Toolkit' },
                                { title: 'W7-8: Strategic Training', desc: 'Run 30-min training on your framework.', artifact: 'Training recording + 1-pager' },
                            ]
                        },
                        {
                            day: '90',
                            title: 'Proof at Scale',
                            goal: 'Position as Strategy Owner, not Task Executor',
                            weeks: [
                                { title: 'W9-10: Package Proof', desc: 'Create Proof Archive of 3 decisions + outcomes.', artifact: 'Portfolio-ready briefs' },
                                { title: 'W11-12: External Validation', desc: 'Share framework briefs on LinkedIn/Slack.', artifact: 'Public proof-of-work' },
                            ]
                        },
                    ].map((col) => (
                        <div key={col.day} className="space-y-10 group">
                            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm text-2xl font-bold text-slate-900 font-serif italic transition-all group-hover:border-indigo-500 group-hover:bg-indigo-50 group-hover:text-indigo-600">
                                {col.day}
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{col.title}</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-4">{col.goal}</p>
                                </div>

                                <div className="space-y-8">
                                    {col.weeks.map((week, i) => (
                                        <div key={i} className="relative pl-6 border-l-2 border-slate-100 group-hover:border-indigo-100 transition-colors">
                                            <h4 className="text-sm font-bold text-slate-900 mb-1">{week.title}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed mb-3">{week.desc}</p>
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-indigo-50 text-[10px] font-bold text-indigo-700 uppercase tracking-tight border border-indigo-100">
                                                <Icon name="professional" size={10} /> {week.artifact}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Section 4: Pressure-test prompt */}
            <section className="bg-emerald-50/40 py-24 md:py-32 border-y border-emerald-100">
                <Section id="pressure-tests">
                    <div className="text-center mb-20 px-6">
                        <div className="mb-6 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600 border border-emerald-200">
                            04. Pressure-Test Prompts
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif italic text-slate-900">Be Interview Ready.</h2>
                        <p className="mt-6 text-slate-500 text-lg">Testing for model blindspots and ownership of judgment.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {[
                            {
                                q: '"Tell me about a time you went against the data to make a better decision."',
                                testing: "Can you explain model blindspots? Do you own judgment?",
                                structure: [
                                    { label: 'Set Context', text: '"We had NPS scores trending positive, but..."' },
                                    { label: 'Name the Gap', text: '"The data missed churn risk in enterprise segment"' },
                                    { label: 'Your Call', text: '"Advocated to delay feature despite PM pressure"' },
                                    { label: 'Result', text: '"Saved 2 key accounts; data caught up 6 weeks later"' }
                                ]
                            },
                            {
                                q: '"Walk me through a trade-off where you had to disappoint a stakeholder."',
                                testing: "Do you navigate politics? Can you hold a position?",
                                structure: [
                                    { label: 'Goals', text: '"Sales wanted demo-ready; Eng needed stability"' },
                                    { label: 'Framework', text: '"I scored it as: impact 6/10, eng debt 9/10"' },
                                    { label: 'Negotiation', text: '"Proposed stripped MVP with debt paydown plan"' },
                                    { label: 'Resolution', text: '"Sales got pitch; Eng got bandwidth; 3-week ship"' }
                                ]
                            }
                        ].map((test, i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-emerald-100 flex flex-col">
                                <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                                    {i + 1}
                                </div>
                                <div className="text-xl md:text-2xl font-bold text-slate-900 mb-6 font-serif italic leading-tight">
                                    {test.q}
                                </div>

                                <div className="mb-8 p-4 rounded-xl bg-slate-50 text-[10px] leading-relaxed">
                                    <span className="font-bold text-slate-500 uppercase tracking-widest mr-2">Testing:</span>
                                    <span className="text-slate-600 font-medium italic">{test.testing}</span>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <h4 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-4">Response Structure</h4>
                                    <div className="space-y-3">
                                        {test.structure.map((item, j) => (
                                            <div key={j} className="flex gap-4 items-start text-xs border-b border-slate-50 pb-3 last:border-0">
                                                <span className="w-24 shrink-0 font-bold text-slate-400 uppercase tracking-tighter text-[9px] mt-0.5">{item.label}:</span>
                                                <span className="text-slate-700 font-medium">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            </section>

            {/* Section 5: Grounded Protocol */}
            <Section id="protocol">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
                    <div className="sticky top-32">
                        <div className="mb-6 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-200">
                            05. Grounded Protocol
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif italic text-slate-900 mb-8">Anti‑Slop Rules.</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-10">
                            Act, then log off. Keep your agency in a world of infinite noise.
                        </p>
                        <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                                    <Icon name="locked" size={18} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Capacity Guardrails</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">Minimum Viable Day</h4>
                                    <p className="text-sm text-slate-600 italic">&ldquo;3 actions max. What moves the 30/60/90 plan forward?&rdquo;</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">Guarded Hours</h4>
                                    <p className="text-sm text-slate-600 italic">&ldquo;1 block daily. Where is AI/Slack/Meetings banned?&rdquo;</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { rule: 'Draft before prompting', desc: "Don't open ChatGPT until you've written your first pass. Keeps AI as refiner, not author.", icon: 'brain' as const },
                            { rule: 'No infinite loops', desc: "If you've revised a doc 3+ times with AI, stop. You're in oracle mode.", icon: 'signal' as const },
                            { rule: 'Protected thinking time', desc: "Block 90 minutes daily with no Slack, no AI, no input. Just build.", icon: 'eyeOff' as const },
                        ].map((item, i) => (
                            <div key={i} className="glass-panel p-8 rounded-[2rem] border-slate-200 group hover:border-indigo-500/30 transition-all">
                                <div className="flex gap-6 items-start">
                                    <div className="mt-1 h-10 w-10 shrink-0 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                                        <Icon name={item.icon === 'rotate' as any ? 'signal' : item.icon} size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif italic">Rule {i + 1}: {item.rule}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Footer CTA */}
            <section className="py-24 md:py-40 bg-slate-950 text-white relative overflow-hidden text-center border-t border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.1),transparent)] pointer-events-none" />
                <Section className="relative z-10">
                    <div className="mb-12 inline-flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl font-bold font-serif italic mb-6 tracking-tight">Ready to build yours?</h2>
                        <p className="text-slate-400 uppercase text-[10px] font-bold tracking-[0.4em] mb-12">Generated in 2 minutes &bull; Verifiable Leverage</p>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <Link
                            href={ROUTES.START}
                            className="inline-flex h-20 items-center justify-center rounded-[2rem] bg-indigo-600 px-16 text-2xl font-bold text-white transition-all hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95"
                        >
                            Generate My Plan
                        </Link>
                        <Link
                            href="/#pricing"
                            className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest border-b border-slate-800 pb-1"
                        >
                            See Detailed Pricing
                        </Link>
                    </div>

                    <div className="mt-24 p-10 rounded-[3rem] bg-white/5 border border-white/10 max-w-2xl mx-auto backdrop-blur-sm group hover:border-white/20 transition-all">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Want the templates behind this plan?</h4>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                            <strong>Suite Unlock ($39)</strong> includes copyable frameworks, prompt chains, and export-ready briefs for <span className="text-white font-bold italic underline underline-offset-4 decoration-indigo-500">40+ professional roles.</span>
                        </p>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            One-time purchase &bull; Lifetime updates
                        </div>
                    </div>
                </Section>
            </section>

            <footer className="bg-slate-950 py-16 text-center border-t border-white/5 relative z-10">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                            <img src="/icon.svg" alt="Captori" className="h-3 w-3" style={{ filter: 'invert(1)' }} />
                        </div>
                        <span className="text-sm font-bold tracking-tighter text-white uppercase tracking-[0.2em]">{APP_NAME}</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">
                        &copy; {new Date().getFullYear()} &bull; {APP_NAME} &bull; Built for High Stakes
                    </p>
                </div>
            </footer>
        </main>
    );
}
