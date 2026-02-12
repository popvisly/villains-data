export interface FeedbackInput {
    schemaVersion: number;
    assessmentId: string; // Stable pseudonymous ID
    jobTitleBucket: string;
    industryBucket: string;
    roleIds: string[];
    riskScore: number;
    confidence: 'low' | 'medium' | 'high';
    planConfidence: 'low' | 'medium' | 'high';
    rating: number; // 1-5
    helpfulParts: string[]; // e.g. ["immediateActions", "plan30_60_90"]
    comment?: string; // Max 500 chars
    executionPackStatus?: {
        generated: boolean;
        validated: boolean;
    };
}

export interface FeedbackRecord extends FeedbackInput {
    id: string;
    createdAt: string;
}
