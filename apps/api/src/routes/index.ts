import { OpenAPIHono } from "@hono/zod-openapi";
import { uploadsApp } from "./uploads";

type Env = {
  Bindings: {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_CLIENT_SECRET?: string;
    CORS_ORIGIN?: string;
    MEDIA_BUCKET: R2Bucket;
  };
};

export const apiApp = new OpenAPIHono<Env>();

// Health check endpoint
apiApp.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "SaaS API",
  });
});

// Mount all routes
apiApp.route("/uploads", uploadsApp);

// OpenAPI documentation endpoint
apiApp.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "SaaS API",
    description: "API for SaaS boilerplate",
  },
});
