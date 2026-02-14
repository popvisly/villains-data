'use client';

import React from 'react';

type LockedFeatureProps = {
  title?: string;
  description?: string;
};

export function LockedFeature({
  title = 'Locked',
  description = 'Available in the Execution Pack.',
}: LockedFeatureProps) {
  return (
    <div className="relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm">
      <div className="absolute inset-0 rounded-2xl bg-[hsl(var(--background))]/70 backdrop-blur-[2px]" />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))]">
          {title}
        </div>
        <p className="mt-3 text-sm text-slate-700">{description}</p>
      </div>
    </div>
  );
}
