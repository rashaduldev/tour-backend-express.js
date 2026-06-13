import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { envConfig } from "../config/env.js";

export interface JwtPayload {
  email: string;
  role: string;
}

export const signToken = (payload: JwtPayload): string => {
  const options = { expiresIn: envConfig.jwtExpiresIn } as SignOptions;
  return jwt.sign(payload, envConfig.jwtSecret, options);
};

export const verifyTokenString = (token: string): JwtPayload => {
  return jwt.verify(token, envConfig.jwtSecret) as JwtPayload;
};
