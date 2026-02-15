import { Role } from './role';
import { ExecutionPack } from './executionPack';

export interface AssessmentInput {
    jobTitle: string;
    industry: string;
    skills: string[];
    yearsExperience?: number;
    // Phase 2.2: Enhanced Signals
    audience?: 'professional' | 'student' | 'teacher';
    goal?: 'choose_direction' | 'future_proof_role' | 'plan_pivot';
    experienceLevel?: 'entry' | 'mid' | 'senior';
    enjoys?: string[]; // e.g. ["Visual Design", "Data", "People", "Strategy"]
}
// ... (skip lines) ...
export interface RoleAdjacency {
    roleId: string; // References a local JSON file in data/roles/
    rationale: string; // Why this fits the specific user
    transferableSkills: string[]; // Skills the user already has
    gapSkills: string[]; // Skills the user needs to learn
    detail?: Role; // Hydrated role data from server
}

export interface MarketSignalData {
    id: string;
    label: string;
    updatedAt: string;
    notes: string;
    trendingRoles: { title: string; why: string; topics?: string[] }[];
    recurringSkillSignals: { skill: string; why: string; topics?: string[] }[];
    topics?: string[];
}

export interface HeatmapCell {
    label: string;
    state: 'melting' | 'compounding' | 'stable';
    discretion: number;
    automation: number;
    why: string;
}

export interface AssessmentResult {

    /** 0-100 (0 = low automation risk, 100 = high automation risk) */
    riskScore: number;

    /** Model's self-reported confidence in the assessment. */
    confidence?: 'low' | 'medium' | 'high';

    /** Structured breakdown of the drivers of risk. */
    factors: RiskFactor[];

    /** Back-compat: short narrative summary (kept for UI + logging). */
    reasoning?: string;

    /** Back-compat: short action list (kept for UI + logging). */
    recommendations?: string[];

    /** Adjacent roles that are typically more resilient / higher leverage. */
    roleAdjacencies?: RoleAdjacency[];

    /** Concrete "This Week" actions. */
    immediateActions?: string[];

    /** Model's confidence in the specific action plan provided. */
    planConfidence?: 'low' | 'medium' | 'high';

    /** Actionable suggestion to improve assessment/plan accuracy (e.g. "Add more specific skills"). */
    improvementSuggestion?: string;

    /** Global or regional market signals for context. */
    marketSignals?: MarketSignalData;

    /** Timeboxed plan with concrete tasks. */
    plan30_60_90?: PlanWindow[];

    /** Phase 4: Tailored execution assets (behind feature flag) */
    executionPack?: ExecutionPack;

    /** Phase 4.1: Specialist Leverage Heatmap */
    heatmap?: HeatmapCell[];
}

export interface RiskFactor {
    name: string;
    score: number;

    /** Back-compat: brief explanation (legacy). */
    description?: string;

    /** Evidence anchored to user input (skills, industry, experience) and typical tasks. */
    evidence?: string;

    /** Why this factor matters in the AI era. */
    whyItMatters?: string;

    /** Concrete mitigation steps (1-3 bullets as a single string). */
    mitigation?: string[];
}



export interface PlanWindow {
    window: '30_days' | '60_days' | '90_days';
    goals: string[];
    tasks: string[];
}

export interface CareerPath {
    id: string;
    title: string;
    aiProofScore: number;
    salaryRange: {
        min: number;
        max: number;
    };
    requiredSkills: string[];
    timeToTransition: string; // e.g., "6-12 months"
    description: string;
    growthOutlook: string;
}

export interface LearningRoadmap {
    careerPathId: string;
    steps: RoadmapStep[];
    estimatedDuration: string;
    totalCost: number;
}

export interface RoadmapStep {
    id: string;
    title: string;
    description: string;
    type: 'course' | 'certification' | 'project' | 'skill';
    duration: string;
    cost: number;
    resources: Resource[];
    completed: boolean;
}

export interface Resource {
    title: string;
    url: string;
    platform: string; // e.g., "Coursera", "Udemy"
    price: number;
}

export type SubscriptionTier = 'free' | 'student' | 'starter' | 'pro';

export interface User {
    id: string;
    email: string;
    isStudent: boolean;
    eduEmail?: string;
    subscriptionTier: SubscriptionTier;
    stripeCustomerId?: string;
    createdAt: string;
}
