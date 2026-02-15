import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { NextRequest } from 'next/server';
import { findRelevantRoles } from '@/app/actions/assessment';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const context = await req.json();
    const { jobTitle, industry, skills, yearsExperience, audience } = context;

    // 1. Get candidate roles for grounding
    const candidateRoles = await findRelevantRoles(context);
    const candidatesContext = candidateRoles.map(r => ({
        id: r.id,
        title: r.title,
        summary: r.summary,
        coreSkills: r.skills.core,
        starterPlan: r.starterPlan30Days,
        proofProjects: r.proofProjects
    }));

    const result = streamObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
            riskScore: z.number().min(0).max(100),
            confidence: z.enum(['low', 'medium', 'high']),
            factors: z.array(z.object({
                name: z.string(),
                score: z.number().min(0).max(100),
                evidence: z.string(),
                whyItMatters: z.string(),
                mitigation: z.array(z.string())
            })),
            roleAdjacencies: z.array(z.object({
                roleId: z.string(),
                rationale: z.string(),
                transferableSkills: z.array(z.string()),
                gapSkills: z.array(z.string())
            })),
            immediateActions: z.array(z.string()),
            plan30_60_90: z.array(z.object({
                window: z.enum(['30_days', '60_days', '90_days']),
                goals: z.array(z.string()),
                tasks: z.array(z.string())
            })),
            heatmap: z.array(z.object({
                label: z.string(),
                state: z.enum(['melting', 'compounding', 'stable']),
                discretion: z.number().min(1).max(10),
                automation: z.number().min(1).max(10),
                why: z.string()
            }))
        }),
        system: `You are an expert career analyst focused on AI automation risk. 
             Analyze the user's situation and provide a strategic resilience roadmap.
             
             PERSONA CONTEXT: ${audience || 'professional'}
             
             Specialized Track Guidelines:
             - PROFESSIONAL: Focus on "Discretion Leverage" and "Failure-Mode Prep".
             - STUDENT: Focus on "Skill Acquisition Ordering" and "Internship Leverage".
             - TEACHER: Focus on "Workflow Compression (Grading/Prep)" vs "Mentorship Moat".
             
             AVAILABLE FUTURE PATHS (Grounding):
             ${JSON.stringify(candidatesContext)}
             
             Rules:
             - Select 2-3 role adjacencies from the candidates above.
             - Be urgent but constructive.
             - Ground the 30/60/90 plan in the starterPlan and proofProjects of selected roles.
             - Generate 4-6 heatmap cells that specifically contrast "Melting" (repeatable execution) with "Compounding" (high-stakes judgment).`,
        prompt: `Analyze this context: 
             Persona: ${audience || 'Professional'}
             Subject/Title: ${jobTitle}
             Industry/Field: ${industry}
             Skills: ${skills.join(', ')}
             Experience: ${yearsExperience || 'Not specified'}`,
    });

    return result.toTextStreamResponse();
}
