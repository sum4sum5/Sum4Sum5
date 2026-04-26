/**
 * One-time: create or update an admin in `admin_users` (bcrypt).
 * From `website/`:  npm run admin:seed
 * Put in `.env.local`: SEED_ADMIN_USERNAME, SEED_ADMIN_PASSWORD, plus Supabase URL + service key.
 *
 * (Does not import `admin-auth`: `server-only` is for Next only; bcrypt cost must match admin-auth.ts.)
 * Username in env must match how you will type at login (case-sensitive, trim only on compare).
 */

import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });

const TABLE = "admin_users";
const BCRYPT_COST = 12;

async function main() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const rawUser = process.env.SEED_ADMIN_USERNAME;
  const rawPass = process.env.SEED_ADMIN_PASSWORD;

  if (!url || !serviceKey) {
    console.error("Missing SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }
  if (!rawUser?.trim() || !rawPass) {
    console.error("Set SEED_ADMIN_USERNAME and SEED_ADMIN_PASSWORD in .env.local for this run.");
    process.exit(1);
  }

  const exact = rawUser.trim();
  if (!exact) {
    console.error("SEED_ADMIN_USERNAME is empty after trim.");
    process.exit(1);
  }

  const client = createClient(url, serviceKey, { auth: { persistSession: false } });
  const password_hash = await bcrypt.hash(rawPass, BCRYPT_COST);

  const { data: existing, error: selectErr } = await client
    .from(TABLE)
    .select("id,username")
    .eq("username", exact)
    .maybeSingle();

  if (selectErr) {
    console.error("Query failed:", selectErr.message);
    process.exit(1);
  }

  if (existing) {
    const { error } = await client
      .from(TABLE)
      .update({ password_hash })
      .eq("username", exact);
    if (error) {
      console.error("Update failed:", error.message);
      process.exit(1);
    }
    console.log("Updated password for admin:", (existing as { username: string }).username);
  } else {
    const { error } = await client.from(TABLE).insert([{ username: exact, password_hash }]);
    if (error) {
      console.error("Insert failed:", error.message);
      process.exit(1);
    }
    console.log("Created admin user:", exact);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
