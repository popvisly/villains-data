export function SectionTitle({ eyebrow, title, subtitle, dark }: { eyebrow?: string; title: string; subtitle?: string; dark?: boolean }) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            {eyebrow ? (
                <div className={`mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${dark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]'}`}>
                    {eyebrow}
                </div>
            ) : null}
            <h2 className={`text-balance text-4xl font-bold tracking-tight md:text-5xl font-serif ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
            {subtitle ? <p className={`mt-5 text-pretty text-lg leading-relaxed md:text-xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p> : null}
        </div>
    );
}
