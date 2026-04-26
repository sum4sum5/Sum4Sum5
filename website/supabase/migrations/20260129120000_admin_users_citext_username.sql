-- Case-insensitive usernames without a shadow "lowercase" column: use citext in Postgres.
-- (If you already ran 20260128120000, this drops `username_lcase` and moves to citext.)
create extension if not exists citext;

drop index if exists public.admin_users_username_lower_idx;
drop index if exists public.admin_users_username_lcase_key;

alter table public.admin_users drop column if exists username_lcase;

alter table public.admin_users
  alter column username type citext using btrim(username::text)::citext;

create unique index if not exists admin_users_username_ux
  on public.admin_users (username);

comment on column public.admin_users.username is 'Login id; citext = case-insensitive uniqueness and equality.';
