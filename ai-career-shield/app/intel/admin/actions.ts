'use server';

import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import type { IntelRole } from '@/lib/intel';

function isoWeekKey(date = new Date()): string {
  // ISO week algorithm
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function normalizeTags(input: string): string[] {
  return input
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 10);
}

import { redirect } from 'next/navigation';

export async function createIntelItem(formData: FormData): Promise<void> {
  const secret = process.env.INTEL_ADMIN_SECRET;
  if (!secret) {
    redirect(`/intel/admin?ok=0&msg=${encodeURIComponent('Missing INTEL_ADMIN_SECRET on server.')}`);
  }

  const key = String(formData.get('key') || '');
  if (key !== secret) {
    redirect(`/intel/admin?ok=0&msg=${encodeURIComponent('Invalid admin key.')}`);
  }

  const role = String(formData.get('role') || 'pm') as IntelRole;
  if (role !== 'pm' && role !== 'designer') {
    redirect(`/intel/admin?ok=0&msg=${encodeURIComponent('Invalid role.')}`);
  }

  const title = String(formData.get('title') || '').trim();
  const summary = String(formData.get('summary') || '').trim();
  const source_name = String(formData.get('source_name') || '').trim() || null;
  const source_url = String(formData.get('source_url') || '').trim() || null;
  const tagsInput = String(formData.get('impact_tags') || '');

  if (!title) {
    redirect(`/intel/admin?ok=0&msg=${encodeURIComponent('Title is required.')}`);
  }
  if (!summary) {
    redirect(`/intel/admin?ok=0&msg=${encodeURIComponent('Summary is required.')}`);
  }

  const week_key = String(formData.get('week_key') || '').trim() || isoWeekKey(new Date());
  const impact_tags = normalizeTags(tagsInput);

  const hashBase = `${role}|${title}|${week_key}`;
  const hash = crypto.createHash('md5').update(hashBase).digest('hex');

  const { error } = await supabaseAdmin
    .from('intel_items')
    .upsert(
      {
        role,
        title,
        summary,
        impact_tags,
        source_name,
        source_url,
        published_at: new Date().toISOString(),
        week_key,
        hash,
      },
      { onConflict: 'hash', ignoreDuplicates: true }
    );

  if (error) {
    redirect(`/intel/admin?ok=0&msg=${encodeURIComponent(`Insert failed: ${error.message}`)}`);
  }

  redirect(`/intel/admin?ok=1&msg=${encodeURIComponent('Published.')}`);
}
