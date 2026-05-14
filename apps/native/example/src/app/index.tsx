import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import React from 'react';
import {
  FlatList,
  Platform,
  PlatformColor,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { KeyboardAvoidingView, KeyboardController } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SwiftChatInput } from '@/components/chat/swift-chat-input';

const conversations = [
  {
    id: 'daily-reset',
    title: 'Daily reset',
    preview: 'Let’s make the next hour gentle.',
    time: 'Now',
  },
  {
    id: 'weekend-plan',
    title: 'Weekend plan',
    preview: 'You wanted something low-pressure.',
    time: 'Tue',
  },
  {
    id: 'hard-day',
    title: 'Hard day at work',
    preview: 'That meeting took a lot out of you.',
    time: 'Mon',
  },
  {
    id: 'sleep-routine',
    title: 'Sleep routine',
    preview: 'Small wind-down, no perfection needed.',
    time: 'Fri',
  },
];

const initialMessages = [
  {
    id: 'm1',
    role: 'assistant' as const,
    content:
      'Hey, I’m here. I’ll keep things simple and remember what matters without making it weird. What’s on your mind today?',
  },
  {
    id: 'm2',
    role: 'user' as const,
    content: 'I want the app to feel like a calm AI companion, not a productivity bot.',
  },
  {
    id: 'm3',
    role: 'assistant' as const,
    content:
      'That’s the right instinct for Echo. The interface should feel quiet, warm, and continuous — more like texting someone who knows your context than opening a tool.',
  },
];

type ChatMessage = (typeof initialMessages)[number];

function createEchoReply(message: string): ChatMessage {
  const trimmed = message.trim();
  return {
    id: `ai-${Date.now()}`,
    role: 'assistant',
    content: trimmed
      ? `Got it. For now I’ll keep this as a local prototype response: “${trimmed}”. Once the API is ready, this area can stream Echo’s real memory-aware reply without changing the shell.`
      : 'I’m here with you. Send anything small — a thought, a mood, or what you want to remember.',
  };
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const compact = width < 760;
  const [sidebarOpen, setSidebarOpen] = React.useState(!compact);
  const [activeConversation, setActiveConversation] = React.useState(conversations[0]?.id ?? '');
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);

  React.useEffect(() => {
    setSidebarOpen(!compact);
  }, [compact]);

  const palette = {
    app: isDark ? '#101012' : '#F7F4EF',
    sidebar: isDark ? '#171719' : '#ECE7DF',
    sidebarSelected: isDark ? '#27272B' : '#FFFFFF',
    border: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(32,28,24,0.10)',
    text: isDark ? '#F5F1EA' : '#171412',
    secondary: isDark ? '#AAA39A' : '#756D64',
    assistantTint: isDark ? '#DCD5CA' : '#38322D',
    bubble: isDark ? '#2B2926' : '#191715',
    bubbleText: '#FFFFFF',
    input: isDark ? '#1B1B1D' : '#FFFFFF',
  };

  const dismissKeyboard = React.useCallback(() => {
    KeyboardController.dismiss({ animated: true });
  }, []);

  const sendMessage = React.useCallback(() => {
    const text = input.trim();
    if (!text) return;

    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const userMessage: ChatMessage = { id: `user-${Date.now()}`, role: 'user', content: text };
    setMessages((current) => [...current, userMessage, createEchoReply(text)]);
    setInput('');
    KeyboardController.dismiss({ animated: true });
  }, [input]);

  return (
    <KeyboardAvoidingView
      behavior="translate-with-padding"
      style={[styles.screen, { backgroundColor: palette.app }]}
      keyboardVerticalOffset={0}>
      <View style={styles.shell}>
        {sidebarOpen && (
          <View
            style={[
              styles.sidebar,
              compact && styles.sidebarOverlay,
              {
                paddingTop: insets.top + 14,
                paddingBottom: insets.bottom + 14,
                backgroundColor: palette.sidebar,
                borderRightColor: palette.border,
              },
            ]}>
            <View style={styles.sidebarHeader}>
              <View>
                <Text selectable style={[styles.eyebrow, { color: palette.secondary }]}>
                  Echo
                </Text>
                <Text selectable style={[styles.sidebarTitle, { color: palette.text }]}>
                  Conversations
                </Text>
              </View>
              {compact && (
                <Pressable
                  accessibilityLabel="Close sidebar"
                  onPress={() => setSidebarOpen(false)}
                  style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                  <Image source="sf:xmark" tintColor={palette.text} style={{ width: 19, height: 19 }} />
                </Pressable>
              )}
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.newChatButton,
                { borderColor: palette.border, backgroundColor: palette.sidebarSelected },
                pressed && styles.pressed,
              ]}>
              <Image source="sf:square.and.pencil" tintColor={palette.text} style={{ width: 17, height: 17 }} />
              <Text selectable style={[styles.newChatText, { color: palette.text }]}>
                New chat
              </Text>
            </Pressable>

            <FlatList
              data={conversations}
              keyExtractor={(item) => item.id}
              contentInsetAdjustmentBehavior="automatic"
              contentContainerStyle={styles.conversationList}
              renderItem={({ item }) => {
                const selected = item.id === activeConversation;
                return (
                  <Pressable
                    onPress={() => {
                      setActiveConversation(item.id);
                      if (compact) setSidebarOpen(false);
                    }}
                    style={({ pressed }) => [
                      styles.conversationRow,
                      {
                        backgroundColor: selected ? palette.sidebarSelected : 'transparent',
                        borderColor: selected ? palette.border : 'transparent',
                      },
                      pressed && styles.pressed,
                    ]}>
                    <View style={styles.conversationTitleRow}>
                      <Text
                        selectable
                        numberOfLines={1}
                        style={[styles.conversationTitle, { color: palette.text }]}>
                        {item.title}
                      </Text>
                      <Text selectable style={[styles.conversationTime, { color: palette.secondary }]}>
                        {item.time}
                      </Text>
                    </View>
                    <Text
                      selectable
                      numberOfLines={2}
                      style={[styles.conversationPreview, { color: palette.secondary }]}>
                      {item.preview}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        )}

        {compact && sidebarOpen && (
          <Pressable style={styles.scrim} onPress={() => setSidebarOpen(false)} />
        )}

        <View style={styles.chatPane}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            onScrollBeginDrag={dismissKeyboard}
            style={styles.messagesScroll}
            contentContainerStyle={[
              styles.messagesContent,
              { paddingBottom: 20, paddingHorizontal: compact ? 18 : 32 },
            ]}>
            <View
              style={[
                styles.topBar,
                {
                  paddingTop: insets.top + 10,
                  borderBottomColor: palette.border,
                },
              ]}>
              <Pressable
                accessibilityLabel="Open conversations"
                onPress={() => setSidebarOpen((open) => !open)}
                style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                <Image
                  source="sf:sidebar.left"
                  tintColor={palette.text}
                  style={{ width: 19, height: 19 }}
                />
              </Pressable>
              <View style={styles.topTitleBlock}>
                <Text selectable style={[styles.chatTitle, { color: palette.text }]}>
                  Echo
                </Text>
                <Text selectable style={[styles.chatSubtitle, { color: palette.secondary }]}>
                  AI companion · local UI prototype
                </Text>
              </View>
              <Pressable
                onPress={dismissKeyboard}
                style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
                <Image source="sf:keyboard.chevron.compact.down" tintColor={palette.text} style={{ width: 19, height: 19 }} />
              </Pressable>
            </View>

            <Pressable onPress={dismissKeyboard} style={styles.messagesTapArea}>
              <View style={styles.dayPill}>
              <Text selectable style={[styles.dayPillText, { color: palette.secondary }]}>
                Today
              </Text>
            </View>

              {messages.map((message) => {
                const isUser = message.role === 'user';
                return (
                  <View
                    key={message.id}
                    style={[styles.messageRow, isUser ? styles.userRow : styles.assistantRow]}>
                    {!isUser && (
                      <View style={[styles.avatar, { borderColor: palette.border }]}> 
                        <Text selectable style={styles.avatarText}>e</Text>
                      </View>
                    )}
                    <View
                      style={[
                        styles.messageBlock,
                        isUser
                          ? [styles.userBubble, { backgroundColor: palette.bubble }]
                          : styles.assistantMessage,
                      ]}>
                      <Text
                        selectable
                        style={[
                          styles.messageText,
                          { color: isUser ? palette.bubbleText : palette.assistantTint },
                        ]}>
                        {message.content}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </Pressable>
          </ScrollView>

          <View
            style={[
              styles.inputDock,
              {
                paddingBottom: insets.bottom + 10,
                paddingHorizontal: compact ? 14 : 32,
                backgroundColor: palette.app,
                borderTopColor: palette.border,
              },
            ]}>
            <View style={[styles.inputFrame, { backgroundColor: palette.input, borderColor: palette.border }]}> 
              {Platform.OS === 'ios' ? (
                <SwiftChatInput value={input} onChangeText={setInput} onSend={sendMessage} />
              ) : (
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={sendMessage}
                  placeholder="Message Echo"
                  placeholderTextColor={palette.secondary}
                  style={[styles.fallbackInput, { color: palette.text }]}
                />
              )}
            </View>
            <Text selectable style={[styles.disclaimer, { color: palette.secondary }]}>
              Echo is AI. It can be wrong; use crisis resources for urgent safety concerns.
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  shell: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 304,
    borderRightWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    gap: 14,
    zIndex: 10,
  },
  sidebarOverlay: {
    ...StyleSheet.absoluteFillObject,
    right: undefined,
    width: 318,
    boxShadow: '8px 0 34px rgba(0, 0, 0, 0.22)',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.24)',
    zIndex: 8,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  newChatButton: {
    minHeight: 46,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  newChatText: {
    fontSize: 15,
    fontWeight: '600',
  },
  conversationList: {
    gap: 6,
    paddingBottom: 8,
  },
  conversationRow: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    borderCurve: 'continuous',
    padding: 12,
    gap: 6,
  },
  conversationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conversationTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  conversationTime: {
    fontSize: 12,
    fontVariant: ['tabular-nums'],
  },
  conversationPreview: {
    fontSize: 13,
    lineHeight: 18,
  },
  chatPane: {
    flex: 1,
  },
  topBar: {
    minHeight: 72,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topTitleBlock: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  chatSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.62,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 860,
    alignSelf: 'center',
    paddingTop: 18,
    gap: 18,
  },
  messagesTapArea: {
    gap: 18,
  },
  dayPill: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(127,127,127,0.10)',
  },
  dayPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageRow: {
    flexDirection: 'row',
    gap: 12,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(127,127,127,0.10)',
    marginTop: 2,
  },
  avatarText: {
    color: PlatformColor('label'),
    fontSize: 17,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  messageBlock: {
    maxWidth: '82%',
  },
  userBubble: {
    borderRadius: 22,
    borderCurve: 'continuous',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  assistantMessage: {
    paddingTop: 2,
    paddingRight: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: -0.1,
  },
  inputDock: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    gap: 8,
  },
  inputFrame: {
    width: '100%',
    maxWidth: 860,
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 24,
    borderCurve: 'continuous',
    padding: 5,
    boxShadow: '0 10px 34px rgba(0, 0, 0, 0.10)',
  },
  fallbackInput: {
    minHeight: 48,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  disclaimer: {
    maxWidth: 860,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 15,
  },
});
