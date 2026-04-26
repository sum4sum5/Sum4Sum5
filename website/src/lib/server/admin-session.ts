import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "sum4sum5_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

type SessionVerifyResult =
  | { valid: true; username: string }
  | { valid: true; version: 1 }
  | { valid: false };

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

function signPayload(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "hex");
  const bBuf = Buffer.from(b, "hex");
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

/** v1: `${expMs}.${hexSig}`  v2: `${base64url({e,u})}.${hexSig}` */
function buildSessionToken(secret: string, username: string): string {
  const e = Date.now() + SESSION_TTL_MS;
  const body = Buffer.from(JSON.stringify({ e, u: username }), "utf8").toString("base64url");
  const signature = signPayload(body, secret);
  return `${body}.${signature}`;
}

function verifySessionToken(token: string, secret: string): SessionVerifyResult {
  const dot = token.indexOf(".");
  if (dot <= 0) return { valid: false };
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!payload || !signature) return { valid: false };

  if (/^\d+$/.test(payload)) {
    const expected = signPayload(payload, secret);
    if (!timingSafeEqualHex(signature, expected)) return { valid: false };
    const exp = Number(payload);
    if (!Number.isFinite(exp) || Date.now() >= exp) return { valid: false };
    return { valid: true, version: 1 };
  }

  const expected = signPayload(payload, secret);
  if (!timingSafeEqualHex(signature, expected)) return { valid: false };

  try {
    const raw = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { e?: unknown; u?: unknown };
    if (typeof raw.e !== "number" || Date.now() >= raw.e) return { valid: false };
    if (typeof raw.u !== "string" || !raw.u.trim()) return { valid: false };
    return { valid: true, username: raw.u.trim() };
  } catch {
    return { valid: false };
  }
}

export async function createAdminSession(username: string): Promise<boolean> {
  const secret = getSessionSecret();
  if (!secret) return false;

  const u = username.trim();
  if (!u) return false;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, buildSessionToken(secret, u), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return true;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

async function readAndVerifyToken(): Promise<SessionVerifyResult> {
  const secret = getSessionSecret();
  if (!secret) return { valid: false };

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return { valid: false };

  return verifySessionToken(token, secret);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const r = await readAndVerifyToken();
  return r.valid;
}

/** For logout / audit. `username` is null for legacy v1 session cookies. */
export async function getAdminSessionInfo(): Promise<{
  username: string | null;
  authenticated: boolean;
}> {
  const r = await readAndVerifyToken();
  if (!r.valid) return { authenticated: false, username: null };
  if ("username" in r) {
    return { authenticated: true, username: r.username };
  }
  return { authenticated: true, username: null };
}
