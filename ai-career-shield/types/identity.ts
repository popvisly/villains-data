import { z } from 'zod';

export const positioningVariantSchema = z.object({
    id: z.enum(['high_leverage', 'ai_native', 'strategic_operator']),
    title: z.string(),
    tagline: z.string(),
    bio: z.string(),
    keyEvidence: z.array(z.string()),
    linkedinHeadline: z.string(),
});

export type PositioningVariant = z.infer<typeof positioningVariantSchema>;

export const proofArchiveItemSchema = z.object({
    category: z.enum(['thesis', 'builds', 'protocol']),
    title: z.string(),
    description: z.string(),
    sourceModule: z.enum(['career', 'attention']),
    status: z.enum(['ready', 'in_progress', 'locked']),
});

export type ProofArchiveItem = z.infer<typeof proofArchiveItemSchema>;

export const identityResultSchema = z.object({
    unifyingTheme: z.string(),
    variants: z.array(positioningVariantSchema),
    archive: z.array(proofArchiveItemSchema),
    proofPosts: z.array(z.object({
        platform: z.enum(['linkedin', 'twitter', 'internal']),
        title: z.string(),
        content: z.string(),
        derivedFrom: z.string() // Reference to an archive item
    }))
});

export type IdentityResult = z.infer<typeof identityResultSchema>;

export const identityInputSchema = z.object({
    careerContext: z.any().optional(), // AssessmentResult
    attentionContext: z.any().optional(), // AttentionResult
    selectedPersona: z.string().optional(),
});

export type IdentityInput = z.infer<typeof identityInputSchema>;
