
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

describe('assessJobRisk', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockInput = {
        jobTitle: 'Test Job',
        industry: 'Test Industry',
        skills: ['Skill A'],
        yearsExperience: 5,
        formattedExp: '5 years',
        goal: 'future_proof_role' as const,
        experienceLevel: 'mid' as const,
        enjoys: [],
        audience: 'professional' as const,
    };

    it('should return a valid assessment result when OpenAI returns valid JSON', async () => {
        const mockReponse = {
            riskScore: 65,
            confidence: 'high',
            factors: [
                { name: 'Factor 1', score: 60, evidence: 'Ev 1', whyItMatters: 'Why 1', mitigation: ['Mit 1'] },
                { name: 'Factor 2', score: 60, evidence: 'Ev 2', whyItMatters: 'Why 2', mitigation: ['Mit 2'] },
                { name: 'Factor 3', score: 60, evidence: 'Ev 3', whyItMatters: 'Why 3', mitigation: ['Mit 3'] },
                { name: 'Factor 4', score: 60, evidence: 'Ev 4', whyItMatters: 'Why 4', mitigation: ['Mit 4'] },
                { name: 'Factor 5', score: 60, evidence: 'Ev 5', whyItMatters: 'Why 5', mitigation: ['Mit 5'] },
            ],
            roleAdjacencies: [],
            immediateActions: ['Action 1'],
            planConfidence: 'high',
            improvementSuggestion: 'None',
            plan30_60_90: [
                { window: '30_days', goals: ['G1'], tasks: ['T1'] },
                { window: '60_days', goals: ['G2'], tasks: ['T2'] },
                { window: '90_days', goals: ['G3'], tasks: ['T3'] },
            ],
        };

        (openai.chat.completions.create as any).mockResolvedValue({
            choices: [{ message: { content: JSON.stringify(mockReponse) } }],
        });

        const result = await assessJobRisk(mockInput);

        expect(result.riskScore).toBe(65);
        expect(result.confidence).toBe('high');
        expect(result.factors).toHaveLength(5);
    });

    it('should repair the result if factors are missing', async () => {
        const incompleteResponse = {
            riskScore: 50,
            confidence: 'medium',
            factors: [
                { name: 'Factor 1', score: 50, evidence: 'Ev 1', whyItMatters: 'Why 1', mitigation: ['Mit 1'] },
            ], // Only 1 factor, expects 5
        };

        (openai.chat.completions.create as any).mockResolvedValue({
            choices: [{ message: { content: JSON.stringify(incompleteResponse) } }],
        });

        const result = await assessJobRisk(mockInput);

        expect(result.factors.length).toBeGreaterThanOrEqual(5);
        expect(result.factors[1].name).toContain('Information Completeness');
    });

    it('should throw an error if OpenAI returns invalid JSON', async () => {
        (openai.chat.completions.create as any).mockResolvedValue({
            choices: [{ message: { content: 'Invalid JSON' } }],
        });

        await expect(assessJobRisk(mockInput)).rejects.toThrow('Failed to assess job risk');
    });
});
