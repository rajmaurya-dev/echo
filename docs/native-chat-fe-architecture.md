# Native Chat Frontend Architecture

This document describes the frontend architecture for Echo's native chat surface in `apps/native`. It captures how bubbles, assistant responses, prompt input, attachments, store/context, sidebar/drawer, and chats should fit together.

## Goals

Echo's v1 chat UI should feel like a calm mobile companion:

- texting-style user messages
- assistant responses open/readable, not boxed in bubbles
- keyboard and composer feel native and smooth
- conversation navigation uses a native drawer/sidebar pattern
- routes stay thin; behavior lives in components and contexts
- mock/local state can be replaced by API-backed state later without rewriting UI primitives

## Current Key Files

```txt
apps/native/src/app/
  _layout.tsx                    Root providers, drawer shell, Stack routes
  index.tsx                      Main chat route, mock chat state, message rendering
  attachments.tsx                Add-to-chat form sheet
  companion-controls.tsx         Companion/tone/memory controls sheet
  (settings)/                    Settings modal group

apps/native/src/components/chat/
  chat-context.tsx               Chat state contract and provider
  conversation.tsx               Virtualized list, keyboard handling, scroll button
  message.tsx                    User bubble + assistant response rendering
  prompt-input.tsx               Composer compound components
  streaming-message.tsx          Streaming text subscriber
  streaming-store.ts             Lightweight streaming pub/sub store
  types.ts                       ChatMessage type
  index.ts                       Barrel exports

apps/native/src/components/layout/
  drawer-content.tsx             Drawer state/context and drawer UI
  drawer-layout.tsx              Gesture-driven native sidebar/drawer

apps/native/src/components/main-header.ios.tsx
  Native iOS header title menu + toolbar buttons

apps/native/src/constants/chat-theme.ts
  Warm light/dark color tokens for inline React Native styles
```

## Route Responsibilities

Routes in `src/app` should compose components and wire navigation only. They should not contain low-level drawer, keyboard, or message-list infrastructure.

- `index.tsx`
  - Creates chat state hook.
  - Provides `ChatProvider`.
  - Defines `renderMessage` callback.
  - Composes `Conversation`, `PromptInput`, and `MainHeader`.
- `attachments.tsx`
  - Bottom/form sheet for add-to-chat options.
  - Contains attachment UI and toggles.
- `companion-controls.tsx`
  - Bottom/form sheet for tone/style and memory-related companion controls.
- `(settings)`
  - Modal settings stack.

## Chat State Contract

All chat UI consumes this contract from `ChatProvider`:

```ts
type ChatContextValue = {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  isGenerating: boolean;
  onSend: () => void;
  streamingStore: StreamingStore;
  error?: Error | null;
};
```

This keeps the UI backend-agnostic.

Current state source:

- `useMockChat()` in `src/app/index.tsx`
- local mock streaming responses
- local `messages` array

Future state source:

- server-backed conversation store
- API streaming
- persisted conversation history
- memory-aware responses

The components should not need to know whether messages come from mock state, REST, SSE, WebSocket, or an AI SDK hook.

## Message Model

```ts
type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
```

Keep this small until the backend requires more fields. Future additions might include:

- `conversationId`
- `createdAt`
- `status`
- `attachments`
- `memoryReferences`
- `safetyState`

## Bubble and Response Architecture

File: `components/chat/message.tsx`

Rules:

- User messages render as right-aligned bubbles.
- Assistant messages render full-width with no bubble.
- Assistant content is readable, open, and calm.
- Message animation should be subtle.

Current component shape:

```tsx
<Message from="user">User text</Message>

<Message from="assistant">
  <MessageResponse>Assistant text</MessageResponse>
</Message>
```

Streaming assistant message:

```tsx
<Message from="assistant">
  <StreamingMessage store={streamingStore} />
</Message>
```

Do not put assistant messages in decorative cards/bubbles unless the product direction changes.

## Conversation and Keyboard Architecture

File: `components/chat/conversation.tsx`

Responsibilities:

- Render messages using `@legendapp/list`.
- Track keyboard position with `react-native-keyboard-controller`.
- Position composer above keyboard.
- Apply animated list insets so messages never hide behind composer.
- Show/hide scroll-to-bottom button.
- Preserve stable scrolling while streaming.

Core pattern:

```tsx
<Conversation renderMessage={renderMessage} emptyState={...}>
  <ConversationScrollButton />
  <PromptInput>...</PromptInput>
</Conversation>
```

Keyboard details are documented in:

- `.agents/skills/keyboard-handling/SKILL.md`

Important rule: do not replace this with React Native `KeyboardAvoidingView` for the chat screen.

## Prompt Input Architecture

File: `components/chat/prompt-input.tsx`

The prompt input is compound and context-driven:

```tsx
<PromptInput>
  <PromptInputAction />
  <PromptInputBody>
    <PromptInputTextarea />
    <PromptInputSubmit />
  </PromptInputBody>
</PromptInput>
```

Responsibilities:

- `PromptInput`
  - absolutely positioned by `Conversation`
  - measures its own height
  - displays an error row when `chat.error` exists
- `PromptInputAction`
  - left-side circular action button
  - currently used for add-to-chat sheet
- `PromptInputBody`
  - visual shell for textarea + submit button
  - uses Liquid Glass if available; otherwise styled native fallback
- `PromptInputTextarea`
  - controlled multiline input
  - uses `nativeID="composer"` for keyboard gesture coordination
  - clears native text when context input resets
- `PromptInputSubmit`
  - disabled when input is empty or generation is active
  - spinner while generating

Plus action behavior:

```tsx
<Link href="/attachments" asChild>
  <PromptInputAction>...</PromptInputAction>
</Link>
```

This opens the native `attachments` form sheet.

## Attachment Sheet Architecture

File: `src/app/attachments.tsx`

Purpose: collect extra context or tools for a message before sending.

Current sections:

- Camera / Photos / Files buttons
- Research toggle
- Web search toggle with Beta badge
- Memory toggle with Echo badge
- Add to memory disclosure row
- Choose style disclosure row
- Tool access disclosure row

Reference-app parity note: the reference app's disclosure rows are visual placeholders. Echo currently adds haptics but does not perform full actions yet.

Future behavior:

- Camera -> `expo-camera` or image picker capture flow
- Photos -> `expo-image-picker`
- Files -> `expo-document-picker`
- Add to memory -> memory creation sheet
- Choose style -> `companion-controls` sheet
- Tool access -> capabilities/settings route

## Streaming Store Architecture

File: `components/chat/streaming-store.ts`

The streaming store is intentionally tiny:

```ts
type StreamingStore = {
  get: () => string;
  set: (value: string) => void;
  subscribe: (listener: () => void) => () => void;
};
```

Why it exists:

- Streaming token updates should not re-render the whole chat list.
- Only `StreamingMessage` subscribes to streaming text.
- Route/state hook can throttle stream updates before writing to the store.

Current throttle target: around 30fps (`32ms`).

When backend streaming is added, preserve this pattern.

## Sidebar / Drawer Architecture

Native conversation navigation uses a drawer, not a fixed sidebar.

Files:

- `components/layout/drawer-content.tsx`
- `components/layout/drawer-layout.tsx`

Provider shape:

```tsx
<DrawerProvider>
  <DrawerLayout drawerContent={<DrawerContent />}>
    <StackLayout />
  </DrawerLayout>
</DrawerProvider>
```

Drawer content sections:

- Echo header
- New chat button
- top nav rows: Chats, Memory, Settings
- recent chat rows
- profile footer

Drawer layout behavior:

- edge swipe opens drawer
- content panel slides right
- drawer scales in subtly
- overlay tap closes drawer
- keyboard dismisses on drawer open/gesture
- haptics on drawer gesture and rows

Detailed drawer rules are documented in:

- `.agents/skills/native-sidebar-drawer/SKILL.md`

## Chats Architecture

Current state:

- Drawer recent chats are mock static rows.
- Main chat uses a single local message array.
- There is no real `/chats` route yet.

Expected future architecture:

```ts
type ConversationSummary = {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
};

type ConversationState = {
  conversations: ConversationSummary[];
  activeConversationId: string | null;
  selectConversation: (id: string) => void;
  createConversation: () => void;
  archiveConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
};
```

Recommended implementation path:

1. Add `components/chat/conversation-store.tsx` or Zustand/MMKV store.
2. Replace drawer `mockChats` with store summaries.
3. Add `/chats` route for full chat history.
4. Make drawer rows select active conversation.
5. Persist conversations locally, then sync to backend later.

## Header Architecture

File: `components/main-header.ios.tsx`

Reference-app pattern:

- `Stack.Screen.Title asChild` for native SwiftUI title menu.
- `Stack.Toolbar` for left/right native header buttons.

Current Echo behavior:

- left toolbar opens drawer
- center title opens SwiftUI menu
- right toolbar opens iOS action sheet
- title menu can open companion controls

Do not rebuild this with custom React Native header `Pressable`s unless there is a clear reason.

## Haptics

Use haptics quietly and consistently:

- send message: light impact
- drawer rows: selection
- sheet rows/toggles: selection
- new chat / primary actions: light impact
- destructive actions: medium impact

Avoid heavy haptics for routine typing or scrolling.

## Styling

Current app uses inline React Native styles plus `chat-theme.ts`.

Reference app uses Uniwind/Tailwind. We are not mirroring that yet.

Rules for current style system:

- Use `useChatPalette()` for colors.
- Use warm monochrome colors.
- Use continuous corners for cards/bubbles/sheets.
- Avoid heavy shadows except drawer/content chrome and floating scroll button.
- Keep assistant messages visually open.

## Implementation Rules

When adding chat UI:

1. Keep route files thin.
2. Put reusable UI under `components/chat` or `components/layout`.
3. Use context contracts to decouple UI from backend.
4. Preserve keyboard-controller pattern.
5. Preserve native drawer pattern.
6. Validate with:

```bash
cd apps/native && bunx tsc --noEmit && bun run lint
```

## Next Missing Pieces

- Real chat/conversation store.
- `/chats` history route.
- Real attachment actions for camera/photos/files.
- Memory creation sheet.
- Backend streaming integration from `apps/api`.
- Optional markdown renderer for assistant messages.
