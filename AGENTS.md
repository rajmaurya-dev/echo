# AGENTS.md

## Project Context

Echo is a mobile-first AI companion product. The v1 scope lives in `mvp.md`: one persistent companion per user, memory-aware texting-style chat, personalization onboarding, proactive check-ins, and safety/trust controls.

## Architecture

- `apps/native`: Expo + React Native app. Treat this as the primary v1 product surface.
- `apps/web`: React + Vite web app for marketing, account/legal pages, and future supporting web surfaces.
- `apps/api`: Cloudflare Worker API using Hono, Better Auth, Prisma, and R2 bindings.
- `packages`: reserved for shared code when behavior needs to cross apps.

## Agent Notes

- Read `mvp.md` before making product-scope decisions.
- Keep v1 work centered on onboarding, chat, companion identity, memory, proactive engagement, and safety.
- Avoid expanding into non-goals such as voice-first flows, marketplace characters, autonomous integrations, or rich avatars unless the MVP changes.
- Prefer small, app-local changes until shared abstractions are clearly needed.
