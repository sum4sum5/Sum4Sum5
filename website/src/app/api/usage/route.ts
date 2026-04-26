import { NextResponse } from "next/server";

import { logToolUsageServer } from "@/lib/server/supabase-admin";

type UsageRequest = {
  toolKey?: string;
  payload?: Record<string, unknown>;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UsageRequest;
    const toolKey = typeof body.toolKey === "string" ? body.toolKey.trim() : "";
    const payload = body.payload && typeof body.payload === "object" ? body.payload : {};

    if (!toolKey) {
      return NextResponse.json({ error: "toolKey is required" }, { status: 400 });
    }

    await logToolUsageServer(toolKey, payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
