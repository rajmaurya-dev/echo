# SaaS Boilerplate

A Bun-powered monorepo for building modern SaaS applications.

## Structure

```
saas-boilerplate/
├── apps/
│   ├── web/          # React frontend application
│   └── api/          # Cloudflare Workers API (Hono)
├── packages/         # Shared packages (future)
└── package.json      # Root workspace configuration
```

## Prerequisites

- [Bun](https://bun.sh) installed on your system

## Getting Started

### Install Dependencies

```bash
bun install
```

### Development

Run all apps in development mode:
```bash
bun dev
```

Run specific apps:
```bash
# Web app only
bun dev:web

# API only
bun dev:api
```

### Building

Build all apps:
```bash
bun build
```

Build specific apps:
```bash
# Web app
bun build:web

# API (deploy to Cloudflare)
bun build:api
```

### Testing

Run tests across all workspaces:
```bash
bun test
```

### Linting & Formatting

```bash
# Lint all workspaces
bun lint

# Format all workspaces
bun format

# Check all workspaces (Biome)
bun check
```

## Apps

### Web (`apps/web`)
- React 19 with TypeScript
- Vite for bundling
- TanStack Router for routing
- TanStack Query for data fetching
- Tailwind CSS v4 for styling
- Radix UI components
- Biome for linting and formatting

### API (`apps/api`)
- Hono framework
- Cloudflare Workers runtime
- TypeScript

## Adding Shared Packages

Create packages in the `packages/` directory:

```bash
mkdir -p packages/your-package
cd packages/your-package
bun init
```

Then reference them in your apps:

```json
{
  "dependencies": {
    "your-package": "workspace:*"
  }
}
```

## Workspace Commands

Bun workspaces support filtering:

```bash
# Run a command in all workspaces
bun run --filter='*' <command>

# Run in specific workspace
bun run --filter=web <command>
```
