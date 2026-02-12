export interface ProjectBriefStep {
    step: number;
    title: string;
    details: string[];
}

export interface ProjectBriefEvaluation {
    dimension: string;
    whatGoodLooksLike: string[];
}

export interface ProjectBriefPortfolio {
    headline: string;
    whatToShow: string[];
    talkTrack: string[];
}

export interface ProjectBriefResource {
    title: string;
    url: string;
    type: 'doc' | 'tool' | 'course' | 'video';
}

export interface ProjectBrief {
    id: string;
    roleId: string;
    title: string;
    summary: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedTime: string;
    whyThisMatters: string;
    successCriteria: string[];
    deliverables: string[];
    steps: ProjectBriefStep[];
    evaluationRubric: ProjectBriefEvaluation[];
    portfolioPackaging: ProjectBriefPortfolio;
    variations: string[];
    starterResources: ProjectBriefResource[];
}

export interface SkillGapMap {
    roleId: string;
    roleTitle: string;
    confidence: 'low' | 'medium' | 'high';
    matchedSkills: {
        skill: string;
        evidence: string;
    }[];
    gapSkills: {
        skill: string;
        whyItMatters: string;
        howToBuild: string[];
        proofArtifact: string;
    }[];
    recommendedSequence: {
        weekRange: string;
        focus: string[];
        outputs: string[];
    }[];
    notes: string[];
}

export interface ExecutionPack {
    version: 1;
    projectBriefs: ProjectBrief[];
    skillGapMap: SkillGapMap;
}
