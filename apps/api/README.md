# Echo API

Cloudflare Worker API for Echo. This service should support the companion MVP: auth, onboarding preferences, conversation data, memory controls, proactive check-in infrastructure, and safety-related server behavior.

## Stack

- Hono / `@hono/zod-openapi`
- Cloudflare Workers
- Better Auth
- Prisma
- Cloudflare R2 binding for media storage
- Zod for request/response validation

## Runtime Shape

`src/index.ts` creates the Worker app, configures CORS, mounts Better Auth at `/api/auth/*`, mounts API routes under `/api`, exposes `/health`, and serves OpenAPI metadata at `/doc`.

Environment bindings currently include:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `CORS_ORIGIN`
- `MEDIA_BUCKET`

## Development

From the repo root:

```bash
bun dev:api
```

From this workspace:

```bash
bun run dev
bun run build
bun run deploy
bun run cf-typegen
```

Database helpers:

```bash
bun run generate
bun run db:push
bun run migrate
bun run studio
```

Keep new routes focused around MVP capabilities before adding broader assistant or integration workflows.
