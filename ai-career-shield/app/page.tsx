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

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 [text-wrap:balance]">
              AI-Life Plan — Get Your Personalized Career Growth & Resilience Blueprint in Minutes.
            </h1>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-600 md:text-xl font-bold">
              Generate a 30/60/90 actionable strategy with measurable milestones, templates you can export, and a skill-proof pathway — no fluff.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-start gap-4">
              <Link
                href={ROUTES.START}
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 px-10 text-lg font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create My Plan Now — It Only Takes 2 Minutes
                  <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/example"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/50 px-8 py-4 text-lg font-bold text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:border-slate-300"
              >
                See Sample Plan
              </Link>
            </div>

            <div className="mt-12 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">What You’ll Get With Captori</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Personalized 30/60/90 Career Action Plan', tooltip: 'A structured plan that builds strength in your role and future opportunities.' },
                  { label: 'Exportable templates (Notion/Jira/Docs)', tooltip: 'Ready-to-use documents to help you start executing immediately.' },
                  { label: 'Success metrics & growth milestones', tooltip: 'Measurable targets to track your progress over the next 90 days.' },
                  { label: 'Priority skills and artifact map', tooltip: 'A prioritized list of actions that give you the greatest professional leverage.' },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2 text-sm font-medium text-slate-600">
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

            {/* Main AI-Life Plan Briefing - Single Focus */}
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
      <section className="px-6 py-24 md:py-32 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Market Reality"
            title="What’s changing in the AI job market"
            subtitle="AI doesn’t erase jobs first—it erases the expertise barrier for newcomers. Your goal is to move your barrier upstream."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
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
              <div key={i} className="glass-panel rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-900/5">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif mb-4">{card.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed mb-4">{card.desc}</p>
                {i === 1 && (
                  <p className="text-xs font-bold text-slate-900 border-t border-slate-200 pt-4 mt-auto italic">
                    AI doesn’t erase jobs first—it erases the parts of jobs that used to prove expertise.
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 mx-auto max-w-2xl p-6 rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm text-center">
            <h4 className="text-sm font-bold text-slate-900 mb-2">No hopium. No doom.</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              We don’t predict outcomes. We build leverage.<br />
              You can’t control macro incentives—but you can control your <strong>discretion</strong>, your <strong>proof</strong>, and your <strong>next 90 days.</strong>
            </p>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Proof over promise—then log off.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: timeline */}
      <section className="px-6 py-24 md:py-32 relative overflow-hidden" id="how">
        {/* Ambient Background */}
        <div className="absolute top-1/2 left-1/4 -z-10 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-[hsl(var(--cta))]/5 blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="How it works"
            subtitle="Most AI tools optimize schedules or help you sound polished. AI‑Life Plan is different: it’s a leverage plan—built for employed professionals who need a plan they can execute."
          />

          <div className="mx-auto mt-16 grid max-w-5xl gap-6">
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
              <div key={s.step} className="group glass-panel rounded-3xl p-8 hover:border-[hsl(var(--primary))]/30 transition-all cursor-default">
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[hsl(var(--primary))]/10 text-lg font-bold text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-colors">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif mb-2">{s.title}</h3>
                    <p className="text-base text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--cta))] px-8 py-4 text-lg font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 shadow-lg shadow-emerald-500/25 transition-all hover:translate-y-[-1px]"
            >
              Generate My AI‑Life Plan
            </Link>
          </div>
        </div>
      </section>

      {/* STRATEGIC PROOF: Visual artifact preview */}
      <section className="px-6 py-24 md:py-32 overflow-hidden bg-white" id="proof">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="The Output"
            title="Proof‑ready outputs"
            subtitle="Generic advice is slop. Captori gives you specific artifacts—Risk Registers, Stakeholder Memos, and Build Plans—ready to paste into Jira, Notion, or Slack."
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {/* AI Leverage Playbook Highlighter (Full Width) */}
            <div className="lg:col-span-3 mb-4 p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-center">
              <p className="text-sm font-bold text-indigo-900 tracking-tight">
                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] uppercase mr-2.5">New</span>
                AI Leverage Playbook: Role-specific workflows that turn AI into proof—fast, grounded, and verifiable.
              </p>
            </div>

            {/* Artifact 1: Resilience Index */}
            <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200 shadow-sm flex flex-col relative group">
              <div className="absolute top-8 right-8">
                <details className="relative">
                  <summary className="list-none cursor-pointer text-[9px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest border border-slate-200 px-2 py-0.5 rounded-full bg-white">
                    Methodology
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 p-3 rounded-xl bg-white border border-slate-200 shadow-xl text-[10px] text-slate-500 leading-relaxed z-30">
                    <p className="font-bold text-slate-900 mb-1">How we calculate:</p>
                    We weigh <span className="text-indigo-600 font-bold">Discretion</span> (accountable decisions) vs <span className="text-slate-900 font-bold">Volume</span> (repeatable task surface) against current LLM benchmarks.
                  </div>
                </details>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 font-sans">A. RESILIENCE INDEX (THE DATA)</p>
              <div className="flex items-center justify-between mb-8">
                <div className="text-7xl font-bold text-slate-900 font-serif leading-none tracking-tight">74%</div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">74% RESILIENT</div>
                  <div className="text-[10px] text-slate-500 font-medium italic">relative strength</div>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                  <p className="text-[13px] leading-relaxed text-slate-700 font-medium">
                    &ldquo;Judgment + stakeholder complexity is your moat. Rote execution is the risk surface.&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-bold tracking-tight text-slate-500 bg-slate-100/50 p-3 rounded-lg border border-slate-200/50">
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span> Discretion <span className="text-slate-900">8/10</span></span>
                  <span className="text-slate-300">|</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span> Repetition <span className="text-slate-900">4/10</span></span>
                </div>

                {/* Pattern Matching Section */}
                <div className="mt-6 pt-6 border-t border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Typical Benchmarks:</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="flex justify-between px-2 py-1.5 rounded bg-white border border-slate-100">
                      <span className="text-slate-500">Ops / Coordinator</span>
                      <span className="font-bold text-amber-600">30-40%</span>
                    </div>
                    <div className="flex justify-between px-2 py-1.5 rounded bg-white border border-slate-100">
                      <span className="text-slate-500">Staff / Principal</span>
                      <span className="font-bold text-emerald-600">85-95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Artifact 2: Leverage Map */}
            <div className="rounded-[2rem] bg-[#f8faff] p-8 ring-1 ring-indigo-50 shadow-sm relative overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-8 font-sans">B. LEVERAGE MAP</p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">COMMODITIZING</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">COMPOUNDING</div>
                </div>
                <div className="space-y-4">
                  {[
                    { left: 'Status Reports', right: 'Vendor Strategy' },
                    { left: 'Meeting Agendas', right: 'Risk Mitigation' },
                    { left: 'Drafting RFPs', right: 'Logic Validation' },
                  ].map((pair, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-xl bg-slate-200/30 text-[10px] text-slate-500 font-medium text-center">
                        {pair.left}
                      </div>
                      <div className="p-3 rounded-xl bg-white shadow-sm text-[10px] font-bold text-indigo-700 text-center">
                        {pair.right}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* David Autor Insights Callout */}
              <div className="mt-8 p-4 rounded-xl bg-indigo-600 text-white shadow-lg overflow-hidden relative group">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform" />
                <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1 text-indigo-100">Market Insight</h4>
                <p className="text-[11px] font-bold leading-tight mb-3">
                  &ldquo;Good vs. Bad Exposure&rdquo;: AI replaces tasks that lower the barrier for entrants, but compounds tasks that require elite judgment.
                </p>
                <div className="border-t border-indigo-400 pt-3">
                  <p className="text-[10px] font-medium leading-relaxed italic text-indigo-100">
                    <strong>Aim for good exposure:</strong> AI removes overhead and amplifies your judgment. <strong>Avoid bad exposure:</strong> you become the operator of a workflow that gets standardized.
                  </p>
                </div>
              </div>
            </div>

            {/* Artifact 3: Pressure Test */}
            <div className="rounded-[2rem] bg-[#f9fffb] p-8 ring-1 ring-emerald-100 shadow-sm flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-8 font-sans">C. PRESSURE-TEST PROMPTS (FAILURE-MODE)</p>
              <div className="space-y-6 flex-1">
                <div className="text-[15px] font-bold text-slate-800 leading-snug">
                  &ldquo;Explain a high-stakes decision where you intentionally overrode the model&rsquo;s recommendation.&rdquo;
                </div>
                <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                  <p className="text-[12px] text-emerald-900 font-bold mb-4 leading-tight">Senior-alignment follow-ups:</p>
                  <ul className="space-y-3">
                    {[
                      'What was the context the model lacked?',
                      'How did you verify your choice?',
                      'What was the outcome delta?'
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-[11px] text-emerald-800 font-medium leading-tight">
                        <div className="h-4 w-4 shrink-0 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                          <Icon name="check" size={10} className="text-emerald-500" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-emerald-100/50">
                <p className="text-[11px] font-bold text-emerald-700 leading-relaxed italic">
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
      <section className="px-6 py-24 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="A Modular Operating System" subtitle="Your AI‑Life Plan has four modules." />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="glass-panel p-8 rounded-3xl border-slate-200 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  <Icon name="professional" size={20} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Module 1: Career</h3>
                <p className="text-sm text-slate-500 mb-6">(Throughput) Plan your workflow for AI-leveraged resilience.</p>
                <Link href="/assessment" onClick={() => trackEvent('module_selected', { module: 'career' })} className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all">
                  Start <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>

            {/* Module 2 */}
            <div className="glass-panel p-8 rounded-3xl border-indigo-200 bg-white ring-1 ring-indigo-500/10 relative overflow-hidden group">
              <div className="absolute top-4 right-6">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Live</span>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-indigo-600 shadow-sm flex items-center justify-center mb-6">
                  <Icon name="eyeOff" size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Module 2: Attention</h3>
                <p className="text-sm text-slate-500 mb-6">(Input) A personal protocol to filter slop and protect clean thought.</p>
                <Link href="/attention" onClick={() => trackEvent('module_selected', { module: 'attention' })} className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all">
                  Start <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>

            {/* Module 3 */}
            <div className="glass-panel p-8 rounded-3xl border-slate-200 relative overflow-hidden group">
              <div className="absolute top-4 right-6">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Live</span>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  <Icon name="shield" size={20} className="text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Module 3: Identity</h3>
                <p className="text-sm text-slate-500 mb-6">(Output) Turn results into a verifiable proof archive.</p>
                <Link href="/identity" onClick={() => trackEvent('module_selected', { module: 'identity' })} className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all">
                  Start <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>

            {/* Module 4 (New) - Hidden until launch per review */}
            {/* <div className="glass-panel p-8 rounded-3xl border-amber-200 bg-amber-50/20 relative overflow-hidden group col-span-1 md:col-span-3">
              <div className="absolute top-4 right-6">
                <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Capacity (Sustain layer)</span>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Module 4: Capacity</h3>
                  <p className="text-sm text-slate-500 max-w-2xl">(Recovery) Design your week so you can build signal without burning out. Protect energy and ship consistently.</p>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-100 px-6 py-3 rounded-xl opacity-70 cursor-not-allowed">
                  Notify me <Icon name="locked" size={14} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 md:py-32">
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
      </section>

      {/* Grounded Section */}
      <section className="px-6 py-28 md:py-40 bg-[#0a1024] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(79,70,229,0.15),transparent)]" />
        <div className="mx-auto max-w-5xl relative">
          <SectionTitle
            title="Grounded in the AI Era"
            subtitle="We help you act, then log off. Keep your agency in a world of infinite noise."
            dark
          />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              {[
                { title: 'Think mode: user first', desc: 'AI is a tool to refine your judgment, not replace it.', icon: 'brain' as const },
                { title: 'Tool, not authority', desc: 'Avoid Oracle Mode. Showing uncertainty and requiring decisions.', icon: 'scale' as const },
                { title: 'Plans → actions → log off', desc: 'No infinite chat loops. Build your moat, then ship.', icon: 'time' as const },
              ].map((item) => (
                <div key={item.title} className="flex gap-6 items-start">
                  <div className="h-12 w-12 shrink-0 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
                    <Icon name={item.icon} size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 font-serif italic tracking-tight">{item.title}</h3>
                    <p className="text-slate-400 text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-[2.5rem] bg-indigo-500/5 border border-white/5 backdrop-blur-md">
              <div className="p-8 md:p-10 rounded-[2rem] bg-[#0f172a]/80 border border-white/10 shadow-2xl flex flex-col gap-5">
                <Link href="/attention" className="w-full px-8 py-5 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-all text-center text-lg shadow-lg">
                  See Grounded Protocol
                </Link>
                <Link href="/start" className="w-full px-8 py-5 border-2 border-slate-700 text-white rounded-2xl font-bold hover:bg-white/5 transition-all text-center text-lg">
                  Generate My AI‑Life Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="User Feedback"
            title="Trusted by early testers"
            subtitle="Professionals at top tech companies are using Captori to build leverage in the AI era."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <div key={i} className="glass-panel rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-0.5 text-amber-500 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="sparkles" size={12} />)}
                </div>
                <p className="text-lg text-slate-700 italic mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-t border-slate-100 pt-6">
                  <p className="font-bold text-slate-900">{t.author}</p>
                  <p className="text-sm text-slate-500">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-serif">
              Simple, outcome-based pricing
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              One-time purchase. Instantly generate your strategy and begin your build.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* The Audit: FREE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Free</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium text-slate-600 italic">AI resilience basics, score & priorities.</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-6">$0</div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Resilience Index score', 'Top 3 automation drivers', 'Immediate 7-day moves'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <Icon name="check" size={16} className="text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                onClick={() => trackEvent('pricing_plan_click', { tier: 'free', location: 'landing_page' })}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-center transition"
              >
                Start Free
              </Link>
              <p className="mt-4 text-[10px] text-center text-slate-400 italic">Diagnose your risk in 2 minutes.</p>
            </div>

            {/* AI-Life Plan (Standard): $39 */}
            <div className="rounded-3xl border-2 border-[hsl(var(--primary))] bg-white p-8 flex flex-col shadow-xl scale-105 relative z-10">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[hsl(var(--primary))] text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Standard</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium text-emerald-700 italic">Full personalized AI-Life Plan + exports.</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-6">$39</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Full 30/60/90 Career Build Plan',
                  'Grounded Protocol (Attention & Recovery)',
                  'Exportable templates (Notion/Jira)',
                  'Identity Proofing Kit',
                  'Everything in Free',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <Icon name="check" size={16} className="text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                onClick={() => {
                  trackEvent('pricing_plan_click', { tier: 'execution', location: 'landing_page' });
                  trackEvent('checkout_started', { tier: 'execution' });
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-center shadow-lg transition"
              >
                Get Full Plan
              </Link>
              <p className="mt-4 text-[10px] text-center text-slate-400">One-time purchase. Build your moat today.</p>
            </div>

            <div className="rounded-3xl border border-indigo-200 bg-indigo-50/30 p-8 flex flex-col hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Executive</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium text-indigo-700 italic">Advanced growth scenarios + 1:1 guidance.</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-6">$99</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Everything in Standard',
                  'Executive Blueprint (Share-ready PDF)',
                  'Pressure‑test simulations (Failure-mode)',
                  'Priority artifact audits',
                  '1:1 implementation guidance sync',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <Icon name="check" size={16} className="text-indigo-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/start"
                onClick={() => {
                  trackEvent('pricing_plan_click', { tier: 'executive', location: 'landing_page' });
                  trackEvent('checkout_started', { tier: 'executive' });
                }}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-center transition"
              >
                Go Executive
              </Link>
              <p className="mt-4 text-[10px] text-center text-slate-400">One-time purchase. Includes all future update logs.</p>
            </div>
          </div>

          <div className="mt-16 text-center italic text-slate-500">
            &ldquo;Automation applies faster. Strategy wins offers.&rdquo;
          </div>
        </div>
      </section >

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Icon name="sparkles" size={20} className="text-[hsl(var(--primary))]" />
            AI‑Life Plan
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-slate-900 transition font-medium">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-900 transition font-medium">Terms</Link>
            <a href="mailto:support@captori.com" className="hover:text-slate-900 transition font-medium">Support</a>
          </div>
          <p>© 2026 Captori. Built for strategic resilient professionals.</p>
        </div>
      </footer>
    </main >
  );
}
