'use client';

import Link from 'next/link';
import { AILifePlanBriefing } from '@/components/AILifePlanBriefing';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics-client';
import { ROUTES } from '@/lib/brand';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Tooltip } from '@/components/ui/Tooltip';

export default function HomePage() {
  return (
    <main className="min-h-screen subtle-noise">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-10 pb-12 md:pt-16 md:pb-24">
        {/* Ambient Background - Adjusted for "Soft UI" depth */}
        <div className="absolute -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/10 blur-3xl opacity-60 mix-blend-multiply filter"></div>
        <div className="absolute top-20 right-20 -z-10 h-72 w-72 rounded-full bg-[hsl(var(--cta))]/10 blur-3xl opacity-60 mix-blend-multiply filter"></div>

        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 md:items-center">
          <div className="relative z-10">
            {/* Social Proof Badge - Premium Glass Style */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/40 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-md ring-1 ring-slate-900/5 transition-all hover:bg-white/60">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent font-bold">Free plan</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">~2 minutes</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">no login</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6 [text-wrap:balance]">
              AI is changing your role faster than your title.
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-600 md:text-xl font-medium">
              Not interview prep. Not a calendar optimizer. Get your <strong>Career Operating Plan</strong> to ship proof of value—no fluff.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-start gap-4">
              <Link
                href={ROUTES.START}
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 px-10 text-lg font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Calculate My Resilience Index
                  <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/example"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white/50 px-8 text-lg font-semibold text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:border-slate-300"
              >
                See a Sample Plan
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500 flex items-center gap-2">
              <Icon name="zap" size={16} className="text-amber-500" />
              Instant access after signup. No credit card required.
            </p>

            <div className="mt-16 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">What You’ll Get With Captori</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Personalized 30/60/90 Career Action Plan', tooltip: 'A structured plan that builds strength in your role and future opportunities.' },
                  { label: 'Exportable templates (Notion/Jira/Docs)', tooltip: 'Ready-to-use documents to help you start executing immediately.' },
                  { label: 'Success metrics & growth milestones', tooltip: 'Measurable targets to track your progress over the next 90 days.' },
                  { label: 'Priority skills and artifact map', tooltip: 'A prioritized list of actions that give you the greatest professional leverage.' },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Icon name="checkCircle" size={12} />
                    </div>
                    <Tooltip content={item.tooltip}>{item.label}</Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Floating Stack Layout */}
          <div className="relative isolate mt-10 md:mt-0">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-indigo-50 via-white to-emerald-50/50 rounded-full blur-3xl opacity-80"></div>

            {/* Main Career Operating Plan Briefing - Single Focus */}
            <Link href="/example" className="relative z-20 peer hover:-translate-y-2 transition-transform duration-500 max-w-lg block">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 blur-lg opacity-40"></div>
              <AILifePlanBriefing />

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 z-30 animate-bounce duration-[3000ms]">
                <div className="glass-panel rounded-2xl px-4 py-2 flex items-center gap-2 border-indigo-200/50 shadow-xl">
                  <div className="p-1 rounded-full bg-indigo-500 text-white">
                    <Icon name="professional" size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-900">Example Plan</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF: Trusted by */}
      <section className="border-y border-slate-200 bg-white/50 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200 font-sans">
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="sparkles" size={12} />)}
                </div>
                <p className="font-bold text-slate-900">78% of users shipped within 30 days</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-sm font-bold tracking-tight text-slate-400">USED BY LEADERSHIP IN:</span>
              <div className="flex items-center gap-6">
                <div className="font-bold text-slate-400">PRODUCT COLLECTIVE</div>
                <div className="font-bold text-slate-400 uppercase tracking-tighter">LENNY&rsquo;S COHORTS</div>
                <div className="font-bold text-slate-400">REFORGE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET SHIFT: Reddit-inspired insights */}
      <section className="px-6 py-32 md:py-48 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Market Reality"
            title="What’s changing in the AI job market"
            subtitle="AI doesn’t erase jobs first—it erases the expertise barrier for newcomers. Your goal is to move your barrier upstream."
          />

          <div className="mt-24 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <Icon name="zap" size={24} className="text-amber-500" />,
                title: "Applications are cheap",
                desc: "Generic volume is at an all-time high. If anyone can apply to 100 jobs in a click, the value of an application drops to zero. You win by being the candidate who understands the strategy, not just the tools."
              },
              {
                icon: <Icon name="audit" size={24} className="text-[hsl(var(--primary))]" />,
                title: "Work is being compressed",
                desc: "AI handles the first-pass 'slop'—the reports, the tickets, the rote labor. Humans are being judged on higher-leverage discretion: judgment, domain ownership, and systems thinking."
              },
              {
                icon: <Icon name="locked" size={24} className="text-indigo-500" />,
                title: "Interviews got stricter",
                desc: "Hiring teams are spotting GPT-polished answers instantly. Interviews are shifting toward 'failure-mode' probing: what went wrong, what trade-offs did you make, and why was your judgment better than the model?"
              }
            ].map((card, i) => (
              <div key={i} className="glass-panel rounded-3xl p-10 hover:shadow-xl transition-all duration-300">
                <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-serif mb-4 italic">{card.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">{card.desc}</p>
                {i === 1 && (
                  <p className="text-[13px] font-bold text-slate-900 border-t border-slate-200 pt-6 mt-auto italic leading-relaxed">
                    AI doesn’t erase jobs first—it erases the parts of jobs that used to prove expertise.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 mx-auto max-w-3xl p-10 rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm text-center">
            <h4 className="text-lg font-bold text-slate-900 mb-3 font-serif italic">No hopium. No doom.</h4>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              We don’t predict outcomes. We build leverage.<br />
              You can’t control macro incentives—but you can control your <strong>discretion</strong>, your <strong>proof</strong>, and your <strong>next 90 days.</strong>
            </p>
            <p className="inline-flex px-4 py-1.5 rounded-full bg-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] text-white">Proof over promise—then log off.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: timeline */}
      <section className="px-6 py-32 md:py-48 relative overflow-hidden" id="how">
        {/* Ambient Background */}
        <div className="absolute top-1/2 left-1/4 -z-10 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-[hsl(var(--cta))]/5 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="How it works"
            subtitle="Most AI tools optimize schedules or help you sound polished. Captori is different: it’s a leverage plan built to help you ship proof of value."
          />

          <div className="mx-auto mt-24 grid max-w-5xl gap-8">
            {[
              {
                step: '1',
                title: 'Answer a few questions',
                desc: 'Role, strengths, constraints—and the move you’re aiming at next.',
              },
              {
                step: '2',
                title: 'AI generates your plan',
                desc: 'Your Resilience Index plus the leverage drivers behind it, so you can sanity‑check the logic.',
              },
              {
                step: '3',
                title: 'Export & start implementing',
                desc: 'A 30/60/90 build sequence with proof artifacts you can paste into Jira, Notion, or Slack.',
              },
              {
                step: '4',
                title: 'See measurable progress',
                desc: 'Follow the success metrics and milestones to build your moat alongside your day job.',
              },
            ].map((s) => (
              <div key={s.step} className="group glass-panel rounded-3xl p-8 hover:border-[hsl(var(--primary))]/30 transition-all cursor-default relative overflow-hidden">
                <div className="flex items-start gap-8 relative z-10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]/10 text-xl font-bold text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-colors">
                    {s.step}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-2xl font-bold text-slate-900 font-serif mb-3 italic">{s.title}</h3>
                    <p className="text-lg text-slate-600 leading-relaxed text-pretty">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link
              href="/start"
              className="inline-flex h-16 items-center justify-center rounded-2xl bg-[hsl(var(--cta))] px-10 text-xl font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 shadow-xl shadow-emerald-500/20 transition-all hover:translate-y-[-2px] active:scale-[0.98]"
            >
              Build My Resilience Index
            </Link>
          </div>
        </div>
      </section>

      {/* STRATEGIC PROOF: Visual artifact preview */}
      <section className="px-6 py-32 md:py-48 overflow-hidden bg-white" id="proof">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="The Output"
            title="Proof‑ready outputs"
            subtitle="Generic advice is slop. Captori gives you specific artifacts—Risk Registers, Stakeholder Memos, and Build Plans—ready to paste into Jira, Notion, or Slack."
          />

          <div className="mt-24 grid gap-12 lg:grid-cols-3">
            {/* AI Leverage Playbook Highlighter (Full Width) */}
            <div className="lg:col-span-3 mb-4 p-8 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-center">
              <p className="text-base font-bold text-indigo-900 tracking-tight">
                <span className="bg-indigo-600 text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase mr-3">New</span>
                AI Leverage Playbook: Role-specific workflows that turn AI into proof—fast, grounded, and verifiable.
              </p>
            </div>

            {/* Artifact 1: Resilience Index */}
            <div className="rounded-[2.5rem] bg-slate-50 p-10 ring-1 ring-slate-200 shadow-sm flex flex-col relative group">
              <div className="absolute top-10 right-10">
                <details className="relative">
                  <summary className="list-none cursor-pointer text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] border border-slate-200 px-3 py-1 rounded-full bg-white">
                    Methodology
                  </summary>
                  <div className="absolute right-0 mt-3 w-64 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xl text-[11px] text-slate-500 leading-relaxed z-30">
                    <p className="font-bold text-slate-900 mb-2">How we calculate:</p>
                    We weigh <span className="text-indigo-600 font-bold">Discretion</span> (accountable decisions) vs <span className="text-slate-900 font-bold">Volume</span> (repeatable task surface) against current LLM benchmarks.
                  </div>
                </details>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-10 font-sans">A. RESILIENCE INDEX (THE DATA)</p>
              <div className="flex items-center justify-between mb-10">
                <div className="text-8xl font-bold text-slate-900 font-serif leading-none tracking-tight italic">74%</div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">74% RESILIENT</div>
                  <div className="text-[10px] text-slate-500 font-medium italic">relative strength</div>
                </div>
              </div>
              <div className="space-y-6 flex-1">
                <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20" />
                  <p className="text-[15px] leading-relaxed text-slate-700 font-medium italic font-serif">
                    &ldquo;Judgment + stakeholder complexity is your moat. Rote execution is the risk surface.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-6 text-[11px] font-bold tracking-tight text-slate-500 bg-slate-100/50 p-4 rounded-xl border border-slate-200/50">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-500"></span> Discretion <span className="text-slate-900">8/10</span></span>
                  <span className="text-slate-300 text-lg font-light">|</span>
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-400"></span> Repetition <span className="text-slate-900">4/10</span></span>
                </div>

                {/* Pattern Matching Section */}
                <div className="mt-8 pt-8 border-t border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Typical Benchmarks:</p>
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div className="flex justify-between px-3 py-2 rounded-xl bg-white border border-slate-100">
                      <span className="text-slate-500">Ops / Coordinator</span>
                      <span className="font-bold text-amber-600">30-40%</span>
                    </div>
                    <div className="flex justify-between px-3 py-2 rounded-xl bg-white border border-slate-100">
                      <span className="text-slate-500">Staff / Principal</span>
                      <span className="font-bold text-emerald-600">85-95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Artifact 2: Leverage Map */}
            <div className="rounded-[2.5rem] bg-[#f8faff] p-10 ring-1 ring-indigo-50 shadow-sm relative overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-10 font-sans">B. LEVERAGE MAP</p>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">COMMODITIZING</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">COMPOUNDING</div>
                </div>
                <div className="space-y-4">
                  {[
                    { left: 'Status Reports', right: 'Vendor Strategy' },
                    { left: 'Meeting Agendas', right: 'Risk Mitigation' },
                    { left: 'Drafting RFPs', right: 'Logic Validation' },
                  ].map((pair, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-200/30 text-[11px] text-slate-500 font-medium text-center border border-slate-200/10">
                        {pair.left}
                      </div>
                      <div className="p-4 rounded-xl bg-white shadow-sm text-[11px] font-bold text-indigo-700 text-center border border-indigo-100">
                        {pair.right}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* David Autor Insights Callout */}
              <div className="mt-10 p-6 rounded-2xl bg-indigo-600 text-white shadow-lg overflow-hidden relative group">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 h-20 w-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-indigo-100">Market Insight</h4>
                <p className="text-[13px] font-bold leading-snug mb-4 italic font-serif">
                  &ldquo;Good vs. Bad Exposure&rdquo;: AI replaces tasks that lower the barrier for entrants, but compounds tasks that require elite judgment.
                </p>
                <div className="border-t border-indigo-400/50 pt-4">
                  <p className="text-[11px] font-medium leading-relaxed text-indigo-50">
                    <strong>Aim for good exposure:</strong> AI removes overhead and amplifies your judgment. <strong>Avoid bad exposure:</strong> you become the operator of a workflow that gets standardized.
                  </p>
                </div>
              </div>
            </div>

            {/* Artifact 3: Pressure Test */}
            <div className="rounded-[2.5rem] bg-[#f9fffb] p-10 ring-1 ring-emerald-100 shadow-sm flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-10 font-sans">C. PRESSURE-TEST PROMPTS (FAILURE-MODE)</p>
              <div className="space-y-8 flex-1">
                <div className="text-xl font-bold text-slate-800 leading-snug font-serif italic">
                  &ldquo;Explain a high-stakes decision where you intentionally overrode the model&rsquo;s recommendation.&rdquo;
                </div>
                <div className="p-8 rounded-2xl bg-white border border-emerald-100 shadow-sm relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/10" />
                  <p className="text-xs text-emerald-900 font-bold mb-5 uppercase tracking-widest">Senior-alignment follow-ups:</p>
                  <ul className="space-y-4">
                    {[
                      'What was the context the model lacked?',
                      'How did you verify your choice?',
                      'What was the outcome delta?'
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 text-[13px] text-emerald-800 font-medium leading-snug">
                        <div className="h-5 w-5 shrink-0 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                          <Icon name="check" size={12} className="text-emerald-500" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-emerald-100/50">
                <p className="text-sm font-bold text-emerald-700 leading-relaxed italic font-serif">
                  &ldquo;These are designed to help you sound senior under pressure—not just polished on paper.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Sanitized Plan Preview - Solving the "Proof Problem" */}
          <div className="mt-16 mx-auto max-w-4xl p-1 rounded-[2.5rem] bg-slate-100/50 ring-1 ring-slate-200">
            <Link href="/example" className="bg-white rounded-[2rem] shadow-sm overflow-hidden border border-slate-200 block hover:border-indigo-300 transition-colors">
              <div className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                  <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                  <div className="h-2 w-2 rounded-full bg-slate-300"></div>
                  <span className="ml-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sanitized_Output_v1.pdf</span>
                </div>
                <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hidden md:block">
                  View full example →
                </div>
              </div>
              <div className="p-10 space-y-8 font-mono text-[11px] text-slate-500 leading-relaxed">
                <div className="space-y-2">
                  <p className="text-slate-900 font-bold text-xs font-serif italic"># 1. THE 30-DAY INITIATIVE: EXPOSURE REVERSAL</p>
                  <p>Target: Standardize &ldquo;Drafting RFPs&rdquo; workflow using AI-grounded protocol.</p>
                  <p>Artifact: [Vendor Selection Matrix Template] + [Judgment Log].</p>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="space-y-4">
                  <p className="text-slate-900 font-bold text-xs font-serif italic"># 2. THE 60-DAY PROOF: STAKEHOLDER MEMO</p>
                  <div className="bg-slate-50 p-4 rounded-lg border-l-2 border-indigo-500 text-slate-600 italic">
                    &ldquo;Context: CTO requested 10% infra cut. Trade-offs: High-latency edge cases vs maintenance cost...&rdquo;
                  </div>
                  <p className="text-indigo-600 font-bold uppercase tracking-tighter">[Unlocked] 1-page executive brief layout included.</p>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="space-y-2">
                  <p className="text-slate-900 font-bold text-xs font-serif italic"># 3. THE 90-DAY TRAJECTORY: DISCRETION LADDER</p>
                  <p>Outcome: Transition 40% of rote tasks to system-of-record. Reallocate 10 hours/week to Risk Mitigation.</p>
                </div>
              </div>
            </Link>
            <div className="mt-8 text-center p-8 bg-slate-50/50 rounded-3xl border border-slate-200/50 backdrop-blur-sm">
              <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-[0.2em]">Built by professionals for professionals.</p>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
                Captori is built by <strong>Villains At Large</strong>, a product strategy collective specializing in AI operational capability. We build tools that help senior leaders stay grounded in high-stakes environments.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Modular System Overview */}
      <section className="px-6 py-32 md:py-48 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title="A Modular Operating System"
            subtitle="Your Career Operating Plan has four modules."
          />

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="glass-panel p-10 rounded-[2.5rem] border-slate-200 relative overflow-hidden group">
              <div className="absolute -top-6 -right-6 h-32 w-32 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8">
                  <Icon name="professional" size={24} className="text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif italic">Module 1: Career</h3>
                <p className="text-base text-slate-600 mb-8 leading-relaxed">(Throughput) Plan your workflow for AI-leveraged resilience.</p>
                <Link href="/assessment" onClick={() => trackEvent('module_selected', { module: 'career' })} className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-4 transition-all uppercase tracking-widest">
                  Start <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </div>

            {/* Module 2 */}
            <div className="glass-panel p-10 rounded-[2.5rem] border-indigo-200 bg-white ring-1 ring-indigo-500/10 relative overflow-hidden group">
              <div className="absolute top-6 right-8">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Live</span>
              </div>
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 shadow-sm flex items-center justify-center mb-8">
                  <Icon name="eyeOff" size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif italic">Module 2: Attention</h3>
                <p className="text-base text-slate-600 mb-8 leading-relaxed">(Input) A personal protocol to filter slop and protect clean thought.</p>
                <Link href="/attention" onClick={() => trackEvent('module_selected', { module: 'attention' })} className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-4 transition-all uppercase tracking-widest">
                  Start <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </div>

            {/* Module 3 */}
            <div className="glass-panel p-10 rounded-[2.5rem] border-slate-200 relative overflow-hidden group">
              <div className="absolute top-6 right-8">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Live</span>
              </div>
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-8">
                  <Icon name="shield" size={24} className="text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif italic">Module 3: Identity</h3>
                <p className="text-base text-slate-600 mb-8 leading-relaxed">(Output) Turn results into a verifiable proof archive.</p>
                <Link href="/identity" onClick={() => trackEvent('module_selected', { module: 'identity' })} className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-4 transition-all uppercase tracking-widest">
                  Start <Icon name="arrowRight" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-32 md:py-48 bg-slate-50/50" id="faq">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="FAQ" subtitle="Direct answers. Clear constraints." />

          <div className="mt-16 space-y-4">
            {[
              {
                title: "Pre-Purchase (Why Buy)",
                questions: [
                  { q: 'How is this different from generic career coaching?', a: 'Career coaching is $200+/hour for human advice. Captori gives you a personalized 30/60/90 plan for $39, based on your specific role architecture. You get concrete proof artifacts to build, not just "work on your presence."' },
                  { q: 'Can I get a refund if it doesn\'t help?', a: 'Yes. If you execute the plan and don\'t see value, email us within 30 days. We only ask that you show us you actually tried (started building the proof artifacts).' },
                  { q: 'Do I need to quit my job to use this?', a: 'No. The plan is designed to execute alongside a full-time job. Each milestone is 2-5 hours of work. The 30/60/90 structure fits into your existing schedule.' },
                  { q: 'How long does it take to see results?', a: 'If you execute: 30 days for your first artifact, 60 days to templatize judgment, 90 days for portfolio-ready evidence. If you don\'t execute: zero results.' },
                  { q: 'Is this just for people worried about losing their jobs?', a: 'No. This is for mid-career professionals who want to build leverage and own their positioning. Whether you\'re up for promotion, changing roles, or staying relevant—the plan helps you build proof of strategic value.' },
                ]
              },
              {
                title: "Post-Purchase (Getting Started)",
                questions: [
                  { q: 'I got my plan, now what?', a: 'Open the PDF. Go to page 2: "This Week." Your first action is in the 30-day section: build your decision framework. Block 2 hours this week to document how you make trade-offs.' },
                  { q: 'How do I use this with my existing tools?', a: 'Your plan is tool-agnostic. Export milestones to Notion (create a page with timeline) or Todoist (add as projects). The plan tells you WHAT to build; your tools track WHEN.' },
                  { q: 'Can I customize my plan?', a: 'The plan is personalized based on your assessment. If your role changes, retake it. You can adapt milestones to your specific context—e.g., "Build a framework" becomes "Build How I Score Features doc."' },
                ]
              },
              {
                title: "Technical Issues",
                questions: [
                  { q: 'I didn\'t receive my plan email', a: 'Check your spam. If not there, email support@captori.com with your Stripe receipt. We\'ll resend within 24 hours.' },
                  { q: 'Can I download this as a PDF?', a: 'Yes. Your plan is delivered as a PDF attachment. Save it to your drive/cloud storage for permanent access.' },
                  { q: 'My Resilience Index seems wrong. Can I retake?', a: 'Yes. Go to captori.com/start and retake it. Your score is derived from your inputs (task mix, discretion, complexity), so different answers = different score.' },
                ]
              },
              {
                title: "Payment & Billing",
                questions: [
                  { q: 'Is this a subscription?', a: 'No. One-time payment ($39 or $99). No recurring charges.' },
                  { q: 'Can I upgrade from $39 to $99?', a: 'Yes. Email support@captori.com. We\'ll send you a payment link for the $60 difference.' },
                  { q: 'Can I buy this for my team?', a: 'Yes. For 5+ team members, email support@captori.com for team pricing. Each person gets their own personalized assessment and plan.' },
                ]
              },
              {
                title: "Product & Roadmap",
                questions: [
                  { q: 'When will Module 4 (Capacity) be released?', a: 'Module 4 (Capacity - Recovery plan for sustainable execution) is scheduled for Q2 2025. All Suite/Executive purchases include it at no extra charge.' },
                  { q: 'Can I get updates to my plan as AI changes?', a: 'We update the AI job market analysis quarterly. Existing customers can purchase an annual refresh for $29. We\'ll email you when updates available.' },
                ]
              },
              {
                title: "Philosophy & Approach",
                questions: [
                  { q: 'What is "Grounded AI"?', a: 'Our approach: (1) Draft before prompting, (2) No infinite loops (stop after 3+ revisions), (3) Protected thinking time (90 min daily with no inputs). AI as a tool, not an oracle.' },
                  { q: 'Why no productivity features?', a: 'Intentional. You already have productivity tools. We focus on WHAT to build (strategic plan), not HOW to track it (Notion/Todoist).' },
                ]
              }
            ].map((section: { title: string; questions: { q: string; a: string }[] }) => (
              <div key={section.title} className="mb-12">
                <h3 className="text-xl font-bold text-slate-900 mb-6 px-4">{section.title}</h3>
                <div className="space-y-4">
                  {section.questions.map((item) => (
                    <details key={item.q} className="group glass-panel rounded-2xl p-6 open:ring-1 open:ring-indigo-500/20">
                      <summary className="cursor-pointer list-none flex items-center justify-between text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.q}
                        <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 group-open:rotate-180 transition-transform">
                          <Icon name="chevronDown" size={16} />
                        </span>
                      </summary>
                      <p className="mt-4 text-base text-slate-600 leading-relaxed pr-8">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* Grounded Section */}
      <section className="px-6 py-32 md:py-48 bg-[#0a1024] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(79,70,229,0.15),transparent)]" />
        <div className="mx-auto max-w-5xl relative">
          <SectionTitle
            title="Grounded in the AI Era"
            subtitle="We help you act, then log off. Keep your agency in a world of infinite noise."
            dark
          />

          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              {[
                { title: 'Think mode: user first', desc: 'AI is a tool to refine your judgment, not replace it.', icon: 'brain' as const },
                { title: 'Tool, not authority', desc: 'Avoid Oracle Mode. Showing uncertainty and requiring decisions.', icon: 'scale' as const },
                { title: 'Plans → actions → log off', desc: 'No infinite chat loops. Build your moat, then ship.', icon: 'time' as const },
              ].map((item) => (
                <div key={item.title} className="flex gap-8 items-start">
                  <div className="h-14 w-14 shrink-0 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
                    <Icon name={item.icon} size={24} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-3 font-serif italic tracking-tight">{item.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-1 rounded-[3rem] bg-indigo-500/10 border border-white/5 backdrop-blur-md">
              <div className="p-10 md:p-12 rounded-[2.5rem] bg-[#0f172a]/90 border border-white/10 shadow-2xl flex flex-col gap-6">
                <Link href="/attention" className="w-full h-16 inline-flex items-center justify-center bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all text-xl shadow-lg">
                  See Grounded Protocol
                </Link>
                <Link href="/start" className="w-full h-16 inline-flex items-center justify-center border-2 border-slate-700 text-white rounded-2xl font-bold hover:bg-white/5 transition-all text-xl">
                  Build My Resilience Index
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* TESTIMONIALS */}
      <section className="px-6 py-32 md:py-48 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="User Feedback"
            title="Trusted by early testers"
            subtitle="Professionals at top tech companies are using Captori to build leverage in the AI era."
          />
          <div className="mt-24 grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Captori helped me translate my 'product vibes' into a concrete roadmap that my manager actually respected.",
                author: "Senior PM",
                company: "Series B Fintech"
              },
              {
                quote: "The 30/60/90 plan wasn't just fluff. It gave me the exact Jira tickets I needed to ship my first AI-integrated feature.",
                author: "Engineering Lead",
                company: "Growth Stage SaaS"
              },
              {
                quote: "I was worried about AI replacement. Now I have a Resilience Plan that proves I'm the one owning the judgment.",
                author: "Product Designer",
                company: "Global Marketplace"
              }
            ].map((t, i) => (
              <div key={i} className="glass-panel rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-1 text-amber-500 mb-8">
                  {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="sparkles" size={12} />)}
                </div>
                <p className="text-xl text-slate-700 italic mb-10 font-serif leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-slate-100 pt-8 mt-auto">
                  <p className="font-bold text-slate-900 text-lg">{t.author}</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-32 md:py-48 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Choose the Plan That Fits Your Career Growth"
            subtitle="Simple, transparent pricing designed for professionals who want measurable progress — not just reports."
            eyebrow="Pricing"
          />

          <div className="mt-24 grid md:grid-cols-3 gap-8 md:items-stretch">
            {/* The Audit: FREE STARTER */}
            <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 font-serif italic mb-2">Free Starter</h3>
                <p className="text-base text-slate-500 font-medium italic leading-relaxed">Perfect for testing your AI leverage baseline. Includes Resilience Score & priority drivers report.</p>
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-10 font-serif tracking-tight">$0</div>
              <ul className="space-y-4 mb-10 flex-1">
                {['Resilience Index score', 'Top 3 automation drivers', 'Immediate 7-day moves'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-base text-slate-600">
                    <Icon name="check" size={18} className="text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                onClick={() => trackEvent('pricing_plan_click', { tier: 'free', location: 'landing_page' })}
                className="w-full h-14 inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-2xl transition-all"
              >
                Start for Free
              </Link>
              <p className="mt-6 text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest italic">No credit card required.</p>
            </div>

            {/* Strategic Operating Plan ($39) */}
            <div className="rounded-[2.5rem] border-2 border-[hsl(var(--primary))] bg-white p-10 flex flex-col shadow-2xl scale-105 relative z-10 transition-transform hover:scale-[1.07]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-[hsl(var(--primary))] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg">
                Most Popular
              </div>
              <div className="mb-8 pt-4">
                <h3 className="text-xl font-bold text-slate-900 font-serif italic mb-2">Strategic Operating Plan</h3>
                <p className="text-base text-emerald-700 font-medium italic leading-relaxed">The complete 30/60/90 leverage protocol for modern professionals.</p>
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-10 font-serif tracking-tight">$39</div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'Career: Resilience Index + 90-Day Build Sequence',
                  'Attention: Anti-slop filters & Deep Work protocols',
                  'Identity: Proof Portfolio setup & positioning thesis',
                  'Capacity: Burnout-proof recovery (Early Access)',
                  'Everything in Free',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-base text-slate-700 font-bold">
                    <Icon name="check" size={18} className="text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                onClick={() => {
                  trackEvent('pricing_plan_click', { tier: 'execution', location: 'landing_page' });
                  trackEvent('checkout_started', { tier: 'execution' });
                }}
                className="w-full h-14 inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 transition-all hover:translate-y-[-2px]"
              >
                Build My Operating Plan
              </Link>
              <p className="mt-6 text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest italic">Instant access after signup.</p>
            </div>

            {/* Executive Proof Suite ($99) */}
            <div className="rounded-[2.5rem] border border-indigo-200 bg-indigo-50/30 p-10 flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 font-serif italic mb-2">Executive Proof Suite</h3>
                <p className="text-base text-indigo-700 font-medium italic leading-relaxed">For Senior/Staff roles facing high-stakes reviews or career pivots.</p>
              </div>
              <div className="text-5xl font-bold text-slate-900 mb-10 font-serif tracking-tight">$99</div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'Failure-Mode Simulations: "Board-Ready" answers',
                  'The Proof Kit: Narrative architecture + templates',
                  'Interview Defense: Logic maps for high pressure',
                  'Executive Blueprint: Shareable PDF strategy',
                  'Everything in Strategic Operating Plan',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-base text-slate-600">
                    <Icon name="check" size={18} className="text-indigo-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                onClick={() => {
                  trackEvent('pricing_plan_click', { tier: 'executive', location: 'landing_page' });
                  trackEvent('checkout_started', { tier: 'executive' });
                }}
                className="w-full h-14 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all hover:translate-y-[-2px]"
              >
                Unlock Executive Suite
              </Link>
              <p className="mt-6 text-[11px] text-center text-slate-400 font-bold uppercase tracking-widest italic">Includes all future update logs.</p>
            </div>
          </div>

          <div className="mt-24 text-center italic text-slate-500 font-serif text-lg">
            &ldquo;Automation applies faster. Strategy wins offers.&rdquo;
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Icon name="sparkles" size={20} className="text-[hsl(var(--primary))]" />
            Operating Plan
          </div>
          <div className="flex items-center gap-6">
            <Link href="/start" className="hover:text-[hsl(var(--primary))] transition-colors">How it works</Link>
            <Link href="/example" className="hover:text-[hsl(var(--primary))] transition-colors">Example</Link>
            <Link href="/#pricing" className="hover:text-[hsl(var(--primary))] transition-colors">Pricing</Link>
          </div>
          <div>
            © {new Date().getFullYear()} Captori. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
