'use server';

import { openai } from '@/lib/openai';
import { FRONTIER_ROLES } from '@/data/frontierRoles';
import { MatchResult } from '@/types/executionPack';
import { hasExecutionPackAccess } from '@/app/actions/stripe';

export async function matchResume(resumeText: string): Promise<MatchResult> {
    const entitled = await hasExecutionPackAccess();
    if (!entitled) {
        throw new Error('This feature requires a premium plan.');
    }

    const prompt = `You are an elite career matching analyst. Compare the following resume text against our library of 10 frontier AI roles.

RESUME TEXT:
"${resumeText}"

ROLE LIBRARY:
${JSON.stringify(FRONTIER_ROLES, null, 2)}

INSTRUCTIONS:
1. Rank all 10 roles by their "Fit Score" (0-100) based on the user's skills and experience.
2. Provide a brief "reasoning" for each match (1-2 sentences).
3. Identify "strengths" (skills that match) and "criticalGaps" (skills or experiences missing for that role).
4. Highly reward roles that align with the user's specific technical or operational background.
5. Return ONLY valid JSON matching the MatchResult schema.

SCHEMA:
{
  "matches": [
    {
      "roleTitle": string,
      "fitScore": number (0-100),
      "reasoning": string,
      "strengths": string[],
      "criticalGaps": string[]
    }
  ]
}

Ensure all 10 roles are included in the results, ranked from highest fit to lowest.`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert career analyst who provides high-precision role matching and gap analysis.'
                },
                { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.3,
        });

        const raw = response.choices[0].message.content || '{"matches": []}';
        return JSON.parse(raw) as MatchResult;
    } catch (error) {
        console.error('Error matching resume:', error);
        throw new Error('Failed to analyze resume. Please try again.');
    }
}
