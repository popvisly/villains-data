'use client';

import Link from 'next/link';
import { AILifePlanBriefing } from '@/components/AILifePlanBriefing';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics-client';
import { APP_NAME, APP_PRODUCT, ROUTES } from '@/lib/brand';

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary))] shadow-sm shadow-indigo-500/20">
            {/* Capture-mark app icon */}
            <img src="/icon.svg" alt="Captori" className="h-5 w-5 text-[hsl(var(--primary-foreground))]" style={{ filter: 'invert(1)' }} />
          </div>
          <div className="leading-tight">
            <div className="text-xl font-bold tracking-tighter text-slate-900">{APP_NAME}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{APP_PRODUCT}</div>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/start" className="hover:text-[hsl(var(--primary))] transition-colors">
            How it works
          </Link>
          <Link href="/example" className="hover:text-[hsl(var(--primary))] transition-colors">
            Example
          </Link>
          <Link href="#pricing" className="hover:text-[hsl(var(--primary))] transition-colors">
            Pricing
          </Link>
          <Link
            href="/start"
            className="rounded-xl bg-[hsl(var(--cta))] px-5 py-2.5 font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 transition-all shadow-sm shadow-emerald-500/20"
          >
            Generate My Plan
          </Link>
        </nav>

        <div className="md:hidden">
          <Link
            href="/start"
            className="rounded-xl bg-[hsl(var(--cta))] px-4 py-2 text-sm font-bold text-[hsl(var(--cta-foreground))]"
          >
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ eyebrow, title, subtitle, dark }: { eyebrow?: string; title: string; subtitle?: string; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className={`mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${dark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'}`}>
          {eyebrow}
        </div>
      ) : null}
      <h2 className={`text-balance text-4xl font-bold tracking-tight md:text-5xl font-serif ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      {subtitle ? <p className={`mt-5 text-pretty text-lg leading-relaxed md:text-xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p> : null}
    </div>
  );
}

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
              AI is changing your role faster than your title.
            </h1>
            <div className="mb-10 flex flex-wrap gap-3">
              {[
                { label: 'Not interview prep', icon: 'zap' as const, color: 'text-indigo-600', border: 'border-indigo-100', bg: 'bg-indigo-50/30' },
                { label: 'Not a calendar optimizer', icon: 'locked' as const, color: 'text-slate-600', border: 'border-slate-200', bg: 'bg-slate-50/50' },
                { label: 'Not a habit tracker', icon: 'eyeOff' as const, color: 'text-amber-700', border: 'border-amber-100', bg: 'bg-amber-50/40' },
              ].map((item) => (
                <span key={item.label} className={`inline-flex items-center gap-2.5 rounded-2xl border ${item.border} ${item.bg} px-4 py-2.5 text-[13px] font-bold ${item.color} shadow-sm backdrop-blur-sm transition-all hover:bg-white`}>
                  <Icon name={item.icon} size={14} className="opacity-70" />
                  {item.label}.
                </span>
              ))}
            </div>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-600 md:text-xl font-bold italic">
              Stop guessing. Start building your moat.
            </p>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-500 md:text-xl">
              Get an operational <strong>30/60/90 plan</strong> you can execute <strong>alongside a full‑time job.</strong>
            </p>
            <ul className="mt-10 space-y-4 text-base text-slate-700">
              {[
                { title: 'Leverage Map', desc: 'what’s compounding vs commoditizing' },
                { title: 'Build Plan', desc: '30/60/90 sequence + proof artifacts' },
                { title: 'Grounded Protocol', desc: 'plans → actions → log off' },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3 group">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-colors">
                    <Icon name="checkCircle" size={14} />
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors">
                    <strong className="text-slate-900">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 mb-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Strategic operating plan. Built for leverage.
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-start gap-4">
              <Link
                href={ROUTES.START}
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 px-10 text-lg font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Generate My AI‑Life Plan
                  <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="/example"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/50 px-8 py-4 text-lg font-bold text-slate-600 backdrop-blur-sm transition-all hover:bg-white hover:border-slate-300"
              >
                See Example
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500 flex items-center gap-2">
              <Icon name="locked" size={16} className="text-slate-400" />
              Build your plan. Then log off.
            </p>
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
                title: 'Capture your context',
                desc: 'Role, strengths, constraints—and the move you’re aiming at next.',
              },
              {
                step: '2',
                title: 'See the drivers',
                desc: 'Your Resilience Index plus the leverage drivers behind it, so you can sanity‑check the logic.',
              },
              {
                step: '3',
                title: 'Ship outputs',
                desc: 'A 30/60/90 build sequence with proof artifacts you can complete alongside your current job.',
              },
              {
                step: '4',
                title: 'Stay grounded',
                desc: 'Attention and capacity protocols that protect clean thought, prevent spirals, and keep AI a tool—not an authority.',
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
                q: 'Is this a “feel-good” AI career tool?',
                a: 'No. Captori produces task-level diagnosis (Resilience Index + drivers) and a 30/60/90 build plan with proof artifacts you can ship alongside a full-time job.',
              },
              {
                q: 'What if competition explodes and wages drop?',
                a: 'That’s exactly why the plan focuses on moving you up the discretion ladder: judgment, verification, ownership, and accountable decisions—work that doesn’t commoditize as easily as volume output.',
              },
              {
                q: 'Will AI replace my job?',
                a: 'Wrong question. The useful question is: which parts of your role become cheap, and which become more valuable? We map that split and give you a plan to reposition.',
              },
              {
                q: 'Is this a calendar optimizer / habit tracker / AI life coach?',
                a: 'No. Captori is a leverage plan: inputs → decisions → shippable outputs → proof. No infinite chat loops.',
              },
              {
                q: 'How accurate is the Resilience Index?',
                a: 'Treat it as a strategic analysis, not a prophecy. We evaluate the architecture of your workflow (repeatability, cognitive surface area, stakeholder complexity) against current AI capabilities—and we expose the drivers for professional validation.',
              },
              {
                q: 'Is this a mental health tool?',
                a: 'Absolutely not. This is a strategic planning tool for career and information management. If you are feeling unsafe or in immediate danger, please consult a professional or contact emergency services.',
              },
              {
                q: 'What is &ldquo;Grounded AI&rdquo;?',
                a: 'AI is a tool, not an oracle. Our protocols focus on maintaining user agency: drafting before prompting, verifying high-stakes decisions, and intentional offline &ldquo;quiet hours&rdquo; to protect cognition.',
              },
              {
                q: 'Do you store my data?',
                a: 'By default, we don’t store your assessment inputs. We use them to generate your outputs in-session.',
              },
              {
                q: 'How long does it take?',
                a: '~2 minutes to answer. Outputs generate immediately.',
              },
              {
                q: 'How do you evaluate roles?',
                a: 'We analyze roles you provide (LinkedIn/Indeed/company postings). We always link to the source so the evaluation is verifiable. When a job tool claims it can &ldquo;find roles for you,&rdquo; the key question is sourcing. We make this transparent so you can trust exactly what you’re seeing.',
              },
              {
                q: 'What should I do first?',
                a: 'Start with the &ldquo;This Week&rdquo; moves, then run the 30‑day section. The plan is designed to produce proof artifacts, not busywork.',
              },
              {
                q: 'Will AI replace my job in 5 years?',
                a: 'Usually it’s not replacement—it’s compression. AI automates first‑pass labor, and organizations keep fewer people to own the workflow. This plan shows what’s being commoditized in your role, what’s compounding, and what to build next.',
              },
            ].map((item) => (
              <details key={item.q} className="group glass-panel rounded-2xl p-6 open:ring-1 open:ring-[hsl(var(--primary))]/20">
                <summary className="cursor-pointer list-none flex items-center justify-between text-lg font-bold text-slate-900 group-hover:text-[hsl(var(--primary))] transition-colors">
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


      <section id="pricing" className="py-24 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-serif">
              Unlock your AI‑Life Plan
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              One-time purchase. Designed to be executed <strong>alongside a full-time job.</strong>
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* The Audit: FREE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Free Plan</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium text-slate-600 italic">Diagnosis + first moves.</p>
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
            </div>

            {/* Suite Unlock: $39 */}
            <div className="rounded-3xl border-2 border-slate-900 bg-white p-8 flex flex-col shadow-xl scale-105 relative z-10">
              <div className="absolute top-0 right-0 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">AI‑Life Plan (Suite Unlock)</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium text-emerald-700 italic">Full plan + shippable sequence (One-time purchase).</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-6">$39</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Career (Leverage Map & 30/60/90 Build Plan)',
                  'Attention (Grounded Protocol & Anti‑slop)',
                  'Identity (Proof Archive & positioning kit)',
                  <span key="capacity-upcoming" className="flex items-center gap-2 text-slate-400">
                    <Icon name="time" size={16} /> Capacity (Recovery plan) — included when released
                  </span>
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    {typeof item === 'string' ? <><Icon name="check" size={16} className="text-emerald-600" /> {item}</> : item}
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
                Unlock Suite (Checkout)
              </Link>
              <p className="mt-4 text-[10px] text-center text-slate-400">One-time purchase. Instant access to live modules.</p>
            </div>

            {/* Executive License: $99 */}
            <div className="rounded-3xl border border-indigo-200 bg-indigo-50/30 p-8 flex flex-col hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Executive License</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium text-indigo-700 italic">Ideal for Senior/Staff roles.</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-6">$99</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Proof Kit: narrative + portfolio + interview readiness',
                  'Pressure‑test simulations (failure‑mode)',
                  'Proof‑of‑work briefs (portfolio‑ready)',
                  'Executive Blueprint PDF (share-ready)',
                  'Everything in Suite Unlock',
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
                Go Executive (Checkout)
              </Link>
              <p className="mt-4 text-[10px] text-center text-slate-400">One-time purchase. Includes 12 months of updates. Designed for higher-leverage roles.</p>
              <p className="mt-4 text-[10px] text-center text-indigo-600 font-medium italic">
                &ldquo;Built to help you sound senior under pressure—not just polished on paper.&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-16 text-center italic text-slate-500">
            &ldquo;Automation applies faster. Strategy wins offers.&rdquo;
          </div>
        </div>
      </section>

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
