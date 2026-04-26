import "server-only";

import bcrypt from "bcryptjs";

import { getSupabaseServiceClient } from "@/lib/server/supabase-admin";

const TABLE = "admin_users";
const BCRYPT_COST = 12;

/** Precomputed hash for timing when user does not exist (mitigates simple timing probes). */
const DUMMY_PASSWORD_HASH =
  "$2b$12$0CRQItHl.io55R.7BVlIUeHX3uPJD61zGVfP0Hfx1uFVMhvG99Uku";

/** DB lookup: trim only — must match stored `username` exactly (case-sensitive). */
export function exactAdminLoginUsername(raw: string): string {
  return raw.trim();
}

export async function hashAdminPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_COST);
}

/**
 * Verifies password. `username` must match the DB value exactly (after trim; case-sensitive).
 * Returns the **stored** `username` from the row or null.
 */
export async function verifyAdminCredentials(
  username: string,
  plainPassword: string
): Promise<string | null> {
  const client = getSupabaseServiceClient();
  if (!client) return null;

  const key = exactAdminLoginUsername(username);
  if (!key || !plainPassword) return null;

  const { data: rows, error } = await client
    .from(TABLE)
    .select("username, password_hash")
    .eq("username", key)
    .limit(1);

  if (error) {
    console.error("[admin-auth] admin_users select failed:", error.message, error.code, error.details);
    await bcrypt.compare(plainPassword, DUMMY_PASSWORD_HASH);
    return null;
  }

  const row = rows?.[0];
  if (!row?.password_hash) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[admin-auth] No row in admin_users for exact username "${key}". ` +
          "It must match the `username` column (case and characters) or run admin:seed."
      );
    }
    await bcrypt.compare(plainPassword, DUMMY_PASSWORD_HASH);
    return null;
  }

  const match = await bcrypt.compare(plainPassword, row.password_hash);
  if (!match) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[admin-auth] Password does not match stored hash for user "${row.username}". ` +
          "Re-run admin:seed or check password / bcrypt hash."
      );
    }
    return null;
  }
  return row.username;
}
