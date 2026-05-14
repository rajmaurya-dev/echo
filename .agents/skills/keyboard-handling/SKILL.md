---
name: keyboard-handling
description: Use when building or modifying keyboard-aware chat, composer, bottom input, or scroll behavior in Expo React Native. Captures Echo's preferred react-native-keyboard-controller pattern: provider setup, interactive dismissal, absolute composer positioning, animated list insets, and haptic interactions.
license: MIT
---

# Keyboard Handling for Echo Native

This skill defines the keyboard handling pattern we use in `apps/native`. The current implementation feels smooth and should be preserved unless there is a strong product reason to change it.

## Core Rule

For chat/composer screens, use `react-native-keyboard-controller` + Reanimated shared values. Do **not** rely on React Native `KeyboardAvoidingView` for the main chat screen.

Preferred pattern:

1. Wrap the app in `KeyboardProvider`.
2. Put the message list inside `KeyboardGestureArea`.
3. Track keyboard height with `useKeyboardHandler`.
4. Absolutely position the composer above the keyboard.
5. Apply matching animated `contentInset` / `scrollIndicatorInsets` to the virtualized list.
6. Use `keyboardDismissMode="interactive"` on the list.
7. Dismiss keyboard before opening drawers/sheets when appropriate.

Reference implementation in this project:

- `apps/native/src/app/_layout.tsx`
- `apps/native/src/components/chat/conversation.tsx`
- `apps/native/src/components/chat/prompt-input.tsx`
- `apps/native/src/components/layout/drawer-layout.tsx`

## Provider Setup

At the app root:

```tsx
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  return (
    <KeyboardProvider preload>
      {/* app providers + navigation */}
    </KeyboardProvider>
  );
}
```

Use `preload` so the keyboard is warmed up before first input focus.

## Chat Screen Layout

The chat layout should be structurally similar to:

```tsx
<View style={{ flex: 1 }}>
  <KeyboardGestureArea
    interpolator="ios"
    showOnSwipeUp
    offset={composerOffsetHeight}
    textInputNativeID="composer"
    style={{ flex: 1 }}>
    <AnimatedLegendList
      keyboardDismissMode="interactive"
      animatedProps={listAnimatedProps}
      // layout + scroll callbacks
    />
  </KeyboardGestureArea>

  <Animated.View style={[{ position: 'absolute', left: 0, right: 0 }, promptInputStyle]}>
    <TextInput nativeID="composer" multiline />
  </Animated.View>
</View>
```

Important details:

- `textInputNativeID` on `KeyboardGestureArea` must match `nativeID` on `TextInput`.
- The composer must report its measured height via `onLayout`.
- The composer is absolutely positioned; the list receives bottom inset so messages do not hide behind it.
- Use `KeyboardGestureArea` even on iOS-first work. It enables the buttery interactive dismiss behavior.

## Keyboard Tracking Pattern

Use `useKeyboardHandler` with two heights:

- `keyboardHeight`: drives composer position and scroll button position.
- `keyboardHeightForInset`: drives list content inset and can be frozen during interactive dismissal to avoid jumps.

Pattern:

```tsx
const keyboardHeight = useSharedValue(0);
const keyboardHeightForInset = useSharedValue(0);
const wasInteractive = useSharedValue(false);

useKeyboardHandler({
  onMove: (event) => {
    'worklet';
    keyboardHeight.value = event.height;
    keyboardHeightForInset.value = event.height;
  },
  onInteractive: (event) => {
    'worklet';
    keyboardHeight.value = event.height;
    wasInteractive.value = true;
  },
  onEnd: (event) => {
    'worklet';
    const shouldScroll = event.height > 0 && !wasInteractive.value;
    keyboardHeight.value = event.height;
    keyboardHeightForInset.value = withTiming(event.height, { duration: 220 });
    wasInteractive.value = false;
    if (shouldScroll) runOnJS(scrollToBottomRef.current)();
  },
}, []);
```

Why two values:

- During an interactive swipe-down dismissal, changing list inset continuously can cause jumpy overscroll.
- The composer should follow the finger; the list inset should be more stable.

## Composer Position

```tsx
const promptInputStyle = useAnimatedStyle(() => ({
  bottom: Math.max(insets.bottom, Math.abs(keyboardHeight.value)),
}));
```

Never hardcode keyboard offsets for the composer. Use safe area bottom plus live keyboard height.

## List Insets

```tsx
const listAnimatedProps = useAnimatedProps(() => {
  const keyboard = Math.abs(keyboardHeightForInset.value);
  const bottom = composerHeight.value + Math.max(insets.bottom, keyboard);
  return {
    contentInset: { top: TOP_CONTENT_INSET, left: 0, right: 0, bottom },
    scrollIndicatorInsets: { top: 0, left: 0, right: 0, bottom },
  };
});
```

Use `contentInset`, not fake bottom padding, for the native-feeling iOS scroll behavior.

## Auto-scroll Behavior

Track:

- current scroll offset
- list viewport height
- total content height
- composer height
- bottom inset

Only auto-scroll when the user is at/near the bottom. Do not force-scroll when the user is reading older messages.

Recommended threshold: `50-60px`.

## Dismissal Rules

Use `keyboardDismissMode="interactive"` on the message list.

Use `KeyboardController.dismiss({ animated: true })` when:

- sending a message
- opening the drawer
- starting drawer gestures
- opening full-screen-ish modals/sheets if keyboard would overlap the transition

Example:

```tsx
import { KeyboardController } from 'react-native-keyboard-controller';

KeyboardController.dismiss({ animated: true });
```

## Drawer / Sheet Interactions

When the drawer opens or a drawer pan begins, dismiss the keyboard first. This prevents keyboard + drawer gesture conflicts.

In drawer actions and bottom sheet rows, add subtle haptics:

```tsx
import * as Haptics from 'expo-haptics';

Haptics.selectionAsync();
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
```

Use:

- `selectionAsync()` for row/toggle/option changes.
- light impact for send, drawer open/new chat, and sheet primary actions.
- medium impact only for destructive actions.

## Text Input Rules

For the composer:

```tsx
<TextInput
  nativeID="composer"
  multiline
  value={input}
  onChangeText={setInput}
  returnKeyType="default"
/>
```

If the input is controlled and cleared after send, keep a ref and call `.clear()` when `input === ''` to avoid stale native text state.

## Avoid

- Do not use React Native `KeyboardAvoidingView` for the main chat composer/list pattern.
- Do not use fixed keyboard heights.
- Do not animate layout with `bottom` from JS state; use Reanimated shared values.
- Do not put the composer in normal document flow under the list; it should be absolute with list insets.
- Do not continuously mutate list bottom padding during interactive dismissal.
- Do not open the drawer while leaving the keyboard visible.

## When Editing Existing Code

Before modifying keyboard code:

1. Read `apps/native/src/components/chat/conversation.tsx`.
2. Read `apps/native/src/components/chat/prompt-input.tsx`.
3. Preserve the two-keyboard-height pattern unless intentionally replacing it.
4. Run:

```bash
cd apps/native && bunx tsc --noEmit && bun run lint
```

## Desired Feel

The end result should feel like a modern iOS chat app:

- composer tracks the keyboard smoothly
- swipe-down dismissal is interactive
- scroll does not jump when keyboard is dragged
- latest messages remain visible above the composer
- drawer/sheet transitions do not fight the keyboard
