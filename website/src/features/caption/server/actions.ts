'use server';

import crypto from "node:crypto";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { headers } from "next/headers";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const modelName = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview";
const apiVersion = process.env.GEMINI_API_VERSION;
const slangYear = process.env.GEMINI_SLANG_YEAR;
const hashtagCount = process.env.GEMINI_HASHTAG_COUNT;

const ALLOWED_MODES = new Set(["post"]);

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
}

const RATE_LIMIT_WINDOW_MS = parsePositiveInt(process.env.GEMINI_RATE_LIMIT_WINDOW_MS, 60_000);
const RATE_LIMIT_MAX_REQUESTS = parsePositiveInt(process.env.GEMINI_RATE_LIMIT_MAX_REQUESTS, 8);
const PROVIDER_TIMEOUT_MS = parsePositiveInt(process.env.GEMINI_TIMEOUT_MS, 15_000);

const TOPIC_MAX_LENGTH = 500;
const VIBE_MAX_LENGTH = 80;
const INTERESTS_MAX_LENGTH = 200;
const SAFE_AI_ERROR_MESSAGE = "ระบบ AI ยังไม่พร้อมใช้งานชั่วคราว กรุณาลองใหม่อีกครั้ง";
const SAFE_TIMEOUT_ERROR_MESSAGE = "ระบบ AI ใช้เวลานานเกินกำหนด กรุณาลองใหม่อีกครั้ง";
const SAFE_QUOTA_ERROR_MESSAGE = "โควตาการใช้งานวันนี้เต็มแล้ว กรุณาลองใหม่พรุ่งนี้ หรือเปลี่ยนรุ่น Model";

const requestBuckets = new Map<string, { count: number; windowStart: number }>();

const model = genAI.getGenerativeModel(
  {
    model: modelName!,
    systemInstruction: `คุณคือ "ตัวมารดา" แห่งวงการแคปชั่นสายกวนประสาท
    หน้าที่: เขียนแคปชั่นที่ "สั้น คม หักมุม" สำหรับคนไทยปี ${slangYear || '2026'}
    สไตล์: ใช้ศัพท์แสลงวัยรุ่น, มุกตลกคาเฟ่, และความกวนประสาทระดับมือโปร
    
    กฎสำคัญ:
    - ตอบเป็น JSON Array ของสตริงเท่านั้น (เฉพาะตัวแคปชั่น)
    - ห้ามมีเกริ่นนำหรือพูดนอกเรื่อง
    - รักษาจริตและความฮาแบบ Human-like สูงที่สุด`,
    generationConfig: {
      temperature: parseFloat(process.env.GEMINI_TEMPERATURE!),
      maxOutputTokens: parseInt(process.env.GEMINI_MAX_TOKENS!),
    }
  },
  { apiVersion: apiVersion! }
);

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

function cleanupExpiredBuckets(now: number): void {
  for (const [key, bucket] of requestBuckets.entries()) {
    if (now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
      requestBuckets.delete(key);
    }
  }
}

function checkRateLimit(clientKey: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const bucket = requestBuckets.get(clientKey);
  if (!bucket || now - bucket.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestBuckets.set(clientKey, { count: 1, windowStart: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    const remainingMs = Math.max(0, RATE_LIMIT_WINDOW_MS - (now - bucket.windowStart));
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(remainingMs / 1000),
    };
  }

  bucket.count += 1;
  requestBuckets.set(clientKey, bucket);
  return { allowed: true, retryAfterSeconds: 0 };
}

async function getClientRateLimitKey(): Promise<string> {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    const realIp = requestHeaders.get("x-real-ip");
    const userAgent = requestHeaders.get("user-agent");

    const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || "";
    const fingerprintSource = clientIp || userAgent || "anonymous";

    return crypto
      .createHash("sha256")
      .update(fingerprintSource)
      .digest("hex")
      .slice(0, 24);
  } catch {
    return crypto.createHash("sha256").update("anonymous").digest("hex").slice(0, 24);
  }
}

async function withTimeout<T>(promiseFactory: () => Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("PROVIDER_TIMEOUT"));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promiseFactory(), timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export async function generateCaptions(
  topic: string,
  vibe: string,
  mode: string = 'post',
  platform: string = 'ทั่วไป',
  gender: string = 'ทุกเพศ',
  ageRange: string = 'ทุกวัย',
  interests: string = '',
  annoyanceLevel: number = 2,
  length: string = 'กลาง'
) {
  if (!process.env.GEMINI_API_KEY) {
    return { error: SAFE_AI_ERROR_MESSAGE };
  }

  const normalizedTopic = normalizeText(topic);
  const normalizedVibe = normalizeText(vibe);
  const normalizedMode = normalizeText(mode).toLowerCase();
  const normalizedPlatform = normalizeText(platform);
  const normalizedGender = normalizeText(gender);
  const normalizedAge = normalizeText(ageRange);
  const normalizedInterests = normalizeText(interests);

  if (!normalizedTopic || normalizedTopic.length > TOPIC_MAX_LENGTH) {
    return { error: "กรุณาระบุหัวข้อให้ถูกต้อง (ไม่เกิน 500 ตัวอักษร)" };
  }

  if (!normalizedVibe || normalizedVibe.length > VIBE_MAX_LENGTH) {
    return { error: "กรุณาระบุโทนข้อความให้ถูกต้อง" };
  }

  if (!ALLOWED_MODES.has(normalizedMode)) {
    return { error: "รูปแบบคอนเทนต์ไม่ถูกต้อง" };
  }

  if (normalizedInterests.length > INTERESTS_MAX_LENGTH) {
    return { error: "ความสนใจต้องไม่เกิน 200 ตัวอักษร" };
  }

  const clientKey = await getClientRateLimitKey();
  const rateLimit = checkRateLimit(clientKey);
  if (!rateLimit.allowed) {
    return {
      error: `เรียกใช้งานถี่เกินไป กรุณาลองใหม่ในอีก ${rateLimit.retryAfterSeconds} วินาที`,
    };
  }

  const audienceParts: string[] = [];
  if (normalizedGender && normalizedGender !== 'ทุกเพศ') audienceParts.push(`เพศ: ${normalizedGender}`);
  if (normalizedAge && normalizedAge !== 'ทุกวัย') audienceParts.push(`ช่วงอายุ: ${normalizedAge}`);
  if (normalizedInterests) audienceParts.push(`ความสนใจ/ไลฟ์สไตล์: ${normalizedInterests}`);
  const audienceContext = audienceParts.length > 0 ? `กลุ่มเป้าหมาย: ${audienceParts.join(', ')}` : '';
  const platformContext = normalizedPlatform !== 'ทั่วไป' ? `แพลตฟอร์ม: ${normalizedPlatform}` : '';

  let marketingInstruction = '';
  if (normalizedVibe === 'สายแม่ค้าออนไลน์' || normalizedVibe.includes('ขาย')) {
    marketingInstruction = `
      กฎสำหรับสายแม่ค้า:
      - เน้นความ "เป็นกันเอง" และ "น่าซื้อ"
      - ใช้ภาษาที่ดูเป็นมิตร มีจริตแม่ค้าที่น่ารัก ไม่กดดันลูกค้า
      - แบบที่ 1: เน้นความน่าสนใจของสินค้า
      - แบบที่ 2: เน้นโปรโมชั่นหรือความคุ้มค่า
      - แบบที่ 3: เน้นการรีวิวสั้นๆ หรือการบอกต่อ
    `;
  } else if (normalizedVibe === 'สายฮา/กวนๆ' || normalizedVibe.includes('กวน')) {
    marketingInstruction = `
      กฎสำหรับสายฮา:
      - เน้นความ "สั้น กระชับ หักมุม"
      - ใช้ศัพท์แสลงวัยรุ่นปี ${slangYear || '2026'} ให้ดูทันสมัย
      - เน้นการเล่นคำ หรือมุกตลกที่คนอ่านแล้วต้องแชร์
    `;
  } else if (normalizedVibe === 'สายอ่อย' || normalizedVibe.includes('อ่อย')) {
    marketingInstruction = `
      กฎสำหรับสายอ่อย:
      - เน้นความ "น่ารักปนเซ็กซี่" หรือ "อ้อนแบบกวนๆ"
      - ใช้คำพูดที่ทำให้คนอ่านอยากทัก หรือคอมเมนต์หยอกล้อ
    `;
  } else if (normalizedVibe === 'สายมู/พลังบวก' || normalizedVibe.includes('มู')) {
    marketingInstruction = `
      กฎสำหรับสายมู/พลังบวก:
      - เน้น "พลังงานบวก" และ "ความโชคดี"
      - ใส่เรื่องดวงชะตา ตัวเลขมงคล หรือคำอวยพรที่อ่านแล้วรู้สึกดี
    `;
  }

  const prompt = `
    งาน: เขียน "${normalizedMode}" สำหรับเรื่อง "${normalizedTopic}" ในโทน "${normalizedVibe}"
    ${platformContext}
    ${audienceContext}
    
    ${marketingInstruction}

    ระดับความกวน (1-5): ${annoyanceLevel}
    (1 = กวนน้อย/สุภาพ, 3 = กวนกำลังดี/แสบๆ คันๆ, 5 = กวนประสาท/ศัพท์แสลงจัดเต็ม)

    ความยาวที่ต้องการ: ${length}
    (สั้น = 1-2 ประโยคทองคมๆ, กลาง = ความยาวปกติ 2-4 ประโยค, ยาว = เล่าเรื่องราวหรือมีรายละเอียดเยอะ)
    
    กฎเหล็ก:
    1. ต้องเขียนออกมาให้ครบ 3 แบบที่มี "สไตล์แตกต่างกัน"
    2. ต้องรักษา "จริต (${normalizedVibe})" อย่างเคร่งครัด
    3. ใส่ Emoji และ Hashtag ให้ดูมีสีสัน (Hashtag ประมาณ ${hashtagCount} อัน)
    4. ห้ามมีคำนำหน้า เช่น "แบบที่ 1:" ให้ตอบแต่เนื้อหาที่นำไปโพสต์ได้เลย
    5. ห้ามมีเกริ่นนำหรือพูดนอกเรื่อง ให้ตอบเป็น JSON Array เท่านั้น
    6. ปรับสไตล์ให้เข้ากับ ${normalizedPlatform !== 'ทั่วไป' ? normalizedPlatform : 'โซเชียลมีเดีย'}
  `;
  try {
    const result = await withTimeout(() => model.generateContent(prompt), PROVIDER_TIMEOUT_MS);

    if (result.response.candidates?.[0]?.finishReason === 'SAFETY') {
      console.error("AI Safety Rejection for prompt:", prompt);
      return { error: "ขออภัย หัวข้อนี้ขัดต่อหลักเกณฑ์ด้านความปลอดภัยของ AI กรุณาลองใช้หัวข้ออื่น" };
    }

    const text = result.response.text();
    console.log("AI Response Text:", text);

    let captions: string[] = [];
    try {
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
      captions = Array.isArray(parsed) ? parsed : [];
    } catch {
      captions = text
        .split(/\n|\[SEPARATOR\]/i)
        .map(l => l.replace(/^\d+\.\s*|^- \s*|\[SEPARATOR\]/i, "").trim())
        .filter(l => l.length > 5);
    }

    captions = captions.slice(0, 3);
    if (captions.length === 0) {
      return { error: SAFE_AI_ERROR_MESSAGE };
    }

    return { captions };
  } catch (error: unknown) {
    console.error("CRITICAL AI Error:", error);
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";

    if (message === "PROVIDER_TIMEOUT") {
      return { error: SAFE_TIMEOUT_ERROR_MESSAGE };
    }

    if (message.includes("429") || message.toLowerCase().includes("quota") || message.toLowerCase().includes("rate limit")) {
      return { error: SAFE_QUOTA_ERROR_MESSAGE };
    }

    if (message.includes("API key not valid") || message.includes("403")) {
      return { error: "ระบบขัดข้อง (API Key มีปัญหา) กรุณาแจ้งผู้ดูแลระบบ" };
    }

    return { error: SAFE_AI_ERROR_MESSAGE };
  }
}
