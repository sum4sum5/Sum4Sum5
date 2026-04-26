/**
 * Remove SEED_ADMIN_* from .env.local (after successful admin:seed).
 * From website/: node scripts/strip-seed-env.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");
let t = fs.readFileSync(envPath, "utf8");
const out = t
  .split("\n")
  .filter(
    (l) =>
      !l.startsWith("SEED_ADMIN_USERNAME=") && !l.startsWith("SEED_ADMIN_PASSWORD=")
  )
  .join("\n");
fs.writeFileSync(envPath, out.endsWith("\n") ? out : out + "\n");
console.log("Removed SEED_ADMIN_* from .env.local");
