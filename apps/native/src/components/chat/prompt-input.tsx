import { GlassContainer, GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { useEffect, useRef, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useChatPalette } from '@/constants/chat-theme';

import { useChatContext } from './chat-context';
import { useConversationContext } from './conversation';

const GLASS = isLiquidGlassAvailable();
const AnimatedGlassContainer = Animated.createAnimatedComponent(GlassContainer);

export function PromptInput({ children }: { children: ReactNode }) {
  const { promptInputStyle, onPromptInputLayout } = useConversationContext();
  const { error } = useChatContext();

  return (
    <Animated.View onLayout={onPromptInputLayout} style={[styles.inputRoot, promptInputStyle]}>
      {error && <PromptInputError message={error.message} />}
      {GLASS ? (
        <AnimatedGlassContainer style={styles.glassContainer} spacing={8}>
          {children}
        </AnimatedGlassContainer>
      ) : (
        <View style={styles.glassContainer}>{children}</View>
      )}
    </Animated.View>
  );
}

function PromptInputError({ message }: { message?: string }) {
  const palette = useChatPalette();
  return (
    <Animated.View entering={FadeIn.duration(180)} style={styles.errorOuter}>
      <View style={[styles.errorInner, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <View style={[styles.errorDot, { backgroundColor: palette.destructive }]} />
        <Text selectable numberOfLines={2} style={[styles.errorText, { color: palette.mutedForeground }]}>
          {message || 'Something went wrong'}
        </Text>
      </View>
    </Animated.View>
  );
}

export function PromptInputAction({ children, onPress }: { children: ReactNode; onPress?: () => void }) {
  const palette = useChatPalette();
  return (
    <Pressable
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        { backgroundColor: palette.composer, borderColor: palette.border },
        pressed && styles.pressed,
      ]}>
      {children}
    </Pressable>
  );
}

export function PromptInputBody({ children }: { children: ReactNode }) {
  const palette = useChatPalette();

  if (GLASS) {
    return (
      <GlassView isInteractive glassEffectStyle="regular" style={styles.inputBody}>
        {children}
      </GlassView>
    );
  }

  return <View style={[styles.inputBody, { backgroundColor: palette.composer, borderColor: palette.border }]}>{children}</View>;
}

export function PromptInputTextarea({
  placeholder = 'Message Echo...',
  maxLength = 1200,
}: {
  placeholder?: string;
  maxLength?: number;
}) {
  const { input, setInput } = useChatContext();
  const palette = useChatPalette();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (input === '') {
      inputRef.current?.clear();
    }
  }, [input]);

  return (
    <TextInput
      ref={inputRef}
      nativeID="composer"
      cursorColor={palette.foreground}
      selectionColor={palette.foreground}
      style={[styles.textInput, { color: palette.foreground }]}
      value={input}
      onChangeText={setInput}
      placeholder={placeholder}
      placeholderTextColor={palette.mutedForeground}
      multiline
      maxLength={maxLength}
      returnKeyType="default"
    />
  );
}

export function PromptInputSubmit() {
  const { input, isGenerating, onSend } = useChatContext();
  const palette = useChatPalette();
  const disabled = !input.trim() || isGenerating;

  return (
    <Pressable
      accessibilityLabel="Send message"
      onPress={onSend}
      disabled={disabled}
      style={({ pressed }) => [
        styles.submitButton,
        { backgroundColor: disabled ? palette.muted : palette.foreground },
        pressed && !disabled && styles.pressed,
      ]}>
      {isGenerating ? (
        <Animated.View entering={FadeIn.duration(120)} exiting={FadeOut.duration(120)}>
          <ActivityIndicator size="small" color={palette.background} />
        </Animated.View>
      ) : (
        <Image
          source="sf:arrow.up"
          tintColor={disabled ? palette.mutedForeground : palette.background}
          style={styles.submitIcon}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inputRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  glassContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorOuter: {
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  errorInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    borderCurve: 'continuous',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  inputBody: {
    flex: 1,
    minHeight: 44,
    maxHeight: 118,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 22,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 112,
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 12,
    paddingBottom: 11,
    fontSize: 16,
    lineHeight: 21,
  },
  submitButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  submitIcon: {
    width: 16,
    height: 16,
  },
  pressed: {
    opacity: 0.68,
  },
});
