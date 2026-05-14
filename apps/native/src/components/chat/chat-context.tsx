import { createContext, use } from 'react';

import type { StreamingStore } from './streaming-store';
import type { ChatMessage } from './types';

export type ChatContextValue = {
  messages: ChatMessage[];
  input: string;
  setInput: (value: string) => void;
  isGenerating: boolean;
  onSend: () => void;
  streamingStore: StreamingStore;
  error?: Error | null;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export const ChatProvider = ChatContext.Provider;

export function useChatContext() {
  const context = use(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within <ChatProvider>');
  }
  return context;
}
