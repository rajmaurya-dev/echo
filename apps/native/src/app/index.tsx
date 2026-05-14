import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardController } from 'react-native-keyboard-controller';

import {
  ChatProvider,
  Conversation,
  ConversationEmptyState,
  ConversationScrollButton,
  Message,
  MessageResponse,
  PromptInput,
  PromptInputAction,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  StreamingMessage,
  createStreamingStore,
  type ChatMessage,
} from '@/components/chat';
import { MainHeader } from '@/components/main-header';
import { useChatPalette } from '@/constants/chat-theme';

const STREAMING_THROTTLE_MS = 32;

const MOCK_RESPONSES = [
  "I'm here. We can keep this simple and human: one thing at a time, no pressure to be productive.",
  "That makes sense. I'll remember the shape of what you're saying and reflect it back gently, not like a task list.",
  "Tiny check-in: what would feel supportive right now - being heard, making a small plan, or just sitting with it for a minute?",
  "I can work with that. For Echo, the interface should stay calm: user messages as bubbles, my replies open and readable, and the input always close to your thumb.",
];

async function mockStreamResponse(text: string, onToken: (token: string) => void) {
  const words = text.split(/(?<=\s)/);
  for (const word of words) {
    await new Promise((resolve) => setTimeout(resolve, 26 + Math.random() * 34));
    onToken(word);
  }
}

function useMockChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const streamingStore = useMemo(() => createStreamingStore(), []);
  const streamingRef = useRef('');
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mockIndexRef = useRef(0);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isGenerating) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
    };

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      content: '',
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
    setIsGenerating(true);
    KeyboardController.dismiss({ animated: true });

    streamingRef.current = '';
    streamingStore.set('');

    try {
      const mockText = MOCK_RESPONSES[mockIndexRef.current % MOCK_RESPONSES.length];
      mockIndexRef.current += 1;

      await mockStreamResponse(mockText, (token) => {
        streamingRef.current += token;
        if (!throttleRef.current) {
          throttleRef.current = setTimeout(() => {
            streamingStore.set(streamingRef.current);
            throttleRef.current = null;
          }, STREAMING_THROTTLE_MS);
        }
      });
    } catch (error) {
      console.error('Mock generation error:', error);
      streamingRef.current = 'I hit a local prototype error. Try sending that again.';
    } finally {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }

      const finalContent = streamingRef.current;
      setMessages((current) => {
        const updated = [...current];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex]) {
          updated[lastIndex] = { ...updated[lastIndex], content: finalContent };
        }
        return updated;
      });
      streamingRef.current = '';
      streamingStore.set('');
      setIsGenerating(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [input, isGenerating, streamingStore]);

  return {
    messages,
    input,
    setInput,
    isGenerating,
    onSend: handleSend,
    streamingStore,
    error: null,
  };
}

export default function ChatScreen() {
  const chat = useMockChat();
  const { isGenerating, streamingStore } = chat;
  const palette = useChatPalette();

  const renderMessage = useCallback(
    ({ item }: { item: ChatMessage }) => {
      if (item.role === 'user') {
        return <Message from="user">{item.content}</Message>;
      }

      const isStreaming = isGenerating && item.content === '';
      return (
        <Message from="assistant">
          {isStreaming ? <StreamingMessage store={streamingStore} /> : <MessageResponse>{item.content}</MessageResponse>}
        </Message>
      );
    },
    [isGenerating, streamingStore],
  );

  return (
    <ChatProvider value={chat}>
      <MainHeader />
      <Conversation
        renderMessage={renderMessage}
        emptyState={
          <ConversationEmptyState
            title="Echo"
            description="A calm AI companion prototype. Send a message to start."
          />
        }>
        <ConversationScrollButton />
        <PromptInput>
          <Link href="/attachments" asChild>
            <PromptInputAction>
              <Image source="sf:plus" tintColor={palette.foreground} style={styles.promptActionIcon} />
            </PromptInputAction>
          </Link>
          <PromptInputBody>
            <PromptInputTextarea />
            <PromptInputSubmit />
          </PromptInputBody>
        </PromptInput>
      </Conversation>
    </ChatProvider>
  );
}

const styles = StyleSheet.create({
  promptActionIcon: {
    width: 20,
    height: 20,
  },
  pressed: {
    opacity: 0.65,
  },
});
