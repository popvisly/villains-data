import { supabaseAdmin } from '@/lib/supabase';

export type FeedbackRow = {
  created_at: string;
  schema_version: number;
  job_title_bucket: string | null;
  industry_bucket: string | null;
  risk_score: number | null;
  rating: number | null;
  most_helpful_sections: string[] | null;
  execution_pack_generated: boolean | null;
  execution_pack_validation_failed: boolean | null;
};

/**
 * Fetch all feedback rows needed for analytics.
 *
 * Notes:
 * - We aggregate in JS for now to avoid adding SQL functions / views.
 * - Uses pagination because Supabase defaults to limited result sets.
 */
export async function fetchAllFeedbackRows(): Promise<FeedbackRow[]> {
  console.time('fetchAllFeedbackRows');
  const pageSize = 1000;
  let from = 0;
  const all: FeedbackRow[] = [];


  while (true) {
    const to = from + pageSize - 1;
    const { data, error } = await supabaseAdmin
      .from('assessment_feedback')
      .select(
        'created_at,schema_version,job_title_bucket,industry_bucket,risk_score,rating,most_helpful_sections,execution_pack_generated,execution_pack_validation_failed'
      )
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.timeEnd('fetchAllFeedbackRows'); // Ensure timer ends on error
      throw new Error(`Failed to fetch analytics feedback rows: ${error.message}`);
    }

    const rows = (data || []) as FeedbackRow[];
    all.push(...rows);

    if (rows.length < pageSize) break;
    from += pageSize;
  }

  console.timeEnd('fetchAllFeedbackRows');
  return all;
}

export function mean(nums: number[]): number | null {
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

export function bucketLabel(s: string | null | undefined): string {
  const v = (s || '').trim();
  return v.length ? v : '(unknown)';
}
