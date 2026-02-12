#!/usr/bin/env node

/**
 * Smoke test: inserts a single row into Supabase `assessment_feedback` using service role.
 * Usage:
 *   node scripts/smoke-feedback-insert.js
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

const fs = require('fs');
const path = require('path');

// Minimal .env loader (avoids adding dotenv as a dependency)
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1).trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

const { createClient } = require('@supabase/supabase-js');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing env. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

(async () => {
  const now = new Date().toISOString();
  const assessmentId = `smoke_${now.replace(/[:.]/g, '-')}`;

  const row = {
    schema_version: 1,
    assessment_id: assessmentId,
    job_title_bucket: 'software_developer',
    industry_bucket: 'technology',
    risk_score: 55,
    confidence: 'medium',
    plan_confidence: 'medium',
    rating: 4,
    most_helpful_sections: ['immediateActions', 'plan30_60_90'],
    comment: 'smoke test insert',
    execution_pack_generated: false,
    execution_pack_validation_failed: false,
  };

  const { data, error } = await supabase
    .from('assessment_feedback')
    .insert(row)
    .select('id, created_at, assessment_id');

  if (error) {
    console.error('Insert failed:', error);
    process.exit(2);
  }

  console.log('Insert OK:', data);

  const { count, error: countErr } = await supabase
    .from('assessment_feedback')
    .select('*', { count: 'exact', head: true })
    .eq('assessment_id', assessmentId);

  if (countErr) {
    console.error('Count check failed:', countErr);
    process.exit(3);
  }

  console.log('Count check OK. Rows with assessment_id:', assessmentId, '=>', count);
})();
