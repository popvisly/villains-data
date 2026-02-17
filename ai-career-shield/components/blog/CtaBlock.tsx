'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function CtaBlock({
  title = 'Stop guessing. Measure your moat.',
  body = 'Get your Resilience Index plus immediate leverage moves in ~2 minutes.',
  primaryHref = '/career-resilience',
  primaryLabel = 'Start the 2-minute audit',
  secondaryHref = '/example',
  secondaryLabel = 'See a real example output',
}: {
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <aside className="my-12 rounded-[2rem] border border-slate-200 bg-white/60 backdrop-blur-md p-8 md:p-10 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h4 className="text-lg md:text-xl font-bold text-slate-900 font-serif italic">{title}</h4>
          <p className="mt-2 text-slate-600 leading-relaxed">{body}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={primaryHref}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[hsl(var(--cta))] px-6 font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
          >
            {primaryLabel} <Icon name="arrowRight" size={16} className="ml-2" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex h-12 items-center justify-center rounded-xl px-4 font-bold text-slate-600 hover:text-slate-900 underline decoration-slate-200 underline-offset-4"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </aside>
  );
}
