import { useSyncExternalStore } from 'react';

import { MessageResponse } from './message';
import type { StreamingStore } from './streaming-store';

export function StreamingMessage({ store }: { store: StreamingStore }) {
  const text = useSyncExternalStore(store.subscribe, store.get, store.get);
  return <MessageResponse>{text || '...'}</MessageResponse>;
}
