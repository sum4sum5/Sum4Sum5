-- Admin accounts: password stored as bcrypt hash (server verifies with service role).
-- Run in Supabase SQL editor or via `supabase db push` if you use Supabase CLI.

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists admin_users_username_lower_idx
  on public.admin_users (lower(username));

alter table public.admin_users enable row level security;

-- No GRANT to anon/authenticated: only the service role (used by this app server) can read/write.

comment on table public.admin_users is 'Admin UI logins; passwords are bcrypt hashes only.';
