'use client';

import React, { useState } from 'react';
import { matchResume } from '@/app/actions/matchResume';
import { ResumeMatch } from '@/types/executionPack';
import { Sparkles, Brain, Target, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface ResumeMatcherProps {
    initialResumeData?: string;
}

export function ResumeMatcher({ initialResumeData }: ResumeMatcherProps) {
    const [resumeText, setResumeText] = useState(initialResumeData || '');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<ResumeMatch[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleMatch = async () => {
        if (!resumeText.trim()) return;
        setIsAnalyzing(true);
        setError(null);
        try {
            const data = await matchResume(resumeText);
            setResults(data.matches);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to analyze resume.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Input Section */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                        <Brain className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">Resume Analyzer</h3>
                        <p className="text-xs text-slate-500">Paste your resume text to find your highest-leverage AI pivot.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <textarea
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        placeholder="Paste your resume or LinkedIn profile summary here..."
                        className="w-full h-40 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition text-sm text-slate-700 bg-slate-50/30"
                    />

                    <button
                        onClick={handleMatch}
                        disabled={isAnalyzing || !resumeText.trim()}
                        className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Analyzing Matching Logic...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                Match My Resume
                            </>
                        )}
                    </button>
                    {error && (
                        <p className="text-xs text-red-500 flex items-center gap-1.5 px-2">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {error}
                        </p>
                    )}
                </div>
            </section>

            {/* Results Section */}
            {results.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Ranked Opportunities</h3>
                        <span className="text-[10px] text-slate-400">Based on {results.length} roles</span>
                    </div>

                    <div className="grid gap-4">
                        {results.map((match, idx) => (
                            <div
                                key={match.roleTitle}
                                className={`group relative bg-white p-6 rounded-2xl border transition-all duration-300 ${idx === 0 ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                {idx === 0 && (
                                    <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                        Best Fit
                                    </div>
                                )}

                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-lg font-bold text-slate-900">{match.roleTitle}</h4>
                                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100">
                                                <Target className="w-3 h-3 text-emerald-600" />
                                                <span className="text-xs font-bold text-emerald-700">{match.fitScore}%</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed italic pr-4">
                                            &quot;{match.reasoning}&quot;
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-6 pt-2">
                                            <div>
                                                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-2">Strengths</p>
                                                <ul className="space-y-1.5">
                                                    {match.strengths.slice(0, 3).map(s => (
                                                        <li key={s} className="text-xs text-slate-700 flex items-center gap-2">
                                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                            {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-amber-600 uppercase mb-2">Critical Gaps</p>
                                                <ul className="space-y-1.5">
                                                    {match.criticalGaps.slice(0, 3).map(g => (
                                                        <li key={g} className="text-xs text-slate-700 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                            {g}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center md:flex-col justify-end gap-3 md:pt-1">
                                        <button className="px-4 py-2 rounded-lg bg-slate-50 text-slate-900 font-bold text-xs hover:bg-slate-100 transition whitespace-nowrap">
                                            View Roadmap
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
