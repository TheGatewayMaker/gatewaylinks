import { RequestHandler } from "express";
import { verifyPasscode, generateToken, verifyToken } from "../tokenManager";

/**
 * POST /api/darkweb/verify-passcode
 * Verifies the passcode and generates a token if correct
 */
export const verifyPasscodeHandler: RequestHandler = (req, res) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Invalid request" });
  }

  if (!verifyPasscode(code)) {
    return res.status(401).json({ error: "Invalid passcode" });
  }

  const token = generateToken();
  res.json({ token, expiresIn: 180 }); // 180 seconds = 3 minutes
};

/**
 * GET /api/darkweb/verify-token
 * Verifies if a token is still valid
 */
export const verifyTokenHandler: RequestHandler = (req, res) => {
  const token = req.query.token as string;

  if (!token) {
    return res.status(400).json({ error: "Token required" });
  }

  if (!verifyToken(token)) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }

  res.json({ valid: true });
};
