/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from 'expo-image';
import { LegendList, type LegendListRef } from '@legendapp/list';
import {
  createContext,
  use,
  useCallback,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardGestureArea, useKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useChatPalette } from '@/constants/chat-theme';

import { useChatContext } from './chat-context';
import type { ChatMessage } from './types';

const AnimatedLegendList = Animated.createAnimatedComponent(LegendList);
const TOP_CONTENT_INSET = 104;

// Reanimated animated style types are intentionally opaque here because they are
// produced in one compound component and consumed by another.
type AnimatedStyle = any;

type ConversationContextValue = {
  scrollToBottom: () => void;
  promptInputStyle: AnimatedStyle;
  onPromptInputLayout: (event: LayoutChangeEvent) => void;
  scrollButtonStyle: AnimatedStyle;
};

const ConversationContext = createContext<ConversationContextValue | null>(null);

export function useConversationContext() {
  const context = use(ConversationContext);
  if (!context) {
    throw new Error('useConversationContext must be used within <Conversation>');
  }
  return context;
}

export function Conversation({
  renderMessage,
  emptyState,
  children,
}: {
  renderMessage: (info: { item: ChatMessage }) => ReactElement;
  emptyState?: ReactElement;
  children?: ReactNode;
}) {
  const { messages } = useChatContext();
  const palette = useChatPalette();
  const listRef = useRef<LegendListRef>(null);
  const insets = useSafeAreaInsets();

  const scrollToBottomRef = useRef<() => void>(() => {});
  const keyboardHeight = useSharedValue(0);
  const keyboardHeightForInset = useSharedValue(0);
  const wasInteractive = useSharedValue(false);

  useKeyboardHandler(
    {
      onStart: () => {
        'worklet';
      },
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
        if (shouldScroll) {
          runOnJS(scrollToBottomRef.current)();
        }
      },
    },
    [],
  );

  const [composerOffsetHeight, setComposerOffsetHeight] = useState(82);
  const composerHeight = useSharedValue(82);
  const scrollViewHeight = useSharedValue(0);
  const totalContentHeight = useSharedValue(0);
  const currentFooterHeight = useSharedValue(0);
  const messagesOnlyHeight = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const lastContentHeight = useSharedValue(0);

  const bottomInset = useDerivedValue(() => {
    const keyboard = Math.abs(keyboardHeight.value);
    return composerHeight.value + Math.max(insets.bottom, keyboard);
  });

  const isAtBottom = useDerivedValue(() => {
    const maxScrollY = totalContentHeight.value - scrollViewHeight.value + bottomInset.value;
    if (maxScrollY <= 0) return true;
    return maxScrollY - scrollY.value <= 56;
  });

  const shouldShowScrollButton = useDerivedValue(() => {
    const maxScrollY = totalContentHeight.value - scrollViewHeight.value + bottomInset.value;
    if (maxScrollY <= 56) return false;
    return !isAtBottom.value;
  });

  const onScrollViewLayout = useCallback((event: LayoutChangeEvent) => {
    scrollViewHeight.value = event.nativeEvent.layout.height;
  }, []);

  const onScroll = useCallback((event: { nativeEvent: { contentOffset: { y: number } } }) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  }, []);

  const onContentSizeChange = useCallback((_width: number, height: number) => {
    const wasAtBottom = isAtBottom.value;
    const heightIncreased = height > lastContentHeight.value;

    totalContentHeight.value = height;
    lastContentHeight.value = height;
    messagesOnlyHeight.value = height - currentFooterHeight.value;

    if (wasAtBottom && heightIncreased && listRef.current) {
      requestAnimationFrame(() => {
        listRef.current?.scrollToEnd({ animated: true, viewOffset: -bottomInset.value });
      });
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollToEnd({ animated: true, viewOffset: -bottomInset.value });
  }, []);
  scrollToBottomRef.current = scrollToBottom;

  const footerSpacerStyle = useAnimatedStyle(() => {
    const scrollHeight = scrollViewHeight.value;
    if (scrollHeight <= 0) return { height: 0 };

    const keyboard = Math.abs(keyboardHeight.value);
    const bottom = composerHeight.value + Math.max(insets.bottom, keyboard);
    const blankSpace = scrollHeight - messagesOnlyHeight.value - bottom;
    const footerHeight = Math.max(0, blankSpace - TOP_CONTENT_INSET);

    currentFooterHeight.value = footerHeight;
    return { height: footerHeight };
  });

  const promptInputStyle = useAnimatedStyle(() => ({
    bottom: Math.max(insets.bottom, Math.abs(keyboardHeight.value)),
  }));

  const scrollButtonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(shouldShowScrollButton.value ? 1 : 0, { duration: 180 }),
    transform: [{ scale: withTiming(shouldShowScrollButton.value ? 1 : 0.88, { duration: 180 }) }],
    bottom: composerHeight.value + Math.max(insets.bottom, Math.abs(keyboardHeight.value)) + 12,
  }));

  const listAnimatedProps = useAnimatedProps(() => {
    const keyboard = Math.abs(keyboardHeightForInset.value);
    const bottom = composerHeight.value + Math.max(insets.bottom, keyboard);
    return {
      contentInset: { top: TOP_CONTENT_INSET, left: 0, right: 0, bottom },
      scrollIndicatorInsets: { top: 0, left: 0, right: 0, bottom },
    };
  });

  const onPromptInputLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    composerHeight.value = height;
    setComposerOffsetHeight(height);
  }, []);

  const contextValue: ConversationContextValue = {
    scrollToBottom,
    promptInputStyle,
    onPromptInputLayout,
    scrollButtonStyle,
  };

  return (
    <ConversationContext value={contextValue}>
      <View style={[styles.container, { backgroundColor: palette.background }]}> 
        <KeyboardGestureArea
          interpolator="ios"
          showOnSwipeUp
          offset={composerOffsetHeight}
          textInputNativeID="composer"
          style={styles.gestureArea}>
          <AnimatedLegendList
            ref={listRef}
            data={messages}
            renderItem={renderMessage as never}
            keyExtractor={(item) => (item as ChatMessage).id}
            contentContainerStyle={styles.listContent}
            keyboardDismissMode="interactive"
            automaticallyAdjustsScrollIndicatorInsets={false}
            maintainVisibleContentPosition
            estimatedItemSize={88}
            animatedProps={listAnimatedProps as never}
            onLayout={onScrollViewLayout}
            onScroll={onScroll}
            scrollEventThrottle={16}
            onContentSizeChange={onContentSizeChange}
            ListFooterComponent={
              <Animated.View style={footerSpacerStyle}>
                {!messages.length && emptyState}
              </Animated.View>
            }
          />
        </KeyboardGestureArea>
        {children}
      </View>
    </ConversationContext>
  );
}

export function ConversationScrollButton() {
  const { scrollToBottom, scrollButtonStyle } = useConversationContext();
  const palette = useChatPalette();

  return (
    <Animated.View pointerEvents="box-none" style={[styles.scrollButtonWrap, scrollButtonStyle]}>
      <Pressable
        accessibilityLabel="Scroll to latest message"
        onPress={scrollToBottom}
        style={({ pressed }) => [
          styles.scrollButton,
          { backgroundColor: palette.card, borderColor: palette.border },
          pressed && styles.pressed,
        ]}>
        <Image source="sf:chevron.down" tintColor={palette.foreground} style={styles.scrollIcon} />
      </Pressable>
    </Animated.View>
  );
}

export function ConversationEmptyState({
  title = 'Echo',
  description = 'Send a message to get started.',
}: {
  title?: string;
  description?: string;
}) {
  const palette = useChatPalette();

  return (
    <View style={styles.emptyState}>
      <View style={[styles.emptyIcon, { backgroundColor: palette.muted }]}> 
        <Image source="sf:bubble.left.and.bubble.right" tintColor={palette.mutedForeground} style={styles.emptySfIcon} />
      </View>
      <Text selectable style={[styles.emptyTitle, { color: palette.foreground }]}>
        {title}
      </Text>
      <Text selectable style={[styles.emptyDescription, { color: palette.mutedForeground }]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gestureArea: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 8,
    maxWidth: 860,
    width: '100%',
    alignSelf: 'center',
  },
  scrollButtonWrap: {
    position: 'absolute',
    right: 18,
  },
  scrollButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.14)',
  },
  scrollIcon: {
    width: 17,
    height: 17,
  },
  pressed: {
    opacity: 0.68,
  },
  emptyState: {
    flex: 1,
    minHeight: 260,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptySfIcon: {
    width: 34,
    height: 34,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.8,
  },
  emptyDescription: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 21,
  },
});
