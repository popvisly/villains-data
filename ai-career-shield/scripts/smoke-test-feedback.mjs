#!/usr/bin/env node
/**
 * Smoke test: Insert a test feedback row via supabaseAdmin, then read it back.
 * Usage: node scripts/smoke-test-feedback.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Parse .env.local manually (no dotenv dependency)
const envPath = resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf8');
for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx);
    const val = trimmed.slice(eqIdx + 1);
    if (!process.env[key]) process.env[key] = val;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
}

const supabase = createClient(url, serviceKey);
const testId = randomUUID();

console.log(`\n🧪 Smoke Test: Feedback Loop`);
console.log(`   Assessment ID: ${testId}\n`);

// 1. Insert
console.log('1️⃣  Inserting test feedback row...');
const { error: insertError } = await supabase
    .from('assessment_feedback')
    .insert({
        assessment_id: testId,
        job_title_bucket: 'smoke-test',
        industry_bucket: 'testing',
        risk_score: 42,
        confidence: 'medium',
        plan_confidence: 'high',
        rating: 4,
        most_helpful_sections: ['immediateActions', 'roleAdjacencies'],
        comment: 'Smoke test feedback — safe to delete.',
        execution_pack_generated: false,
        execution_pack_validation_failed: false
    });

if (insertError) {
    console.error('❌ Insert failed:', insertError.message);
    process.exit(1);
}
console.log('   ✅ Insert succeeded.\n');

// 2. Read back
console.log('2️⃣  Reading back the row...');
const { data, error: selectError } = await supabase
    .from('assessment_feedback')
    .select('*')
    .eq('assessment_id', testId)
    .single();

if (selectError) {
    console.error('❌ Select failed:', selectError.message);
    process.exit(1);
}

console.log('   ✅ Row retrieved:');
console.log(`      id:                ${data.id}`);
console.log(`      assessment_id:     ${data.assessment_id}`);
console.log(`      rating:            ${data.rating}`);
console.log(`      risk_score:        ${data.risk_score}`);
console.log(`      confidence:        ${data.confidence}`);
console.log(`      plan_confidence:   ${data.plan_confidence}`);
console.log(`      sections:          ${JSON.stringify(data.most_helpful_sections)}`);
console.log(`      comment:           ${data.comment}`);
console.log(`      created_at:        ${data.created_at}`);

// 3. Cleanup
console.log('\n3️⃣  Cleaning up test row...');
const { error: deleteError } = await supabase
    .from('assessment_feedback')
    .delete()
    .eq('assessment_id', testId);

if (deleteError) {
    console.error('⚠️  Cleanup failed (non-critical):', deleteError.message);
} else {
    console.log('   ✅ Test row deleted.\n');
}

console.log('🎉 Smoke test PASSED — feedback loop is end-to-end operational!\n');
