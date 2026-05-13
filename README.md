# Echo

Echo is a mobile-first AI companion app. The v1 MVP is defined in `mvp.md`: one persistent companion per user that remembers useful context, replies in short natural messages, and checks in proactively without becoming intrusive.

## MVP Focus

- Messaging-first mobile experience
- Single persistent companion identity per user
- Personalization onboarding for companion vibe, user tone, boundaries, memories, and check-in preferences
- Long-term memory foundation with user controls to correct or delete important memories
- Proactive check-ins and re-engagement after inactivity
- Safety and trust baseline for AI disclosure, sensitive topics, crisis handling, and dependency-aware language

Out of scope for v1: multi-character marketplaces, broad productivity workflows, therapy replacement claims, autonomous integrations, voice-first flows, and rich avatars or generative media.

## Repository Structure

```txt
apps/
  native/   Expo + React Native app. Primary v1 product surface.
  web/      React + Vite web app for marketing, account/legal pages, and future web surfaces.
  api/      Cloudflare Worker API using Hono, Better Auth, Prisma, and R2 bindings.
packages/  Shared packages can be added here when logic needs to cross app boundaries.
mvp.md     Product scope and launch criteria for Echo v1.
```

## Development

Install dependencies from the repo root:

```bash
bun install
```

Run all workspaces:

```bash
bun dev
```

Run a specific app:

```bash
bun dev:web
bun dev:api
bun run --filter=native start
```

Common checks:

```bash
bun build
bun test
bun lint
bun check
```

## Product Principles

- The native app is the source of truth for the v1 user experience.
- Companion behavior should feel consistent over time and memory-aware, but never creepy or manipulative.
- Notification and memory controls should be easy to find because proactive engagement is part of the product promise.
- Safety behavior is core product work, not a post-launch add-on.
