import Link from 'next/link';
import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { hasPlanAccess } from '@/app/actions/stripe';
import { fetchIntelItems, type IntelRole } from '@/lib/intel';
import { Icon } from '@/components/ui/Icon';

export const dynamic = 'force-dynamic';

function RoleToggle({ active }: { active: IntelRole }) {
  const base = 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition border';
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/intel?role=pm"
        className={`${base} ${active === 'pm' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
      >
        <Icon name="professional" size={16} /> PM
      </Link>
      <Link
        href="/intel?role=designer"
        className={`${base} ${active === 'designer' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
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

  return (
    <main className="min-h-screen subtle-noise">
      <Nav />

      <section className="px-6 pt-20 pb-16 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            eyebrow="$39 Intel Feed"
            title="Role Radar"
            subtitle="Sourced updates for your role—what changed, why it matters, and what to do next."
          />

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <RoleToggle active={role} />
            {!access.hasAccess && (
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-2xl bg-[hsl(var(--cta))] px-6 py-3 text-sm font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 transition"
              >
                Unlock Intel Feed ($39)
              </Link>
            )}
          </div>

          {/* Feed */}
          <div className="mt-10 grid gap-4">
            {(items.length ? items : Array.from({ length: 8 }).map((_, i) => ({ id: `placeholder-${i}`, title: 'Intel item', summary: 'Weekly update with sources and a next step.', impact_tags: ['Hiring'], source_name: 'Source', source_url: '#', published_at: null } as any))).map(
              (item: any) => (
                <div
                  key={item.id}
                  className={`glass-panel rounded-3xl p-6 border-slate-200 bg-white ${!access.hasAccess ? 'opacity-60 grayscale' : ''}`}
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-lg font-bold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(item.impact_tags || []).slice(0, 3).map((t: string) => (
                          <span key={t} className="px-3 py-1 rounded-full text-xs font-bold bg-slate-50 border border-slate-200 text-slate-600">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0">
                      {access.hasAccess ? (
                        <a
                          href={item.source_url || '#'}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700"
                        >
                          Source <Icon name="arrowRight" size={16} />
                        </a>
                      ) : (
                        <Link href="/#pricing" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                          Unlock to view sources <Icon name="locked" size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {!access.hasAccess && (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center">
              <p className="text-lg font-bold text-slate-900">Get updates you can’t get from a one-off ChatGPT prompt.</p>
              <p className="mt-2 text-sm text-slate-600">We track changes over time and cite sources. New items land weekly.</p>
              <Link
                href="/#pricing"
                className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-8 py-4 text-sm font-bold text-white hover:bg-slate-800 transition"
              >
                Unlock Role Radar ($39)
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
