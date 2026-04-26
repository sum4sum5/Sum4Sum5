-- Audit trail for admin login / logout (inserted by app server with service role only).
create table if not exists public.admin_auth_log (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('login', 'logout')),
  username text not null,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists admin_auth_log_created_at_idx on public.admin_auth_log (created_at desc);
create index if not exists admin_auth_log_username_idx on public.admin_auth_log (lower(username), created_at desc);

alter table public.admin_auth_log enable row level security;

comment on table public.admin_auth_log is 'Admin login/logout history; no public access.';
