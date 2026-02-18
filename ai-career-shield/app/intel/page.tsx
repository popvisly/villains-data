import Link from 'next/link';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { hasPlanAccess } from '@/app/actions/stripe';
import { fetchIntelItems, type IntelRole, type IntelItem } from '@/lib/intel';
import { Icon } from '@/components/ui/Icon';

export const dynamic = 'force-dynamic';

function RoleToggle({ active }: { active: IntelRole }) {
  const base = 'inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition';
  return (
    <div className="inline-flex w-full max-w-md rounded-full bg-slate-100 p-1 border border-slate-200">
      <Link
        href="/intel?role=pm"
        className={`${base} ${active === 'pm' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
      >
        <Icon name="professional" size={16} /> PM
      </Link>
      <Link
        href="/intel?role=designer"
        className={`${base} ${active === 'designer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
      >
        <Icon name="sparkles" size={16} /> Designer
      </Link>
    </div>
  );
}

export default async function IntelPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: IntelRole }>;
}) {
  const sp = await searchParams;
  const role: IntelRole = sp.role === 'designer' ? 'designer' : 'pm';

  const access = await hasPlanAccess('execution');

  const items = await fetchIntelItems(role, 25).catch(() => []);

  const latestWeekKey = items.find((i) => i.week_key)?.week_key || null;
  const latestWeekCount = latestWeekKey ? items.filter((i) => i.week_key === latestWeekKey).length : null;

  return (
    <main className="min-h-screen subtle-noise">
      <Nav />

      <section className={`px-6 pt-20 ${!access.hasAccess ? 'pb-28' : 'pb-16'} md:pt-28`}>
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="$39 Intel Feed"
            title="Role Radar"
            subtitle="Sourced updates for your role—what changed, why it matters, and what to do next."
          />

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <RoleToggle active={role} />
              {latestWeekKey && (
                <p className="text-sm text-slate-600">
                  Latest drop: <span className="font-bold text-slate-900">{latestWeekKey}</span>
                  {typeof latestWeekCount === 'number' ? <span className="text-slate-500"> • {latestWeekCount} items</span> : null}
                </p>
              )}
            </div>

            {!access.hasAccess && (
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--cta))] px-6 py-3 text-sm font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 transition"
              >
                Unlock Intel Feed ($39)
              </Link>
            )}
          </div>

          {!access.hasAccess && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-bold text-slate-900">What you unlock for $39</p>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>Weekly drops (Mon, Melbourne) for PM + Designer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>Sources + links (so you can verify and go deeper)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">•</span>
                      <span>What changed → why it matters → what to do next framing</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 transition"
                >
                  Unlock Role Radar ($39)
                </Link>
              </div>
            </div>
          )}

          {/* Feed */}
          <div className="mt-10 grid gap-4">
            {(() => {
              const placeholders: IntelItem[] = Array.from({ length: 8 }).map((_, i) => ({
                id: `placeholder-${i}`,
                role,
                title: 'Intel item',
                summary: 'Weekly update with sources and a next step.',
                impact_tags: ['Hiring', 'Scope', 'Interviews'],
                source_name: 'Source',
                source_url: '#',
                published_at: null,
                week_key: latestWeekKey || 'This week',
              }));

              const displayItems: IntelItem[] = items.length ? (items as IntelItem[]) : placeholders;

              return displayItems.map((item) => {
                const publishedLabel = item.published_at
                  ? new Date(item.published_at).toLocaleDateString('en-AU', { year: 'numeric', month: 'short', day: 'numeric' })
                  : null;

                return (
                  <div
                    key={item.id}
                    className={`glass-panel rounded-3xl p-6 border-slate-200 bg-white ${!access.hasAccess ? 'opacity-90' : ''}`}
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
                          {item.week_key ? (
                            <span className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200">{item.week_key}</span>
                          ) : null}
                          {publishedLabel ? <span className="text-slate-500">{publishedLabel}</span> : null}
                        </div>

                        <p className="mt-2 text-lg font-bold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.summary}</p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {(item.impact_tags || []).slice(0, 6).map((t) => (
                            <span key={t} className="px-3 py-1 rounded-full text-xs font-bold bg-slate-50 border border-slate-200 text-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 md:mt-0 shrink-0">
                        {access.hasAccess ? (
                          <a
                            href={item.source_url || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                          >
                            {item.source_name ? `Source: ${item.source_name}` : 'Source'} <Icon name="arrowRight" size={16} />
                          </a>
                        ) : (
                          <Link href="/#pricing" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                            Unlock to view sources <Icon name="locked" size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          {!access.hasAccess && (
            <>
              <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-lg font-bold text-slate-900">Get updates you can’t get from a one-off prompt.</p>
                <p className="mt-2 text-sm text-slate-600">We track changes over time, cite sources, and ship new items weekly.</p>
                <Link
                  href="/#pricing"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 transition"
                >
                  Unlock Role Radar ($39)
                </Link>
              </div>

              {/* Mobile sticky CTA */}
              <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur md:hidden">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">Unlock Role Radar ($39)</p>
                    <p className="text-xs text-slate-600 truncate">Weekly drops + sources</p>
                  </div>
                  <Link
                    href="/#pricing"
                    className="shrink-0 inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--cta))] px-5 py-2 text-sm font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 transition"
                  >
                    Unlock
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
