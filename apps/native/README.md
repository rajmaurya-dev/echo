# Echo Native

Expo + React Native is the primary v1 product surface for Echo. Build mobile flows first, then let web support the surrounding account, legal, and marketing surfaces.

## v1 Product Scope

The native app should center on the MVP in `../../mvp.md`:

- first-time companion setup
- texting-style daily conversation
- stable companion identity and tone
- memory-aware replies with controls to correct or delete important memories
- proactive check-ins with frequency and style settings
- safety behavior for sensitive and high-risk conversations

Avoid adding v1 work for voice-first interaction, avatar-heavy experiences, marketplace characters, broad productivity automation, or external integrations unless `mvp.md` changes.

## App Architecture

```txt
src/app/          Expo Router screens and layouts
src/components/   Shared UI primitives and app shell pieces
src/constants/    Theme tokens and shared constants
src/hooks/        Cross-platform hooks
src/lib/          Client libraries such as auth/API helpers
assets/           Static images and app icons
```

Use Expo Router for navigation. Keep feature state and API access behind focused hooks or `src/lib` helpers instead of wiring network logic directly into screen components.

## Development

From the repo root:

```bash
bun install
bun run --filter=native start
```

Development client workflow:

```bash
bun run --filter=native build:development:ios
bun run --filter=native build:development:android
bun run --filter=native start:dev-client
```

Rebuild the development client when native dependencies, Expo config/plugins, SDK versions, or native project files change.

## Quality Bar

- Mobile chat is the highest-priority user experience.
- Memory references must feel helpful and explainable.
- Check-in controls must be visible and reversible.
- Use platform-native patterns where possible, especially for safe areas, notification permissions, and accessibility.
