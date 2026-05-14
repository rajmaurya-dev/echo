---
name: native-sidebar-drawer
description: Use when building or modifying Echo's native sidebar/drawer conversation navigation. Captures the EvanBacon chat-template pattern: DrawerProvider state, custom gesture drawer, keyboard dismissal, Reanimated spring translation, overlay pointer handling, drawer content structure, and haptic row interactions.
license: MIT
---

# Native Sidebar Drawer for Echo

This skill defines how Echo implements ChatGPT-style conversation navigation on native. On iPhone this should be a gesture-driven drawer, not a fixed desktop sidebar.

The pattern is adapted from Evan Bacon's Expo chat template and implemented in Echo at:

- `apps/native/src/app/_layout.tsx`
- `apps/native/src/components/layout/drawer-content.tsx`
- `apps/native/src/components/layout/drawer-layout.tsx`
- Reference notes: `docs/reference-chat-app-architecture.md`
- Reference app: `apps/reference-chat-app/src/components/drawer-content.tsx` and `apps/reference-chat-app/src/components/drawer-layout.tsx`

## Core Rule

For native mobile, use a custom Reanimated + Gesture Handler drawer behind the main content.

Do **not** use a fixed always-visible sidebar for iPhone. The content should slide right to reveal the drawer, with a dim overlay and rounded/shadowed content chrome while open.

## Provider Pattern

Use a drawer context to keep open/close state outside route files.

```tsx
type DrawerContextValue = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return <DrawerContext value={{ isOpen, openDrawer, closeDrawer }}>{children}</DrawerContext>;
}
```

At the root layout:

```tsx
<DrawerProvider>
  <RootDrawer />
</DrawerProvider>
```

Then:

```tsx
function RootDrawer() {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <DrawerLayout
      open={isOpen}
      onOpen={openDrawer}
      onClose={closeDrawer}
      drawerContent={<DrawerContent />}>
      <StackLayout />
    </DrawerLayout>
  );
}
```

## Drawer Width

Use a responsive drawer width:

```tsx
const APPROX_APP_BAR_HEIGHT = 56;
const DEFAULT_DRAWER_WIDTH = 360;

function getDrawerWidth(layoutWidth: number, drawerWidth?: number) {
  if (drawerWidth != null) return drawerWidth;
  return layoutWidth - APPROX_APP_BAR_HEIGHT <= DEFAULT_DRAWER_WIDTH
    ? layoutWidth - APPROX_APP_BAR_HEIGHT
    : DEFAULT_DRAWER_WIDTH;
}
```

This leaves a visible sliver of the main app on narrow phones and caps the drawer on larger screens.

## Gesture Rules

Use `react-native-gesture-handler` `Gesture.Pan()`.

Constants:

```ts
const SWIPE_EDGE_WIDTH = 32;
const SWIPE_MIN_OFFSET = 5;
const SWIPE_MIN_DISTANCE = 60;
const SWIPE_MIN_VELOCITY = 500;
```

Behavior:

- When closed, pan should only start from the left edge via `hitSlop({ left: 0, width: SWIPE_EDGE_WIDTH })`.
- When open, pan can start anywhere.
- Horizontal pans should activate only after a small horizontal threshold.
- Vertical movement should fail the gesture to avoid fighting scroll views.
- Decide final state by velocity or distance.

Pattern:

```tsx
const gesture = Gesture.Pan()
  .onBegin((event) => {
    'worklet';
    startX.value = translationX.value;
    gestureState.value = event.state;
    touchStartX.value = event.x;
  })
  .onStart(() => {
    'worklet';
    runOnJS(onGestureBegin)();
  })
  .onChange((event) => {
    'worklet';
    translationX.value = minmax(startX.value + event.translationX, -drawerWidth, 0);
    gestureState.value = event.state;
  })
  .onEnd((event) => {
    'worklet';
    const nextOpen =
      (Math.abs(event.translationX) > SWIPE_MIN_OFFSET && Math.abs(event.velocityX) > SWIPE_MIN_VELOCITY) ||
      Math.abs(event.translationX) > SWIPE_MIN_DISTANCE
        ? (event.velocityX === 0 ? event.translationX : event.velocityX) > 0
        : openValue.value;

    toggleDrawer(nextOpen, event.velocityX);
    runOnJS(onGestureFinish)(nextOpen);
  })
  .activeOffsetX([-SWIPE_MIN_OFFSET, SWIPE_MIN_OFFSET])
  .failOffsetY([-SWIPE_MIN_OFFSET, SWIPE_MIN_OFFSET]);
```

## Animation Rules

Drawer translation state:

```ts
const translationX = useSharedValue(open ? 0 : -drawerWidth);
```

Open = `0`, closed = `-drawerWidth`.

Use a spring:

```tsx
translationX.value = withSpring(target, {
  velocity,
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  reduceMotion: ReduceMotion.Never,
});
```

Content moves as:

```tsx
transform: [{ translateX: translateX.value + drawerWidth }]
```

Drawer scales in subtly:

```tsx
scale: interpolate(
  drawerWidth === 0 ? 0 : (translateX.value + drawerWidth) / drawerWidth,
  [0, 1],
  [0.95, 1],
)
```

Progress:

```tsx
const progress = useDerivedValue(() =>
  drawerWidth === 0 ? 0 : interpolate(translateX.value, [-drawerWidth, 0], [0, 1]),
);
```

## Keyboard Interaction

Always dismiss the keyboard when:

- the drawer opens
- drawer gesture starts
- user navigates from drawer rows

Use either RN `Keyboard.dismiss()` inside drawer internals or `KeyboardController.dismiss({ animated: true })` from keyboard-controller if already imported in the calling code.

In drawer layout:

```tsx
React.useEffect(() => {
  openValue.value = open;
  toggleDrawer(open);
  if (open) Keyboard.dismiss();
}, [open]);

const onGestureBegin = React.useCallback(() => {
  startInteraction();
  Keyboard.dismiss();
}, []);
```

## Interaction Handles

Use `InteractionManager.createInteractionHandle()` while gesture is active and clear it when finished. This follows the reference app and prevents work from interrupting active drawer gestures.

```tsx
const interactionHandleRef = React.useRef<number | null>(null);

const startInteraction = React.useCallback(() => {
  interactionHandleRef.current = InteractionManager.createInteractionHandle();
}, []);

const endInteraction = React.useCallback(() => {
  if (interactionHandleRef.current != null) {
    InteractionManager.clearInteractionHandle(interactionHandleRef.current);
    interactionHandleRef.current = null;
  }
}, []);
```

## Overlay Logic

The overlay sits above content while drawer is open. It should only receive touches when drawer progress is above a small epsilon.

```tsx
const PROGRESS_EPSILON = 0.05;

const animatedProps = useAnimatedProps(() => {
  const active = progress.value > PROGRESS_EPSILON;
  return {
    pointerEvents: active ? 'auto' : 'none',
    'aria-hidden': !active,
  } as const;
});
```

Overlay opacity follows `progress.value`. Pressing overlay closes the drawer.

## Visual Chrome

Content panel while drawer is open:

- `overflow: 'hidden'`
- continuous rounded corners
- subtle box shadow
- z-index above drawer while open

Echo currently uses:

```tsx
contentChrome: {
  borderRadius: 46,
  borderCurve: 'continuous',
  boxShadow: '0 0 18px rgba(0, 0, 0, 0.16)',
}
```

The reference app used iOS-style large corners around `53`. Keep this effect; it is a major part of the native drawer feel.

## Drawer Dim

Apply a dim layer over the drawer that fades out as the drawer fully opens. Counter-scale it so it fills the drawer while the drawer scales.

```tsx
const parentScale = interpolate(progress.value, [0, 1], [0.95, 1]);
const counterScale = 1 / parentScale;
return {
  opacity: interpolate(progress.value, [0, 1], [0.5, 0]),
  transform: [{ scale: counterScale }],
};
```

## Drawer Content Structure

Native drawer content should be structured as:

1. Safe-area-aware root.
2. Header:
   - app name (`Echo`)
   - new chat button
3. Scrollable body:
   - top nav rows (`Chats`, `Memory`, `Settings`)
   - `Recents` label
   - recent conversation rows
4. Footer:
   - profile/account button
   - optional new chat or account controls

Reference file in Echo:

- `apps/native/src/components/layout/drawer-content.tsx`

## Navigation Rules

Rows should close the drawer before or during navigation.

```tsx
const openSettings = useCallback(() => {
  closeDrawer();
  router.navigate('/(settings)/settings');
}, [closeDrawer, router]);
```

Use Expo Router navigation from drawer content:

- Settings -> `/(settings)/settings`
- Profile footer -> `/(settings)/profile`
- Memory/companion controls -> `/companion-controls`
- Recent chat rows -> close drawer and eventually navigate/select chat

## Haptic Rules

Use haptics for drawer interactions:

- `Haptics.selectionAsync()` for nav rows, chat rows, profile rows.
- `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` for new chat and completed drawer gestures.
- Medium/destructive haptic only for destructive actions.

Examples:

```tsx
onPress={() => {
  Haptics.selectionAsync();
  onPress();
}}
```

```tsx
const onGestureFinish = React.useCallback((nextOpen: boolean) => {
  endInteraction();
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  if (nextOpen) Keyboard.dismiss();
}, []);
```

## Accessibility

- Set `aria-hidden={open}` on content when drawer is open.
- Set `aria-hidden={!open}` on drawer when closed.
- Overlay pressable should have `role="button"` and `aria-label="Close drawer"`.
- New chat and drawer open buttons should have `accessibilityLabel`.

## Avoid

- Do not use a fixed sidebar on native phone screens.
- Do not let the drawer open while keyboard remains visible.
- Do not use JS state to animate drawer frame-by-frame; use Reanimated shared values.
- Do not allow the closed drawer pan gesture across the whole screen; only the left edge should open it.
- Do not forget overlay pointer gating; invisible overlays can block the app.
- Do not put drawer components inside `src/app`; route files should stay thin.

## When Editing Existing Code

Before changing drawer/sidebar behavior:

1. Read `apps/native/src/components/layout/drawer-layout.tsx`.
2. Read `apps/native/src/components/layout/drawer-content.tsx`.
3. If comparing against reference, read:
   - `apps/reference-chat-app/src/components/drawer-layout.tsx`
   - `apps/reference-chat-app/src/components/drawer-content.tsx`
   - `apps/reference-chat-app/src/components/sidebar.web.tsx` only for future web sidebar work.
4. Run:

```bash
cd apps/native && bunx tsc --noEmit && bun run lint
```

## Desired Feel

The drawer should feel like a native iOS app shell:

- edge swipe opens smoothly
- content panel glides and rounds over the drawer
- overlay tap closes reliably
- keyboard never fights the drawer
- haptics acknowledge navigation
- conversation history feels close to ChatGPT while still mobile-first
