import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ExecutionPack } from '@/types/executionPack';
import { ExecutionPackPdfDocument } from '@/components/ExecutionPackPdf';

interface ExecutionPackViewProps {
    data: ExecutionPack;
}

export function ExecutionPackView({ data }: ExecutionPackViewProps) {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Download */}
            <div className="flex items-center justify-end">
                <PDFDownloadLink
                    document={<ExecutionPackPdfDocument data={data} />}
                    fileName="AI-Career-Shield-Execution-Pack.pdf"
                >
                    {({ loading }: { loading: boolean }) => (
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-bold text-xs"
                            disabled={loading}
                        >
                            {loading ? 'Preparing PDF…' : 'Download PDF'}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>

            {/* Career Asset Kit (NEW) */}
            {data.careerAssets && (
                <section className="glass-panel p-8 rounded-2xl border border-blue-500/20 bg-blue-500/[0.02]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xl shadow-lg shadow-purple-500/10">
                            <span>💼</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Career Asset Kit</h2>
                            <p className="text-sm text-gray-400">Copy-paste templates to accelerate your pivot</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Resume Booster */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">Resume Power Bullets</h3>
                            <div className="space-y-3">
                                {data.careerAssets.resumeBullets.map((bullet, i) => (
                                    <div key={i} className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                                        <p className="text-sm text-gray-200 pr-8">{bullet}</p>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(bullet)}
                                            className="absolute top-4 right-4 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition"
                                            title="Copy to clipboard"
                                        >
                                            📋
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* LinkedIn Kit */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">LinkedIn Headlines</h3>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-sm text-gray-200 italic">{data.careerAssets.linkedIn.headline}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">About Section Draft</h3>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative group">
                                    <p className="text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">
                                        {data.careerAssets.linkedIn.aboutSection}
                                    </p>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(data.careerAssets?.linkedIn.aboutSection || '')}
                                        className="absolute top-4 right-4 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Project Briefs */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-xl shadow-lg shadow-orange-500/10">
                        <span>🏗️</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Portfolio Project Briefs</h2>
                        <p className="text-sm text-gray-400">Tailored artifacts to prove your readiness</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {data.projectBriefs.map((brief) => (
                        <div key={brief.id} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all flex flex-col h-full bg-gradient-to-br from-white/[0.03] to-transparent">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${brief.difficulty === 'easy' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                    brief.difficulty === 'medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                        'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {brief.difficulty}
                                </span>
                                <span className="text-[11px] text-gray-500 font-medium">Est. Time: {brief.estimatedTime}</span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 text-white/90">{brief.title}</h3>
                            <p className="text-sm text-gray-400 mb-6 leading-relaxed flex-grow">{brief.summary}</p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-orange-400/80 mb-3">Key Deliverables</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {brief.deliverables.map((d, i) => (
                                            <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* README Template (NEW) */}
                                {brief.readme && (
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-orange-400/80 mb-3 flex items-center justify-between">
                                            <span>Project README Template</span>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(brief.readme || '')}
                                                className="text-xs text-blue-400 hover:text-white transition"
                                            >
                                                Copy Markdown
                                            </button>
                                        </h4>
                                        <div className="h-32 overflow-y-auto p-3 rounded-lg bg-black/30 border border-white/5 text-[10px] text-gray-500 font-mono whitespace-pre-wrap">
                                            {brief.readme}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-orange-400/80 mb-3">Implementation Steps</h4>
                                    <div className="space-y-4">
                                        {brief.steps.map((s) => (
                                            <div key={s.step} className="flex gap-3">
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[10px] font-bold text-orange-400">
                                                    {s.step}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-semibold text-gray-200 mb-1">{s.title}</div>
                                                    <ul className="text-[11px] text-gray-400 space-y-1 list-disc pl-4">
                                                        {s.details.map((d, i) => <li key={i}>{d}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-3">Portfolio Packaging</h4>
                                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 italic text-[11px] text-gray-400 leading-relaxed">
                                    &ldquo;{brief.portfolioPackaging.headline}&rdquo;
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skill Gap Map */}
            <section className="glass-panel p-8 rounded-2xl border border-blue-500/20 bg-blue-500/[0.02]">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl shadow-lg shadow-blue-500/10">
                        <span>🗺️</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Personalized Skill Gap Map</h2>
                        <p className="text-sm text-gray-400">Bridging the gap to {data.skillGapMap.roleTitle}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Matched & Gaps */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">Matched Skills</h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {data.skillGapMap.matchedSkills.map((s, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                                        <div className="text-sm font-medium text-gray-200">{s.skill}</div>
                                        <div className="text-[10px] text-gray-500 mt-1">{s.evidence}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-4">Priority Skill Gaps</h4>
                            <div className="space-y-4">
                                {data.skillGapMap.gapSkills.map((s, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-sm font-bold text-white/90">{s.skill}</div>
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-bold tracking-tighter">New Skill</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-3 leading-relaxed">{s.whyItMatters}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {s.howToBuild.map((step, si) => (
                                                <span key={si} className="text-[10px] text-gray-500 flex items-center gap-1.5">
                                                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                    {step}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Recommended Sequence */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4 font-mono">_Recommended_Sequence</h4>
                            <div className="space-y-4 relative pl-4 border-l border-white/10">
                                {data.skillGapMap.recommendedSequence.map((seq, i) => (
                                    <div key={i} className="relative pb-6 last:pb-0">
                                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-950"></div>
                                        <div className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-2">{seq.weekRange}</div>
                                        <div className="text-xs font-semibold text-gray-200 mb-2">{seq.focus.join(' & ')}</div>
                                        <div className="space-y-1.5">
                                            {seq.outputs.map((out, oi) => (
                                                <div key={oi} className="flex items-center gap-2 text-[10px] text-gray-400 bg-white/5 p-1.5 rounded-lg border border-white/5">
                                                    <span className="text-blue-500">📎</span>
                                                    {out}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20">
                                <h5 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Coach&apos;s Notes</h5>
                                <ul className="text-[11px] text-gray-400 space-y-2 italic">
                                    {data.skillGapMap.notes.map((n, i) => <li key={i}>&ldquo;{n}&rdquo;</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
