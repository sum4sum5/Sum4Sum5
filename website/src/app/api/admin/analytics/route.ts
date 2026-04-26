import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/server/admin-session";
import { getAnalyticsServer } from "@/lib/server/supabase-admin";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getAnalyticsServer();
  return NextResponse.json(data);
}
