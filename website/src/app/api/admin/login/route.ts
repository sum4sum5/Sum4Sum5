import { NextResponse } from "next/server";

import { logAdminAuthEvent, getClientIpFromHeaders } from "@/lib/server/admin-audit";
import { verifyAdminCredentials } from "@/lib/server/admin-auth";
import { getSupabaseServiceClient } from "@/lib/server/supabase-admin";
import { createAdminSession } from "@/lib/server/admin-session";

type LoginRequest = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequest;
    const rawUsername = typeof body.username === "string" ? body.username : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!getSupabaseServiceClient()) {
      return NextResponse.json(
        { error: "Server database is not configured" },
        { status: 500 }
      );
    }

    if (!rawUsername.trim() || !password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const storedUsername = await verifyAdminCredentials(rawUsername, password);
    if (!storedUsername) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const sessionCreated = await createAdminSession(storedUsername);
    if (!sessionCreated) {
      return NextResponse.json(
        { error: "ADMIN_SESSION_SECRET is not configured" },
        { status: 500 }
      );
    }

    const hdr = (name: string) => request.headers.get(name);
    void logAdminAuthEvent({
      eventType: "login",
      username: storedUsername,
      ip: getClientIpFromHeaders(hdr),
      userAgent: hdr("user-agent"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
