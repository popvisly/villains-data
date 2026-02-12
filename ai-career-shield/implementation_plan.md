# Implementation Plan - Phase 4: Execution Pack

## Objectives

1. **Execution Pack Data Model**: Implement `ProjectBrief` and `SkillGapMap` schemas.
2. **Server Action**: Build `generateExecutionPack()` to create tailored assets grounded in the role library.
3. **UI Integration**: Render placeholders and the "Unlock" flow behind a feature flag.

## Proposed Changes

### [Data Layer]

#### [NEW] [types/executionPack.ts](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/types/executionPack.ts)

- Combine `ProjectBrief` and `SkillGapMap` interfaces.
- Consolidate common types (e.g., Difficulty, Confidence).

#### [MODIFY] [types/index.ts](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/types/index.ts)

- Import and use `ProjectBrief` and `SkillGapMap` in `AssessmentResult`.

### [Web Application]

#### [MODIFY] [app/actions/assessment.ts](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/app/actions/assessment.ts)

- Implement `generateExecutionPack(roleIds: string[], input: AssessmentInput)`:
  - Logic: Fetch role data, match skills (text similarity), then use LLM to refine "why it matters" and "how to build".
  - Prompt: Use the "Execution Pack prompt" approach to output 2 briefs + 1 map.

#### [NEW] [components/ExecutionPackView.tsx](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/components/ExecutionPackView.tsx)

- Render the project briefs and skill gap map.
- Support Markdown-style formatting for exportability.

#### [MODIFY] [assessment/page.tsx](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/app/assessment/page.tsx)

- Integrate the unlock flow (state-based).
- Add feature flag (`process.env.NEXT_PUBLIC_ENABLE_EXECUTION_PACK`).

## Verification Plan

### Manual Verification

- Verify the "Unlock" button triggers the `generateExecutionPack` action.
- Confirm the generated content is correctly grounded in the selected roles.
- Check Markdown export for the new sections.

### Automated Tests

- Add a new test suite (e.g., `scripts/test-execution-pack.js`) to verify schema compliance of the LLM output.
