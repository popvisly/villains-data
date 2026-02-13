#!/usr/bin/env node
/**
 * Seed script: Populate assessment_feedback with realistic varied data
 * for the analytics dashboard.
 *
 * Usage:
 *   node scripts/seed-feedback.mjs          # Insert 30 rows
 *   node scripts/seed-feedback.mjs --count 50
 *   node scripts/seed-feedback.mjs --cleanup # Delete all seeded rows
 */

import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// ── Parse .env.local ───────────────────────────────────────────────
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
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(url, serviceKey);

// ── Realistic data pools ───────────────────────────────────────────
const SEED_TAG = 'seeded-by-script'; // Used in industry_bucket to identify seeded rows

const JOB_BUCKETS = [
    'data-entry-clerk', 'telemarketer', 'bookkeeper',
    'customer-service-rep', 'paralegal', 'graphic-designer',
    'accountant', 'content-writer', 'project-manager',
    'software-developer', 'licensed-therapist', 'electrician',
    'registered-nurse', 'plumber', 'executive-coach',
    'voice-actor', 'data-engineering-lead', 'customer-support-lead'
];

const INDUSTRY_BUCKETS = [
    'finance', 'sales', 'accounting', 'retail', 'legal',
    'marketing', 'media', 'technology', 'healthcare',
    'construction', 'consulting', 'entertainment', 'education'
];

const SECTIONS = ['immediateActions', 'plan30_60_90', 'roleAdjacencies', 'executionPack'];

const COMMENTS = [
    'Very helpful breakdown of my risk factors.',
    'The role adjacencies section gave me ideas I hadn\'t considered.',
    'Would love more detail on the 60-day plan.',
    'Risk score felt accurate for my situation.',
    'The execution pack was exactly what I needed.',
    null, null, null, // ~40% leave no comment
    'Great tool. Shared with my team.',
    'Wish the mitigation advice was more specific.',
    'Helped me understand what skills to focus on.',
    null, null,
];

// ── Helpers ─────────────────────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function weightedRating(riskScore) {
    // Higher risk → lower ratings (more realistic correlation)
    if (riskScore >= 80) return randInt(2, 4);
    if (riskScore >= 50) return randInt(3, 5);
    return randInt(3, 5);
}

function randomSections() {
    const count = randInt(1, 3);
    const shuffled = [...SECTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

function randomDate(daysBack) {
    const now = new Date();
    const offset = randInt(0, daysBack);
    now.setDate(now.getDate() - offset);
    now.setHours(randInt(8, 22), randInt(0, 59), randInt(0, 59));
    return now.toISOString();
}

function generateRow() {
    const riskScore = randInt(10, 95);
    const confidences = ['low', 'medium', 'high'];

    return {
        assessment_id: randomUUID(),
        job_title_bucket: pick(JOB_BUCKETS),
        industry_bucket: pick(INDUSTRY_BUCKETS),
        risk_score: riskScore,
        confidence: pick(confidences),
        plan_confidence: pick(confidences),
        rating: weightedRating(riskScore),
        most_helpful_sections: randomSections(),
        comment: pick(COMMENTS),
        execution_pack_generated: Math.random() > 0.3,
        execution_pack_validation_failed: Math.random() < 0.08,
        created_at: randomDate(30),
    };
}

// ── CLI ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const isCleanup = args.includes('--cleanup');
const countIdx = args.indexOf('--count');
const count = countIdx !== -1 ? parseInt(args[countIdx + 1], 10) : 30;

if (isCleanup) {
    console.log('\n🧹 Cleaning up seeded feedback rows...');

    // Delete rows where job_title_bucket matches our pool
    // (real users won't have these exact bucket names in v1)
    const { error, count: deleted } = await supabase
        .from('assessment_feedback')
        .delete()
        .in('job_title_bucket', JOB_BUCKETS)
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error('❌ Cleanup failed:', error.message);
        process.exit(1);
    }
    console.log(`   ✅ Deleted rows with known bucket names.\n`);
    process.exit(0);
}

console.log(`\n🌱 Seeding ${count} feedback rows...\n`);

const rows = Array.from({ length: count }, generateRow);

// Insert in batches of 10
const batchSize = 10;
let inserted = 0;

for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase
        .from('assessment_feedback')
        .insert(batch);

    if (error) {
        console.error(`❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, error.message);
        process.exit(1);
    }
    inserted += batch.length;
    process.stdout.write(`   Inserted ${inserted}/${count}\r`);
}

console.log(`\n   ✅ Seeded ${count} rows successfully.`);
console.log(`\n📊 View at: http://localhost:3000/admin/analytics\n`);
