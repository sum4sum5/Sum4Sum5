-- Login must match `username` exactly (case + characters), not citext.
alter table public.admin_users
  alter column username type text using (username::text);

-- Index still valid; uniqueness is now case-sensitive (admin ≠ Admin)
comment on column public.admin_users.username is 'Exact string for login; case-sensitive.';
