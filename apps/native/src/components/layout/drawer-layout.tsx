import * as Haptics from 'expo-haptics';
import * as React from 'react';
import { InteractionManager, Keyboard, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  State as GestureState,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  ReduceMotion,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useChatPalette } from '@/constants/chat-theme';

const APPROX_APP_BAR_HEIGHT = 56;
const DEFAULT_DRAWER_WIDTH = 360;
const SWIPE_EDGE_WIDTH = 32;
const SWIPE_MIN_OFFSET = 5;
const SWIPE_MIN_DISTANCE = 60;
const SWIPE_MIN_VELOCITY = 500;
const PROGRESS_EPSILON = 0.05;

function getDrawerWidth(layoutWidth: number, drawerWidth?: number) {
  if (drawerWidth != null) return drawerWidth;
  return layoutWidth - APPROX_APP_BAR_HEIGHT <= DEFAULT_DRAWER_WIDTH
    ? layoutWidth - APPROX_APP_BAR_HEIGHT
    : DEFAULT_DRAWER_WIDTH;
}

const minmax = (value: number, start: number, end: number) => {
  'worklet';
  return Math.min(Math.max(value, start), end);
};

type DrawerLayoutProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  drawerContent: React.ReactNode;
  drawerWidth?: number;
  swipeEnabled?: boolean;
  children: React.ReactNode;
};

export function DrawerLayout({
  open,
  onOpen,
  onClose,
  drawerContent,
  drawerWidth: drawerWidthProp,
  swipeEnabled = true,
  children,
}: DrawerLayoutProps) {
  const palette = useChatPalette();
  const { width: layoutWidth } = useWindowDimensions();
  const drawerWidth = getDrawerWidth(layoutWidth, drawerWidthProp);

  const onOpenRef = React.useRef(onOpen);
  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
  });

  const callOnOpen = React.useCallback(() => onOpenRef.current(), []);
  const callOnClose = React.useCallback(() => onCloseRef.current(), []);

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

  const touchStartX = useSharedValue(0);
  const touchX = useSharedValue(0);
  const translationX = useSharedValue(open ? 0 : -drawerWidth);
  const gestureState = useSharedValue<GestureState>(GestureState.UNDETERMINED);
  const startX = useSharedValue(0);
  const openValue = useSharedValue(open);

  const toggleDrawer = React.useCallback(
    (isOpen: boolean, velocity?: number) => {
      'worklet';
      const target = isOpen ? 0 : -drawerWidth;

      touchStartX.value = 0;
      touchX.value = 0;
      translationX.value = withSpring(target, {
        velocity,
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        reduceMotion: ReduceMotion.Never,
      });

      if (isOpen) {
        runOnJS(callOnOpen)();
      } else {
        runOnJS(callOnClose)();
      }
    },
    [drawerWidth, callOnOpen, callOnClose, touchStartX, touchX, translationX],
  );

  React.useEffect(() => {
    openValue.value = open;
    toggleDrawer(open);
    if (open) Keyboard.dismiss();
  }, [open, toggleDrawer, openValue]);

  const onGestureBegin = React.useCallback(() => {
    startInteraction();
    Keyboard.dismiss();
  }, [startInteraction]);

  const onGestureFinish = React.useCallback(
    (nextOpen: boolean) => {
      endInteraction();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (nextOpen) Keyboard.dismiss();
    },
    [endInteraction],
  );

  const pan = React.useMemo(() => {
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
        touchX.value = event.x;
        translationX.value = minmax(startX.value + event.translationX, -drawerWidth, 0);
        gestureState.value = event.state;
      })
      .onEnd((event) => {
        'worklet';
        gestureState.value = event.state;
        const nextOpen =
          (Math.abs(event.translationX) > SWIPE_MIN_OFFSET &&
            Math.abs(event.velocityX) > SWIPE_MIN_VELOCITY) ||
          Math.abs(event.translationX) > SWIPE_MIN_DISTANCE
            ? (event.velocityX === 0 ? event.translationX : event.velocityX) > 0
            : openValue.value;

        toggleDrawer(nextOpen, event.velocityX);
        runOnJS(onGestureFinish)(nextOpen);
      })
      .activeOffsetX([-SWIPE_MIN_OFFSET, SWIPE_MIN_OFFSET])
      .failOffsetY([-SWIPE_MIN_OFFSET, SWIPE_MIN_OFFSET])
      .enabled(swipeEnabled);

    if (!open) {
      gesture.hitSlop({ left: 0, width: SWIPE_EDGE_WIDTH });
    }

    return gesture;
  }, [
    drawerWidth,
    gestureState,
    onGestureBegin,
    onGestureFinish,
    open,
    openValue,
    startX,
    swipeEnabled,
    toggleDrawer,
    touchStartX,
    touchX,
    translationX,
  ]);

  const translateX = useDerivedValue(() => minmax(translationX.value, -drawerWidth, 0));

  const contentAnimatedStyle = useAnimatedStyle(
    () => ({
      zIndex: translateX.value === -drawerWidth ? 0 : 2,
      transform: [{ translateX: translateX.value + drawerWidth }],
    }),
    [drawerWidth, translateX],
  );

  const drawerAnimatedStyle = useAnimatedStyle(
    () => ({
      zIndex: translateX.value === -drawerWidth ? -1 : 0,
      transform: [
        {
          scale: interpolate(
            drawerWidth === 0 ? 0 : (translateX.value + drawerWidth) / drawerWidth,
            [0, 1],
            [0.95, 1],
          ),
        },
      ],
    }),
    [drawerWidth, translateX],
  );

  const progress = useDerivedValue(() =>
    drawerWidth === 0 ? 0 : interpolate(translateX.value, [-drawerWidth, 0], [0, 1]),
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.root, { backgroundColor: palette.sidebar }]}> 
          <Animated.View style={[styles.content, styles.contentChrome, contentAnimatedStyle]}>
            <View aria-hidden={open} style={styles.contentInner}>
              {children}
            </View>
            <Overlay progress={progress} onPress={() => toggleDrawer(false)} />
          </Animated.View>
          <Animated.View
            aria-hidden={!open}
            style={[styles.drawer, { width: drawerWidth, transformOrigin: 'left top' }, drawerAnimatedStyle]}>
            {drawerContent}
            <DrawerDim progress={progress} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

function Overlay({
  progress,
  onPress,
}: {
  progress: ReturnType<typeof useDerivedValue<number>>;
  onPress: () => void;
}) {
  const palette = useChatPalette();
  const animatedStyle = useAnimatedStyle(() => ({ opacity: progress.value }), [progress]);
  const animatedProps = useAnimatedProps(() => {
    const active = progress.value > PROGRESS_EPSILON;
    return { pointerEvents: active ? 'auto' : 'none', 'aria-hidden': !active } as const;
  }, [progress]);

  return (
    <Animated.View
      style={[styles.overlay, { backgroundColor: palette.scrim }, animatedStyle]}
      animatedProps={animatedProps as never}>
      <Pressable onPress={onPress} style={styles.overlayPressable} role="button" aria-label="Close drawer" />
    </Animated.View>
  );
}

function DrawerDim({ progress }: { progress: ReturnType<typeof useDerivedValue<number>> }) {
  const animatedStyle = useAnimatedStyle(() => {
    const parentScale = interpolate(progress.value, [0, 1], [0.95, 1]);
    const counterScale = 1 / parentScale;
    return {
      opacity: interpolate(progress.value, [0, 1], [0.5, 0]),
      transform: [{ scale: counterScale }],
    };
  }, [progress]);

  return <Animated.View pointerEvents="none" style={[styles.drawerDim, { transformOrigin: 'left top' }, animatedStyle]} />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  contentChrome: {
    borderRadius: 46,
    borderCurve: 'continuous',
    boxShadow: '0 0 18px rgba(0, 0, 0, 0.16)',
  },
  contentInner: {
    flex: 1,
    overflow: 'hidden',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    maxWidth: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayPressable: {
    flex: 1,
  },
  drawerDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
});
