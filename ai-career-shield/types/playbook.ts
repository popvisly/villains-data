export type WorkflowMode = 'Research' | 'Draft' | 'Review' | 'Think';

export interface Workflow {
    id: string;
    title: string;
    description: string;
    whenToUse: string;
    inputTemplate: string;
    mode: WorkflowMode;
    outputArtifact: string;
    verificationChecklist: string[];
    nextAction: string;
}

export interface PlaybookData {
    role: string;
    workflows: Workflow[];
    logOffReminder: string;
}
