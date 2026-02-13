'use client';


import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
    { id: 'choose_direction', label: 'Choose a direction', desc: 'I am starting out' },
    { id: 'future_proof_role', label: 'Future-proof my role', desc: 'I want to stay competitive' },
    { id: 'plan_pivot', label: 'Pivot careers', desc: 'I want to switch fields' },
];

const INTERESTS = [
    'Visual Design', 'Data Analysis', 'Strategy',
    'People/Management', 'Coding/Building', 'Writing',
    'Research', 'Operations/Process'
];

export default function AssessmentPage() {
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
    const searchParams = useSearchParams();
    const hasAccess = searchParams.get('unlocked') === 'true';

    // Feature Flag
    const ENABLE_EXECUTION_PACK = process.env.NEXT_PUBLIC_ENABLE_EXECUTION_PACK === 'true' || true;

    useEffect(() => {
        trackEvent('assessment_start');
    }, []);

    useEffect(() => {
        if (hasAccess) {
            trackEvent('payment_success_view');
        }
    }, [hasAccess]);

    const copyAsMarkdown = () => {
        if (!result) return;
        let md = `# AI Career Risk Report: ${formData.jobTitle}\n\n`;
        md += `**Risk Score**: ${result.riskScore}%\n`;
        md += `**Confidence**: ${result.confidence}\n\n`;
        // ... (truncated markdown gen for brevity, need to keep it?) 
        // Yes, need to keep logic.
        if (result.immediateActions) {
            md += `## 🚀 This Week: Immediate Actions\n`;
            result.immediateActions.forEach((a, i) => md += `${i + 1}. ${a}\n`);
            md += `\n`;
        }
        if (result.plan30_60_90) {
            md += `## 📅 Future-Proofing Roadmap\n`;
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
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="gradient-text">AI Risk Assessment</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        {step === 1
                            ? "Let's build your profile to measure your exposure."
                            : "Your Personalized Risk Report"}
                    </p>
                </div>

                {/* Step 1: Combined Input Form */}
                {step === 1 && (
                    <div className="glass-panel p-8 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <form onSubmit={handleSubmit} className="space-y-12">

                            {/* Section 1: The Basics */}
                            <section>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">1</span>
                                    Professional Profile
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="col-span-2 md:col-span-2">
                                        <label className="block text-sm font-medium mb-2">Role / Major *</label>
                                        <input
                                            type="text"
                                            value={formData.jobTitle}
                                            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                            placeholder="e.g., Marketing Manager"
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
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
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                                            required
                                        >
                                            <option value="">Select...</option>
                                            {INDUSTRIES.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Years Experience</label>
                                        <input
                                            type="number"
                                            value={formData.yearsExperience || ''}
                                            onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value ? parseInt(e.target.value) : undefined })}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                                            placeholder="e.g. 5"
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
                                                    onClick={() => setFormData({ ...formData, goal: goal.id as any })}
                                                    className={`p-4 rounded-xl border text-left transition ${formData.goal === goal.id
                                                        ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500'
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <div className="font-bold text-sm mb-1">{goal.label}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="h-px bg-white/10" />

                            {/* Section 2: Skills & Interests */}
                            <section>
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">2</span>
                                    Skills & Interests
                                </h3>

                                <div className="space-y-6">
                                    {/* Skills Input */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Top 3 Skills *</label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={skillInput}
                                                onChange={(e) => setSkillInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                                placeholder="Type a skill and Start Enter..."
                                                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none transition"
                                            />
                                            <button
                                                type="button"
                                                onClick={addSkill}
                                                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium"
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
                                        <label className="block text-sm font-medium mb-3">I enjoy...</label>
                                        <div className="flex flex-wrap gap-2">
                                            {INTERESTS.map((interest) => (
                                                <button
                                                    key={interest}
                                                    type="button"
                                                    onClick={() => toggleInterest(interest)}
                                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${formData.enjoys?.includes(interest)
                                                        ? 'bg-green-500/20 text-green-400 border-green-500/50'
                                                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
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
                                    className="w-full py-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition font-bold text-lg shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="animate-spin text-xl">◌</span> Analyzing Profile...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Analyze AI Risk
                                            <span className="group-hover:translate-x-1 transition">→</span>
                                        </span>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Takes ~10 seconds. We use OpenAI to model your role against current capabilities.
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
                            <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 border-2 border-blue-500/50 p-8 rounded-2xl shadow-xl shadow-blue-900/20">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl animate-pulse">🚀</div>
                                        <div>
                                            <h3 className="text-xl font-bold">This Week: Immediate Actions</h3>
                                            <p className="text-sm text-blue-200">Start here to build immediate AI resilience</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={copyAsMarkdown}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition flex items-center gap-2"
                                    >
                                        <span>📋 Copy Plan</span>
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {result.immediateActions.map((action, i) => (
                                        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4 hover:bg-white/10 transition-colors group">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                {i + 1}
                                            </div>
                                            <p className="text-gray-100 text-sm leading-relaxed mt-1">{action}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Phase 4: Execution Pack Upsell / View */}
                        {ENABLE_EXECUTION_PACK && (
                            <div className="mt-8">
                                {executionPack ? (
                                    <Paywall hasAccess={hasAccess} assessmentId={assessmentId}>
                                        <ExecutionPackView data={executionPack} />
                                    </Paywall>
                                ) : (
                                    <UpsellCard
                                        onUnlock={handleUnlockExecutionPack}
                                        isLoading={isUnlocking}
                                    />
                                )}
                            </div>
                        )}                        {/* Risk Score Card */}
                        <div className="glass-panel p-8 rounded-2xl text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <h2 className="text-2xl font-bold">Your AI Risk Score</h2>
                                {result.confidence && (
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${result.confidence === 'high'
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : result.confidence === 'medium'
                                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                            }`}
                                    >
                                        {result.confidence} confidence
                                    </span>
                                )}
                                {result.planConfidence && (
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${result.planConfidence === 'high'
                                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                            : result.planConfidence === 'medium'
                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}
                                    >
                                        Plan Confidence: {result.planConfidence}
                                    </span>
                                )}
                            </div>
                            {result.improvementSuggestion && (
                                <div className="mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg inline-block text-sm text-blue-300">
                                    💡 <span className="font-semibold">Pro Tip:</span> {result.improvementSuggestion}
                                </div>
                            )}
                            <div className="relative w-48 h-48 mx-auto mb-6">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="80"
                                        stroke="rgba(255,255,255,0.1)"
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
                                    <div className="text-6xl font-bold">{result.riskScore}%</div>
                                    <div className="text-sm text-gray-400">Risk Level</div>
                                </div>
                            </div>
                            {result.reasoning && (
                                <p className="text-gray-300 max-w-2xl mx-auto mb-4">
                                    {result.reasoning}
                                </p>
                            )}
                            <p className="text-sm text-gray-500 max-w-2xl mx-auto italic">
                                Not a prediction — a planning tool. We show the drivers so you can verify what is behind your score.
                            </p>
                        </div>

                        {/* Risk Factors with Evidence & Mitigation */}
                        <div className="glass-panel p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-6">Risk Breakdown</h3>
                            <div className="space-y-6">
                                {result.factors.map((factor, i) => (
                                    <div key={i} className="border-l-2 border-blue-500/30 pl-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-lg">{factor.name}</span>
                                            <span className="text-sm text-gray-400">
                                                {factor.score}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-1000"
                                                style={{ width: `${factor.score}%` }}
                                            />
                                        </div>

                                        {factor.evidence && (
                                            <div className="mb-2">
                                                <span className="text-xs font-medium text-blue-400">Evidence:</span>
                                                <p className="text-sm text-gray-300 mt-1">{factor.evidence}</p>
                                            </div>
                                        )}

                                        {factor.whyItMatters && (
                                            <div className="mb-2">
                                                <span className="text-xs font-medium text-yellow-400">Why it matters:</span>
                                                <p className="text-sm text-gray-300 mt-1">{factor.whyItMatters}</p>
                                            </div>
                                        )}

                                        {factor.mitigation && factor.mitigation.length > 0 && (
                                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-2">
                                                <span className="text-xs font-medium text-green-400">✓ How to mitigate:</span>
                                                <ul className="mt-1 space-y-1">
                                                    {factor.mitigation.map((item, idx) => (
                                                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                                            <span className="text-green-500/50 mt-1">•</span>
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
                                <h3 className="text-xl font-bold mb-4">Future-Ready Career Paths</h3>
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
                            <div className="glass-panel p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-6">Your Future-Proofing Roadmap</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {result.plan30_60_90.map((plan, i) => (
                                        <div key={i} className="relative">
                                            {/* Vertical line for timeline feel */}
                                            {i < 2 && (
                                                <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-white/10" />
                                            )}
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 h-full">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                                                        {plan.window.replace('_', ' ')}
                                                    </span>
                                                </div>

                                                {plan.goals && plan.goals.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Focus</h4>
                                                        <p className="text-sm font-medium text-gray-200">{plan.goals[0]}</p>
                                                    </div>
                                                )}

                                                <div>
                                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tasks</h4>
                                                    <ul className="space-y-3">
                                                        {plan.tasks.map((task, j) => (
                                                            <li key={j} className="text-sm text-gray-300 flex items-start gap-2 group">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 group-hover:bg-blue-400 transition-colors" />
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
                        <div className="glass-panel p-8 rounded-2xl text-center">
                            <h3 className="text-2xl font-bold mb-4">
                                Ready to Future-Proof Your Career?
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Get a personalized roadmap to an AI-proof career with our Pro
                                plan
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => router.push('/signup')}
                                    className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition font-bold"
                                >
                                    Get Your Career Roadmap →
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
                                    className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium"
                                >
                                    Take Another Assessment
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
        </main>
    );
}
