import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "eleva_auth";

export type AuthPayload = {
  userId: string;
  email: string;
  name: string;
};

export function signToken(payload: AuthPayload) {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error("Missing AUTH_JWT_SECRET");
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload | null {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) throw new Error("Missing AUTH_JWT_SECRET");
  try {
    return jwt.verify(token, secret) as AuthPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export function clearAuthCookie() {
  cookies().set(COOKIE_NAME, "", { httpOnly: true, path: "/", maxAge: 0 });
}

export function getAuthFromCookie(): AuthPayload | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export const AUTH_COOKIE_NAME = COOKIE_NAME;
