import type { NextFunction, Request, Response } from "express";
import { verifyTokenString } from "../utils/jwt.js";
import type { JwtPayload } from "../utils/jwt.js";

// Augment Express Request with the decoded user.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: no token" });
    return;
  }
  const token = header.split(" ")[1] as string;
  try {
    req.user = verifyTokenString(token);
    next();
  } catch {
    res.status(403).json({ message: "Forbidden: invalid token" });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Forbidden: admin only" });
    return;
  }
  next();
};
