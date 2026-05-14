import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useChatPalette } from '@/constants/chat-theme';

export function Message({ from, children }: { from: 'user' | 'assistant'; children: ReactNode }) {
  const palette = useChatPalette();

  if (from === 'user') {
    return (
      <Animated.View
        entering={FadeIn.duration(180)}
        exiting={FadeOut.duration(120)}
        style={[styles.userBubble, { backgroundColor: palette.userBubble }]}>
        {typeof children === 'string' ? (
          <Text selectable style={[styles.userText, { color: palette.foreground }]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </Animated.View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(180)} exiting={FadeOut.duration(120)} style={styles.aiRow}>
      {children}
    </Animated.View>
  );
}

export function MessageResponse({ children }: { children: string }) {
  const palette = useChatPalette();
  return (
    <View style={styles.responseWrap}>
      <Text selectable style={[styles.responseText, { color: palette.foreground }]}>
        {children || '...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userBubble: {
    maxWidth: '82%',
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 12,
  },
  userText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  aiRow: {
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  responseWrap: {
    paddingRight: 8,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
});
