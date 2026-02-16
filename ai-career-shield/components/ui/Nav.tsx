'use client';

import Link from 'next/link';
import { APP_NAME, APP_PRODUCT } from '@/lib/brand';

export function Nav() {
    return (
        <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary))] shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <img src="/icon.svg" alt="Captori" className="h-5 w-5 text-[hsl(var(--primary-foreground))]" style={{ filter: 'invert(1)' }} />
                        </div>
                        <div className="leading-tight">
                            <div className="text-xl font-bold tracking-tighter text-slate-900">{APP_NAME}</div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{APP_PRODUCT}</div>
                        </div>
                    </Link>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                    <Link href="/start" className="hover:text-[hsl(var(--primary))] transition-colors">
                        How it works
                    </Link>
                    <Link href="/example" className="hover:text-[hsl(var(--primary))] transition-colors">
                        Example
                    </Link>
                    <Link href="/#pricing" className="hover:text-[hsl(var(--primary))] transition-colors">
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
