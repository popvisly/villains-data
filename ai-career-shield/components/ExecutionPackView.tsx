'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ExecutionPack, SkillGapMap, ProjectBrief, CareerAssets } from '@/types/executionPack';
import { ExecutionPackPdfDocument } from '@/components/ExecutionPackPdf';
import { Lock, FileText, Linkedin, Copy, MessageSquare, Sparkles } from 'lucide-react';
import { LockedFeature } from '@/components/Paywall/LockedFeature';
import { InterviewSimulator } from '@/components/InterviewSimulator';
import { ResumeMatcher } from '@/components/ResumeMatcher';

// --- Sub-components (extracted for clarity) ---

function SkillGapTab({ data }: { data: SkillGapMap }) {
    if (!data) return null;
    return (
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--success-subtle))] flex items-center justify-center text-xl">
                    <span>🗺️</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Personalized Skill Gap Map</h2>
                    <p className="text-sm text-slate-500">Bridging the gap to {data.roleTitle}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Matched & Gaps */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--success-foreground))] mb-4">Matched Skills</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {data.matchedSkills.map((s, i) => (
                                <div key={i} className="p-3 rounded-xl bg-[hsl(var(--success-subtle))] border border-[hsl(var(--success-border))]">
                                    <div className="text-sm font-medium text-slate-900">{s.skill}</div>
                                    <div className="text-[10px] text-slate-600 mt-1">{s.evidence}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[hsl(var(--warning-foreground))] mb-4">Priority Skill Gaps</h4>
                        <div className="space-y-4">
                            {data.gapSkills.map((s, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-200 transition-colors group shadow-sm">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="text-sm font-bold text-slate-900">{s.skill}</div>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[hsl(var(--info-subtle))] text-[hsl(var(--info-foreground))] border border-[hsl(var(--info-border))] uppercase font-bold tracking-tighter">New Skill</span>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{s.whyItMatters}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {s.howToBuild.map((step: string, si: number) => (
                                            <span key={si} className="text-[10px] text-slate-500 flex items-center gap-1.5">
                                                <span className="w-1 h-1 rounded-full bg-slate-400"></span>
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
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 font-mono">_Recommended_Sequence</h4>
                        <div className="space-y-4 relative pl-4 border-l border-slate-200">
                            {data.recommendedSequence.map((seq, i) => (
                                <div key={i} className="relative pb-6 last:pb-0">
                                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border-2 border-white"></div>
                                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">{seq.weekRange}</div>
                                    <div className="text-xs font-semibold text-slate-900 mb-2">{seq.focus.join(' & ')}</div>
                                    <div className="space-y-1.5">
                                        {seq.outputs.map((out: string, oi: number) => (
                                            <div key={oi} className="flex items-center gap-2 text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                                                <span className="text-slate-400">📎</span>
                                                {out}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-2xl bg-[hsl(var(--primary))/5] border border-[hsl(var(--primary))/20]">
                            <h5 className="text-[10px] font-bold text-[hsl(var(--primary))] uppercase tracking-widest mb-2">Coach&apos;s Notes</h5>
                            <ul className="text-[11px] text-[hsl(var(--primary))/80] space-y-2 italic">
                                {data.notes.map((n: string, i: number) => <li key={i}>&ldquo;{n}&rdquo;</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectBriefsTab({ briefs, isPaid }: { briefs: ProjectBrief[], isPaid: boolean }) {
    if (!isPaid) {
        return (
            <LockedFeature
                title="Project Briefs Locked"
                description="Unlock detailed, portfolio-ready project briefs designed to close your skill gaps and prove your value."
            />
        );
    }
    return (
        <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {briefs.map((brief) => (
                <div key={brief.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${brief.difficulty === 'easy' ? 'bg-[hsl(var(--success-subtle))] text-[hsl(var(--success-foreground))] border-[hsl(var(--success-border))]' :
                            brief.difficulty === 'medium' ? 'bg-[hsl(var(--warning-subtle))] text-[hsl(var(--warning-foreground))] border-[hsl(var(--warning-border))]' :
                                'bg-red-50 text-red-700 border-red-100'
                            }`}>
                            {brief.difficulty}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">Est. Time: {brief.estimatedTime}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-slate-900">{brief.title}</h3>
                    <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">{brief.summary}</p>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3">Key Deliverables</h4>
                            <div className="flex flex-wrap gap-2">
                                {brief.deliverables.map((d: string, i: number) => (
                                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                                        {d}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {brief.readme && (
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center justify-between">
                                    <span>Project README Template</span>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(brief.readme || '')}
                                        className="text-xs text-emerald-600 hover:text-emerald-700 transition"
                                    >
                                        Copy Markdown
                                    </button>
                                </h4>
                                <div className="h-32 overflow-y-auto p-3 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-mono whitespace-pre-wrap">
                                    {brief.readme}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function AssetsTab({ assets, isPaid }: { assets: CareerAssets | undefined, isPaid: boolean }) {
    if (!isPaid) {
        return (
            <LockedFeature
                title="Career Assets Locked"
                description="Get tailored resume bullets and LinkedIn summaries optimized for your target role."
            />
        );
    }
    return (
        assets ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Resume */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-emerald-600" /> Resume Power Bullets
                        </h3>
                        <div className="space-y-3">
                            {assets.resumeBullets.map((bullet: string, i: number) => (
                                <div key={i} className="group relative p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-emerald-200 transition">
                                    <p className="text-sm text-slate-700 pr-8">{bullet}</p>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(bullet)}
                                        className="absolute top-4 right-4 text-slate-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2">
                                <Linkedin className="w-4 h-4 text-[#0077b5]" /> LinkedIn Headlines
                            </h3>
                            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                                <p className="text-sm text-slate-700 italic">{assets.linkedIn.headline}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">About Section Draft</h3>
                            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm relative group">
                                <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
                                    {assets.linkedIn.aboutSection}
                                </p>
                                <button
                                    onClick={() => navigator.clipboard.writeText(assets.linkedIn.aboutSection || '')}
                                    className="absolute top-4 right-4 text-slate-400 hover:text-emerald-600 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : <div className="p-8 text-center text-slate-500 italic">No assets generated yet.</div>
    );
}

// --- Main Component ---

interface ExecutionPackViewProps {
    data: ExecutionPack;
    isPaid: boolean;
}

export function ExecutionPackView({ data, isPaid }: ExecutionPackViewProps) {
    const [activeTab, setActiveTab] = useState<'skills' | 'briefs' | 'assets' | 'matcher' | 'interview'>('skills');

    // Context for interview simulator
    const interviewContext = `
        Role: ${data.skillGapMap.roleTitle}
        Key Skills: ${data.skillGapMap.matchedSkills.map(s => s.skill).join(', ')}
        Missing Skills: ${data.skillGapMap.gapSkills.map(s => s.skill).join(', ')}
    `;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-0">
                <div className="flex gap-8 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`pb-4 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'skills' ? 'text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Skill Map
                        {!isPaid && <Lock className="w-3 h-3 mb-0.5" />}
                        {activeTab === 'skills' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('briefs')}
                        className={`pb-4 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'briefs' ? 'text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Project Briefs
                        {!isPaid && <Lock className="w-3 h-3 mb-0.5" />}
                        {activeTab === 'briefs' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('assets')}
                        className={`pb-4 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'assets' ? 'text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Career Assets
                        {!isPaid && <Lock className="w-3 h-3 mb-0.5" />}
                        {activeTab === 'assets' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('matcher')}
                        className={`pb-4 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'matcher' ? 'text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Role Matcher
                        <Sparkles className="w-3 h-3 mb-0.5 text-indigo-500" />
                        {activeTab === 'matcher' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('interview')}
                        className={`pb-4 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'interview' ? 'text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Interview Prep
                        {activeTab === 'interview' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                        )}
                    </button>
                </div>

                {/* Download PDF - Only show if PAID */}
                {isPaid && (
                    <PDFDownloadLink
                        document={<ExecutionPackPdfDocument data={data} />}
                        fileName="AI-Career-Portal-Execution-Pack.pdf"
                    >
                        {({ loading }) => (
                            <button
                                type="button"
                                className="mb-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition font-bold text-xs flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading ? 'Preparing PDF…' : 'Download PDF Pack'}
                            </button>
                        )}
                    </PDFDownloadLink>
                )}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
                {activeTab === 'skills' && (
                    isPaid ? <SkillGapTab data={data.skillGapMap} /> : <LockedFeature title="Skill Map Locked" description="Get your personalized skill gap analysis and step-by-step bridging plan." />
                )}

                {activeTab === 'briefs' && (
                    <ProjectBriefsTab briefs={data.projectBriefs} isPaid={isPaid} />
                )}

                {activeTab === 'assets' && (
                    <AssetsTab assets={data.careerAssets} isPaid={isPaid} />
                )}

                {activeTab === 'matcher' && (
                    <ResumeMatcher />
                )}

                {activeTab === 'interview' && (
                    <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[hsl(var(--primary))/5] rounded-lg">
                                <MessageSquare className="w-6 h-6 text-[hsl(var(--primary))]" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Mock Interview Simulator</h2>
                                <p className="text-sm text-slate-500">
                                    {isPaid ? '10 practice turns per session (server‑enforced).' : '3 turns free. Unlock the Execution Pack for 10 turns per session.'}
                                </p>
                            </div>
                        </div>

                        <InterviewSimulator
                            role={data.skillGapMap.roleTitle}
                            resumeText={interviewContext}
                            isPaid={isPaid}
                        />
                    </section>
                )}
            </div>
        </div>
    );
}
