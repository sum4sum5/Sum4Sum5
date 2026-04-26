-- (Optional / intermediate.) Superseded by 20260129120000: citext on `username` and drop this column.
-- Login lookup must be case-insensitive: `eq("username", key)` is case-sensitive in Postgres.
-- Display / stored username may be mixed case (e.g. Admin.1); lookup uses lower(trim).

alter table public.admin_users
  add column if not exists username_lcase text
  generated always as (lower(trim(username::text))) stored;

drop index if exists public.admin_users_username_lower_idx;

create unique index if not exists admin_users_username_lcase_key
  on public.admin_users (username_lcase);

comment on column public.admin_users.username_lcase is 'lower(trim(username)) for login; use username for display.';
