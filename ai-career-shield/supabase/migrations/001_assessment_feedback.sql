-- Migration: 001_assessment_feedback
-- Phase 5: Feedback Loop
-- Apply via: Supabase SQL Editor (paste + run)
-- Date: 2026-02-12

-- 1) Ensure pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2) Table
CREATE TABLE IF NOT EXISTS assessment_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  schema_version INTEGER NOT NULL DEFAULT 1,

  assessment_id TEXT NOT NULL CHECK (char_length(assessment_id) >= 8),
  job_title_bucket TEXT,
  industry_bucket TEXT,

  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  confidence TEXT CHECK (confidence IN ('low', 'medium', 'high')),
  plan_confidence TEXT CHECK (plan_confidence IN ('low', 'medium', 'high')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),

  most_helpful_sections TEXT[],
  comment TEXT CHECK (comment IS NULL OR char_length(comment) <= 500),

  execution_pack_generated BOOLEAN NOT NULL DEFAULT FALSE,
  execution_pack_validation_failed BOOLEAN NOT NULL DEFAULT FALSE
);

-- 3) Indexes
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON assessment_feedback (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_assessment_id ON assessment_feedback (assessment_id);
CREATE INDEX IF NOT EXISTS idx_feedback_job_bucket ON assessment_feedback (job_title_bucket);
CREATE INDEX IF NOT EXISTS idx_feedback_industry_bucket ON assessment_feedback (industry_bucket);

-- 4) RLS
ALTER TABLE assessment_feedback ENABLE ROW LEVEL SECURITY;
-- No policies = anon/auth users can't read/write; service role bypasses RLS.
