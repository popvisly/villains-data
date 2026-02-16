export function SectionTitle({ eyebrow, title, subtitle, dark }: { eyebrow?: string; title: string; subtitle?: string; dark?: boolean }) {
    return (
        <div className="mx-auto max-w-4xl text-center px-4">
            {eyebrow ? (
                <div className={`mb-6 inline-flex items-center rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] ${dark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'}`}>
                    {eyebrow}
                </div>
            ) : null}
            <h2 className={`text-balance text-4xl font-bold tracking-tight md:text-6xl font-serif italic ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
            {subtitle ? <p className={`mt-8 text-pretty text-lg leading-relaxed md:text-2xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p> : null}
        </div>
    );
}
