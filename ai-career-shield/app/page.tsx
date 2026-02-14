import Link from 'next/link';
import { AIJobOfTheDay } from '@/components/AIJobOfTheDay';

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--primary))]">
            <span className="text-lg font-bold text-[hsl(var(--primary-foreground))]">🛡️</span>
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-900">AI Career Portal</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
          <Link href="#how" className="hover:text-slate-950">
            How it works
          </Link>
          <Link href="#preview" className="hover:text-slate-950">
            What you get
          </Link>
          <Link href="#pricing" className="hover:text-slate-950">
            Pricing
          </Link>
          <Link
            href="/assessment"
            className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2 font-semibold text-[hsl(var(--primary-foreground))] hover:opacity-90"
          >
            Run the diagnostic
          </Link>
        </nav>

        <div className="md:hidden">
          <Link
            href="/assessment"
            className="rounded-xl bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-[hsl(var(--primary-foreground))]"
          >
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[hsl(var(--primary))]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 text-pretty text-base leading-relaxed text-slate-700 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen subtle-noise">
      <Nav />

      {/* HERO */}
      <section className="px-6 pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs text-slate-700">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
Free diagnostic • ~2 minutes • no login
            </div>

            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">
              A career diagnostic built for AI-era workflows.
            </h1>

            <p className="mt-4 text-pretty text-base leading-relaxed text-slate-700 md:text-lg">
              Get a Career Readiness Score, the drivers behind it, and a 30/60/90 execution roadmap you can run this quarter.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-slate-800 md:text-base">
              {[
                'Next‑best paths (if you want options)',
                'What to double down on (if you want to stay on track)',
                'A realistic pivot sequence (if you want to change direction)',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-6 py-3 text-base font-semibold text-[hsl(var(--primary-foreground))] shadow-sm hover:opacity-90"
              >
                Run the diagnostic
              </Link>
              <Link href="#preview" className="text-sm font-semibold text-slate-700 hover:text-slate-950">
                See what you get →
              </Link>
            </div>

            <p className="mt-4 text-xs text-slate-600">No credit card for the free score + roadmap.</p>
          </div>

          {/* Right: AI Job of the Day + Preview */}
          <div className="space-y-6">
            <AIJobOfTheDay />

            {/* Deliverable preview (distinctive signature) */}
            <div className="glass-panel rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</p>
                  <p className="text-lg font-semibold text-slate-900">Career Readiness Scorecard</p>
                </div>
                <div className="rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))]">
                  Example
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Career Readiness Score</p>
                      <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">74</p>
                    </div>
                    <p className="text-xs text-slate-600">Change pressure: medium</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-[hsl(var(--background))] p-3">
                      <p className="text-xs font-semibold text-slate-500">Human leverage</p>
                      <p className="mt-1 font-semibold text-slate-900">Strong</p>
                    </div>
                    <div className="rounded-xl bg-[hsl(var(--background))] p-3">
                      <p className="text-xs font-semibold text-slate-500">Workflow exposure</p>
                      <p className="mt-1 font-semibold text-slate-900">Moderate</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">30 / 60 / 90 roadmap</p>
                  <div className="mt-3 grid gap-2 text-sm">
                    <div className="flex items-center justify-between rounded-xl bg-[hsl(var(--background))] p-3">
                      <span className="font-semibold text-slate-900">30 days</span>
                      <span className="text-slate-700">Pick 1 skill → ship 1 proof artifact</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[hsl(var(--background))] p-3">
                      <span className="font-semibold text-slate-900">60 days</span>
                      <span className="text-slate-700">Build a project → publish → iterate</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-[hsl(var(--background))] p-3">
                      <span className="font-semibold text-slate-900">90 days</span>
                      <span className="text-slate-700">Target roles → interview reps → refine</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  You’ll get specifics for <span className="font-semibold text-slate-700">your</span> role and goals — this is just the format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S CHANGING (less doom, more clarity) */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Why this exists"
            title="Work changes fast. You don’t need panic — you need a plan."
            subtitle="Automation shifts workflows first. The winning move is to strengthen the parts of your work that grow with change."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-slate-900">What tends to change first</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {[
                  'Repetitive, rules-based tasks (reports, tickets, scheduling)',
                  'Work that is screen-only and easy to standardize',
                  'Roles with weak feedback loops and unclear ownership',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-slate-900">What we help you strengthen</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {[
                  'Judgment + prioritisation (what matters, what moves outcomes)',
                  'Communication + trust (stakeholders, customers, teams)',
                  'Proof of work (projects, systems, artifacts you can show)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: timeline */}
      <section className="px-6 py-12 md:py-16" id="how">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title="How it works"
            subtitle="A short diagnostic → a scorecard → a 30/60/90 execution roadmap."
          />

          <div className="mx-auto mt-10 grid max-w-4xl gap-4">
            {[
              {
                step: '1',
                title: 'Capture your context',
                desc: 'Role, strengths, constraints, and what you want next.',
              },
              {
                step: '2',
                title: 'Get the scorecard (with drivers)',
                desc: 'We show what moved your score so you can sanity‑check it.',
              },
              {
                step: '3',
                title: 'Run a 30/60/90 execution roadmap',
                desc: 'Small moves, real outputs. The plan is designed to be shippable.',
              },
            ].map((s) => (
              <div key={s.step} className="glass-panel rounded-3xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10 text-sm font-semibold text-[hsl(var(--primary))]">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-700">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-6 py-3 text-base font-semibold text-[hsl(var(--primary-foreground))] hover:opacity-90"
            >
              Run the diagnostic
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET: make deliverables the product */}
      <section className="px-6 py-12 md:py-16" id="preview">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="Deliverables"
            title="What you get"
            subtitle="Free gets you clarity. The Execution Pack gets you execution leverage."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="glass-panel rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Free</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">Scorecard + roadmap</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {[
                  'Career Readiness Score + key drivers',
                  '30/60/90 execution roadmap',
                  'Next‑best paths (3–5)',
                  'Interview Simulator preview (3 turns)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-3xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Execution Pack (one-time)</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="text-xl font-semibold text-slate-900">$19</h3>
                <p className="text-sm text-slate-600">One-time • instant access</p>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {[
                  'PDF + exportable execution plan',
                  'Portfolio-ready project briefs + templates',
                  'Skill priorities (what to learn first)',
                  'Interview Simulator (10 turns per session)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-400" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/assessment"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-6 py-3 text-base font-semibold text-[hsl(var(--primary-foreground))] hover:opacity-90"
              >
                Run the diagnostic
              </Link>
              <p className="mt-3 text-center text-xs text-slate-600">Secure checkout via Stripe</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="FAQ" subtitle="Direct answers. Clear constraints." />

          <div className="mt-10 space-y-4">
            {[
              {
                q: 'How accurate is the Career Readiness Score?',
                a: 'Treat it as a scorecard, not a prophecy. We score the shape of your work (repeatability, judgment, stakeholder surface area, accountability) against today’s automation capabilities—and we show the drivers so you can validate the result.',
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
                q: 'What should I do first?',
                a: 'Start with the “This Week” moves, then run the 30‑day section. The plan is designed to produce proof artifacts, not busywork.',
              },
            ].map((item) => (
              <details key={item.q} className="glass-panel rounded-2xl p-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-slate-700">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-14 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="glass-panel rounded-3xl p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                  Start now. Small moves compound.
                </h2>
                <p className="mt-3 text-base text-slate-700">
                  Run a 60-second diagnostic and leave with a clear next step today.
                </p>
              </div>
              <div className="md:flex md:justify-end">
                <Link
                  href="/assessment"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-6 py-3 text-base font-semibold text-[hsl(var(--primary-foreground))] hover:opacity-90 md:w-auto"
                >
                  Run the diagnostic
                </Link>
              </div>
            </div>
          </div>

          <footer className="mt-10 border-t border-[hsl(var(--border))] pt-8 text-sm text-slate-600">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <p>© 2026 AI Career Portal</p>
              <div className="flex gap-5">
                <Link href="/privacy" className="hover:text-slate-950">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-slate-950">
                  Terms
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main >
  );
}
