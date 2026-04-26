import "server-only";

import { createClient } from "@supabase/supabase-js";

type UsagePayload = Record<string, unknown>;

type UsageRecord = {
  created_at: string;
  tool_key: string;
  payload: UsagePayload | null;
};

function bucketTopicLength(n: number): string {
  if (n <= 20) return "1–20 ตัวอักษร";
  if (n <= 50) return "21–50 ตัวอักษร";
  if (n <= 100) return "51–100 ตัวอักษร";
  return "มากกว่า 100 ตัวอักษร";
}

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const tableName = process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME || "usage_stats";

/**
 * In development, if the key is a Supabase JWT, warn when role is not service_role
 * (anon / custom keys cannot read `admin_users` under RLS → login 401).
 */
function warnIfServiceRoleKeyLooksWrong(key: string) {
  if (process.env.NODE_ENV !== "development") return;
  if (!key.startsWith("eyJ")) return;
  try {
    const parts = key.split(".");
    const payload = JSON.parse(
      Buffer.from(parts[1] ?? "", "base64url").toString("utf8")
    ) as { role?: string };
    if (payload.role && payload.role !== "service_role") {
      console.warn(
        `[supabase] SUPABASE_SERVICE_ROLE_KEY has role "${payload.role}" — ` +
          "use the **service_role** secret from Project Settings → API, not anon/publishable, or admin login returns 401."
      );
    }
  } catch {
    // ignore
  }
}

if (supabaseServiceKey) {
  warnIfServiceRoleKeyLooksWrong(supabaseServiceKey);
}

const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false },
      })
    : null;

/** Service-role client (bypasses RLS). Use only on the server. */
export function getSupabaseServiceClient() {
  return supabaseAdmin;
}

export async function logToolUsageServer(
  toolKey: string,
  payload: UsagePayload = {}
): Promise<void> {
  if (!supabaseAdmin) return;

  const { error } = await supabaseAdmin.from(tableName).insert([
    {
      tool_key: toolKey,
      payload,
    },
  ]);

  if (error) {
    console.error("Failed to log usage:", error.message);
  }
}

export async function getAnalyticsServer(): Promise<{
  dailyStats: Array<{ date: string; count: number }>;
  toolPopularity: Array<{ tool: string; count: number }>;
  captionVibeMix: Array<{ label: string; count: number }>;
  topicLengthBuckets: Array<{ label: string; count: number }>;
}> {
  const empty = {
    dailyStats: [] as Array<{ date: string; count: number }>,
    toolPopularity: [] as Array<{ tool: string; count: number }>,
    captionVibeMix: [] as Array<{ label: string; count: number }>,
    topicLengthBuckets: [] as Array<{ label: string; count: number }>,
  };

  if (!supabaseAdmin) {
    return empty;
  }

  const { data, error } = await supabaseAdmin
    .from(tableName)
    .select("created_at,tool_key,payload")
    .order("created_at", { ascending: false })
    .limit(5000);

  if (error) {
    console.error("Failed to fetch analytics:", error.message);
    return empty;
  }

  const records = (data || []) as UsageRecord[];

  const dailyMap = new Map<string, number>();
  for (const record of records) {
    const key = new Date(record.created_at).toISOString().slice(0, 10);
    dailyMap.set(key, (dailyMap.get(key) || 0) + 1);
  }

  const dailyStats = Array.from(dailyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-7)
    .map(([isoDate, count]) => ({
      date: new Date(`${isoDate}T12:00:00.000Z`).toLocaleDateString("th-TH"),
      count,
    }));

  const toolMap = new Map<string, number>();
  const vibeMap = new Map<string, number>();
  const lengthBucketMap = new Map<string, number>();

  const CAPTION_TOOL = "Caption Randomizer";

  for (const record of records) {
    const tool = typeof record.tool_key === "string" ? record.tool_key.trim() : "";
    if (tool) {
      toolMap.set(tool, (toolMap.get(tool) || 0) + 1);
    }

    if (tool !== CAPTION_TOOL || !record.payload || typeof record.payload !== "object") {
      continue;
    }

    const vibeRaw = record.payload.vibe;
    if (typeof vibeRaw === "string" && vibeRaw.trim()) {
      const vibe = vibeRaw.trim();
      vibeMap.set(vibe, (vibeMap.get(vibe) || 0) + 1);
    }

    const lenRaw = record.payload.topicLength;
    const topicLen =
      typeof lenRaw === "number" && Number.isFinite(lenRaw)
        ? lenRaw
        : typeof lenRaw === "string"
          ? Number.parseInt(lenRaw, 10)
          : NaN;
    if (Number.isFinite(topicLen) && topicLen >= 0) {
      const label = bucketTopicLength(topicLen);
      lengthBucketMap.set(label, (lengthBucketMap.get(label) || 0) + 1);
    }
  }

  const toolPopularity = Array.from(toolMap.entries())
    .map(([tool, count]) => ({ tool, count }))
    .sort((a, b) => b.count - a.count);

  const captionVibeMix = Array.from(vibeMap.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const bucketOrder = [
    "1–20 ตัวอักษร",
    "21–50 ตัวอักษร",
    "51–100 ตัวอักษร",
    "มากกว่า 100 ตัวอักษร",
  ];
  const topicLengthBuckets = bucketOrder
    .filter((label) => (lengthBucketMap.get(label) || 0) > 0)
    .map((label) => ({ label, count: lengthBucketMap.get(label) || 0 }));

  return { dailyStats, toolPopularity, captionVibeMix, topicLengthBuckets };
}
