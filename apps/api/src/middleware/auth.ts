import type { Context, Next } from "hono";
import { getAuth } from "../lib/auth";

type Bindings = {
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  CORS_ORIGIN?: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authMiddleware = async (c: Context<any>, next: Next) => {
  const auth = getAuth(c.env as Bindings);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  
  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  
  c.set("user", session.user as AuthUser);
  c.set("session", session.session);
  return next();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const requireRole = (...roles: string[]) => {
  return async (c: Context<any>, next: Next) => {
    const user = c.get("user") as AuthUser | undefined;
    
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    if (!roles.includes(user.role)) {
      return c.json({ error: "Forbidden", message: `Required role: ${roles.join(" or ")}` }, 403);
    }
    
    return next();
  };
};

export const requireBusinessOwner = requireRole("business_owner", "admin");
export const requireAdmin = requireRole("admin");
