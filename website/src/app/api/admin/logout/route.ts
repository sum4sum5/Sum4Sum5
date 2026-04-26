import { NextResponse } from "next/server";

import { logAdminAuthEvent, getClientIpFromHeaders } from "@/lib/server/admin-audit";
import { clearAdminSession, getAdminSessionInfo } from "@/lib/server/admin-session";

export async function POST(request: Request) {
  const { authenticated, username } = await getAdminSessionInfo();
  if (authenticated) {
    const name = username?.trim() || "unknown";
    const hdr = (h: string) => request.headers.get(h);
    void logAdminAuthEvent({
      eventType: "logout",
      username: name,
      ip: getClientIpFromHeaders(hdr),
      userAgent: hdr("user-agent"),
    });
  }
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
