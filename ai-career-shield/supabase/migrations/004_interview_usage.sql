-- Create table for tracking interview usage
create table if not exists interview_usage (
  id uuid default gen_random_uuid() primary key,
  access_token text, -- Linked to aicp_ep cookie (paid)
  anon_id text,      -- Linked to aicp_anon cookie (free)
  turns_used int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure we can look up quickly by token or anon_id
create unique index if not exists idx_interview_usage_access_token 
  on interview_usage(access_token) 
  where access_token is not null;

create unique index if not exists idx_interview_usage_anon_id 
  on interview_usage(anon_id) 
  where anon_id is not null;

-- Enable RLS
alter table interview_usage enable row level security;

-- Policies (optional if we only access via Service Role in Server Actions, but good for safety)
-- We will primarily access this via the Action which uses supabaseAdmin (Service Role).
