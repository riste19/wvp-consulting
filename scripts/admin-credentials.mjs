/**
 * Makes the admin panel's sign-in secrets.
 *
 *   node scripts/admin-credentials.mjs               generates a strong password
 *   node scripts/admin-credentials.mjs "passphrase"  uses yours (at least 12 characters)
 *
 * Put ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET into Cloudflare Pages →
 * Settings → Variables and Secrets, as secrets. The password itself is stored
 * nowhere: hand it to the editor, and do not leave it in shell history.
 *
 * The iteration count is modest because the check runs inside a Cloudflare
 * Worker's CPU budget. It must stay at or above MIN_ITERATIONS in
 * functions/api/admin/[[route]].ts.
 */
import { randomBytes, webcrypto } from "node:crypto";

const ITERATIONS = 20_000;

const password =
  process.argv[2] ??
  randomBytes(18).toString("base64").replace(/[+/=]/g, "").slice(0, 20);

if (password.length < 12) {
  console.error("The password must be at least 12 characters long.");
  process.exit(1);
}

const salt = randomBytes(16);
const key = await webcrypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(password),
  "PBKDF2",
  false,
  ["deriveBits"],
);
const hash = await webcrypto.subtle.deriveBits(
  { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS },
  key,
  256,
);

if (!process.argv[2]) console.log(`Password (give this to the editor): ${password}\n`);
console.log(
  `ADMIN_PASSWORD_HASH=pbkdf2-sha256$${ITERATIONS}$${salt.toString("base64")}$${Buffer.from(hash).toString("base64")}`,
);
console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString("base64")}`);
