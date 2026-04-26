import "server-only";

import { getSupabaseServiceClient } from "@/lib/server/supabase-admin";

const TABLE = "admin_auth_log";

export type AdminAuthEventType = "login" | "logout";

/**
 * Inserts a row into `admin_auth_log`. Never throws — failures are logged to console.
 */
export async function logAdminAuthEvent(params: {
  eventType: AdminAuthEventType;
  username: string;
  ip: string | null;
  userAgent: string | null;
}): Promise<void> {
  const client = getSupabaseServiceClient();
  if (!client) return;

  const { error } = await client.from(TABLE).insert({
    event_type: params.eventType,
    username: params.username.trim(),
    ip: params.ip,
    user_agent: params.userAgent,
  });

  if (error) {
    console.error("admin auth log failed:", error.message);
  }
}

export function getClientIpFromHeaders(
  getHeader: (name: string) => string | null
): string | null {
  const xff = getHeader("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return getHeader("x-real-ip") || null;
}
