import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { NextRequest } from 'next/server';
import { identityResultSchema } from '@/types/identity';

import { AssessmentResult } from '@/types';

export const maxDuration = 30;

export async function POST(_req: NextRequest) {
    const context = await _req.json();
    const { careerContext, attentionContext }: { careerContext: AssessmentResult | null, attentionContext: Record<string, unknown> | null } = context;

    // Extract core signals for the prompt
    // Career: jobTitle, industry, leverage Factors, teaser thesis
    // Attention: outputGoal, buildRatio, protocol boundaries

    const careerSignals = careerContext ? {
        title: careerContext.reasoning || 'Professional', // Fallback as result object might not have jobTitle top-level
        industry: careerContext.marketSignals?.label || 'Knowledge Work',
        thesis: careerContext.teaserNarrative?.positioningThesis || '',
        proofPoints: careerContext.teaserNarrative?.proofPoints?.map((p: Record<string, unknown>) => p.bullet as string) || []
    } : null;

    const attentionSignals = attentionContext ? {
        goal: (attentionContext as Record<string, unknown>).outputGoal as string || '',
        buildRatio: (attentionContext as Record<string, unknown>).buildRatio as number || 20,
        protocol: (attentionContext as Record<string, unknown>).protocol as string[] || []
    } : null;

    const result = streamObject({
        model: openai('gpt-4o-mini'),
        schema: identityResultSchema,
        system: `You are a High-Stakes Brand Strategist and Professional Recruiter specializing in the "People Plan" philosophy.
             Your goal is to synthesize a user's Career Audit and Attention Protocol into a unified professional Identity.
             
             THE PHILOSOPHY (People Plan: Identity):
             1. PROOF OVER PROMISE: High-leverage professionals prove value through artifacts, not credentials.
             2. POSITIONING IS EXCLUSION: Good positioning tells the world what you DON'T do as much as what you do.
             3. THE OPERATING SYSTEM: Your attention protocol is your competitive moat.
             
             USER SIGNALS:
             - Career Foundation: ${JSON.stringify(careerSignals)}
             - Operational Protocol: ${JSON.stringify(attentionSignals)}
             
             INSTRUCTIONS:
             1. Generate a "unifyingTheme" (3-5 words) that bridges their career target with their output goals.
             2. Create 3 "positioningVariants":
                - high_leverage: Focus on high-stakes judgment and agency.
                - ai_native: Focus on high-velocity building and AI-augmented output.
                - strategic_operator: Focus on attention management and "deep work" as a service.
             3. Generate a "Proof Archive" (4-6 items):
                - Categorize evidence into 'thesis', 'builds', or 'protocol'.
                - Status: 'ready' (existing proof) or 'in_progress' (output goals).
             4. Generate 3 "proofPosts":
                - platform: 'linkedin' | 'twitter' | 'internal'
                - title: A short descriptive title for the post.
                - content: 1-2 paragraphs of artifact-driven narrative.
                - derivedFrom: Reference exactly which archive item this proves.
             
             TONE: Premium, calibrated, authoritative, and clinical. Avoid marketing fluff.`,
        prompt: `Synthesize a professional Identity for a ${careerSignals?.title || 'Knowledge Worker'} focused on ${attentionSignals?.goal || 'strategic growth'}.`,
    });

    return result.toTextStreamResponse();
}
