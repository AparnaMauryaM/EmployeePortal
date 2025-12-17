import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

// Secret Key
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretkey"
);
 
export async function verifyToken(req: Request,res: Response,next: NextFunction)
{
  try
  {
    // Check token existence
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if(
      typeof payload !== "object" ||
      payload === null ||
      typeof payload.id !== "number" ||
      typeof payload.username !== "string" ||
      typeof payload.role !== "string"
    ) 
    {
      return res.status(401).json({message: "Invalid token" });
    }
  
    //Pass token details forward
    req.user = {id: payload.id, role: payload.role, username: payload.username};
    next();
  }
  catch (err)
  {
    return res.status(401).json({message: "Invalid or expired token"});
  }
}
