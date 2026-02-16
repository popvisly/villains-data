'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics-client';
import { experimental_useObject as useObject } from 'ai/react';
import { attentionResultSchema, type AttentionInput, type AttentionResult } from '@/types/attention';
import { APP_NAME, BRAND_CONFIG } from '@/lib/brand';
import { Paywall } from '@/components/Paywall';

const SLOP_ENTRIES = [
    { id: 'social', label: 'Social Feeds', desc: 'LinkedIn, X, infinite scroll' },
    { id: 'newsletters', label: 'Newsletter Bloat', desc: 'The "unread 50" problem' },
    { id: 'noise', label: 'Internal Noise', desc: 'Slack, Teams, constant pings' },
    { id: 'video', label: 'YouTube Rabbit Holes', desc: 'Educational entertainment' },
    { id: 'notifications', label: 'Notifications / Doom Pings', desc: 'Phone and app alerts' },
    { id: 'ai', label: 'Generic AI Chat', desc: 'Asking LLMs random things' },
];

const GOAL_EXAMPLES = [
    'Ship portfolio proof',
    'Switch roles',
    'Get promoted',
    'Build a side product',
    'Return to deep work'
];

const TIME_WINDOWS = ['0-15m', '15-45m', '45-90m', '90m+'] as const;

export default function AttentionClient({ hasAccess }: { hasAccess: boolean }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<AttentionInput>({
        slopEntryPoints: [],
        outputGoal: '',
        cleanThoughtMinutes: '0-15m',
        highStakesTopics: [],
        consumeBuildRatio: 80, // Default to 80% consume
    });
    const [topicInput, setTopicInput] = useState('');
    const [result, setResult] = useState<AttentionResult | null>(null);

    const { submit, isLoading } = useObject({
        api: '/api/attention',
        schema: attentionResultSchema,
        onFinish: ({ object }) => {
            if (object) {
                setResult(object as unknown as AttentionResult);
                setStep(3); // Result step
                trackEvent('attention_audit_complete');
            }
        },
    });

    const toggleSlopEntry = (id: string) => {
        setFormData(prev => ({
            ...prev,
            slopEntryPoints: prev.slopEntryPoints.includes(id)
                ? prev.slopEntryPoints.filter(i => i !== id)
                : [...prev.slopEntryPoints, id]
        }));
    };

    const addTopic = () => {
        if (topicInput.trim() && !formData.highStakesTopics.includes(topicInput.trim())) {
            setFormData(prev => ({
                ...prev,
                highStakesTopics: [...prev.highStakesTopics, topicInput.trim()]
            }));
            setTopicInput('');
        }
    };

    const handleSubmit = () => {
        trackEvent('attention_audit_start', { goal: formData.outputGoal });
        setStep(2); // Loading/Streaming step
        submit(formData);
    };

    if (step === 1) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{APP_NAME} | Attention Audit</h1>
                    <p className="text-slate-600 font-medium italic">{BRAND_CONFIG.philosophy}</p>
                </div>

                <div className="space-y-12">
                    {/* Q1: Slop Entry */}
                    <section>
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Icon name="eyeOff" size={20} className="text-indigo-600" />
                            Where does the &ldquo;Slop&rdquo; enter your day?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {SLOP_ENTRIES.map(entry => (
                                <button
                                    key={entry.id}
                                    onClick={() => toggleSlopEntry(entry.id)}
                                    className={`p-4 rounded-xl border text-left transition-all ${formData.slopEntryPoints.includes(entry.id)
                                        ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="font-medium text-slate-900">{entry.label}</div>
                                    <div className="text-xs text-slate-500">{entry.desc}</div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Q2: Output Goal */}
                    <section>
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Icon name="target" size={20} className="text-indigo-600" />
                            What is your primary Output Goal? (Next 90 days)
                        </h2>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {GOAL_EXAMPLES.map(example => (
                                    <button
                                        key={example}
                                        onClick={() => setFormData({ ...formData, outputGoal: example })}
                                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-all"
                                    >
                                        + {example}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={formData.outputGoal}
                                onChange={e => setFormData({ ...formData, outputGoal: e.target.value })}
                                placeholder="e.g. Switch into a Senior Product Role"
                                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </section>

                    {/* Q3: Clean Thought */}
                    <section>
                        <h2 className="text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
                            <Icon name="time" size={20} className="text-indigo-600" />
                            &ldquo;Clean Thought&rdquo; minutes per day?
                        </h2>
                        <p className="text-xs text-slate-500 mb-4">Uninterrupted, offline, no-scroll time you can think/build.</p>
                        <div className="flex flex-wrap gap-2">
                            {TIME_WINDOWS.map(window => (
                                <button
                                    key={window}
                                    onClick={() => setFormData({ ...formData, cleanThoughtMinutes: window })}
                                    className={`px-4 py-2 rounded-full border text-sm transition-all ${formData.cleanThoughtMinutes === window
                                        ? 'bg-indigo-600 border-indigo-600 text-white'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    {window}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Q4: Topics */}
                    <section>
                        <h2 className="text-lg font-semibold text-slate-900 mb-1 flex items-center gap-2">
                            <Icon name="zap" size={20} className="text-indigo-600" />
                            High-stakes topics for your career?
                        </h2>
                        <p className="text-xs text-slate-500 mb-4">e.g. salary negotiation, role pivot, manager conversation, redundancy risk</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.highStakesTopics.map(topic => (
                                <span key={topic} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm flex items-center gap-1">
                                    {topic}
                                    <button onClick={() => setFormData(prev => ({ ...prev, highStakesTopics: prev.highStakesTopics.filter(t => t !== topic) }))}>
                                        <Icon name="close" size={14} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={topicInput}
                                onChange={e => setTopicInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addTopic()}
                                placeholder="Add a topic..."
                                className="flex-1 p-3 rounded-lg border border-slate-200 outline-none"
                            />
                            <button onClick={addTopic} className="px-4 py-2 bg-slate-900 text-white rounded-lg">Add</button>
                        </div>
                    </section>

                    {/* Q5: Ratio */}
                    <section>
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Icon name="chart" size={20} className="text-indigo-600" />
                            Current &ldquo;Consume vs Build&rdquo; Ratio
                        </h2>
                        <div className="space-y-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={formData.consumeBuildRatio}
                                onChange={e => setFormData({ ...formData, consumeBuildRatio: parseInt(e.target.value) })}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                            />
                            <div className="flex justify-between text-xs font-medium text-slate-500 uppercase tracking-widest">
                                <span>{100 - formData.consumeBuildRatio}% Consume</span>
                                <span>{formData.consumeBuildRatio}% Build</span>
                            </div>
                        </div>
                    </section>

                    <button
                        onClick={handleSubmit}
                        disabled={!formData.outputGoal || isLoading}
                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                        Generate My Attention Plan
                    </button>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <div className="inline-flex items-center justify-center p-4 bg-indigo-50 text-indigo-600 rounded-full mb-6">
                    <Icon name="loader" size={32} className="animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing your focus profile...</h2>
                <p className="text-slate-500">Building your &ldquo;Anti-Slop&rdquo; protocol and signal sprint.</p>
            </div>
        );
    }

    if (step === 3 && result) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Attention Plan (90 Days)</h1>
                    <p className="text-slate-600 font-medium">{BRAND_CONFIG.philosophy}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2">
                        <Paywall
                            hasAccess={hasAccess}
                            planId="attention_v1" // Dynamic ID could be added later if persisted
                            type="attention"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                {/* Rules */}
                                <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Icon name="shield" size={24} className="text-indigo-600" />
                                        Anti-Slop Protocol
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">No-Slop Rules</h4>
                                            <ul className="space-y-2">
                                                {result.protocol.noSlopRules.map((rule, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-slate-700">
                                                        <Icon name="check" size={16} className="text-green-500 mt-0.5" />
                                                        {rule}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Briefing */}
                                <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <Icon name="file" size={24} className="text-indigo-400" />
                                        Daily Briefing Template
                                    </h3>
                                    <div className="space-y-4 font-mono text-sm border-l-2 border-indigo-500/30 pl-4 py-2">
                                        <p><span className="text-indigo-400"># Focus:</span> {result.dailyBriefingTemplate.marketSignal}</p>
                                        <p><span className="text-indigo-400"># Edge:</span> {result.dailyBriefingTemplate.skillSignal}</p>
                                        <p><span className="text-indigo-400"># Action:</span> {result.dailyBriefingTemplate.buildPrompt}</p>
                                    </div>
                                    <button
                                        className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2"
                                        onClick={() => {
                                            if (hasAccess) {
                                                navigator.clipboard.writeText(JSON.stringify(result.dailyBriefingTemplate, null, 2));
                                            }
                                        }}
                                    >
                                        <Icon name="copy" size={16} />
                                        Copy Template
                                    </button>
                                </div>
                            </div>

                            {/* Signal Sprint */}
                            <div className="p-8 rounded-2xl bg-indigo-600 text-white">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Icon name="rocket" size={24} />
                                    Weekly Signal Sprint
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white/10 p-4 rounded-xl">
                                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">The Input</span>
                                        <p className="mt-2 text-sm font-medium">{result.signalSprint.deepRead}</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-xl">
                                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">The Build</span>
                                        <p className="mt-2 text-sm font-medium">{result.signalSprint.artifactGoal}</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-xl">
                                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">The Proof</span>
                                        <p className="mt-2 text-sm font-medium">{result.signalSprint.publishGoal}</p>
                                    </div>
                                </div>
                            </div>
                        </Paywall>
                    </div>

                    {/* Grounded Use Protocol */}
                    <div className="md:col-span-2 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Icon name="scale" size={24} className="text-indigo-600" />
                                Grounded AI Protocol
                            </h3>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 uppercase tracking-wide">
                                <Icon name="shield" size={12} /> Tool, Not Authority
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Guardrails</h4>
                                <ul className="space-y-3">
                                    {result.groundedUseProtocol.boundaries.map((b, i) => (
                                        <li key={i} className="text-sm text-slate-700 flex gap-2">
                                            <span className="text-indigo-400 font-bold">#</span> {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Preferred Modes</h4>
                                <ul className="space-y-3">
                                    {result.groundedUseProtocol.preferredModes.map((m, i) => (
                                        <li key={i} className="text-sm text-slate-700 flex gap-2">
                                            <Icon name="zap" size={14} className="text-amber-500 mt-1" /> {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Redlines</h4>
                                <ul className="space-y-3">
                                    {result.groundedUseProtocol.oracleRedlines.map((r, i) => (
                                        <li key={i} className="text-sm text-slate-700 flex gap-2">
                                            <Icon name="warning" size={14} className="text-rose-500 mt-1" /> {r}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                                    <Icon name="time" size={14} /> Log-Off Step
                                </h4>
                                <p className="text-sm text-slate-700 italic border-l-2 border-indigo-200 pl-4">
                                    {result.groundedUseProtocol.logOffStep}
                                </p>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                                    <Icon name="scale" size={14} /> Confidence & Tradeoffs
                                </h4>
                                <p className="text-sm text-slate-700">
                                    {result.groundedUseProtocol.confidenceFraming}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Safety Footer */}
                <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                        This plan is a strategic compass, not clinical advice.
                        <strong> This product is not a substitute for professional advice.</strong> <br />
                        If you feel unsafe or in immediate danger, call <strong className="text-slate-500">000</strong>. <br />
                        If you need someone to talk to: <strong className="text-slate-500">Lifeline 13 11 14</strong>. <br />
                        For support: <strong className="text-slate-500">Beyond Blue 1300 22 4636</strong>.
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
