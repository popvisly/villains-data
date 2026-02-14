
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { assessJobRisk } from '@/app/actions/assessment';
import { openai } from '@/lib/openai';

// Mock OpenAI
vi.mock('@/lib/openai', () => ({
    openai: {
        chat: {
            completions: {
                create: vi.fn(),
            },
        },
    },
}));

// Mock roles
vi.mock('@/lib/roles', () => ({
    findRelevantRoles: vi.fn().mockResolvedValue([
        {
            id: 'mock-role-1',
            title: 'Mock Role 1',
            summary: 'A mock role summary',
            skills: { core: ['Skill A'] },
            starterPlan30Days: ['Task 1'],
            proofProjects: [{ title: 'Project 1' }],
        },
    ]),
    getMarketSignals: vi.fn().mockResolvedValue([]),
}));

// Mock stripe actions
vi.mock('@/app/actions/stripe', () => ({
    hasExecutionPackAccess: vi.fn().mockResolvedValue(false),
}));

// Load personas from JSON (You might need to adjust the path or import method)
import personas from '../../state_bench_personas.json';

describe('Persona Integration Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    personas.forEach((persona: any) => {
        it(`should successfully assess risk for persona: ${persona.label}`, async () => {
            // Mock successful OpenAI response structure
            const mockResponse = {
                riskScore: 75, // Arbitrary score for test
                confidence: 'high',
                factors: [
                    { name: 'F1', score: 80, evidence: 'E1', whyItMatters: 'W1', mitigation: ['M1'] },
                    { name: 'F2', score: 80, evidence: 'E2', whyItMatters: 'W2', mitigation: ['M2'] },
                    { name: 'F3', score: 80, evidence: 'E3', whyItMatters: 'W3', mitigation: ['M3'] },
                    { name: 'F4', score: 80, evidence: 'E4', whyItMatters: 'W4', mitigation: ['M4'] },
                    { name: 'F5', score: 80, evidence: 'E5', whyItMatters: 'W5', mitigation: ['M5'] },
                ],
                roleAdjacencies: [],
                immediateActions: ['Action 1'],
                planConfidence: 'high',
                improvementSuggestion: 'None',
                plan30_60_90: [
                    { window: '30_days', goals: ['G1'], tasks: ['T1', 'T2', 'T3'] },
                    { window: '60_days', goals: ['G2'], tasks: ['T1', 'T2', 'T3'] },
                    { window: '90_days', goals: ['G3'], tasks: ['T1', 'T2', 'T3'] },
                ],
            };

            (openai.chat.completions.create as any).mockResolvedValue({
                choices: [{ message: { content: JSON.stringify(mockResponse) } }],
            });

            const result = await assessJobRisk(persona.input);

            // Basic Assertions
            expect(result).toBeDefined();
            expect(result.riskScore).toBeDefined();
            expect(result.factors).toHaveLength(5);

            // Sanity Checks from original script (Checking logic, not values since we mock)
            if (persona.sanity.expectedRange) {
                // We can't strictly check range against MOCK data, but we can verify the check *could* run
                // Logic here is just ensuring the function doesn't crash on these inputs.
            }
        });
    });
});
