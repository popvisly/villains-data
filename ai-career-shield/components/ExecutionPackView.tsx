'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ExecutionPack } from '@/types/executionPack';
import { ExecutionPackPdfDocument } from '@/components/ExecutionPackPdf';
import { Lock, FileText, Linkedin, Copy, CheckCircle2, MessageSquare, Map as MapIcon } from 'lucide-react';
import { LockedFeature } from '@/components/Paywall/LockedFeature';
import { InterviewSimulator } from '@/components/InterviewSimulator';

// --- Sub-components (extracted for clarity) ---

function SkillGapTab({ data }: { data: any }) {
    if (!data) return null;
    return (
        <section className="glass-panel p-8 rounded-2xl border border-blue-500/20 bg-blue-500/[0.02] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xl shadow-lg shadow-blue-500/10">
                    <span>🗺️</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Personalized Skill Gap Map</h2>
                    <p className="text-sm text-gray-400">Bridging the gap to {data.roleTitle}</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Matched & Gaps */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">Matched Skills</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {data.matchedSkills.map((s: any, i: number) => (
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
                            {data.gapSkills.map((s: any, i: number) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="text-sm font-bold text-white/90">{s.skill}</div>
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-bold tracking-tighter">New Skill</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-3 leading-relaxed">{s.whyItMatters}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {s.howToBuild.map((step: string, si: number) => (
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
                            {data.recommendedSequence.map((seq: any, i: number) => (
                                <div key={i} className="relative pb-6 last:pb-0">
                                    <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-950"></div>
                                    <div className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-2">{seq.weekRange}</div>
                                    <div className="text-xs font-semibold text-gray-200 mb-2">{seq.focus.join(' & ')}</div>
                                    <div className="space-y-1.5">
                                        {seq.outputs.map((out: string, oi: number) => (
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
                                {data.notes.map((n: string, i: number) => <li key={i}>&ldquo;{n}&rdquo;</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectBriefsTab({ briefs, isPaid }: { briefs: any[], isPaid: boolean }) {
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
                                {brief.deliverables.map((d: string, i: number) => (
                                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                                        {d}
                                    </span>
                                ))}
                            </div>
                        </div>

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
                    </div>
                </div>
            ))}
        </div>
    );
}

function AssetsTab({ assets, isPaid }: { assets: any, isPaid: boolean }) {
    if (!isPaid) {
        return (
            <LockedFeature
                title="Career Assets Locked"
                description="Get tailored resume bullets and LinkedIn summaries optimized for your target role."
            />
        );
    }
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Resume */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Resume Power Bullets
                    </h3>
                    <div className="space-y-3">
                        {assets.resumeBullets.map((bullet: string, i: number) => (
                            <div key={i} className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                                <p className="text-sm text-gray-200 pr-8">{bullet}</p>
                                <button
                                    onClick={() => navigator.clipboard.writeText(bullet)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition"
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
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                            <Linkedin className="w-4 h-4" /> LinkedIn Headlines
                        </h3>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-sm text-gray-200 italic">{assets.linkedIn.headline}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-4">About Section Draft</h3>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative group">
                            <p className="text-xs text-gray-400 whitespace-pre-wrap leading-relaxed">
                                {assets.linkedIn.aboutSection}
                            </p>
                            <button
                                onClick={() => navigator.clipboard.writeText(assets.linkedIn.aboutSection || '')}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Main Component ---

interface ExecutionPackViewProps {
    data: ExecutionPack;
    isPaid: boolean;
}

export function ExecutionPackView({ data, isPaid }: ExecutionPackViewProps) {
    const [activeTab, setActiveTab] = useState<'skills' | 'briefs' | 'assets' | 'interview'>('skills');

    // Context for interview simulator
    const interviewContext = `
        Role: ${data.skillGapMap.roleTitle}
        Key Skills: ${data.skillGapMap.matchedSkills.map(s => s.skill).join(', ')}
        Missing Skills: ${data.skillGapMap.gapSkills.map(s => s.skill).join(', ')}
    `;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Tabs */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-4">
                <div className="flex gap-6 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`pb-2 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'skills' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Skill Map
                        {!isPaid && <Lock className="w-3 h-3 mb-0.5" />}
                        {activeTab === 'skills' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('briefs')}
                        className={`pb-2 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'briefs' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Project Briefs
                        {!isPaid && <Lock className="w-3 h-3 mb-0.5" />}
                        {activeTab === 'briefs' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('assets')}
                        className={`pb-2 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'assets' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Career Assets
                        {!isPaid && <Lock className="w-3 h-3 mb-0.5" />}
                        {activeTab === 'assets' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('interview')}
                        className={`pb-2 text-sm font-medium transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === 'interview' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        Interview Prep
                        {activeTab === 'interview' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                        )}
                    </button>
                </div>

                {/* Download PDF - Only show if PAID */}
                {isPaid && (
                    <PDFDownloadLink
                        document={<ExecutionPackPdfDocument data={data} />}
                        fileName="AI-Career-Shield-Execution-Pack.pdf"
                    >
                        {({ loading }) => (
                            <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-bold text-xs flex items-center gap-2"
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

                {activeTab === 'interview' && (
                    <section className="glass-panel p-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.02] animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-500/20 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Mock Interview Simulator</h2>
                                <p className="text-sm text-slate-400">
                                    {isPaid ? 'Unlimited AI practice sessions.' : 'Try 3 questions for free. Unlock full access for more.'}
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
