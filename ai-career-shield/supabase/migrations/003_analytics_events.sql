-- Enable pgcrypto for gen_random_uuid
create extension if not exists pgcrypto;

create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  properties jsonb default '{}'::jsonb,
  url text,
  session_id text,
  user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

-- RLS Policies
alter table analytics_events enable row level security;

-- Allow public insert (anon users need to track events)
-- Note: Consider rate limiting or moving to server-side only in future
create policy "Allow public insert"
  on analytics_events
  for insert
  to public
  with check (true);

-- Explicit service_role policies
create policy "service role read"
  on analytics_events
  for select
  to service_role
  using (true);

create policy "service role insert"
  on analytics_events
  for insert
  to service_role
  with check (true);

create policy "service role update"
  on analytics_events
  for update
  to service_role
  using (true)
  with check (true);

create policy "service role delete"
  on analytics_events
  for delete
  to service_role
  using (true);

-- Create index for faster querying by event name and time
create index if not exists idx_analytics_events_name_time on analytics_events(event_name, created_at desc);
