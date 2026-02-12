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
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [helpfulParts, setHelpfulParts] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
            setSubmitted(true);
        } catch (err) {
            console.error('Feedback submission error:', err);
            setError('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                <h3 className="text-xl font-medium text-white mb-2">Thank you for your feedback!</h3>
                <p className="text-gray-400">Your input helps us improve the precision of these career assessments.</p>
            </div>
        );
    }

    return (
        <div id="feedback" className="mt-12 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-xl font-medium text-white mb-2">Was this assessment useful?</h3>
            <p className="text-gray-400 mb-6 text-sm">Help us refine our AI Career Shield by sharing your take.</p>

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
