# Reference Chat App Architecture

Source repo: `apps/reference-chat-app` (`https://github.com/EvanBacon/chat-template.git`)

This document captures the architecture of Evan Bacon's Expo chat template so we can intentionally adapt the same patterns into `apps/native` for Echo.

## High-level Shape

The template is a production-style Expo Router chat app with platform-specific shells:

- **Native shell**: `src/app/_layout.tsx`
  - Uses `Stack` navigation.
  - Wraps the app with providers: React Navigation theme, `KeyboardProvider`, model context, and drawer context.
  - Uses a custom gesture-driven drawer instead of web sidebar.
- **Web shell**: `src/app/_layout.web.tsx`
  - Uses a persistent / collapsible sidebar and an inset content panel.
  - Uses web-only Radix menus/tooltips/context menus.
- **Main chat screen**: `src/app/index.tsx`
  - Owns chat state integration, streaming state, and message rendering callback.
  - Composes reusable chat primitives instead of hardcoding UI in the route.

## Route Structure

```txt
src/app/
  _layout.tsx                 Native root layout
  _layout.web.tsx             Web root layout
  index.tsx                   Main chat screen
  chats.tsx                   Chat list/history route
  attachments.tsx             Form sheet for adding attachments
  model-picker.tsx            Form sheet for model actions/settings
  api/chat+api.ts             Expo Router API route for streaming AI responses
  (settings)/
    _layout.tsx               Settings stack/modal group
    settings.tsx
    profile.tsx
    capabilities.tsx
```

Important Expo Router patterns:

- Route files stay in `src/app` only.
- Components and state live outside `src/app` in `src/components` and `src/utils`.
- Platform-specific root layouts are split with `.web.tsx`.
- Native sheets use `Stack.Screen` options like `presentation: "formSheet"`, `sheetAllowedDetents`, and `sheetGrabberVisible`.

## Provider Tree

Native `src/app/_layout.tsx`:

```tsx
<RNTheme>
  <KeyboardProvider>
    <ModelProvider>
      <DrawerProvider>
        <DrawerLayout drawerContent={<DrawerContent />}>
          <StackLayout />
        </DrawerLayout>
      </DrawerProvider>
    </ModelProvider>
    <StatusBar />
  </KeyboardProvider>
</RNTheme>
```

Responsibilities:

- `KeyboardProvider`: required by `react-native-keyboard-controller` hooks/components.
- `ModelProvider`: stores model-related UI state (`selectedModel`, `extendedThinking`).
- `DrawerProvider`: stores native drawer open/close state.
- `DrawerLayout`: gesture-driven native drawer wrapper.
- `StackLayout`: all native route screen configuration.

For Echo, we should keep this provider separation and add Echo-specific providers later, e.g. auth, companion profile, memory, and chat session stores.

## Chat Component Architecture

The chat UI is decomposed into compound components under `src/components/chat`:

```txt
components/chat/
  chat-context.tsx       Shared chat state context
  conversation.tsx       Virtualized message list, keyboard tracking, scroll button
  message.tsx            Role-aware message wrapper
  prompt-input.tsx       Composer compound components
  streaming-message.tsx  Efficient streaming text subscriber
  streaming-store.ts     Lightweight pub/sub store for streaming text
  types.ts               ChatMessage type
  index.ts               Barrel exports
```

### `ChatProvider` / `useChatContext`

`chat-context.tsx` defines the state contract consumed by the UI:

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

This keeps UI components backend-agnostic. The route decides whether chat comes from mock streaming or `useChat()`.

### `Conversation`

`conversation.tsx` is the core performance/keyboard component:

- Uses `@legendapp/list` (`LegendList`) for virtualized messages.
- Uses `react-native-keyboard-controller` `useKeyboardHandler` to track keyboard height directly.
- Uses Reanimated shared values for:
  - prompt input bottom position
  - list content insets
  - scroll-to-bottom button visibility/position
  - auto-scroll behavior
- Uses `KeyboardGestureArea` to support interactive iOS keyboard dismissal.
- Provides `ConversationContext` to compound children:
  - `scrollToBottom`
  - `promptInputStyle`
  - `onPromptInputLayout`
  - `scrollButtonStyle`

Key idea: the composer is absolutely positioned above the keyboard, while the list receives matching animated bottom inset.

### `PromptInput`

`prompt-input.tsx` implements the composer as compound components:

```tsx
<PromptInput>
  <PromptInputAction />
  <PromptInputBody>
    <PromptInputTextarea />
    <PromptInputSubmit />
  </PromptInputBody>
</PromptInput>
```

Native behavior:

- `PromptInput` is absolutely positioned by `Conversation` keyboard state.
- Uses `expo-glass-effect` `GlassContainer` / `GlassView` on supported iOS versions.
- Falls back to `expo-blur` `BlurView`.
- `TextInput` is multiline and auto-clears via ref when context input becomes empty.
- Submit button shows a spinner while generating.

### `Message`

`message.tsx` encodes the ChatGPT-like message styling:

- User messages: right-aligned bubble, max width around 80%.
- Assistant messages: full-width, no bubble.
- Assistant content goes through custom markdown renderer.
- Messages animate in/out with Reanimated `FadeIn` / `FadeOut`.

This exactly matches our intended Echo UI direction: user bubble, assistant response not in a bubble.

### Streaming Store

`streaming-store.ts` is intentionally tiny:

```ts
type StreamingStore = {
  get: () => string;
  set: (value: string) => void;
  subscribe: (listener: () => void) => () => void;
};
```

Why it matters:

- Streaming text updates do not force the whole message list to re-render.
- Only the currently streaming message subscribes to token changes.
- UI updates are throttled to about 30fps in `index.tsx`.

For Echo, we should keep this pattern when we add real API streaming.

## Chat State / Backend Integration

`src/app/index.tsx` contains two chat hooks:

- `useAIChat()`
  - Uses `@ai-sdk/react` `useChat()`.
  - Converts AI SDK UI messages into local `ChatMessage` objects.
  - Syncs the latest assistant streaming text into `streamingStore`.
- `useMockChat()`
  - Local mock streaming implementation for UI development.
  - Emits word chunks with a delay.
  - Throttles UI updates via `STREAMING_THROTTLE_MS = 32`.

`src/app/api/chat+api.ts` is an Expo Router API route:

- Receives `{ messages, model }`.
- Calls `streamText()` from AI SDK with Anthropic.
- Returns `toUIMessageStreamResponse()`.
- Sets `Content-Type: application/octet-stream` and `Content-Encoding: none` to support streaming on iOS NSURLSession.

For Echo, we should initially keep mock/local streaming in `apps/native`, then swap `onSend` to our `apps/api` backend once ready.

## Native Navigation + Drawer

Native drawer files:

```txt
components/drawer-content.tsx
components/drawer-layout.tsx
```

### `DrawerProvider` / `DrawerContent`

- `DrawerProvider` tracks `isOpen` and exposes `openDrawer` / `closeDrawer`.
- `DrawerContent` renders:
  - app title
  - nav rows
  - recent chats
  - footer profile area
  - new chat button

### `DrawerLayout`

Custom drawer implementation:

- Forked/simplified from `react-native-drawer-layout`.
- Uses `react-native-gesture-handler` pan gestures.
- Uses Reanimated for drawer translation, dim overlay, content movement, and scale.
- Dismisses keyboard when drawer opens or pan starts.
- Has iOS-style rounded content corners and shadow while drawer is open.

For Echo, this is preferable to a fixed sidebar on iPhone. We can preserve ChatGPT-like conversation navigation while feeling native.

## Web Sidebar

Web-only files:

```txt
components/sidebar.web.tsx
components/sidebar.tsx
src/app/_layout.web.tsx
```

- Native `sidebar.tsx` returns `null` because native uses drawer.
- Web `sidebar.web.tsx` implements:
  - collapsible desktop rail
  - mobile overlay sidebar
  - Radix context menus for chat rows
  - Radix dropdown user menu
  - Radix tooltips for collapsed rail
- `src/app/_layout.web.tsx` creates a web app frame with a sidebar and inset panel.

Echo is mobile-first, so web parity can come later. For now, native drawer should be our reference.

## Styling System

The template uses:

- Tailwind CSS v4
- Uniwind for React Native `className`
- OKLCH CSS variables in `src/global.css`
- `@theme` mappings from variables to utility classes
- `withUniwind()` wrappers for native components that need className support

Important conventions from `AGENTS.md`:

- Use `bunx expo install` to add dependencies.
- Do not use function-form `Pressable` styles when using Uniwind; use `className` + `active:` states.
- Do not use CSS variables directly in inline styles; use theme classes like `bg-muted`, `text-foreground`, `border-border`.
- Requires custom Expo dev build, not Expo Go.

Current `apps/native` does **not** have Uniwind installed/configured. We have two options:

1. Adopt Uniwind and port the template more directly.
2. Keep inline React Native styles for now and port only architecture/patterns.

Given the goal is to mirror this template, option 1 is the cleaner long-term direction.

## Native UI / SwiftUI Usage

Notable native UI patterns:

- `components/main-header.ios.tsx`
  - Uses `Stack.Screen.Title asChild` to render a SwiftUI `Menu` in the native header.
  - Uses `@expo/ui/swift-ui` components (`Host`, `Menu`, `VStack`, `HStack`, `Toggle`).
  - Uses `Stack.Toolbar.Button` for native toolbar buttons.
- `model-picker.tsx`
  - Native form sheet fallback for model actions/settings.

For Echo, use this for companion/model/tone controls later, but keep the first implementation focused on chat + drawer + composer.

## Markdown Architecture

Markdown files:

```txt
components/markdown/
  ast-renderer.ts
  chat-markdown.tsx
  code-block.tsx
  markdown.tsx
  render-rules.tsx
  types.ts
  utils.ts
```

The template uses an AST renderer based on:

- `mdast-util-from-markdown`
- `micromark-extension-gfm-table`
- `mdast-util-gfm-table`
- `react-syntax-highlighter`

Echo v1 likely needs simpler assistant rendering at first, but this architecture is useful once AI responses include lists/code/rich formatting.

## Dependencies to Consider for `apps/native`

Already present in `apps/native`:

- `@expo/ui`
- `@legendapp/list`
- `expo-blur`
- `expo-glass-effect`
- `expo-haptics`
- `expo-image`
- `expo-router`
- `expo-symbols`
- `react-native-keyboard-controller`
- `react-native-reanimated`
- `react-native-gesture-handler`
- `react-native-safe-area-context`

Missing or different if we want closer parity:

- `uniwind`
- `tailwindcss`
- `tailwind-merge`
- `clsx`
- `lucide-react-native`
- `@ai-sdk/react`, `ai`, provider packages (later, if backend/API route lives in native app)
- markdown AST packages (later)

Note: `apps/native` currently has `react-native-keyboard-controller@1.20.7`; reference uses `^1.21.1`. We can keep current unless a specific API requires upgrading.

## Recommended Echo Adaptation Plan

### Phase 1: Native chat shell architecture

Port architecture, not the full backend:

- Add `components/chat` primitives:
  - `chat-context.tsx`
  - `conversation.tsx`
  - `message.tsx`
  - `prompt-input.tsx`
  - `streaming-message.tsx`
  - `streaming-store.ts`
  - `types.ts`
- Add native drawer primitives:
  - `drawer-content.tsx`
  - `drawer-layout.tsx`
- Update `src/app/_layout.tsx` provider tree:
  - React Navigation theme
  - `KeyboardProvider`
  - future `CompanionProvider` / `ChatProvider` as needed
  - `DrawerProvider`
  - `DrawerLayout`
  - `Stack`
- Update `src/app/index.tsx` to compose the chat primitives.

### Phase 2: Echo product fit

Adapt labels and state to Echo MVP:

- Conversations become companion chat history.
- Header/model picker becomes companion/tone controls later.
- Drawer footer links to settings/profile/memory controls.
- Empty state speaks as Echo companion, not generic assistant.
- Safety disclaimer can live near composer or settings.

### Phase 3: Backend integration

Once `apps/api` is ready:

- Replace mock streaming with API streaming.
- Preserve `streamingStore` to keep rendering efficient.
- Add persistence for conversation history and memory.
- Add optimistic user messages and server-generated assistant messages.

## Decisions for Next Implementation Step

Before coding, decide:

1. **Adopt Uniwind now or not?**
   - Direct parity with template requires Uniwind.
   - Faster minimal port can use inline styles.
2. **Native only or keep web files too?**
   - Echo v1 says `apps/native` is primary; start native only.
3. **Use full markdown renderer now?**
   - Probably no. Echo should feel texting-first; plain text is enough initially.
4. **Use Expo Router API route in native app?**
   - No for Echo architecture. We should use `apps/api` later.

Recommended answer: **native-only first, port the component architecture, use existing dependencies, defer Uniwind unless we want exact visual parity.**
