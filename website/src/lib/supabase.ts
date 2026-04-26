type UsagePayload = Record<string, unknown>;

/**
 * Client-side helper that forwards usage logs to server API.
 * The server is the only layer that talks to Supabase.
 */
export async function logToolUsage(
  toolKey: string,
  payload: UsagePayload = {}
): Promise<void> {
  try {
    await fetch("/api/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toolKey, payload }),
    });
  } catch (error) {
    console.error("Failed to send usage log:", error);
  }
}
