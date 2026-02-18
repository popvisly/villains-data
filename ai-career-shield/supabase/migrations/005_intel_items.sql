-- 005_intel_items.sql

-- Captori /intel feed items

create table if not exists public.intel_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  role text not null check (role in ('pm','designer')),
  title text not null,
  summary text,
  impact_tags text[] default '{}',
  source_name text,
  source_url text,
  published_at timestamptz,
  week_key text,
  hash text unique
);

create index if not exists idx_intel_items_role_published_at on public.intel_items(role, published_at desc);
create index if not exists idx_intel_items_week_key on public.intel_items(week_key);

-- RLS: lock down direct access; site will read via service role in server component for now.
alter table public.intel_items enable row level security;

-- No public policies by default.
