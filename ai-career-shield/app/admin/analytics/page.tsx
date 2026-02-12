import React from 'react';
import { bucketLabel, fetchAllFeedbackRows, mean } from '@/lib/analytics';

type BucketAvg = { bucket: string; count: number; avg: number | null };

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function Bar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600" style={{ width: `${pct}%` }} />
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="glass-panel p-6 rounded-2xl border border-white/10">
      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-400 mt-1">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function computeAvgByBucket(rows: Awaited<ReturnType<typeof fetchAllFeedbackRows>>, key: 'job_title_bucket' | 'industry_bucket'): BucketAvg[] {
  const map = new Map<string, { count: number; ratings: number[] }>();

  for (const r of rows) {
    const bucket = bucketLabel(r[key]);
    const rating = r.rating;
    if (typeof rating !== 'number') continue;

    const cur = map.get(bucket) || { count: 0, ratings: [] };
    cur.count += 1;
    cur.ratings.push(rating);
    map.set(bucket, cur);
  }

  const out: BucketAvg[] = Array.from(map.entries()).map(([bucket, v]) => ({
    bucket,
    count: v.count,
    avg: mean(v.ratings),
  }));

  out.sort((a, b) => (b.avg ?? 0) - (a.avg ?? 0));
  return out;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const sp = (await searchParams) || {};
  const requiredToken = process.env.ADMIN_TOKEN;

  if (requiredToken && sp.token !== requiredToken) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-20 px-6">
        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-2xl border border-white/10">
          <h1 className="text-2xl font-bold">Not authorized</h1>
          <p className="text-gray-400 mt-2 text-sm">
            This page requires a valid admin token.
          </p>
        </div>
      </main>
    );
  }

  const rows = await fetchAllFeedbackRows();

  const total = rows.length;
  const ratings = rows.map(r => r.rating).filter((n): n is number => typeof n === 'number');
  const avgRating = mean(ratings);

  const avgByJob = computeAvgByBucket(rows, 'job_title_bucket');
  const avgByIndustry = computeAvgByBucket(rows, 'industry_bucket');

  // Helpful sections distribution
  const helpfulCounts = new Map<string, number>();
  for (const r of rows) {
    for (const s of (r.most_helpful_sections || [])) {
      helpfulCounts.set(s, (helpfulCounts.get(s) || 0) + 1);
    }
  }
  const helpful = Array.from(helpfulCounts.entries())
    .map(([section, count]) => ({ section, count }))
    .sort((a, b) => b.count - a.count);
  const helpfulMax = helpful.length ? helpful[0].count : 0;

  // Execution pack validation failures over time (daily buckets, last 30 days)
  const dayKey = (iso: string) => iso.slice(0, 10); // YYYY-MM-DD
  const byDay = new Map<string, { total: number; failures: number }>();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  for (const r of rows) {
    const t = new Date(r.created_at);
    if (Number.isNaN(t.getTime())) continue;
    if (t < cutoff) continue;

    const k = dayKey(r.created_at);
    const cur = byDay.get(k) || { total: 0, failures: 0 };
    cur.total += 1;
    if (r.execution_pack_validation_failed) cur.failures += 1;
    byDay.set(k, cur);
  }

  const failureSeries = Array.from(byDay.entries())
    .map(([day, v]) => ({
      day,
      total: v.total,
      failures: v.failures,
      rate: v.total ? v.failures / v.total : 0,
    }))
    .sort((a, b) => a.day.localeCompare(b.day));

  const maxDailyFailures = failureSeries.reduce((m, d) => Math.max(m, d.failures), 0);

  // Rating vs risk_score heatmap (bins of 10)
  type Bin = { label: string; count: number; avgRating: number | null };
  const bins: { from: number; to: number; ratings: number[] }[] = [];
  for (let i = 0; i < 100; i += 10) {
    bins.push({ from: i, to: i + 9, ratings: [] });
  }
  for (const r of rows) {
    if (typeof r.risk_score !== 'number' || typeof r.rating !== 'number') continue;
    const idx = Math.min(9, Math.max(0, Math.floor(r.risk_score / 10)));
    bins[idx].ratings.push(r.rating);
  }

  const heat: Bin[] = bins.map(b => ({
    label: `${b.from}–${b.to}`,
    count: b.ratings.length,
    avgRating: mean(b.ratings),
  }));
  const heatMaxCount = heat.reduce((m, d) => Math.max(m, d.count), 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="mb-4">
          <h1 className="text-4xl font-bold tracking-tight">Admin Analytics</h1>
          <p className="text-gray-400 mt-2 text-sm">
            Quantitative view of <code className="text-gray-300">assessment_feedback</code>. Total feedback rows: <span className="text-gray-200 font-semibold">{total}</span>.
            {avgRating !== null ? (
              <>
                {' '}Average rating: <span className="text-gray-200 font-semibold">{round1(avgRating)}</span>.
              </>
            ) : null}
          </p>
          <p className="text-[11px] text-gray-600 mt-2">No comments shown in v1.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Panel title="Average rating by job_title_bucket" subtitle="Sorted by average rating (descending)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-500 text-xs uppercase tracking-wider">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2">Bucket</th>
                    <th className="text-right py-2">Count</th>
                    <th className="text-right py-2">Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {avgByJob.slice(0, 25).map(r => (
                    <tr key={r.bucket} className="border-b border-white/5">
                      <td className="py-2 text-gray-200">{r.bucket}</td>
                      <td className="py-2 text-right text-gray-400">{r.count}</td>
                      <td className="py-2 text-right text-gray-200">{r.avg === null ? '—' : round1(r.avg)}</td>
                    </tr>
                  ))}
                  {!avgByJob.length ? (
                    <tr><td className="py-3 text-gray-500" colSpan={3}>No ratings yet.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Average rating by industry_bucket" subtitle="Sorted by average rating (descending)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-500 text-xs uppercase tracking-wider">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2">Bucket</th>
                    <th className="text-right py-2">Count</th>
                    <th className="text-right py-2">Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {avgByIndustry.slice(0, 25).map(r => (
                    <tr key={r.bucket} className="border-b border-white/5">
                      <td className="py-2 text-gray-200">{r.bucket}</td>
                      <td className="py-2 text-right text-gray-400">{r.count}</td>
                      <td className="py-2 text-right text-gray-200">{r.avg === null ? '—' : round1(r.avg)}</td>
                    </tr>
                  ))}
                  {!avgByIndustry.length ? (
                    <tr><td className="py-3 text-gray-500" colSpan={3}>No ratings yet.</td></tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Panel title="Most helpful sections" subtitle="Distribution across selected sections">
            <div className="space-y-4">
              {helpful.map(h => (
                <div key={h.section} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-200">{h.section}</span>
                    <span className="text-gray-500">{h.count}</span>
                  </div>
                  <Bar value={h.count} max={helpfulMax} />
                </div>
              ))}
              {!helpful.length ? <p className="text-gray-500 text-sm">No section selections yet.</p> : null}
            </div>
          </Panel>

          <Panel title="Execution pack validation failures" subtitle="Last 30 days (daily)">
            <div className="space-y-3">
              {failureSeries.slice(-14).map(d => (
                <div key={d.day} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-200">{d.day}</span>
                    <span className="text-gray-500">{d.failures}/{d.total} ({Math.round(d.rate * 100)}%)</span>
                  </div>
                  <Bar value={d.failures} max={Math.max(1, maxDailyFailures)} />
                </div>
              ))}
              {!failureSeries.length ? <p className="text-gray-500 text-sm">No data in last 30 days.</p> : null}
            </div>
          </Panel>

          <Panel title="Rating vs risk_score" subtitle="Risk bins (10-point) with average rating">
            <div className="space-y-3">
              {heat.map(b => (
                <div key={b.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-200">{b.label}</span>
                    <span className="text-gray-500">n={b.count} · avg={b.avgRating === null ? '—' : round1(b.avgRating)}</span>
                  </div>
                  <Bar value={b.count} max={Math.max(1, heatMaxCount)} />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <footer className="text-[11px] text-gray-600 pt-4">
          <p>
            v1 aggregates in server-side JS. If volume grows, move heavy aggregation into SQL (views/RPC) for performance.
          </p>
        </footer>
      </div>
    </main>
  );
}
