# Implementation Plan - Phase 5: Feedback Loop & Persona Refinement

## Objectives

1. **Feedback Loop**: Capture user feedback on assessment utility to enable deterministic improvements.
2. **Persistence**: Use Supabase with service-role security and hardened SQL constraints.
3. **Persona Refinement**: Narrow down scenarios for higher test specificity while preserving umbrella files.

## User Review Required

> [!IMPORTANT]
> **Privacy & Anonymity**: Feedback will be **anonymous by default**. Every assessment result will generate a stable, pseudonymous `assessment_id` (UUID or Hash) stored in the client state to link feedback without PII.

> [!CAUTION]
> **Security Model**: We will use `supabaseAdmin` in a server action. RLS will be enabled on the table but will deny all public inserts; only the service role will have bypass permission.

## Proposed Changes

### [Data Layer]

#### [SQL] [Supabase Schema]

```sql
CREATE TABLE assessment_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    schema_version INTEGER DEFAULT 1,
    assessment_id TEXT NOT NULL,
    job_title_bucket TEXT,
    industry_bucket TEXT,
    risk_score INTEGER,
    confidence TEXT CHECK (confidence IN ('low', 'medium', 'high')),
    plan_confidence TEXT CHECK (plan_confidence IN ('low', 'medium', 'high')),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    most_helpful_sections TEXT[], -- ['immediateActions', 'plan30_60_90', 'roleAdjacencies', 'executionPack']
    comment TEXT, -- Length-capped (500 chars)
    execution_pack_generated BOOLEAN DEFAULT FALSE,
    execution_pack_validation_failed BOOLEAN DEFAULT FALSE
);

-- Optimization Indexes
CREATE INDEX idx_feedback_created_at ON assessment_feedback (created_at DESC);
CREATE INDEX idx_feedback_assessment_id ON assessment_feedback (assessment_id);
CREATE INDEX idx_feedback_job_bucket ON assessment_feedback (job_title_bucket);
CREATE INDEX idx_feedback_industry_bucket ON assessment_feedback (industry_bucket);
```

### [Web Application]

#### [NEW] [types/feedback.ts](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/types/feedback.ts)

- Finalized TypeScript interfaces for the hardened schema.

#### [NEW] [app/actions/feedback.ts](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/app/actions/feedback.ts)

- `submitFeedback(feedback: FeedbackInput)` using `supabaseAdmin`.
- Validates section allowlist and length-caps comments.

#### [NEW] [components/FeedbackSection.tsx](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/components/FeedbackSection.tsx)

- Lightweight 5-star rating UI appearing at the bottom of the report for **all users**.
- Subtle prominence: Low-profile until interacted with.

#### [MODIFY] [assessment/page.tsx](file:///Volumes/850EVO/VILLAINS%20AT_LARGE/ai-career-shield/app/assessment/page.tsx)

- Generate a stable `assessment_id` on result creation.
- Integrate `FeedbackSection` at the report tail.

### [Data Refinement]

#### [NEW] [Narrowed Scenarios]

- `scenario-support-chatbot-layoff.json`
- `scenario-voice-actor-rights.json`
- `scenario-data-lead-copilot-failure.json`
- Retain `reddit-ai-job-loss-what-happened.json` but mark as umbrella/deprecated.

## Verification Plan

### Manual Verification

- Verify feedback submission writes correctly via `supabaseAdmin` while RLS denies public access.
- Confirm enum constraints (e.g., risk_score, confidence) are enforced at the DB level.

### Automated Tests

- Run `npm run test:personas` with the new narrowed scenarios.
