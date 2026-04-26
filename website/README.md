Sum4Sum5 website built with [Next.js](https://nextjs.org) App Router.

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Create environment file

```bash
cp .env.example .env.local
```

3) Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

- Local/dev: copy `.env.example` to `.env.local` and put **real** values only in `.env.local` (it is gitignored; never `git add -f` it).
- **Never** put real secrets into `.env.example` (that file is public in Git).
- Production: set the same variable names in your host’s env UI (e.g. Vercel Project → Environment Variables), not in the repo.
- If a key or password is ever committed or exposed, **rotate** it at the provider and update env everywhere you use it.

Required server-side secrets:
- `GEMINI_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

Rate-limit and timeout controls:
- `GEMINI_RATE_LIMIT_WINDOW_MS`
- `GEMINI_RATE_LIMIT_MAX_REQUESTS`
- `GEMINI_TIMEOUT_MS`

## Admin panel (`/admin`)

1. In **Supabase** → SQL Editor, run the migrations in `supabase/migrations/` in order, especially:
   - `20260126000000_admin_users.sql` — `admin_users` (bcrypt passwords, RLS)
   - `20260127100000_admin_auth_log.sql` — `admin_auth_log` (login / logout history, RLS)
   - `20260128120000_admin_users_username_lcase.sql` — optional (older); superseded if you also run
   - `20260129120000_admin_users_citext_username.sql` — optional: `citext` on `username` (if you use this, run the next file after)
   - `20260130140000_admin_users_username_text_exact.sql` — `username` as `text` (case-sensitive: login string must **match the DB value exactly** after trim)
2. In `.env.local`, set `SEED_ADMIN_USERNAME` and `SEED_ADMIN_PASSWORD` (only for the seed run; if you are migrating from the old `ADMIN_PASSWORD`, the helper `node scripts/migrate-then-seed.mjs` can move it once, then you can delete that script if you like). From this folder:
   ```bash
   npm run admin:seed
   ```
   If you see `Invalid API key`, open Supabase **Project Settings → API** and copy the **service_role** key (secret) into `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (never commit it).
   If login always returns **401** despite correct `admin_users` rows, the server is almost always using the **anon** (or wrong) key: only **service_role** can read that table with RLS. Copy the *service_role* JWT under **Project API keys → Secret (legacy) / service_role**, not the anon or public key.
3. On success, optionally remove the seed lines: `npm run admin:strip-seed`
4. Log in at `/admin` with that username and password — the **username** must match the `admin_users.username` value **exactly** (case and characters; leading/trailing spaces are trimmed). You can run `admin:seed` again anytime to add or update a user; remove `SEED_*` from Vercel if you do not use seeding in production. Do **not** add `SEED_*` as `NEXT_PUBLIC_*` — they stay server-side only.

## Quality Checks

Before deployment:

```bash
npm run lint
npm run build
```

## Deploy (Vercel)

Set production environment variables in Vercel Project Settings (use the same keys as `.env.example`), then deploy.

Important:
- Never expose secrets via `NEXT_PUBLIC_*`.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.
- Admin passwords live in the `admin_users` table (bcrypt). Rotate with `admin:seed` or direct DB updates, and rotate `ADMIN_SESSION_SECRET` if session cookies are ever compromised.

Reference: [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
