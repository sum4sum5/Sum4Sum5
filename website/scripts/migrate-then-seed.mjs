/**
 * One-off: remove ADMIN_PASSWORD from .env.local, add SEED_*, run admin:seed, remove SEED_*.
 * Usage (from website/): node scripts/migrate-then-seed.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "../.env.local");

function lineQuote(value) {
  if (value == null) return '""';
  if (/^[\w.@-]+$/i.test(value) && !/^\d/.test(value)) return value;
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

const raw = fs.readFileSync(envPath, "utf8");
const lines = raw.split("\n");
let oldPassword;
const kept = [];
for (const line of lines) {
  if (line.startsWith("ADMIN_PASSWORD=")) {
    let v = line.slice("ADMIN_PASSWORD=".length).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1).replace(/\\n/g, "\n");
    }
    oldPassword = v;
    continue;
  }
  if (line.startsWith("SEED_ADMIN_USERNAME=") || line.startsWith("SEED_ADMIN_PASSWORD=")) {
    continue;
  }
  kept.push(line);
}

if (!oldPassword) {
  console.error("No ADMIN_PASSWORD= in .env.local; add SEED_* manually or set ADMIN_PASSWORD once.");
  process.exit(1);
}

const adminIdx = kept.findIndex((l) => l.includes("Admin Configuration"));
if (adminIdx >= 0) {
  kept.splice(adminIdx + 1, 0, "SEED_ADMIN_USERNAME=admin", "SEED_ADMIN_PASSWORD=" + lineQuote(oldPassword));
} else {
  kept.push("", "# Admin (seed – removed after this script)", "SEED_ADMIN_USERNAME=admin", "SEED_ADMIN_PASSWORD=" + lineQuote(oldPassword));
}

fs.writeFileSync(envPath, kept.join("\n") + (kept[kept.length - 1].endsWith("\n") ? "" : "\n"));
console.log("Wrote .env.local with SEED_* (removed ADMIN_PASSWORD).");

const r = spawnSync("npm", ["run", "admin:seed"], {
  cwd: path.join(__dirname, ".."),
  stdio: "inherit",
  shell: process.platform === "win32",
});
if (r.status !== 0) {
  console.error("admin:seed failed; fix errors then run: npm run admin:seed");
  process.exit(r.status || 1);
}

const after = fs.readFileSync(envPath, "utf8");
const finalLines = after
  .split("\n")
  .filter(
    (l) =>
      !l.startsWith("SEED_ADMIN_USERNAME=") && !l.startsWith("SEED_ADMIN_PASSWORD=")
  );
fs.writeFileSync(envPath, finalLines.join("\n") + "\n");
console.log("Removed SEED_* from .env.local. Login: username=admin, password=(your previous admin password).");
