'use client';

import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { trackEvent } from '@/lib/analytics-client';

interface PostPurchaseSurveyProps {
    assessmentId: string;
}

const SURVEY_OPTIONS = [
    { id: 'new_role', label: 'Need a 30/60/90 plan for a new role' },
    { id: 'prove_value', label: 'Need to prove value in my current role' },
    { id: 'ai_displacement', label: 'Worried about AI displacement' },
    { id: 'methodology', label: 'Curious about the methodology' },
    { id: 'other', label: 'Other' }
];

export const PostPurchaseSurvey: React.FC<PostPurchaseSurveyProps> = ({ assessmentId }) => {
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (optionId: string) => {
        trackEvent('post_purchase_survey_submitted', {
            assessmentId,
            reason: optionId
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 animate-in fade-in duration-500">
                <div className="flex items-center gap-3">
                    <Icon name="check" size={18} className="text-emerald-500" />
                    <p className="text-sm font-bold text-emerald-900">Thanks for sharing! This helps us improve the templates.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">One quick question (optional)</h3>
            <p className="text-sm text-slate-500 mb-6">What made you decide to unlock the full suite today?</p>

            <div className="grid gap-3">
                {SURVEY_OPTIONS.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className="w-full px-5 py-3 text-sm text-left font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all hover:translate-x-1"
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Your feedback is anonymous and helps us prioritize new modules.
            </p>
        </div>
    );
};
