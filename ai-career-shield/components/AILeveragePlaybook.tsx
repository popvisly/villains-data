'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics-client';
import { PM_PLAYBOOK } from '@/data/leveragePlaybooks/pm';
import { PlaybookData } from '@/types/playbook';

interface AILeveragePlaybookProps {
    data?: PlaybookData;
    hasAccess?: boolean;
}

export default function AILeveragePlaybook({
    data = PM_PLAYBOOK,
    hasAccess = false
}: AILeveragePlaybookProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (id: string, text: string) => {
        if (!hasAccess) return;
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        trackEvent('playbook_template_copy', { workflowId: id });
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDownloadPDF = () => {
        if (!hasAccess) return;
        trackEvent('playbook_pdf_export', { role: data.role });
        trackEvent('export_used', { role: data.role });
        window.print();
    };

    return (
        <div className="space-y-12 pb-24">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-serif mb-3">AI Leverage Playbook ({data.role})</h1>
                    <p className="text-slate-500 max-w-2xl">
                        Role-specific workflows that turn AI into proof—fast, grounded, and verifiable.
                        Operational capability, not prompt spam.
                    </p>
                </div>
                {hasAccess && (
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Icon name="download" size={16} />
                        Export Playbook PDF
                    </button>
                )}
            </header>

            <div className="grid gap-8">
                {data.workflows.map((wf, idx) => {
                    const isLocked = !hasAccess && idx > 0;

                    return (
                        <section
                            key={wf.id}
                            className={`glass-panel rounded-3xl border-slate-200 bg-white overflow-hidden shadow-xl transition-all ${isLocked ? 'opacity-60 grayscale' : 'shadow-slate-200/50'
                                } flex flex-col md:flex-row relative`}
                        >
                            {/* Left: Metadata & Mode */}
                            <div className="md:w-72 p-8 bg-slate-50 border-r border-slate-100 flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${wf.mode === 'Research' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                        wf.mode === 'Review' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            wf.mode === 'Think' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                                'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                        }`}>
                                        Mode: {wf.mode}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{wf.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed mb-6">{wf.description}</p>

                                <div className="mt-6 mb-8">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">When to use</h4>
                                    <p className="text-[11px] text-slate-600 italic leading-snug">{wf.whenToUse}</p>
                                </div>

                                <div className="mt-auto">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Output Artifact</h4>
                                    <div className="text-xs font-bold text-slate-900 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                                        {wf.outputArtifact}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Template & Checklist */}
                            <div className="flex-1 p-8 md:p-12 space-y-10 relative">
                                {!hasAccess && idx > 0 && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-md">
                                        <div className="text-center p-6 rounded-2xl bg-white shadow-xl border border-slate-200 max-w-xs">
                                            <Icon name="locked" size={24} className="text-slate-400 mx-auto mb-3" />
                                            <p className="text-sm font-bold text-slate-900 mb-1">Workflow Locked</p>
                                            <p className="text-xs text-slate-500 mb-4">Unlock the Full Suite to access all PM templates and checklists.</p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Input Template</h4>
                                        <button
                                            onClick={() => handleCopy(wf.id, wf.inputTemplate)}
                                            disabled={!hasAccess}
                                            className={`flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${!hasAccess
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                : copiedId === wf.id
                                                    ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-lg'
                                                    : 'bg-slate-900 text-white hover:bg-slate-800'
                                                }`}
                                        >
                                            <Icon name={copiedId === wf.id ? 'check' : 'copy'} size={12} />
                                            {copiedId === wf.id ? 'Copied' : 'Copy Input Template'}
                                        </button>
                                    </div>
                                    <div className={`p-6 rounded-2xl bg-slate-900 text-slate-100 text-[13px] font-mono leading-relaxed overflow-hidden relative ${!hasAccess && 'max-h-24 opacity-50'}`}>
                                        <pre className="whitespace-pre-wrap">{wf.inputTemplate}</pre>
                                        {!hasAccess && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end justify-center pb-4">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preview (Suite Unlock)</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Verification Checklist</h4>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {(hasAccess ? wf.verificationChecklist : [wf.verificationChecklist[0]]).map((item, i) => (
                                                <div key={i} className="flex gap-3 items-start p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-colors">
                                                    <div className="h-5 w-5 shrink-0 rounded-md border-2 border-slate-200 flex items-center justify-center bg-white group-hover:border-indigo-300 transition-colors">
                                                        <Icon name="check" size={10} className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span className="text-[13px] text-slate-700 font-medium leading-tight">{item}</span>
                                                </div>
                                            ))}
                                            {!hasAccess && (
                                                <div className="flex gap-3 items-center p-4 rounded-xl bg-slate-50/50 border border-dashed border-slate-200 text-slate-400">
                                                    <Icon name="locked" size={12} />
                                                    <span className="text-[11px] font-medium">+ {wf.verificationChecklist.length - 1} more items...</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {(hasAccess || idx === 0) && (
                                        <div className={`p-5 rounded-2xl border-2 border-slate-100 bg-white shadow-sm flex items-start gap-4 ${!hasAccess && 'opacity-50 grayscale'}`}>
                                            <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                                                <Icon name="arrowRight" size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Next Action</h4>
                                                <p className="text-[13px] text-slate-900 font-bold leading-relaxed">
                                                    {wf.nextAction}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {hasAccess && (
                <div className="p-8 rounded-2xl bg-slate-900 text-white mt-12 flex items-center justify-between gap-6 border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <Icon name="sparkles" size={24} className="text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white mb-1">Operational Protocol</p>
                            <p className="text-xs text-indigo-300 font-medium">{data.logOffReminder}</p>
                        </div>
                    </div>
                </div>
            )}

            {!hasAccess && (
                <div className="p-12 rounded-[3rem] bg-indigo-600 text-white text-center shadow-2xl shadow-indigo-200 mt-12 no-print">
                    <h3 className="text-2xl font-bold mb-4">Unlock the Full Playbook</h3>
                    <p className="text-indigo-100 max-w-xl mx-auto mb-8 font-medium">
                        The Suite Unlock includes all {data.workflows.length} workflows, interactive checklists,
                        and your personalized Playbook PDF for professional distribution.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-lg">
                            Unlock Full Suite ($39)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
