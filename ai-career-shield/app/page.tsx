'use client';

import Link from 'next/link';
import { AIJobOfTheDay } from '@/components/AIJobOfTheDay';
import { TrendingRoles } from '@/components/TrendingRoles';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics-client';
import { APP_NAME, BRAND_CONFIG, ROUTES } from '@/lib/brand';

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary))] shadow-sm shadow-indigo-500/20">
            <Icon name="sparkles" size={20} className="text-[hsl(var(--primary-foreground))]" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900">{APP_NAME}</span>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="#how" className="hover:text-[hsl(var(--primary))] transition-colors">
            How it works
          </Link>
          <Link href="/start" className="hover:text-[hsl(var(--primary))] transition-colors font-bold text-slate-900 border-b-2 border-indigo-500">
            Plans
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
              <span className="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent font-bold">Free audit</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">~2 minutes</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">no login</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 [text-wrap:balance]">
              {APP_NAME} for the <span className="text-[hsl(var(--primary))]">AI era</span>
            </h1>
            <div className="mb-8 inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 border border-indigo-100">
              <Icon name="zap" size={16} />
              {BRAND_CONFIG.differentiator}
            </div>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-slate-600 md:text-xl">
              We turn AI-era noise into a clear diagnosis: what&apos;s being automated, what&apos;s gaining leverage, and what you need to build next. {BRAND_CONFIG.philosophy}
            </p>
            <ul className="mt-10 space-y-4 text-base text-slate-700">
              {[
                'Next‑best paths (if you want options)',
                'What to double down on (if you want to stay on track)',
                'A realistic pivot sequence (if you want to change direction)',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 group">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] group-hover:bg-[hsl(var(--primary))] group-hover:text-white transition-colors">
                    <Icon name="checkCircle" size={14} />
                  </div>
                  <span className="group-hover:text-slate-900 transition-colors">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={ROUTES.START}
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 px-8 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Plan
                  <Icon name="arrowRight" size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-700 transition-all hover:bg-slate-50"
              >
                How it works
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500 flex items-center gap-2">
              <Icon name="locked" size={16} className="text-slate-400" />
              No credit card required for free roadmap
            </p>
          </div>

          {/* Right: Floating Stack Layout */}
          <div className="relative isolate mt-10 md:mt-0">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-indigo-50 via-white to-emerald-50/50 rounded-full blur-3xl opacity-80"></div>

            {/* Layer 1 (Back): Trending Roles - Tilted & Blurred slightly */}
            {/* Layer 1 (Back): Trending Roles - Tilted & Blurred slightly */}
            <div className="relative z-10 scale-95 opacity-60 blur-[1px] -rotate-3 translate-x-12 translate-y-12 transition-all duration-700 hover:opacity-100 hover:blur-0 hover:rotate-0 hover:translate-x-0 hover:translate-y-[-20%] hover:scale-100 peer-hover:-translate-y-20 peer-hover:translate-x-4">
              <TrendingRoles />
            </div>

            {/* Layer 2 (Front): AI Job of the Day - Main Focus */}
            <div className="relative z-20 peer hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[hsl(var(--primary))]/30 to-[hsl(var(--cta))]/30 blur-lg opacity-40"></div>
              <AIJobOfTheDay />
            </div>

            {/* Floating Badge */}
            <div className="absolute right-0 top-16 z-30 animate-bounce duration-[3000ms]">
              <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 shadow-lg ring-1 ring-slate-900/5 backdrop-blur">
                <Icon name="trending" size={16} className="text-emerald-500" />
                <span className="text-xs font-bold text-slate-700">Trending Role</span>
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
            subtitle="Automation made volume meaningless. Differentiation has moved upstream."
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
                desc: "AI handles the first-pass 'slop'—the reports, the tickets, the rote execution. Humans are being judged on higher-leverage discretion: judgment, domain ownership, and systems thinking."
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
                <p className="text-base text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
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
            subtitle="A strategic audit → a Resilience Index → a 30/60/90 execution sequence."
          />

          <div className="mx-auto mt-16 grid max-w-5xl gap-6">
            {[
              {
                step: '1',
                title: 'Capture your context',
                desc: 'Role, strengths, constraints, and what you want next.',
              },
              {
                step: '2',
                title: 'Access the resilience index (with drivers)',
                desc: 'We show what moved your index so you can sanity‑check it.',
              },
              {
                step: '3',
                title: 'Run a 30/60/90 execution roadmap',
                desc: 'Small moves, real outputs. The sequence is designed to be shippable.',
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
              href="/assessment"
              className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--cta))] px-8 py-4 text-lg font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 shadow-lg shadow-emerald-500/25 transition-all hover:translate-y-[-1px]"
            >
              Run Strategic Audit
            </Link>
          </div>
        </div>
      </section>

      {/* STRATEGIC PROOF: Visual artifact preview */}
      <section className="px-6 py-24 md:py-32 overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="The Output"
            title="Strategic Proof"
            subtitle="Generic advice is slop. We provide high-signal artifacts you can actually use."
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {/* Artifact 1: Resilience Index */}
            <div className="rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 font-serif">A. Resilience Index</p>
              <div className="flex items-center justify-between mb-8">
                <div className="text-6xl font-bold text-slate-900 font-serif">74%</div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-600 uppercase">Resilient</div>
                  <div className="text-[10px] text-slate-500">Above average</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-white border border-slate-100 italic text-xs text-slate-600">
                  &ldquo;Judgment + Stakeholder complexity is your moat. Current execution tasks are high-risk.&rdquo;
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-100 italic text-xs text-slate-600">
                  &ldquo;Drivers: 8.2 Discretion, 4.1 Repetition.&rdquo;
                </div>
              </div>
            </div>

            {/* Artifact 2: Leverage Map */}
            <div className="rounded-[2rem] bg-indigo-50/50 p-8 ring-1 ring-indigo-100">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-6 font-serif">B. Leverage Map</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Commoditizing</div>
                <div className="text-[10px] font-bold uppercase tracking-tighter text-indigo-500">Compounding</div>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 rounded-lg bg-white/60 text-[10px] text-slate-500 line-through">Status Reports</div>
                  <div className="p-2 rounded-lg bg-white text-[10px] font-bold text-indigo-700">Vendor Strategy</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 rounded-lg bg-white/60 text-[10px] text-slate-500 line-through">Meeting Agendas</div>
                  <div className="p-2 rounded-lg bg-white text-[10px] font-bold text-indigo-700">Risk Mitigation</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-2 rounded-lg bg-white/60 text-[10px] text-slate-500 line-through">Drafting RFPs</div>
                  <div className="p-2 rounded-lg bg-white text-[10px] font-bold text-indigo-700">Logic Validation</div>
                </div>
              </div>
            </div>

            {/* Artifact 3: Pressure Test */}
            <div className="rounded-[2rem] bg-emerald-50/50 p-8 ring-1 ring-emerald-100">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-6 font-serif">C. Pressure-Test</p>
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-900">
                  &ldquo;Tell me about a time you ignored the data to make a better call.&rdquo;
                </div>
                <div className="p-4 rounded-2xl bg-white border border-emerald-100">
                  <p className="text-[10px] text-emerald-800 font-bold mb-2">Targetproof Strategy:</p>
                  <ul className="space-y-2">
                    {['Explain the logic-gap in the model', 'Detail the stakeholder trade-off', 'Quantify the averted risk'].map((item, i) => (
                      <li key={i} className="flex gap-2 text-[10px] text-emerald-700">
                        <Icon name="check" size={12} className="text-emerald-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET: make deliverables the product */}
      <section className="px-6 py-24 md:py-32 bg-slate-50/50 border-y border-slate-200/60" id="preview">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Deliverables"
            title="What you get"
            subtitle="Free gets you clarity. The Execution Pack gets you execution leverage."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="glass-panel rounded-3xl p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Free Plan</p>
              <h3 className="text-3xl font-bold text-slate-900 font-serif mb-6">Brief + sequence</h3>
              <ul className="space-y-4 text-base text-slate-600">
                {[
                  'Resilience Index + key drivers',
                  '30/60/90 execution roadmap',
                  'Next‑best paths (3–5)',
                  'Interview Simulator preview (3 turns)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Icon name="checkCircle" size={20} className="text-slate-400 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative glass-panel rounded-3xl p-8 md:p-10 border-[hsl(var(--primary))]/20 ring-4 ring-[hsl(var(--primary))]/5">
              <div className="absolute top-0 right-0 p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-bold text-[hsl(var(--primary))] uppercase tracking-wide">
                  <Icon name="zap" size={12} /> Most Popular
                </span>
              </div>

              <p className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))] mb-4">Execution Pack (one-time)</p>
              <div className="flex items-baseline gap-2 mb-6">
                <h3 className="text-4xl font-bold text-slate-900 font-serif">$39</h3>
                <span className="text-sm font-semibold text-slate-500">USD</span>
              </div>

              <ul className="space-y-4 text-base text-slate-600 mb-8">
                {[
                  'PDF + exportable execution plan',
                  'Portfolio-ready project briefs + templates',
                  'Skill priorities (what to learn first)',
                  'Interview Simulator (10 turns per session)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Icon name="checkCircle" size={20} className="text-[hsl(var(--primary))] mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/assessment"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-6 py-4 text-base font-bold text-[hsl(var(--primary-foreground))] shadow-lg shadow-indigo-500/20 transition-all"
              >
                Access Execution Pack
              </Link>
              <p className="mt-4 text-center text-xs font-medium text-slate-500">Secure checkout via Stripe • Instant Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modular System Overview */}
      <section className="px-6 py-24 md:py-32 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="A Modular Operating System" subtitle="Living alongside AI requires more than a career audit. It requires a protocol." />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Module 1 */}
            <div className="glass-panel p-8 rounded-3xl border-slate-200 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-indigo-50 rounded-full opacity-50 group-hover:scale-110 transition-transform" />
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  <Icon name="professional" size={20} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Module 1: Career</h3>
                <p className="text-sm text-slate-500 mb-6">The &ldquo;Throughput&rdquo; layer. Audit your workflow for AI-leveraged resilience.</p>
                <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all">
                  Run Audit <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>

            {/* Module 2 */}
            <div className="glass-panel p-8 rounded-3xl border-indigo-200 bg-white ring-1 ring-indigo-500/10 relative overflow-hidden group">
              <div className="absolute top-4 right-6">
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">New Module</span>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-indigo-600 shadow-sm flex items-center justify-center mb-6">
                  <Icon name="eyeOff" size={20} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Module 2: Attention</h3>
                <p className="text-sm text-slate-500 mb-6">The &ldquo;Input&rdquo; layer. A personal protocol to filter slop and protect clean thought.</p>
                <Link href="/attention" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:gap-3 transition-all">
                  Build Protocol <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </div>

            {/* Module 3 */}
            <div className="glass-panel p-8 rounded-3xl border-slate-200 opacity-60 grayscale relative overflow-hidden">
              <div className="absolute top-4 right-6">
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Coming Soon</span>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                  <Icon name="shield" size={20} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Module 3: Identity</h3>
                <p className="text-sm text-slate-500 mb-6">The &ldquo;Output&rdquo; layer. Turn results into a verifiable proof archive.</p>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-400">
                  Locked <Icon name="locked" size={14} />
                </div>
              </div>
            </div>
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
                q: 'How accurate is the Resilience Index?',
                a: 'Treat it as a strategic analysis, not a prophecy. We evaluate the architecture of your workflow (repeatability, cognitive surface area, stakeholder complexity) against current AI capabilities—and we expose the drivers for professional validation.',
              },
              {
                q: 'Is this a mental health tool?',
                a: 'Absolutely not. This is a strategic planning tool for career and information management. If you are feeling unsafe or in immediate danger, please consult a professional or contact emergency services.',
              },
              {
                q: 'What is &ldquo;Grounded AI&rdquo; use?',
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
                a: 'Usually it’s not replacement—it’s compression. AI automates first‑pass execution, and organizations keep fewer people to own the workflow. This audit shows what’s being commoditized in your role, what’s compounding, and what to build next.',
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
      <section className="px-6 py-24 md:py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent)]" />
        <div className="mx-auto max-w-4xl relative text-center">
          <SectionTitle
            title="Grounded in the AI Era"
            subtitle="We help you act, then log off. Keep your agency in a world of infinite noise."
            dark
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Icon name="brain" size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 italic">Think Mode: User First</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">AI is built to refine your judgment, not replace it. Our plans prioritize your drafting before AI enhancement.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Icon name="scale" size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 italic">Tool, Not Authority</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Avoid &ldquo;Oracle Mode&rdquo;. We structure outputs to show uncertainty and require your final decision.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Icon name="shield" size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 italic">Signal in. Signal out.</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">Filter the slop. Identify your high-stakes topics and ignore the SEO bait loops.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Icon name="time" size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 italic">Dependency Resistance</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">No infinite chat loops. We prefer forms &rarr; plans &rarr; action. Build your moat, then ship.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-xl font-medium text-indigo-200 font-serif italic mb-6">
              &ldquo;The goal of a People Plan isn&rsquo;t to live inside an AI interface. It&rsquo;s to make you harder to commoditize in the real world.&rdquo;
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/assessment" className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all">
                Access Module 1
              </Link>
              <Link href="/attention" className="px-6 py-3 border border-white/20 text-white rounded-xl font-bold hover:bg-white/10 transition-all">
                Build Attention Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5-YEAR REALITY CHECK + FINAL CTA */}
      <section className="px-6 py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            title="The 5‑Year Reality Check"
            subtitle="Most jobs won’t disappear. They’ll be redesigned—fast."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { title: "Role Compression", desc: "Teams get smaller before roles 'vanish.' AI removes the first‑pass work." },
              { title: "Leverage Shift", desc: "Value is moving to judgment and risk. Climb the discretion ladder." },
              { title: "Signal Shift", desc: "Polished GPT-answers are cheap. Failure-modes and decision quality are the signal." }
            ].map((card, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">{card.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--cta))] px-10 py-5 text-xl font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              Run Strategic Audit
              <Icon name="arrowRight" size={24} className="ml-2" />
            </Link>
            <p className="mt-4 text-sm text-slate-500">~2 minutes • no login required</p>
          </div>

          <div className="mt-10 text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium italic">
              Not a prediction market—an evidence‑based diagnostic.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl font-serif">
              Built for executive-grade career leverage.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              One-time purchase. A resilience system you can reuse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* The Audit: FREE */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">The Audit</h3>
                <p className="text-sm text-slate-500 mt-1">Foundational resilience check.</p>
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
                href="/assessment"
                onClick={() => trackEvent('pricing_plan_click', { tier: 'free', location: 'landing_page' })}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-center transition"
              >
                Run Strategic Audit
              </Link>
            </div>

            {/* Execution Pack: $39 */}
            <div className="rounded-3xl border-2 border-slate-900 bg-white p-8 flex flex-col shadow-xl scale-105 relative z-10">
              <div className="absolute top-0 right-0 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-bl-xl">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Execution Pack</h3>
                <p className="text-sm text-slate-500 mt-1 font-medium text-emerald-700">Instant 7‑day resilience roadmap.</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-6">$39</div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Leverage Map (30/60/90 roadmap)', 'Noise Filter (skill-gap analysis)', 'AI role matcher (resume scan)', 'Elite LinkedIn + resume assets'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <Icon name="check" size={16} className="text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment"
                onClick={() => trackEvent('pricing_plan_click', { tier: 'execution', location: 'landing_page' })}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-center shadow-lg transition"
              >
                Get the Execution Pack
              </Link>
              <p className="mt-4 text-[10px] text-center text-slate-400">One-time purchase. Includes 12 months of updates.</p>
            </div>

            {/* Executive License: $99 */}
            <div className="rounded-3xl border border-indigo-200 bg-indigo-50/30 p-8 flex flex-col hover:shadow-lg transition">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900">Executive License</h3>
                <p className="text-sm text-slate-500 mt-1">For senior professionals & leaders.</p>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-6">$99</div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  'Proof Kit: narrative + portfolio + interview readiness',
                  'Failure-Mode interview simulations',
                  'Professional project brief library',
                  'Executive Blueprint PDF (share-ready)',
                  'Everything in Execution Pack',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <Icon name="check" size={16} className="text-indigo-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment"
                onClick={() => trackEvent('pricing_plan_click', { tier: 'executive', location: 'landing_page' })}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-center transition"
              >
                Go Executive
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
            People Plan Audit
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900 transition font-medium">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition font-medium">Terms</a>
            <a href="#" className="hover:text-slate-900 transition font-medium">Support</a>
          </div>
          <p>© 2026 aicareerportal.com. Built for strategic resilient professionals.</p>
        </div>
      </footer>
    </main >
  );
}
