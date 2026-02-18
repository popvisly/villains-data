import { supabaseAdmin } from '@/lib/supabase';

export type IntelRole = 'pm' | 'designer';

export interface IntelItem {
  id: string;
  role: IntelRole;
  title: string;
  summary: string | null;
  impact_tags: string[] | null;
  source_name: string | null;
  source_url: string | null;
  published_at: string | null;
}

export async function fetchIntelItems(role: IntelRole, limit = 20): Promise<IntelItem[]> {
  const { data, error } = await supabaseAdmin
    .from('intel_items')
    .select('id, role, title, summary, impact_tags, source_name, source_url, published_at')
    .eq('role', role)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch intel items: ${error.message}`);
  return (data || []) as IntelItem[];
}
