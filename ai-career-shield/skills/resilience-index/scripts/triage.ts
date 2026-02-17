/**
 * Strategic Judgment Triage Script
 * Part of the Captori Strategic Operator Skillset.
 */

export type TriageCategory = 'ROUTINE' | 'STRATEGIC';

export interface TriageResult {
    category: TriageCategory;
    resilienceScore: number; // 0-100 (100 = highly resilient)
    discretionaryLogic: boolean; // Does this task require human discretion?
    contextualUnderstanding: number; // 0-100 score for navigating ambiguous human systems
    rationale: string;
    judgmentMoat: string; // The specific reason AI struggle here
}

/**
 * Assesses the Resilience Index of a task based on discretionary logic.
 */
export function assessResilience(description: string): TriageResult {
    const normalized = description.toLowerCase();

    // High-Resilience keywords (Judgment Moats)
    const highResilienceKeywords = [
        'negotiation', 'ethics', 'board', 'regulatory',
        'strategic', 'judgment', 'discretion', 'accountability',
        'complex', 'ambiguous', 'troubleshooting', 'empathy',
        'human-in-the-loop', 'constraint mapping', 'unwritten rules'
    ];

    // Low-Resilience keywords (Automation Candidates)
    const lowResilienceKeywords = [
        'standardized', 'rules-based', 'high-volume', 'repetitive',
        'entry', 'processing', 'sorting', 'template', 'predictable', 'manual'
    ];

    let resilienceScore = 50;
    let contextualUnderstanding = 50;
    let discretionaryLogic = false;

    highResilienceKeywords.forEach(word => {
        if (normalized.includes(word)) {
            resilienceScore += 12;
            contextualUnderstanding += 15;
            discretionaryLogic = true;
        }
    });

    lowResilienceKeywords.forEach(word => {
        if (normalized.includes(word)) {
            resilienceScore -= 15;
            contextualUnderstanding -= 10;
        }
    });

    // Clamp scores
    resilienceScore = Math.max(0, Math.min(100, resilienceScore));
    contextualUnderstanding = Math.max(0, Math.min(100, contextualUnderstanding));

    const category: TriageCategory = resilienceScore > 65 ? 'STRATEGIC' : 'ROUTINE';

    return {
        category,
        resilienceScore,
        discretionaryLogic,
        contextualUnderstanding,
        rationale: category === 'STRATEGIC'
            ? 'High resilience due to dependency on discretionary logic and contextual navigation.'
            : 'Lower resilience; task is likely candidate for algorithmic automation.',
        judgmentMoat: category === 'STRATEGIC'
            ? 'Navigating unwritten human rules and high-stakes accountability.'
            : 'Rule-following and pattern matching are standard model capabilities.'
    };
}
