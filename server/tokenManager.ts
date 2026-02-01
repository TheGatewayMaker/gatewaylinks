import crypto from "crypto";

interface TokenData {
  token: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory store for tokens: sessionId -> TokenData
const tokenStore = new Map<string, TokenData>();

// Cleanup interval: run every 60 seconds to remove expired tokens
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, data] of tokenStore.entries()) {
    if (data.expiresAt < now) {
      tokenStore.delete(sessionId);
    }
  }
}, 60000);

const CORRECT_PASSCODE = "123456"; // This should be an environment variable
const TOKEN_EXPIRY_MS = 3 * 60 * 1000; // 3 minutes

/**
 * Generates a new token for a session
 * Returns a unique token string
 */
export function generateToken(): string {
  const sessionId = crypto.randomUUID();
  const token = crypto.randomBytes(32).toString("hex");
  const now = Date.now();

  tokenStore.set(sessionId, {
    token,
    createdAt: now,
    expiresAt: now + TOKEN_EXPIRY_MS,
  });

  // Return sessionId:token format so client can send it back
  return `${sessionId}:${token}`;
}

/**
 * Verifies if a token is valid
 */
export function verifyToken(tokenString: string): boolean {
  const now = Date.now();

  for (const [, data] of tokenStore.entries()) {
    if (data.token === tokenString && data.expiresAt > now) {
      return true;
    }
  }

  return false;
}

/**
 * Verifies the passcode
 */
export function verifyPasscode(code: string): boolean {
  return code === CORRECT_PASSCODE;
}
