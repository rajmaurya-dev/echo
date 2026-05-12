import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { authMiddleware, requireBusinessOwner, type AuthUser } from "../middleware/auth";
import { ErrorSchema } from "../schemas";

type Env = {
  Bindings: {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    MEDIA_BUCKET: R2Bucket;
  };
  Variables: {
    user: AuthUser;
    session: unknown;
  };
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export const uploadsApp = new OpenAPIHono<Env>();

// ============================================
// Schemas
// ============================================

const UploadResponseSchema = z.object({
  url: z.string(),
  key: z.string(),
}).openapi("UploadResponse");

const DeleteUploadSchema = z.object({
  key: z.string(),
}).openapi("DeleteUpload");

// ============================================
// Route Definitions
// ============================================

const uploadFileRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Uploads"],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            file: z.any().openapi({ type: "string", format: "binary" }),
            folder: z.string().openapi({ example: "businesses/abc123" }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: { "application/json": { schema: UploadResponseSchema } },
      description: "File uploaded successfully",
    },
    400: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Invalid file",
    },
    401: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Unauthorized",
    },
    403: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Forbidden",
    },
  },
});

const deleteFileRoute = createRoute({
  method: "delete",
  path: "/",
  tags: ["Uploads"],
  request: {
    body: { content: { "application/json": { schema: DeleteUploadSchema } } },
  },
  responses: {
    200: {
      content: { "application/json": { schema: z.object({ success: z.boolean() }) } },
      description: "File deleted",
    },
    401: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Unauthorized",
    },
    403: {
      content: { "application/json": { schema: ErrorSchema } },
      description: "Forbidden",
    },
  },
});

// ============================================
// Route Handlers
// ============================================

// Public GET — serve images from R2 (no auth required)
uploadsApp.get("/file/*", async (c) => {
  const key = c.req.path.replace(/^\/file\//, "");
  if (!key) {
    return c.json({ error: "File key is required" }, 400);
  }

  const object = await c.env.MEDIA_BUCKET.get(key);
  if (!object) {
    return c.json({ error: "File not found" }, 404);
  }

  const headers = new Headers();
  headers.set("Content-Type", object.httpMetadata?.contentType || "application/octet-stream");
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("ETag", object.httpEtag);

  return new Response(object.body, { headers });
});

uploadsApp.openapi(uploadFileRoute, async (c) => {
  const authResult = await authMiddleware(c, async () => {});
  if (authResult) return authResult;
  const roleResult = await requireBusinessOwner(c, async () => {});
  if (roleResult) return roleResult;

  const body = await c.req.parseBody();
  const file = body["file"];
  const folder = body["folder"] as string;

  if (!file || !(file instanceof File)) {
    return c.json({ error: "No file provided" }, 400);
  }

  if (!folder) {
    return c.json({ error: "Folder path is required" }, 400);
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return c.json({ error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}` }, 400);
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return c.json({ error: `File too large. Max size: ${MAX_FILE_SIZE / 1024 / 1024}MB` }, 400);
  }

  // Generate unique key
  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  const key = `${folder}/${timestamp}-${random}.${ext}`;

  // Upload to R2
  await c.env.MEDIA_BUCKET.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type,
    },
  });

  // Return the key and the serving URL
  return c.json({ url: `/api/uploads/file/${key}`, key }, 200);
});

uploadsApp.openapi(deleteFileRoute, async (c) => {
  const authResult = await authMiddleware(c, async () => {});
  if (authResult) return authResult;
  const roleResult = await requireBusinessOwner(c, async () => {});
  if (roleResult) return roleResult;

  const { key } = c.req.valid("json");

  await c.env.MEDIA_BUCKET.delete(key);

  return c.json({ success: true }, 200);
});
