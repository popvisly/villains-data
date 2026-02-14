-- Create table for tracking interview usage
create table if not exists interview_usage (
  id uuid default gen_random_uuid() primary key,
  access_token text, -- Linked to aicp_ep cookie (paid)
  anon_id text,      -- Linked to aicp_anon cookie (free)
  turns_used int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Ensure we can look up quickly by token or anon_id AND support ON CONFLICT
alter table interview_usage add constraint uq_interview_usage_access_token unique (access_token);
alter table interview_usage add constraint uq_interview_usage_anon_id unique (anon_id);

-- Enable RLS
alter table interview_usage enable row level security;

-- Policies (optional if we only access via Service Role in Server Actions, but good for safety)
-- We will primarily access this via the Action which uses supabaseAdmin (Service Role).
