import React from 'react';
import { fetchAllFeedbackRows, mean } from '@/lib/analytics';
import { supabaseAdmin } from '@/lib/supabase';



function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function Bar({ value, max, colorClass }: { value: number; max: number; colorClass?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div className={`h-full ${colorClass || 'bg-gradient-to-r from-blue-600 to-cyan-600'}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Panel({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`glass-panel p-6 rounded-2xl border border-white/10 ${className || ''}`}>
      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        {subtitle ? <p className="text-sm text-gray-400 mt-1">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function MetricCard({ label, value, subtext }: { label: string; value: string | number; subtext?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
    </div>
  );
}



async function fetchEventCounts() {
  const { data, error } = await supabaseAdmin
    .from('analytics_events')
    .select('event_name, created_at, properties')
    .order('created_at', { ascending: false })
    .limit(5000); // Reasonable limit for v1

  if (error || !data) return [];
  return data;
}

async function fetchPurchases() {
  const { data, error } = await supabaseAdmin
    .from('purchases')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const sp = (await searchParams) || {};
  const requiredToken = process.env.ADMIN_TOKEN;

  if (requiredToken && sp.token !== requiredToken) {
    const tokenStatus = sp.token ? 'invalid' : 'missing';

    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-20 px-6">
        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Admin access required</h1>
            <p className="text-gray-400 mt-2 text-sm">
              This page needs an admin token.
              {' '}<span className="inline-block text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-mono">
                Token {tokenStatus}
              </span>
            </p>
          </div>
          {/* ... (keep existing instructions) ... */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">How to fix</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
              <li>
                Set <code className="text-gray-300 bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">ADMIN_TOKEN</code> in
                your <code className="text-gray-300 bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">.env.local</code> (server-side)
              </li>
              <li>
                Visit this page with <code className="text-gray-300 bg-white/5 px-1.5 py-0.5 rounded font-mono text-xs">?token=YOUR_TOKEN</code> appended to the URL
              </li>
            </ol>
          </div>
        </div>
      </main>
    );
  }

  // Fetch Data Parallel
  const [feedbackRows, events, purchases] = await Promise.all([
    fetchAllFeedbackRows(),
    fetchEventCounts(),
    fetchPurchases()
  ]);

  // Compute Funnel
  const started = events.filter(e => e.event_name === 'assessment_start').length;
  const completed = events.filter(e => e.event_name === 'assessment_complete').length;
  const checkouts = events.filter(e => e.event_name === 'checkout_start').length;
  const purchaseCount = purchases.length;
  const totalRevenue = purchases.reduce((sum, p) => sum + (p.amount_total || 0), 0) / 100;

  // Performance Metrics
  const streamingEvents = events.filter(e => e.event_name.startsWith('streaming_'));
  const firstTokenLatencies = streamingEvents
    .filter(e => e.event_name === 'streaming_token_first')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(e => (e.properties as any)?.latency)
    .filter((n): n is number => typeof n === 'number');

  const finishDurations = streamingEvents
    .filter(e => e.event_name === 'streaming_complete')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(e => (e.properties as any)?.duration)
    .filter((n): n is number => typeof n === 'number');

  const avgFirstToken = mean(firstTokenLatencies);
  const avgFinish = mean(finishDurations);

  // Conversion Rates
  const completionRate = started ? (completed / started) * 100 : 0;
  const checkoutRate = completed ? (checkouts / completed) * 100 : 0;
  const purchaseRate = checkouts ? (purchaseCount / checkouts) * 100 : 0;
  const overallConversion = started ? (purchaseCount / started) * 100 : 0;

  // Feedback Stats (Existing Logic)
  const feedbackRatings = feedbackRows.map(r => r.rating).filter((n): n is number => typeof n === 'number');
  const avgRating = mean(feedbackRatings);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Live analytics from <span className="text-white">analytics_events</span> and <span className="text-white">purchases</span>.</p>
        </header>

        {/* Business Overview */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard label="Revenue" value={`$${totalRevenue.toFixed(0)}`} subtext={`${purchaseCount} orders`} />
          <MetricCard label="Assessments Started" value={started} subtext="Total visits to form" />
          <MetricCard label="Assessments Completed" value={completed} subtext={`${completionRate.toFixed(1)}% completion rate`} />
          <MetricCard label="Conversion Rate" value={`${overallConversion.toFixed(2)}%`} subtext="Start → Purchase" />
        </section>

        {/* Funnel Visualization */}
        <Panel title="Conversion Funnel" subtitle="User journey drop-offs">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Started Assessment</span>
                <span className="text-gray-400">{started} (100%)</span>
              </div>
              <Bar value={started} max={started} colorClass="bg-blue-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed Assessment</span>
                <span className="text-gray-400">{completed} ({completionRate.toFixed(1)}%)</span>
              </div>
              <Bar value={completed} max={started} colorClass="bg-cyan-600" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Initiated Checkout</span>
                <span className="text-gray-400">{checkouts} ({checkoutRate.toFixed(1)}% of completed)</span>
              </div>
              <Bar value={checkouts} max={started} colorClass="bg-indigo-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Purchased</span>
                <span className="text-gray-400">{purchaseCount} ({purchaseRate.toFixed(1)}% of checkout)</span>
              </div>
              <Bar value={purchaseCount} max={started} colorClass="bg-green-500" />
            </div>
          </div>
        </Panel>

        {/* Performance Overview */}
        <Panel title="Streaming Performance" subtitle="Executive Audit Response Latency">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">Avg. Time to First Token</p>
              <p className="text-3xl font-bold">{avgFirstToken ? `${(avgFirstToken / 1000).toFixed(2)}s` : '---'}</p>
              <p className="text-[10px] text-emerald-500 mt-1">Goal: &lt; 2.00s</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400 uppercase font-bold mb-1">Avg. Completion Time</p>
              <p className="text-3xl font-bold">{avgFinish ? `${(avgFinish / 1000).toFixed(2)}s` : '---'}</p>
              <p className="text-[10px] text-slate-400 mt-1">Total strategy sequence generation</p>
            </div>
          </div>
        </Panel>

        <div className="grid lg:grid-cols-2 gap-6">
          <Panel title="Recent Transactions" subtitle="Latest purchases">
            {purchases.length === 0 ? (
              <p className="text-gray-500 text-sm">No purchases yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-500 text-xs uppercase">
                    <tr className="border-b border-white/10">
                      <th className="py-2">Date</th>
                      <th className="py-2">Email</th>
                      <th className="py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {purchases.slice(0, 10).map((p: any) => (
                      <tr key={p.id} className="border-b border-white/5">
                        <td className="py-2 text-gray-300">{new Date(p.created_at).toLocaleDateString()}</td>
                        <td className="py-2 text-gray-400">{p.customer_email || 'Anon'}</td>
                        <td className="py-2 text-right text-green-400">${(p.amount_total / 100).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>

          <Panel title="Recent Feedback" subtitle={`Avg Rating: ${avgRating ? round1(avgRating) : '-'}`}>
            {/* Reusing existing logic briefly */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-gray-500 text-xs uppercase">
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2">Role</th>
                    <th className="text-right py-2">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbackRows.slice(0, 5).map((r, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 text-gray-300 truncate max-w-[200px]">{r.job_title_bucket}</td>
                      <td className="py-2 text-right text-yellow-500">{r.rating} ★</td>
                    </tr>
                  ))}
                  {!feedbackRows.length && <tr><td colSpan={2} className="py-2 text-gray-500">No feedback yet.</td></tr>}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

      </div>
    </main>
  );
}
