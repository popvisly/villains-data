'use server';

import { supabaseAdmin } from '@/lib/supabase';
import type { FeedbackInput } from '@/types/feedback';

const HELPFUL_SECTIONS_ALLOWLIST = [
    'immediateActions',
    'plan30_60_90',
    'roleAdjacencies',
    'executionPack'
];

export async function submitFeedback(input: FeedbackInput) {
    // 1. Hardened Validation

    // Dedupe and validate sections
    const validatedSections = Array.from(new Set(input.helpfulParts))
        .filter(section => HELPFUL_SECTIONS_ALLOWLIST.includes(section))
        .slice(0, 4);

    // Capped comment
    const validatedComment = input.comment?.slice(0, 500);

    // Validate enum-like fields
    const validConfidences = ['low', 'medium', 'high'];
    const validatedConfidence = validConfidences.includes(input.confidence) ? input.confidence : 'medium';
    const validatedPlanConfidence = validConfidences.includes(input.planConfidence) ? input.planConfidence : 'medium';

    // Validate rating
    const validatedRating = Math.max(1, Math.min(5, input.rating));

    // Validate risk score
    const validatedRiskScore = Math.max(0, Math.min(100, input.riskScore));

    try {
        const { error } = await supabaseAdmin
            .from('assessment_feedback')
            .insert({
                schema_version: input.schemaVersion || 1,
                assessment_id: input.assessmentId,
                job_title_bucket: input.jobTitleBucket,
                industry_bucket: input.industryBucket,
                risk_score: validatedRiskScore,
                confidence: validatedConfidence,
                plan_confidence: validatedPlanConfidence,
                rating: validatedRating,
                most_helpful_sections: validatedSections,
                comment: validatedComment,
                execution_pack_generated: input.executionPackStatus?.generated || false,
                execution_pack_validation_failed: input.executionPackStatus?.validated === false
            });

        if (error) {
            console.error('Supabase feedback insert error:', error);
            throw new Error('Failed to save feedback to database.');
        }

        return { success: true };
    } catch (error) {
        console.error('Error in submitFeedback:', error);
        throw new Error('Internal server error while submitting feedback.');
    }
}
