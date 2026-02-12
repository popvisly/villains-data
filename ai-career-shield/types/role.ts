export interface RoleSkillSection {
    core: string[];
    toolsExamples: string[];
    niceToHave: string[];
}

export interface RoleResponsibility {
    area: string;
    items: string[];
}

export interface RoleProject {
    title: string;
    whatYouBuild: string[];
    deliverables: string[];
}

export interface Role {
    id: string;
    title: string;
    aliases: string[];
    summary: string;
    whyFutureReady: string[];
    responsibilities: RoleResponsibility[];
    skills: RoleSkillSection;
    proofProjects: RoleProject[];
    goodBackgrounds: string[];
    starterPlan30Days: string[];
    tags: string[];
    topics?: string[];
}
