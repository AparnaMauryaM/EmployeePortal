import { Request, Response, NextFunction } from "express";
import { JWTPayload, jwtVerify } from "jose";

// Secret must be Uint8Array
  const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretkey"
);


// Extend Express Request
export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export async function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Check token existence
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const { payload } = await jwtVerify(token, JWT_SECRET);

    //Pass token details forward
    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}
