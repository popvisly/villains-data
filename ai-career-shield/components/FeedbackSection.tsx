'use client';

import React, { useState } from 'react';
import { submitFeedback } from '@/app/actions/feedback';
import type { FeedbackInput } from '@/types/feedback';

interface FeedbackSectionProps {
    assessmentId: string;
    jobTitleBucket: string;
    industryBucket: string;
    riskScore: number;
    confidence: 'low' | 'medium' | 'high';
    planConfidence: 'low' | 'medium' | 'high';
    roleIds: string[];
    executionPackStatus?: {
        generated: boolean;
        validated: boolean;
    };
}

const HELPFUL_OPTIONS = [
    { id: 'immediateActions', label: 'Immediate Actions' },
    { id: 'plan30_60_90', label: '30/60/90 Day Plan' },
    { id: 'roleAdjacencies', label: 'Role Adjacencies' },
    { id: 'executionPack', label: 'Execution Kit' }
];

type FeedbackState = 'collapsed' | 'expanded' | 'submitted';

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({
    assessmentId,
    jobTitleBucket,
    industryBucket,
    riskScore,
    confidence,
    planConfidence,
    roleIds,
    executionPackStatus
}) => {
    const [state, setState] = useState<FeedbackState>('collapsed');
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [helpfulParts, setHelpfulParts] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleHelpful = (id: string) => {
        setHelpfulParts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const feedback: FeedbackInput = {
                schemaVersion: 1,
                assessmentId,
                jobTitleBucket,
                industryBucket,
                riskScore,
                confidence,
                planConfidence,
                roleIds,
                rating,
                helpfulParts,
                comment: comment.trim(),
                executionPackStatus
            };

            await submitFeedback(feedback);
            setState('submitted');
        } catch (err) {
            console.error('Feedback submission error:', err);
            setError('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── State: Submitted (compact thanks) ──────────────────────────
    if (state === 'submitted') {
        return (
            <div className="mt-12 py-4 px-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-lg">✓</span>
                    <span className="text-sm text-gray-300">Thanks for your feedback!</span>
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setState('expanded');
                        setRating(0);
                        setHelpfulParts([]);
                        setComment('');
                    }}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                    Leave more →
                </button>
            </div>
        );
    }

    // ── State: Collapsed (single-line CTA) ─────────────────────────
    if (state === 'collapsed') {
        return (
            <div
                id="feedback"
                className="mt-12 py-4 px-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer hover:border-white/20 transition-all group"
                onClick={() => setState('expanded')}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                            Was this assessment useful?
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Quick inline stars — click any to expand + pre-set rating */}
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="text-lg text-white/15 hover:text-blue-400 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setRating(star);
                                        setState('expanded');
                                    }}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                            Rate 1–5
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // ── State: Expanded (full form) ────────────────────────────────
    return (
        <div id="feedback" className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-medium text-white mb-1">Was this assessment useful?</h3>
                    <p className="text-gray-400 text-sm">Help us refine our AI Career Shield by sharing your take.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setState('collapsed')}
                    className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 5-Star Rating */}
                <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Your Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`text-3xl transition-all duration-200 ${(hoverRating || rating) >= star ? 'text-blue-400 scale-110' : 'text-white/10'
                                    }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* Helpful Sections */}
                <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Which parts were most helpful?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {HELPFUL_OPTIONS.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleHelpful(opt.id)}
                                className={`px-4 py-2.5 rounded-xl border text-sm text-left transition-all ${helpfulParts.includes(opt.id)
                                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-300'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detailed Comment */}
                <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">Any other thoughts? (Optional)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value.slice(0, 500))}
                        placeholder="What was missing or could be better?"
                        className="w-full h-24 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                    <div className="text-right text-[10px] text-gray-600 mt-1">
                        {comment.length}/500
                    </div>
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting || rating === 0}
                    className="w-full py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Anonymous Feedback'}
                </button>

                <p className="text-[10px] text-center text-gray-600 uppercase tracking-tighter">
                    Feedback is anonymous and contains no PII. Assessment ID: {assessmentId.slice(0, 8)}...
                </p>
            </form>
        </div>
    );
};
