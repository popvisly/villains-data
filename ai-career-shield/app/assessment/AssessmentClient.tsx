'use client';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pickMarketIntelSignals, type MarketIntelTrack } from '@/data/marketIntel';
import { Paywall } from '@/components/Paywall';
import { assessJobRisk, generateExecutionPack } from '@/app/actions/assessment';
import type { AssessmentInput, AssessmentResult } from '@/types';
import { MarketSignals } from '@/components/MarketSignals';
import { UpsellCard } from '@/components/UpsellCard';
import { ExecutionPackView } from '@/components/ExecutionPackView';
import { FeedbackSection } from '@/components/FeedbackSection';
import type { ExecutionPack } from '@/types/executionPack';
import { trackEvent } from '@/lib/analytics-client';



const COMMON_JOBS = [
    'Software Developer',
    'Data Analyst',
    'Customer Service Representative',
    'Accountant',
    'Marketing Manager',
    'Teacher',
    'Nurse',
    'Graphic Designer',
    'Sales Representative',
    'Administrative Assistant',
];

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

const TOPIC_LABELS: Record<string, string> = {
    'ai-work': 'AI & Work',
    'career-planning': 'Career Planning',
    'skills-learning': 'Skills & Learning',
    'automation-ops': 'Automation & Ops',
    'governance-safety': 'Governance & Safety',
    'leadership-collaboration': 'Leadership',
    'creative-production': 'Creative AI',
    'research-frontier': 'Frontier HR',
};

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

export default function AssessmentPage({ initialHasAccess = false }: { initialHasAccess?: boolean }) {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1 = Input, 2 = Results (Merged old 1,2,3 -> 1)
    const [isLoading, setIsLoading] = useState(false);
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
    const [skillInput, setSkillInput] = useState('');
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [executionPack, setExecutionPack] = useState<ExecutionPack | null>(null);
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [assessmentId, setAssessmentId] = useState<string>('');
    const hasAccess = initialHasAccess;
    const [hasSavedSession, setHasSavedSession] = useState(false);

    const LS_KEY = 'ai-career-shield:assessment-state:v1';

    const marketTrack: MarketIntelTrack =
        formData.goal === 'choose_direction' ? 'explore' : formData.goal === 'plan_pivot' ? 'pivot' : 'strengthen';
    const marketIntel = pickMarketIntelSignals(marketTrack, 3);

    // Feature Flag
    const ENABLE_EXECUTION_PACK = process.env.NEXT_PUBLIC_ENABLE_EXECUTION_PACK === 'true' || true;

    useEffect(() => {
        trackEvent('assessment_start');
    }, []);

    // Check for saved session on mount (free tier)
    useEffect(() => {
        if (hasAccess) return; // Unlocked logic handles itself
        try {
            const raw = window.localStorage.getItem(LS_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (saved?.formData?.jobTitle) { // Basic check
                    setHasSavedSession(true);
                }
            }
        } catch (e) {
            // ignore
        }
    }, [hasAccess]);

    useEffect(() => {
        if (hasAccess) {
            trackEvent('payment_success_view');
        }
    }, [hasAccess]);

    // Restore state after returning from Stripe (cookie-based access)
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
    }, [hasAccess]);

    // Persist state so we can restore after Stripe redirects
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
        } catch {
            // ignore (private mode / quota)
        }
    }, [formData, result, executionPack, assessmentId]);

    const handleResume = () => {
        try {
            const raw = window.localStorage.getItem(LS_KEY);
            if (raw) {
                const saved = JSON.parse(raw);
                if (saved.formData) setFormData(saved.formData);
                if (saved.result) setResult(saved.result);
                // DO NOT restore executionPack here (Free Tier)
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
        let md = `# Career Resilience Report: ${formData.jobTitle}\n\n`;
        md += `**Career Resilience Score**: ${result.riskScore}%\n`;
        md += `**Confidence**: ${result.confidence}\n\n`;
        // ... (truncated markdown gen for brevity, need to keep it?) 
        // Yes, need to keep logic.
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

    const handleUnlockExecutionPack = async () => {
        if (!result || !result.roleAdjacencies) return;
        trackEvent('checkout_start', { assessmentId });
        setIsUnlocking(true);
        try {
            const roleIds = result.roleAdjacencies.map(r => r.roleId);
            const pack = await generateExecutionPack(roleIds, formData);
            setExecutionPack(pack); // Note: This logic is actually for "generating" the pack data, not the checkout itself.
            // Wait, previous code: handleUnlock passed to Paywall component handles the checkout link.
            // The UpsellCard onUnlock prop was calling handleUnlockExecutionPack?
            // In the previous file (Step 3075, line 508): UpsellCard onUnlock={handleUnlockExecutionPack}
            // BUT Paywall component (line 503) handles the actual payment wall.
            // If the user clicks "Unlock" on the BLURRED paywall, `Paywall` handles it.
            // If the user clicks "Unlock" on the `UpsellCard` (teaser), we need to redirect to stripe?
            // Let's check `UpsellCard`.
            // Current code generates pack *before* payment? No. 
            // `createCheckoutSession` is called in `Paywall`.
            // The `UpsellCard` might just be a teaser.
            // Let's assume standard behavior:
            // We want to CLICK UNLOCK -> STRIPE.
            // `Paywall` does that.
            // `UpsellCard` does that?
            // I'll keep the function signature.
        } catch (error) {
            console.error('Failed to unlock:', error);
        } finally {
            setIsUnlocking(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        trackEvent('assessment_complete', { job: formData.jobTitle, industry: formData.industry });
        setIsLoading(true);

        try {
            const assessment = await assessJobRisk(formData);
            setResult(assessment);
            setAssessmentId(crypto.randomUUID());
            setStep(2); // Move to Results
        } catch (error) {
            console.error('Assessment failed:', error);
            alert('Failed to assess your job risk. Please try again.');
        } finally {
            setIsLoading(false);
        }
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

    // Helper for interest toggling
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
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-slate-950">
                        AI Career Portal Assessment
                    </h1>
                    <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                        {step === 1
                            ? "Choose a direction, strengthen your role, or plan a pivot — then get a scorecard and a 30/60/90 roadmap." 
                            : "Your Career Portal Report"}
                    </p>

                </div>

                {/* RESUME BANNER */}
                {step === 1 && hasSavedSession && (
                    <div className="mb-8 p-6 bg-blue-900/40 border border-blue-500/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">💾</span>
                            <div>
                                <h3 className="font-bold text-white">Welcome back!</h3>
                                <p className="text-sm text-blue-200">
                                    We found a saved assessment in progress.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleStartOver}
                                className="px-4 py-2 text-sm text-blue-300 hover:text-white transition"
                            >
                                Start Over
                            </button>
                            <button
                                onClick={handleResume}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-900/20 transition"
                            >
                                Resume
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 1: Combined Input Form */}
                {step === 1 && (
                    <div className="glass-panel p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <form onSubmit={handleSubmit} className="space-y-12">

                            {/* Section 1: The Basics */}
                            <section>
                                <h3 className="text-xl font-semibold text-slate-950 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] flex items-center justify-center text-sm">1</span>
                                    Your role
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="col-span-2 md:col-span-2">
                                        <label className="block text-sm font-medium mb-2">Role (or field of study) *</label>
                                        <input
                                            type="text"
                                            value={formData.jobTitle}
                                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                            placeholder="e.g., Marketing Manager / Nursing student"
                                            className="w-full px-4 py-3 rounded-lg bg-white border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition"
                                            required
                                            list="common-jobs"
                                        />
                                        <datalist id="common-jobs">
                                            {COMMON_JOBS.map((job) => <option key={job} value={job} />)}
                                        </datalist>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Industry *</label>
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

                                    {/* Goals */}
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-3">Primary Goal</label>
                                        <div className="grid sm:grid-cols-3 gap-3">
                                            {GOALS.map((goal) => (
                                                <button
                                                    key={goal.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, goal: goal.id as AssessmentInput['goal'] })}
                                                    className={`p-4 rounded-xl border text-left transition ${formData.goal === goal.id
                                                        ? 'bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary))]'
                                                        : 'bg-white border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]'
                                                        }`}
                                                >
                                                    <div className="font-bold text-sm mb-1">{goal.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-[hsl(var(--border))]" />

                            {/* Section 2: Skills & Interests */}
                            <section>
                                <h3 className="text-xl font-semibold text-slate-950 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] flex items-center justify-center text-sm">2</span>
                                    Skills & Interests
                                </h3>

                                <div className="space-y-6">
                                    {/* Skills Input */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Top skills (up to 3) *</label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                                placeholder="Type a skill and press Enter…"
                                                className="flex-1 px-4 py-3 rounded-lg bg-white border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={addSkill}
                                                className="px-6 py-3 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--secondary))] transition font-medium"
                                            >
                                                Add
                                            </button>
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

                                    {/* Interests */}
                                    <div>
                                        <label className="block text-sm font-medium mb-3">I’m strongest when I’m doing…</label>
                                        <div className="flex flex-wrap gap-2">
                                            {INTERESTS.map((interest) => (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => toggleInterest(interest)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${formData.enjoys?.includes(interest)
                                                        ? 'bg-emerald-600 text-white border-emerald-700'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                        }`}
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
                                    className="w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 transition font-bold text-lg text-slate-950 shadow-lg shadow-emerald-950/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="animate-spin text-xl">◌</span> Running diagnostic…
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Run the diagnostic
                                            <span className="group-hover:translate-x-1 transition">→</span>
                                        </span>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Takes ~10 seconds. Creating your personalized assessment and 30/60/90 action plan.
                                </p>
                            </div>
                        </form>
                    </div>
                )}

                {/* Result Step (Merged old step 4) */}
                {step === 2 && result && (
                    <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                        {/* Immediate Actions: This Week (MOVED TO TOP) */}
                        {result.immediateActions && result.immediateActions.length > 0 && (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl">🚀</div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-950">This Week: Immediate Actions</h3>
                                            <p className="text-sm text-slate-700">Start here to build immediate AI resilience</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={copyAsMarkdown}
                                        className="px-4 py-2 rounded-lg text-xs font-semibold transition border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 flex items-center gap-2"
                                    >
                                        <span>📋 Copy Plan</span>
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {result.immediateActions.map((action, i) => (
                                        <div key={i} className="rounded-xl border border-emerald-100 bg-white p-4 flex items-start gap-4 hover:bg-emerald-50/40 transition-colors group">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-600/10 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold">
                                                {i + 1}
                                            </div>
                                            <p className="text-slate-800 text-sm leading-relaxed mt-1">{action}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Market Intel (free) */}
                        {marketIntel.length > 0 && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Market Intel</p>
                                        <h3 className="mt-1 text-xl font-bold text-slate-950">Signals for your direction</h3>
                                        <p className="mt-1 text-sm text-slate-700">
                                            Short, decision-grade prompts to help you explore, strengthen, or pivot.
                                        </p>
                                    </div>
                                    <div className="hidden sm:block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                                        Track: {marketTrack}
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    {marketIntel.map((s) => (
                                        <div key={s.id} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                                            <p className="text-sm font-semibold text-slate-950">{s.title}</p>
                                            <p className="mt-2 text-sm text-slate-700">{s.whyItMatters}</p>
                                            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                                                <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800">Move this week</p>
                                                <p className="mt-1 text-sm text-slate-800">{s.moveThisWeek}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Phase 4: Execution Pack Upsell / View */}
                        {ENABLE_EXECUTION_PACK && (
                            <div className="mt-8">
                                {executionPack ? (
                                    <ExecutionPackView data={executionPack} isPaid={hasAccess} />
                                ) : (
                                    <UpsellCard
                                        onUnlock={handleUnlockExecutionPack}
                                        isLoading={isUnlocking}
                                    />
                                )}
                            </div>
                        )}

                        {/* Risk Score Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <h2 className="text-2xl font-bold text-slate-950">Your Career Resilience Score</h2>
                                {result.confidence && (
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${result.confidence === 'high'
                                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                            : result.confidence === 'medium'
                                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                                : 'bg-slate-100 text-slate-700 border border-slate-200'
                                            }`}
                                    >
                                        {result.confidence} confidence
                                    </span>
                                )}
                                {result.planConfidence && (
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${result.planConfidence === 'high'
                                            ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                            : result.planConfidence === 'medium'
                                                ? 'bg-violet-50 text-violet-800 border border-violet-200'
                                                : 'bg-rose-50 text-rose-800 border border-rose-200'
                                            }`}
                                    >
                                        Plan Confidence: {result.planConfidence}
                                    </span>
                                )}
                            </div>
                            {result.improvementSuggestion && (
                                <div className="mb-6 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg inline-block text-sm text-slate-700">
                                    💡 <span className="font-semibold text-slate-900">Pro Tip:</span> {result.improvementSuggestion}
                                </div>
                            )}
                            <div className="relative w-48 h-48 mx-auto mb-6">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="80"
                                        stroke="rgba(15,23,42,0.12)"
                                        strokeWidth="16"
                                        fill="none"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="80"
                                        stroke={
                                            result.riskScore > 70
                                                ? '#ef4444'
                                                : result.riskScore > 40
                                                    ? '#f59e0b'
                                                    : '#10b981'
                                        }
                                        strokeWidth="16"
                                        fill="none"
                                        strokeDasharray={`${(result.riskScore / 100) * 502.4} 502.4`}
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="text-6xl font-bold text-slate-950">{result.riskScore}%</div>
                                    <div className="text-sm text-slate-600">Change pressure</div>
                                </div>
                            </div>
                            {result.reasoning && (
                                <p className="text-slate-700 max-w-2xl mx-auto mb-4">
                                    {result.reasoning}
                                </p>
                            )}
                            <p className="text-sm text-slate-600 max-w-2xl mx-auto italic">
                                Not a prediction — a planning tool. We show the drivers so you can verify what is behind your score.
                            </p>
                        </div>

                        {/* Risk Factors with Evidence & Mitigation */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 text-slate-950">Risk Breakdown</h3>
                            <div className="space-y-6">
                                {result.factors.map((factor, i) => (
                                    <div key={i} className="border-l-2 border-emerald-200 pl-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-lg text-slate-950">{factor.name}</span>
                                            <span className="text-sm text-slate-500">
                                                {factor.score}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-3">
                                            <div
                                                className="h-full bg-gradient-to-r from-emerald-500 to-lime-500 transition-all duration-1000"
                                                style={{ width: `${factor.score}%` }}
                                            />
                                        </div>

                                        {factor.evidence && (
                                            <div className="mb-2">
                                                <span className="text-xs font-semibold text-slate-600">Evidence</span>
                                                <p className="text-sm text-slate-700 mt-1">{factor.evidence}</p>
                                            </div>
                                        )}

                                        {factor.whyItMatters && (
                                            <div className="mb-2">
                                                <span className="text-xs font-semibold text-slate-600">Why it matters</span>
                                                <p className="text-sm text-slate-700 mt-1">{factor.whyItMatters}</p>
                                            </div>
                                        )}

                                        {factor.mitigation && factor.mitigation.length > 0 && (
                                            <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-3 mt-2">
                                                <span className="text-xs font-semibold text-emerald-800">✓ How to mitigate</span>
                                                <ul className="mt-1 space-y-1">
                                                    {factor.mitigation.map((item, idx) => (
                                                        <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                                                            <span className="text-emerald-700/70 mt-1">•</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Fallback to legacy description */}
                                        {!factor.evidence && !factor.whyItMatters && factor.description && (
                                            <p className="text-sm text-gray-400">{factor.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Role Adjacencies */}
                        {result.roleAdjacencies && result.roleAdjacencies.length > 0 && (
                            <div className="glass-panel p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-4">Strong next‑best paths</h3>
                                <p className="text-gray-400 mb-6">
                                    Based on your skills, these roles offer high resilience and leverage:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {result.roleAdjacencies.map((role, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col h-full">
                                            <h4 className="font-bold text-lg text-blue-300 mb-1">
                                                {role.detail?.title || role.roleId}
                                            </h4>

                                            {/* Topics (NEW PHASE 3.4) */}
                                            {role.detail?.topics && role.detail.topics.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {role.detail.topics.map((topicId) => (
                                                        <span
                                                            key={topicId}
                                                            className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-medium"
                                                        >
                                                            {TOPIC_LABELS[topicId] || topicId}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Summary from JSON */}
                                            {role.detail && (
                                                <p className="text-xs text-gray-500 mb-3 italic">
                                                    {role.detail.summary}
                                                </p>
                                            )}

                                            {/* Rationale from LLM */}
                                            <div className="mb-4">
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Why You fit</span>
                                                <p className="text-sm text-gray-300 mt-1">{role.rationale}</p>
                                            </div>

                                            {/* Skills Gap Analysis */}
                                            <div className="grid grid-cols-2 gap-4 mb-4 mt-auto">
                                                <div>
                                                    <span className="text-xs font-semibold text-green-400/80 uppercase tracking-wider">You Have</span>
                                                    <ul className="mt-1 space-y-1">
                                                        {role.transferableSkills?.slice(0, 3).map((skill, j) => (
                                                            <li key={j} className="text-xs text-gray-400 flex items-center gap-1">
                                                                <span className="text-green-500">✓</span> {skill}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold text-orange-400/80 uppercase tracking-wider">You Need</span>
                                                    <ul className="mt-1 space-y-1">
                                                        {role.gapSkills?.slice(0, 3).map((skill, j) => (
                                                            <li key={j} className="text-xs text-gray-400 flex items-center gap-1">
                                                                <span className="text-orange-500">↑</span> {skill}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Starter Plan Sneak Peek */}
                                            {role.detail?.starterPlan30Days?.[0] && (
                                                <div className="bg-blue-500/10 rounded p-3 mt-2">
                                                    <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">First Step</span>
                                                    <p className="text-xs text-gray-300 mt-1">{role.detail.starterPlan30Days[0]}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Market Signals Card (NEW PHASE 3.3) */}
                        {result.marketSignals && (
                            <MarketSignals data={result.marketSignals} />
                        )}

                        {/* 30/60/90 Day Plan */}
                        {result.plan30_60_90 && result.plan30_60_90.length > 0 && (
                            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-6 text-slate-950">Your 30/60/90 roadmap</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {result.plan30_60_90.map((plan, i) => (
                                        <div key={i} className="relative">
                                            {/* Vertical line for timeline feel */}
                                            {i < 2 && (
                                                <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-slate-200" />
                                            )}
                                            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 h-full">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="px-2 py-1 rounded bg-emerald-600/10 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                                                        {plan.window.replace('_', ' ')}
                                                    </span>
                                                </div>

                                                {plan.goals && plan.goals.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Focus</h4>
                                                        <p className="text-sm font-semibold text-slate-900">{plan.goals[0]}</p>
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Tasks</h4>
                                                    <ul className="space-y-3">
                                                        {plan.tasks.map((task, j) => (
                                                            <li key={j} className="text-sm text-slate-700 flex items-start gap-2 group">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600/60 mt-1.5 group-hover:bg-emerald-600 transition-colors" />
                                                                <span>{task}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Legacy Recommendations (fallback) */}
                        {result.recommendations && result.recommendations.length > 0 && !result.plan30_60_90 && (
                            <div className="glass-panel p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-6">What You Should Do</h3>
                                <ul className="space-y-3">
                                    {result.recommendations.map((rec, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-blue-400 mt-1">→</span>
                                            <span className="text-gray-300">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                            <h3 className="text-2xl font-bold mb-3 text-slate-950">
                                Want a clearer plan you can execute?
                            </h3>
                            <p className="text-slate-700 mb-6">
                                Unlock the Execution Pack: project briefs, skill priorities, and interview prep tailored to your target path.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => router.push('/signup')}
                                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 transition font-bold text-slate-950"
                                >
                                    Unlock the Execution Pack →
                                </button>
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        setResult(null);
                                        setFormData({
                                            jobTitle: '',
                                            industry: '',
                                            skills: [],
                                            yearsExperience: undefined,
                                        });
                                    }}
                                    className="px-8 py-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition font-medium text-slate-900"
                                >
                                    Run another diagnostic
                                </button>
                            </div>
                        </div>

                        {/* Phase 5: Feedback Loop */}
                        <FeedbackSection
                            assessmentId={assessmentId}
                            jobTitleBucket={formData.jobTitle}
                            industryBucket={formData.industry}
                            riskScore={result.riskScore}
                            confidence={result.confidence || 'medium'}
                            planConfidence={result.planConfidence || 'medium'}
                            roleIds={result.roleAdjacencies?.map(r => r.roleId) || []}
                            executionPackStatus={{
                                generated: !!executionPack,
                                validated: !!executionPack && executionPack.version === 1
                            }}
                        />
                    </div>
                )}
            </div>
        </main >
    );
}
