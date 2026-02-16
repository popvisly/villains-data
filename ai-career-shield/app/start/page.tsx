'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { ROUTES } from '@/lib/brand';

const PLANS = [
    {
        id: 'career',
        title: 'Career Plan',
        subtitle: '(Throughput)',
        desc: 'Direction + a 30/60/90 build sequence',
        output: [
            'Leverage Map',
            'Trajectories',
            'Proof‑of‑Work briefs',
        ],
        cta: 'Generate Career Plan',
        href: ROUTES.CAREER,
        status: 'active',
        icon: 'professional',
        color: 'indigo'
    },
    {
        id: 'attention',
        title: 'Attention Plan',
        subtitle: '(Input)',
        desc: 'Filter slop, protect clean thought, increase output',
        output: [
            'Anti‑Slop protocol',
            'Daily briefing',
            'Weekly sprint',
        ],
        cta: 'Generate Attention Plan',
        href: ROUTES.ATTENTION,
        status: 'active',
        icon: 'eyeOff',
        color: 'emerald'
    },
    {
        id: 'identity',
        title: 'Identity Plan',
        subtitle: '(Output)',
        desc: 'Turn work into receipts (proof over promise)',
        output: [
            'Positioning statement',
            'Proof archive',
            'Share-ready kit',
        ],
        cta: 'Generate Identity Plan',
        href: ROUTES.IDENTITY,
        status: 'active',
        icon: 'shield',
        color: 'slate'
    },
    {
        id: 'capacity',
        title: 'Capacity Plan',
        subtitle: '(Sustain)',
        desc: 'Protect energy so you can ship consistently',
        output: [
            'Energy budget',
            'Guardrails',
            'Minimum viable day',
        ],
        cta: 'Generate Capacity Plan',
        href: '/capacity',
        status: 'upcoming',
        icon: 'zap',
        color: 'amber'
    }
];

const QUIZ_QUESTIONS = [
    {
        id: 'pain',
        question: 'What hurts most right now?',
        options: [
            { label: 'Noise & Overwhelm', value: 'attention' },
            { label: 'Uncertain Direction', value: 'career' },
            { label: 'Lack of Credibility', value: 'identity' },
            { label: 'Burnout & Low Energy', value: 'capacity' }
        ]
    },
    {
        id: 'timeline',
        question: 'What is your primary timeline?',
        options: [
            { label: '7 Days (Fix noise)', value: 'attention' },
            { label: '30 Days (Start pivot)', value: 'career' },
            { label: '90 Days (Proof archive)', value: 'identity' },
            { label: 'Indefinite (Sustainability)', value: 'capacity' }
        ]
    }
];

export default function StartPage() {
    const [quizIndex, setQuizIndex] = useState(-1); // -1 means show plans, >=0 means show quiz
    const [selections, setSelections] = useState<Record<string, string>>({});

    const handleQuizOption = (value: string) => {
        const nextSelections = { ...selections, [QUIZ_QUESTIONS[quizIndex].id]: value };
        setSelections(nextSelections);

        if (quizIndex < QUIZ_QUESTIONS.length - 1) {
            setQuizIndex(quizIndex + 1);
        } else {
            // End of quiz - find best match
            // Simple heuristic: if timeline matches a plan, go for it
            const recommendedId = nextSelections.timeline || nextSelections.pain;
            const element = document.getElementById(`plan-${recommendedId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.classList.add('ring-2', 'ring-indigo-600', 'ring-offset-4');
                setTimeout(() => element.classList.remove('ring-2', 'ring-indigo-600', 'ring-offset-4'), 3000);
            }
            setQuizIndex(-1);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Choose your module</h1>
                    <p className="text-lg text-slate-600 mb-2">Your AI‑Life Plan is made of 4 modules. Start with the one that hurts most.</p>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">An AI‑Life Plan is a leverage plan, not a schedule.</p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            id={`plan-${plan.id}`}
                            className={`flex flex-col rounded-3xl p-8 transition-all h-full
                                ${plan.status === 'upcoming'
                                    ? 'bg-slate-100/50 border border-slate-200 opacity-60'
                                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1'}`}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`p-3 rounded-2xl bg-${plan.color === 'emerald' ? 'emerald' : plan.color === 'indigo' ? 'indigo' : 'slate'}-50 text-${plan.color === 'emerald' ? 'emerald' : plan.color === 'indigo' ? 'indigo' : 'slate'}-600`}>
                                    <Icon name={plan.icon as "professional" | "eyeOff" | "shield"} size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-xl">{plan.title}</h3>
                                    {plan.subtitle && <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{plan.subtitle}</p>}
                                </div>
                            </div>

                            <p className="text-slate-600 mb-8 flex-grow">{plan.desc}</p>

                            <div className="space-y-4 mb-10">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">deliverables</h4>
                                <ul className="space-y-2">
                                    {plan.output.map((item, i) => (
                                        <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                                            <Icon name="check" size={14} className="text-indigo-400 mt-1 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {plan.status === 'active' ? (
                                <Link
                                    href={plan.href}
                                    className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-center hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                                >
                                    {plan.cta}
                                </Link>
                            ) : (
                                <button disabled className="w-full py-4 rounded-xl bg-slate-200 text-slate-400 font-bold cursor-not-allowed">
                                    {plan.cta}
                                </button>
                            )}

                            <p className="mt-4 text-center text-xs text-slate-400 font-medium tracking-tight">
                                No sign-up / ~7 minutes
                            </p>
                        </div>
                    ))}
                </div>

                {/* Helper / Quiz Section */}
                <div className="mt-24 max-w-2xl mx-auto text-center">
                    {quizIndex === -1 ? (
                        <button
                            onClick={() => setQuizIndex(0)}
                            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            <Icon name="professional" size={16} />
                            Not sure which plan you need? Let us help.
                        </button>
                    ) : (
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in zoom-in duration-300">
                            <h3 className="text-xl font-bold text-slate-900 mb-8">{QUIZ_QUESTIONS[quizIndex].question}</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {QUIZ_QUESTIONS[quizIndex].options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleQuizOption(opt.value)}
                                        className="p-4 rounded-xl border border-slate-200 text-left hover:border-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-between group"
                                    >
                                        <span className="font-bold text-slate-700 group-hover:text-indigo-700">{opt.label}</span>
                                        <Icon name="arrowRight" size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setQuizIndex(-1)}
                                className="mt-6 text-xs text-slate-400 hover:text-slate-600 font-medium"
                            >
                                Nevermind, I&apos;ll pick myself.
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
