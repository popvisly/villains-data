import { z } from 'zod';

export const attentionInputSchema = z.object({
    slopEntryPoints: z.array(z.string()),
    outputGoal: z.string(),
    cleanThoughtMinutes: z.enum(['0-15m', '15-45m', '45-90m', '90m+']),
    highStakesTopics: z.array(z.string()),
    buildRatio: z.number().min(0).max(100), // 0 = 100% consume, 100 = 100% build
});

export type AttentionInput = z.infer<typeof attentionInputSchema>;

export const attentionResultSchema = z.object({
    protocol: z.object({
        noSlopRules: z.array(z.string()),
        allowedSources: z.array(z.string()),
        guardedHours: z.string(),
    }),
    dailyBriefingTemplate: z.object({
        marketSignal: z.string(),
        skillSignal: z.string(),
        buildPrompt: z.string(),
    }),
    signalSprint: z.object({
        deepRead: z.string(),
        artifactGoal: z.string(),
        publishGoal: z.string(),
    }),
    groundedUseProtocol: z.object({
        boundaries: z.array(z.string()),
        preferredModes: z.array(z.string()),
        oracleRedlines: z.array(z.string()),
        logOffStep: z.string(),
        confidenceFraming: z.string(),
    }),
});

export type AttentionResult = z.infer<typeof attentionResultSchema>;
