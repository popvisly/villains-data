'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { APP_NAME, ROUTES } from '@/lib/brand';
import Link from 'next/link';
import AILeveragePlaybook from '@/components/AILeveragePlaybook';

interface PlaybookClientProps {
    initialHasAccess: boolean;
}

export default function PlaybookClient({ initialHasAccess }: PlaybookClientProps) {
    const [hasAccess] = useState(initialHasAccess);

    return (
        <main className="min-h-screen bg-slate-50/50 subtle-noise">
            {/* Premium Header */}
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 shadow-lg">
                            <Icon name="sparkles" size={18} className="text-white" />
                        </Link>
                        <div>
                            <span className="text-lg font-bold tracking-tight text-slate-900">{APP_NAME} | Playbook</span>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mt-0.5">Operational Leverage</p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-6">
                        <Link href={ROUTES.CAREER} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">Career Audit</Link>
                        <Link href={ROUTES.ATTENTION} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">Attention Plan</Link>
                        <Link href={ROUTES.IDENTITY} className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider">Identity Hub</Link>
                    </nav>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <AILeveragePlaybook hasAccess={hasAccess} />
            </div>
        </main>
    );
}
