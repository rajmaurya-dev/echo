# Echo Web

The web app is the React + Vite surface for Echo marketing, account-adjacent pages, legal pages, and future companion web experiences. The mobile app remains the primary MVP product surface.

## Stack

- React 19 + TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS v4
- Radix/shadcn-style UI primitives
- Biome for linting and formatting

## Current Role in the MVP

Use this app for:

- product landing and conversion flows
- authentication/account entry points that need a browser surface
- legal/support pages such as privacy, terms, contact, and account deletion
- future admin or companion management surfaces if they support the mobile-first MVP

Do not let the web app become the primary chat experience unless the MVP scope changes.

## Development

From the repo root:

```bash
bun run dev:web
```

From this workspace:

```bash
bun run dev
bun run build
bun run test
bun run lint
bun run check
```

Routes live in `src/routes`. Shared UI lives in `src/components`, with reusable primitives under `src/components/ui`.
