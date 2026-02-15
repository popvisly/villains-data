'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateExecutionPack } from '@/app/actions/assessment';
import type { AssessmentInput, AssessmentResult } from '@/types';
import { ShareBriefCard } from '@/components/ShareBriefCard';
import { UpsellCard } from '@/components/UpsellCard';
import { ExecutionPackView } from '@/components/ExecutionPackView';
import { InterviewSimulator } from '@/components/InterviewSimulator';
import { LeverageHeatmap } from '@/components/LeverageHeatmap';
import { FeedbackSection } from '@/components/FeedbackSection';
import type { ExecutionPack } from '@/types/executionPack';
import { trackEvent } from '@/lib/analytics-client';
import { experimental_useObject as useObject } from 'ai/react';
import { useExperiment } from '@/hooks/useExperiment';
import { z } from 'zod';




const INDUSTRIES = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Marketing',
    'Hospitality',
    'Construction',
    'Other',
];

const GOALS = [
    { id: 'choose_direction', label: 'Explore my best options', desc: 'I want clarity on what to do next' },
    { id: 'future_proof_role', label: 'Strengthen my current path', desc: 'I want to stay valuable as the work changes' },
    { id: 'plan_pivot', label: 'Plan a pivot', desc: 'I’m considering a new direction' },
];

const INTERESTS = [
    'Visual Design', 'Data Analysis', 'Strategy',
    'People/Management', 'Building things', 'Writing',
    'Research', 'Operations/Process'
];

// Define the schema for useObject
const assessmentSchema = z.object({
    riskScore: z.number().min(0).max(100),
    confidence: z.enum(['low', 'medium', 'high']),
    factors: z.array(z.object({
        name: z.string(),
        score: z.number().min(0).max(100),
        evidence: z.string(),
        whyItMatters: z.string(),
        mitigation: z.array(z.string())
    })),
    roleAdjacencies: z.array(z.object({
        roleId: z.string(),
        rationale: z.string(),
        transferableSkills: z.array(z.string()),
        gapSkills: z.array(z.string())
    })),
    immediateActions: z.array(z.string()),
    plan30_60_90: z.array(z.object({
        window: z.enum(['30_days', '60_days', '90_days']),
        goals: z.array(z.string()),
        tasks: z.array(z.string())
    })),
    heatmap: z.array(z.object({
        label: z.string(),
        state: z.enum(['melting', 'compounding', 'stable']),
        discretion: z.number().min(1).max(10),
        automation: z.number().min(1).max(10),
        why: z.string()
    }))
});

export default function AssessmentPage({ initialHasAccess = false, initialTier }: { initialHasAccess?: boolean, initialTier?: 'execution' | 'executive' }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<AssessmentInput>({
        jobTitle: '',
        industry: '',
        skills: [],
        yearsExperience: undefined,
        audience: 'professional',
        goal: 'future_proof_role',
        experienceLevel: 'mid',
        enjoys: [],
    });
    const PERSONAS = [
        { id: 'professional', label: 'Professional', desc: 'Working or seeking work', icon: '💼' },
        { id: 'student', label: 'Student', desc: 'In school or recently graduated', icon: '🎓' },
        { id: 'teacher', label: 'Teacher / Educator', desc: 'Focus on teaching and prep', icon: '🍎' },
    ];
    const [skillInput, setSkillInput] = useState('');
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [executionPack, setExecutionPack] = useState<ExecutionPack | null>(null);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [assessmentId, setAssessmentId] = useState<string>('');
    const hasAccess = initialHasAccess;
    const [tier] = useState<'execution' | 'executive' | undefined>(initialTier);
    const [hasSavedSession, setHasSavedSession] = useState(false);

    const LS_KEY = 'ai-career-shield:assessment-state:v1';

    const ENABLE_EXECUTION_PACK = process.env.NEXT_PUBLIC_ENABLE_EXECUTION_PACK === 'true' || true;

    const [startTime, setStartTime] = useState<number | null>(null);
    const [hasEmittedFirstToken, setHasEmittedFirstToken] = useState(false);
    const [hasEmittedFirstFactor, setHasEmittedFirstFactor] = useState(false);
    const [displayedFactors, setDisplayedFactors] = useState<AssessmentResult['factors']>([]);
    const [hasEmittedFirstInsight, setHasEmittedFirstInsight] = useState(false);

    // A/B Test Bucketing
    const shareTimingVariant = useExperiment('share_timing_v1', ['immediate', 'delayed']);
    const shareCopyVariant = useExperiment('share_copy_v1', ['resilience', 'readiness']);

    // Use AI SDK for streaming assessment
    const { object: streamedObject, submit, isLoading } = useObject({
        api: '/api/assess',
        schema: assessmentSchema,
        onFinish: ({ object }) => {
            if (object) {
                const duration = startTime ? Date.now() - startTime : 0;
                trackEvent('streaming_complete', { duration, job: formData.jobTitle });
                setResult(object as unknown as AssessmentResult);
                setAssessmentId(crypto.randomUUID());
                setStep(2);
            }
        },
    });

    // Performance Instrumentation
    useEffect(() => {
        if (!isLoading) {
            setStartTime(null);
            setHasEmittedFirstToken(false);
            setHasEmittedFirstFactor(false);
            return;
        }
        if (!startTime) setStartTime(Date.now());
    }, [isLoading, startTime]);

    useEffect(() => {
        if (!isLoading || !startTime || !streamedObject) return;

        if (!hasEmittedFirstToken) {
            trackEvent('streaming_token_first', { latency: Date.now() - startTime });
            setHasEmittedFirstToken(true);
        }

        if (!hasEmittedFirstFactor && (streamedObject.factors as AssessmentResult['factors'])?.length > 0) {
            trackEvent('streaming_factor_first', { latency: Date.now() - startTime, variant: shareTimingVariant || 'unknown' });
            setHasEmittedFirstFactor(true);
        }

        if (!hasEmittedFirstInsight && (streamedObject.factors as AssessmentResult['factors'])?.length >= 2) {
            trackEvent('streaming_insight_first', { latency: Date.now() - startTime, variant: shareTimingVariant || 'unknown' });
            setHasEmittedFirstInsight(true);
        }
    }, [isLoading, startTime, streamedObject, hasEmittedFirstToken, hasEmittedFirstFactor, hasEmittedFirstInsight, shareTimingVariant]);

    useEffect(() => {
        if (!streamedObject?.factors) {
            setDisplayedFactors([]);
            return;
        }
        const targetFactors = streamedObject.factors as AssessmentResult['factors'];

        // Adaptive speed: If we have many new factors, type faster.
        const diff = targetFactors.length - displayedFactors.length;
        if (diff > 0) {
            const timer = setTimeout(() => {
                setDisplayedFactors(targetFactors.slice(0, displayedFactors.length + 1));
            }, diff > 2 ? 50 : 200); // 50ms if burst, 200ms if steady
            return () => clearTimeout(timer);
        }
    }, [streamedObject?.factors, displayedFactors]);

    useEffect(() => {
        trackEvent('assessment_start');
    }, []);

    useEffect(() => {
        if (hasAccess) return;
        try {
            const raw = window.localStorage.getItem(LS_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (saved?.formData?.jobTitle) {
                    setHasSavedSession(true);
                }
            }
        } catch { /* ignore */ }
    }, [hasAccess]);

    useEffect(() => {
        if (hasAccess) {
            trackEvent('payment_success_view');
        }
    }, [hasAccess]);

    useEffect(() => {
        if (!hasAccess) return;
        if (result || executionPack) return;

        try {
            const raw = window.localStorage.getItem(LS_KEY);
            if (!raw) return;
            const saved = JSON.parse(raw);

            if (saved?.formData) setFormData(saved.formData);
            if (saved?.result) setResult(saved.result);
            if (saved?.executionPack) setExecutionPack(saved.executionPack);
            if (saved?.assessmentId) setAssessmentId(saved.assessmentId);

            setStep(2);
        } catch (e) {
            console.warn('Failed to restore saved assessment state', e);
        }
    }, [hasAccess, result, executionPack]);

    useEffect(() => {
        if (hasAccess && result && !executionPack && !isUnlocking) {
            const autoGenerate = async () => {
                setIsUnlocking(true);
                try {
                    if (!result.roleAdjacencies) return;
                    const roleIds = result.roleAdjacencies.map(r => r.roleId);
                    const pack = await generateExecutionPack(roleIds, formData);
                    setExecutionPack(pack);
                } catch (err) {
                    console.error('Auto-generation failed:', err);
                } finally {
                    setIsUnlocking(false);
                }
            };
            autoGenerate();
        }
    }, [hasAccess, result, executionPack, isUnlocking, formData]);

    useEffect(() => {
        if (!result) return;
        try {
            const payload = {
                savedAt: Date.now(),
                formData,
                result,
                executionPack,
                assessmentId,
            };
            window.localStorage.setItem(LS_KEY, JSON.stringify(payload));
        } catch { /* ignore */ }
    }, [formData, result, executionPack, assessmentId]);

    const handleResume = () => {
        try {
            const raw = window.localStorage.getItem(LS_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (saved.formData) setFormData(saved.formData);
                if (saved.result) setResult(saved.result);
                if (saved.assessmentId) setAssessmentId(saved.assessmentId);
                setHasSavedSession(false);
                if (saved.result) {
                    setStep(2);
                }
                trackEvent('assessment_resume');
            }
        } catch (e) {
            console.error('Resume failed', e);
        }
    };

    const handleStartOver = () => {
        window.localStorage.removeItem(LS_KEY);
        setHasSavedSession(false);
        setFormData({
            jobTitle: '',
            industry: '',
            skills: [],
            yearsExperience: undefined,
            audience: 'professional',
            goal: 'future_proof_role',
            experienceLevel: 'mid',
            enjoys: [],
        });
        setResult(null);
        setExecutionPack(null);
        setStep(1);
        trackEvent('assessment_reset');
    };

    const copyAsMarkdown = () => {
        if (!result) return;
        let md = `# Resilience Executive Brief: ${formData.jobTitle}\n\n`;
        md += `**Resilience Index**: ${result.riskScore}%\n`;
        md += `**Confidence**: ${result.confidence}\n\n`;
        if (result.immediateActions) {
            md += `## 🚀 This Week: Immediate Actions\n`;
            result.immediateActions.forEach((a, i) => md += `${i + 1}. ${a}\n`);
            md += `\n`;
        }
        if (result.plan30_60_90) {
            md += `## 📅 30/60/90 Roadmap\n`;
            result.plan30_60_90.forEach(window => {
                md += `### ${window.window.replace('_', ' ').toUpperCase()}\n`;
                md += `**Goals**:\n`;
                window.goals.forEach(g => md += `- ${g}\n`);
                md += `**Tasks**:\n`;
                window.tasks.forEach(t => md += `- [ ] ${t}\n`);
                md += `\n`;
            });
        }
        navigator.clipboard.writeText(md);
        alert('Plan copied to clipboard as Markdown!');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        trackEvent('assessment_complete', { job: formData.jobTitle, industry: formData.industry });
        submit(formData);
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skillInput.trim()],
            });
            setSkillInput('');
        }
    };

    const removeSkill = (skill: string) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter((s) => s !== skill),
        });
    };

    const toggleInterest = (interest: string) => {
        const current = formData.enjoys || [];
        const next = current.includes(interest)
            ? current.filter(i => i !== interest)
            : [...current, interest];
        setFormData({ ...formData, enjoys: next });
    };

    return (
        <main className="min-h-screen subtle-noise py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-slate-950">
                        Strategic Workflow Audit
                    </h1>
                    <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                        {step === 1
                            ? "An executive analysis that produces a Resilience Index and a shippable execution sequence."
                            : "Strategic Brief"}
                    </p>
                </div>

                {step === 1 && hasSavedSession && (
                    <div className="mb-8 p-6 bg-[hsl(var(--success-subtle))] border border-[hsl(var(--success-border))] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">💾</span>
                            <div>
                                <h3 className="font-bold text-slate-900">Welcome back</h3>
                                <p className="text-sm text-slate-600">We found a saved analysis in progress.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleStartOver} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition">Start Over</button>
                            <button onClick={handleResume} className="px-6 py-2 bg-[hsl(var(--cta))] hover:opacity-90 text-[hsl(var(--cta-foreground))] rounded-lg font-bold shadow-sm transition">Resume</button>
                        </div>
                    </div>
                )}

                {step === 1 && (isLoading || streamedObject) && (
                    <div className="mb-12 animate-in fade-in zoom-in-95 duration-500">
                        <div className="rounded-2xl border border-[hsl(var(--success-border))] bg-[hsl(var(--success-subtle))]/30 p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] flex items-center justify-center text-xl animate-pulse">✨</div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-950">Consulting Analyst briefing...</h3>
                                    <p className="text-sm text-slate-700">Synthesizing market signals and automation vectors.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {streamedObject?.riskScore !== undefined && (
                                    <div className="p-4 rounded-xl bg-white border border-emerald-100 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-slate-600 uppercase tracking-tight">Current Resilience Index</span>
                                        <span className="text-2xl font-bold text-emerald-600">{streamedObject.riskScore}%</span>
                                    </div>
                                )}

                                <div className="grid gap-4 md:grid-cols-2">
                                    {displayedFactors.map((f, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white border border-[hsl(var(--success-border))] animate-in slide-in-from-left-2 fade-in duration-300">
                                            <p className="text-[10px] font-bold text-[hsl(var(--success-foreground))] uppercase mb-1">{f?.name || 'Analyzing Factor...'}</p>
                                            <p className="text-sm text-slate-800 line-clamp-2 italic">&quot;{f?.evidence || 'Identifying technical dependencies...'}&quot;</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Instant Mode Toggle */}
                                <div className="flex justify-center mt-2">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition"
                                    >
                                        ⚡ Skip to Full Summary
                                    </button>
                                </div>

                                {streamedObject?.immediateActions && (streamedObject.immediateActions as string[]).length > 0 && (
                                    <div className="mt-4 p-4 rounded-xl border border-emerald-200 bg-white shadow-sm">
                                        <p className="text-xs font-bold text-emerald-800 uppercase mb-3 px-1">Initial Momentum Steps</p>
                                        <ul className="space-y-2">
                                            {(streamedObject.immediateActions as string[]).map((a, i) => (
                                                <li key={i} className="text-sm text-slate-800 flex items-start gap-2">
                                                    <span className="text-emerald-500 mt-0.5">→</span>
                                                    {a}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {step === 1 && !isLoading && !streamedObject && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <section>
                                <h3 className="text-xl font-serif font-bold text-slate-950 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] flex items-center justify-center text-sm font-sans">1</span>
                                    Your context
                                </h3>
                                <div className="space-y-8">
                                    {/* Persona Selection */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-4">I am a...</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {PERSONAS.map((p) => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, audience: p.id as 'professional' | 'student' | 'teacher' })}
                                                    className={`p-4 rounded-2xl border text-center transition-all ${formData.audience === p.id ? 'bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary))]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                                >
                                                    <div className="text-2xl mb-2">{p.icon}</div>
                                                    <div className="font-bold text-xs text-slate-900">{p.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                {formData.audience === 'student' ? 'Main Area of Study' :
                                                    formData.audience === 'teacher' ? 'Subject / Level' :
                                                        'Current role (or goal role)'}
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.jobTitle}
                                                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                                placeholder={formData.audience === 'student' ? 'e.g. Computer Science' : 'e.g. Senior Product Manager'}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[hsl(var(--primary))]/20 outline-none transition-all"
                                                required
                                                autoFocus
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Industry / Category *
                                            </label>
                                            <select
                                                value={formData.industry}
                                                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg bg-white border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition"
                                                required
                                            >
                                                <option value="">Select…</option>
                                                {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Experience (years)</label>
                                            <input
                                                type="number"
                                                value={formData.yearsExperience || ''}
                                                onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value ? parseInt(e.target.value) : undefined })}
                                                className="w-full px-4 py-3 rounded-lg bg-white border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition"
                                                placeholder="e.g. 5 (optional)"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium mb-3">What are you optimizing for?</label>
                                            <div className="grid sm:grid-cols-3 gap-3">
                                                {GOALS.map((goal) => (
                                                    <button
                                                        key={goal.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, goal: goal.id as AssessmentInput['goal'] })}
                                                        className={`p-4 rounded-xl border text-left transition ${formData.goal === goal.id ? 'bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary))]' : 'bg-white border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]'}`}
                                                    >
                                                        <div className="font-bold text-sm mb-1">{goal.label}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-[hsl(var(--border))]" />

                            <section>
                                <h3 className="text-xl font-serif font-bold text-slate-950 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] flex items-center justify-center text-sm font-sans">2</span>
                                    Skills & Interests
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Top skills (up to 3)</label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                                placeholder="Type a skill and press Enter…"
                                                className="flex-1 px-4 py-3 rounded-lg bg-white border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition"
                                            />
                                            <button type="button" onClick={addSkill} className="px-6 py-3 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))] transition font-medium">Add</button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 min-h-[40px]">
                                            {formData.skills.map((skill) => (
                                                <div key={skill} className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center gap-2 text-sm">
                                                    <span>{skill}</span>
                                                    <button type="button" onClick={() => removeSkill(skill)} className="text-red-400 hover:text-white">×</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-3">I’m strongest when I’m doing…</label>
                                        <div className="flex flex-wrap gap-2">
                                            {INTERESTS.map((interest) => (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => toggleInterest(interest)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${formData.enjoys?.includes(interest) ? 'bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] border-[hsl(var(--cta))]' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                                                >
                                                    {interest}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={!formData.jobTitle || !formData.industry || formData.skills.length < 1 || isLoading}
                                    className="w-full py-5 rounded-2xl bg-[hsl(var(--cta))] hover:opacity-90 transition font-bold text-lg text-[hsl(var(--cta-foreground))] shadow-lg shadow-emerald-950/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    Run Strategic Audit
                                </button>
                                <div className="mt-4 text-center">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Real-time briefing • ~2 minutes • no login</p>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && result && (
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                        {/* Viral Share Card A/B Test */}
                        {((shareTimingVariant === 'immediate') || (displayedFactors.length >= 2)) && (
                            <section className="mb-12 text-center">
                                <ShareBriefCard
                                    jobTitle={formData.jobTitle}
                                    riskScore={result.riskScore}
                                    topFactor={result.factors[0]?.name || "Strategic Resilience"}
                                    titleOverride={shareCopyVariant === 'readiness' ? `AI Readiness Audit: ${formData.jobTitle}` : undefined}
                                />
                                <div className="mt-4 flex justify-center gap-3">
                                    <button
                                        onClick={() => {
                                            trackEvent('share_image_click', { variant: shareCopyVariant });
                                            alert('Feature incoming: Save as Image');
                                        }}
                                        className="px-4 py-2 text-xs font-bold border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                                    >
                                        📥 Save Brief as Image
                                    </button>
                                    <button
                                        onClick={() => {
                                            trackEvent('share_link_click', { variant: shareCopyVariant });
                                            const text = `I just ran a Strategic Workflow Audit on my role as ${formData.jobTitle}. My Resilience Index is ${result.riskScore}%. Check yours at aicareerportal.com`;
                                            navigator.clipboard.writeText(text);
                                            alert('Share text copied to clipboard!');
                                        }}
                                        className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition"
                                    >
                                        🔗 Copy Share Link
                                    </button>
                                </div>
                            </section>
                        )}

                        {result.heatmap && result.heatmap.length > 0 && (
                            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                <LeverageHeatmap cells={result.heatmap} />
                            </section>
                        )}

                        {result.immediateActions && result.immediateActions.length > 0 && (
                            <div className="rounded-2xl border border-[hsl(var(--success-border))] bg-[hsl(var(--success-subtle))]/70 p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[hsl(var(--cta))] text-[hsl(var(--cta-foreground))] flex items-center justify-center text-xl">🚀</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-950">This Week: High‑leverage moves</h3>
                                            <p className="text-sm text-slate-700">Start here to build readiness through real outputs</p>
                                        </div>
                                    </div>
                                    <button onClick={copyAsMarkdown} className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 flex items-center gap-2"><span>📋 Copy brief</span></button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {result.immediateActions.map((action, i) => (
                                        <div key={i} className="rounded-xl border border-[hsl(var(--success-border))] bg-white p-4 flex items-start gap-4 hover:bg-[hsl(var(--success-subtle))]/40 transition-colors group">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[hsl(var(--success-subtle))] border border-[hsl(var(--success-border))] flex items-center justify-center text-[hsl(var(--success-foreground))] font-bold">{i + 1}</div>
                                            <p className="text-slate-800 text-sm leading-relaxed mt-1">{action}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <section className="rounded-2xl border border-[hsl(var(--border))] bg-white p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-[hsl(var(--warning-subtle))]">
                                    <span className="text-2xl">⚖️</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-950">Resilience Index</h2>
                                    <p className="text-sm text-slate-600">Calibration vs. automation vectors</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="relative w-32 h-32 flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200" />
                                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={364} strokeDashoffset={364 - (364 * result.riskScore) / 100} className="text-[hsl(var(--cta))] transition-all duration-1000 ease-out" />
                                        </svg>
                                        <span className="absolute text-3xl font-bold text-slate-950">{result.riskScore}%</span>
                                    </div>
                                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">Resilience Index</p>
                                </div>

                                <div className="md:col-span-2 space-y-4">
                                    {result.factors.slice(0, 3).map((factor, i) => (
                                        <div key={i} className="space-y-1.5">
                                            <div className="flex justify-between text-sm font-semibold">
                                                <span className="text-slate-900">{factor.name}</span>
                                                <span className="text-slate-600">{factor.score}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-[hsl(var(--cta))]/80 rounded-full transition-all duration-1000" style={{ width: `${factor.score}%`, transitionDelay: `${i * 150}ms` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="grid md:grid-cols-2 gap-6">
                            {result.roleAdjacencies?.map((adj, i) => (
                                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-md transition">
                                    <h4 className="text-lg font-bold text-slate-950 mb-2">{adj.detail?.title}</h4>
                                    <p className="text-sm text-slate-700 leading-relaxed mb-4">{adj.rationale}</p>
                                    <div className="flex gap-2">
                                        {adj.transferableSkills.slice(0, 2).map(s => <span key={s} className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-600">{s}</span>)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {result.plan30_60_90 && (
                            <section className="mt-12">
                                <h3 className="text-2xl font-bold text-slate-950 mb-8">Strategic Execution Sequence</h3>
                                <div className="space-y-4">
                                    {result.plan30_60_90.map((win) => (
                                        <div key={win.window} className="rounded-2xl border border-slate-200 bg-white p-8">
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="px-3 py-1 bg-[hsl(var(--success-subtle))] text-[hsl(var(--success-foreground))] text-xs font-bold rounded-lg uppercase tracking-wide">
                                                    {win.window.replace('_', ' ')}
                                                </span>
                                                <h4 className="text-lg font-bold text-slate-950">{win.goals[0]}</h4>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {win.tasks.map((task, k) => (
                                                    <div key={k} className="flex items-start gap-3 p-3 rounded-lg border border-slate-50 bg-slate-50/30 text-sm text-slate-800">
                                                        <span className="text-[hsl(var(--cta))] mt-1">✓</span>
                                                        {task}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {ENABLE_EXECUTION_PACK && (
                            <UpsellCard
                                onUnlock={() => router.push('/assessment#pricing')}
                                isLoading={isUnlocking}
                            />
                        )}

                        {hasAccess && executionPack && (
                            <ExecutionPackView
                                data={executionPack}
                                isPaid={hasAccess}
                                tier={tier}
                            />
                        )}

                        {hasAccess && (
                            <div className="rounded-2xl border border-slate-200 bg-white p-8">
                                <InterviewSimulator
                                    role={result.roleAdjacencies?.[0]?.detail?.title || formData.jobTitle}
                                    isPaid={hasAccess}
                                />
                            </div>
                        )}

                        <FeedbackSection
                            assessmentId={assessmentId}
                            jobTitleBucket={formData.jobTitle}
                            industryBucket={formData.industry}
                            riskScore={result.riskScore}
                            confidence={result.confidence || 'medium'}
                            planConfidence={result.planConfidence || 'medium'}
                            roleIds={result.roleAdjacencies?.map(r => r.roleId) || []}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
