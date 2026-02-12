// 20 benchmark personas for testing assessment quality
// Covers high/medium/low risk + student scenarios

import type { AssessmentInput } from '@/types';

export interface TestPersona extends AssessmentInput {
    id: string;
    category: 'high-risk' | 'medium-risk' | 'low-risk' | 'student';
    expectedRiskRange: [number, number]; // Min-max expected risk score
    sanityChecks: string[]; // Things the output MUST mention
}

export const TEST_PERSONAS: TestPersona[] = [
    // HIGH RISK (70-95%)
    {
        id: 'data-entry-clerk',
        category: 'high-risk',
        jobTitle: 'Data Entry Clerk',
        industry: 'Finance',
        yearsExperience: 5,
        skills: ['Excel', 'Typing', 'Data Entry', 'Microsoft Office'],
        expectedRiskRange: [80, 95],
        sanityChecks: [
            'repetitive tasks',
            'automation',
            'Excel skills transferable',
            'data analysis',
        ],
    },
    {
        id: 'telemarketer',
        category: 'high-risk',
        jobTitle: 'Telemarketer',
        industry: 'Sales',
        yearsExperience: 3,
        skills: ['Cold Calling', 'Script Reading', 'CRM Software', 'Phone Etiquette'],
        expectedRiskRange: [85, 95],
        sanityChecks: [
            'AI voice agents',
            'customer service',
            'sales skills',
            'relationship building',
        ],
    },
    {
        id: 'bookkeeper',
        category: 'high-risk',
        jobTitle: 'Bookkeeper',
        industry: 'Accounting',
        yearsExperience: 8,
        skills: ['QuickBooks', 'Accounts Payable', 'Reconciliation', 'Excel'],
        expectedRiskRange: [75, 90],
        sanityChecks: [
            'automation software',
            'financial analysis',
            'advisory role',
            'QuickBooks',
        ],
    },
    {
        id: 'customer-service-rep',
        category: 'high-risk',
        jobTitle: 'Customer Service Representative',
        industry: 'Retail',
        yearsExperience: 2,
        skills: ['Phone Support', 'Email Support', 'Zendesk', 'Problem Solving'],
        expectedRiskRange: [70, 85],
        sanityChecks: [
            'chatbots',
            'complex problem solving',
            'empathy',
            'escalation handling',
        ],
    },
    {
        id: 'paralegal',
        category: 'high-risk',
        jobTitle: 'Paralegal',
        industry: 'Legal',
        yearsExperience: 6,
        skills: ['Legal Research', 'Document Review', 'Case Management', 'Writing'],
        expectedRiskRange: [65, 80],
        sanityChecks: [
            'AI legal research',
            'client interaction',
            'specialized knowledge',
            'litigation support',
        ],
    },

    // MEDIUM RISK (40-70%)
    {
        id: 'graphic-designer',
        category: 'medium-risk',
        jobTitle: 'Graphic Designer',
        industry: 'Marketing',
        yearsExperience: 4,
        skills: ['Adobe Creative Suite', 'Branding', 'Typography', 'UI Design'],
        expectedRiskRange: [50, 70],
        sanityChecks: [
            'AI design tools',
            'creative strategy',
            'client collaboration',
            'brand identity',
        ],
    },
    {
        id: 'accountant',
        category: 'medium-risk',
        jobTitle: 'Accountant',
        industry: 'Finance',
        yearsExperience: 7,
        skills: ['Tax Preparation', 'Financial Reporting', 'GAAP', 'Excel'],
        expectedRiskRange: [55, 75],
        sanityChecks: [
            'automation',
            'advisory services',
            'tax strategy',
            'client relationships',
        ],
    },
    {
        id: 'content-writer',
        category: 'medium-risk',
        jobTitle: 'Content Writer',
        industry: 'Media',
        yearsExperience: 3,
        skills: ['SEO Writing', 'Copywriting', 'Research', 'WordPress'],
        expectedRiskRange: [60, 75],
        sanityChecks: [
            'AI writing tools',
            'expertise',
            'storytelling',
            'editing',
        ],
    },
    {
        id: 'project-manager',
        category: 'medium-risk',
        jobTitle: 'Project Manager',
        industry: 'Technology',
        yearsExperience: 6,
        skills: ['Agile', 'Stakeholder Management', 'Jira', 'Risk Management'],
        expectedRiskRange: [45, 65],
        sanityChecks: [
            'AI project tools',
            'leadership',
            'communication',
            'strategic planning',
        ],
    },
    {
        id: 'software-developer',
        category: 'medium-risk',
        jobTitle: 'Software Developer',
        industry: 'Technology',
        yearsExperience: 5,
        skills: ['Python', 'JavaScript', 'React', 'SQL', 'Git'],
        expectedRiskRange: [40, 60],
        sanityChecks: [
            'AI coding assistants',
            'architecture',
            'problem solving',
            'system design',
        ],
    },

    // LOW RISK (10-40%)
    {
        id: 'therapist',
        category: 'low-risk',
        jobTitle: 'Licensed Therapist',
        industry: 'Healthcare',
        yearsExperience: 10,
        skills: ['Cognitive Behavioral Therapy', 'Active Listening', 'Empathy', 'Crisis Intervention'],
        expectedRiskRange: [15, 30],
        sanityChecks: [
            'human connection',
            'empathy',
            'complex emotions',
            'trust',
        ],
    },
    {
        id: 'electrician',
        category: 'low-risk',
        jobTitle: 'Electrician',
        industry: 'Construction',
        yearsExperience: 12,
        skills: ['Wiring', 'Troubleshooting', 'Code Compliance', 'Blueprint Reading'],
        expectedRiskRange: [10, 25],
        sanityChecks: [
            'physical presence',
            'hands-on',
            'problem solving',
            'safety',
        ],
    },
    {
        id: 'nurse',
        category: 'low-risk',
        jobTitle: 'Registered Nurse',
        industry: 'Healthcare',
        yearsExperience: 8,
        skills: ['Patient Care', 'IV Administration', 'Vital Signs', 'EMR Systems'],
        expectedRiskRange: [20, 35],
        sanityChecks: [
            'human touch',
            'critical thinking',
            'patient advocacy',
            'physical care',
        ],
    },
    {
        id: 'plumber',
        category: 'low-risk',
        jobTitle: 'Plumber',
        industry: 'Construction',
        yearsExperience: 15,
        skills: ['Pipe Fitting', 'Leak Detection', 'Code Knowledge', 'Customer Service'],
        expectedRiskRange: [10, 20],
        sanityChecks: [
            'physical work',
            'on-site',
            'problem diagnosis',
            'manual dexterity',
        ],
    },
    {
        id: 'executive-coach',
        category: 'low-risk',
        jobTitle: 'Executive Coach',
        industry: 'Consulting',
        yearsExperience: 20,
        skills: ['Leadership Development', 'Strategic Thinking', 'Active Listening', 'Facilitation'],
        expectedRiskRange: [15, 30],
        sanityChecks: [
            'relationship building',
            'nuanced understanding',
            'trust',
            'experience',
        ],
    },

    // STUDENTS
    {
        id: 'undecided-freshman',
        category: 'student',
        jobTitle: 'College Student (Undecided Major)',
        industry: 'Education',
        yearsExperience: 0,
        skills: ['Research', 'Writing', 'Time Management', 'Microsoft Office'],
        expectedRiskRange: [0, 0], // N/A for students
        sanityChecks: [
            'major recommendations',
            'AI-proof careers',
            'skill development',
            'internships',
        ],
    },
    {
        id: 'cs-student',
        category: 'student',
        jobTitle: 'Computer Science Student',
        industry: 'Education',
        yearsExperience: 0,
        skills: ['Python', 'Java', 'Data Structures', 'Algorithms'],
        expectedRiskRange: [0, 0], // N/A for students
        sanityChecks: [
            'AI specialization',
            'software engineering',
            'machine learning',
            'system design',
        ],
    },
    {
        id: 'business-student',
        category: 'student',
        jobTitle: 'Business Administration Student',
        industry: 'Education',
        yearsExperience: 0,
        skills: ['Excel', 'Presentation', 'Teamwork', 'Analysis'],
        expectedRiskRange: [0, 0], // N/A for students
        sanityChecks: [
            'strategic roles',
            'consulting',
            'entrepreneurship',
            'leadership',
        ],
    },
    {
        id: 'marketing-student',
        category: 'student',
        jobTitle: 'Marketing Student',
        industry: 'Education',
        yearsExperience: 0,
        skills: ['Social Media', 'Content Creation', 'Analytics', 'Adobe Creative Suite'],
        expectedRiskRange: [0, 0], // N/A for students
        sanityChecks: [
            'digital marketing',
            'brand strategy',
            'AI tools',
            'creative direction',
        ],
    },
    {
        id: 'high-school-senior',
        category: 'student',
        jobTitle: 'High School Senior',
        industry: 'Education',
        yearsExperience: 0,
        skills: ['Math', 'Science', 'Writing', 'Critical Thinking'],
        expectedRiskRange: [0, 0], // N/A for students
        sanityChecks: [
            'college majors',
            'career exploration',
            'future-proof',
            'skill building',
        ],
    },
];
