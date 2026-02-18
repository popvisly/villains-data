import { Nav } from '@/components/ui/Nav';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { createIntelItem } from './actions';

export const dynamic = 'force-dynamic';

export default async function IntelAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; msg?: string }>;
}) {
  const sp = await searchParams;
  const ok = sp.ok === '1' ? true : sp.ok === '0' ? false : null;
  const msg = sp.msg ? decodeURIComponent(sp.msg) : null;

  return (
    <main className="min-h-screen subtle-noise">
      <Nav />

      <section className="px-6 pt-20 pb-16 md:pt-28">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Internal" title="Publish intel item" subtitle="Admin-only. Requires INTEL_ADMIN_SECRET." />

          {msg && (
            <div
              className={`mt-6 rounded-2xl border px-4 py-3 text-sm font-bold ${
                ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'
              }`}
            >
              {msg}
            </div>
          )}

          <form action={createIntelItem} className="mt-10 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6">
            <div className="grid gap-2">
              <label className="text-sm font-bold text-slate-900">Admin key</label>
              <input
                name="key"
                type="password"
                placeholder="INTEL_ADMIN_SECRET"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-bold text-slate-900">Role</label>
              <select name="role" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm">
                <option value="pm">PM</option>
                <option value="designer">Designer</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-bold text-slate-900">Week key (optional)</label>
              <input
                name="week_key"
                type="text"
                placeholder="2026-W08"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-bold text-slate-900">Title</label>
              <input name="title" type="text" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" required />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-bold text-slate-900">Summary</label>
              <textarea
                name="summary"
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
                required
              />
              <p className="text-xs text-slate-500">Keep it tight: what changed, why it matters, what to do next.</p>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-bold text-slate-900">Impact tags (comma-separated)</label>
              <input
                name="impact_tags"
                type="text"
                placeholder="hiring, metrics, interviews"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-bold text-slate-900">Source name (optional)</label>
                <input name="source_name" type="text" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-bold text-slate-900">Source URL (optional)</label>
                <input name="source_url" type="url" className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition"
            >
              Publish
            </button>

            <p className="text-xs text-slate-500">
              Note: this uses a hash dedupe (role + title + week_key). Submitting the same item again will no-op.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
