import { PlaybookData } from '@/types/playbook';

export const PM_PLAYBOOK: PlaybookData = {
    role: 'Product Management',
    workflows: [
        {
            id: 'roadmap-synthesis',
            title: 'Roadmap Synthesis',
            description: 'Convert goals and customer signals into a crisp Executive Roadmap Brief.',
            whenToUse: 'Use when quarterly planning or presenting candidate initiatives to leadership.',
            mode: 'Research',
            inputTemplate: `Goals: [e.g., Increase retention by 10%]
Constraints: [e.g., Fixed head-count for Q3]
Customer Signals: [e.g., User feedback about slow onboarding]
Current Initiatives: [e.g., Project Phoenix, API v2]
Top Risks: [e.g., Dependency on Platform team]`,
            outputArtifact: '1‑page Now/Next/Later brief + rationale + metrics',
            verificationChecklist: [
                'Assumptions are explicit and listed.',
                'Dependency risks are identified.',
                'Counterfactual (what if we don\'t do this) is stated.',
                'Metric alignment with broader company goals.'
            ]
        },
        {
            id: 'prd-risk-check',
            title: 'PRD Risk-Check',
            description: 'Red-team your PRD to find failure modes before they reach production.',
            whenToUse: 'Use before handoff to engineering or during early design reviews.',
            mode: 'Review',
            inputTemplate: `PRD URL/Content: [Paste excerpt here]
Non-goals: [What this project is NOT doing]
Edge cases: [Known outliers]
SLAs: [Required uptime/performance]`,
            outputArtifact: 'Risk Register (Top failure modes + mitigations + monitoring)',
            verificationChecklist: [
                'User harm scenarios considered.',
                'Data quality and integrity checked.',
                'Ops load and maintenance budget.',
                'Rollback plan for failure.',
                'Alerting and observability strategy.'
            ]
        },
        {
            id: 'stakeholder-brief',
            title: 'Stakeholder Brief Mapping',
            description: 'Frame decisions and tradeoffs for executive alignment.',
            whenToUse: 'Use when navigating conflicting incentives or high-stakes dependency requests.',
            mode: 'Think',
            inputTemplate: `Stakeholders: [e.g., Head of Sales, CTO]
Incentives: [What does each person care about most?]
Decision Needed: [The specific ask]
Timeline: [When is this due?]`,
            outputArtifact: 'Stakeholder Memo + Objections Map + Tradeoff Framing',
            verificationChecklist: [
                'Decision clarity (no ambiguity).',
                'Accountability owner is named.',
                'Tradeoffs are stated explicitly.',
                'Comms plan (who hears what and when).'
            ]
        }
    ],
    logOffReminder: 'Workflows complete. Review your artifacts for senior judgment, then log off. Strategy wins offers.'
};
