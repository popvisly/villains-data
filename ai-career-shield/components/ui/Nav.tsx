'use client';

import Link from 'next/link';
import { APP_NAME, APP_PRODUCT } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics-client';

export function Nav() {
    return (
        <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-20">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--primary))] shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <img src="/icon.svg" alt="Captori" className="h-6 w-6 text-[hsl(var(--primary-foreground))]" style={{ filter: 'invert(1)' }} />
                        </div>
                        <div className="leading-tight">
                            <div className="text-xl font-bold tracking-tighter text-slate-900">{APP_NAME}</div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{APP_PRODUCT}</div>
                        </div>
                    </Link>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
                    <Link href="/example" className="hover:text-[hsl(var(--primary))] transition-colors">
                        The Operating Plan
                    </Link>
                    <Link href="/career-resilience" className="hover:text-[hsl(var(--primary))] transition-colors">
                        Resilience Index
                    </Link>
                    <Link href="/#pricing" className="hover:text-[hsl(var(--primary))] transition-colors">
                        Pricing
                    </Link>
                    <Link
                        href="/start"
                        onClick={() => trackEvent('cta_clicked_start_assessment', { location: 'nav' })}
                        className="inline-flex h-12 items-center justify-center rounded-xl bg-[hsl(var(--cta))] px-6 font-bold text-[hsl(var(--cta-foreground))] hover:opacity-90 transition-all shadow-xl shadow-emerald-500/20 active:scale-[0.98]"
                    >
                        Calculate My Resilience Index
                    </Link>
                </nav>

                <div className="md:hidden">
                    <Link
                        href="/start"
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-[hsl(var(--cta))] px-4 text-sm font-bold text-[hsl(var(--cta-foreground))]"
                    >
                        Index
                    </Link>
                </div>
            </div>
        </header>
    );
}
