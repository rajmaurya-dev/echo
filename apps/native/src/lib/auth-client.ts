import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

const authBaseURL =
  process.env.EXPO_PUBLIC_BETTER_AUTH_URL ?? 'http://localhost:8787';

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins: [
    expoClient({
      scheme: 'native',
      storagePrefix: 'native',
      storage: SecureStore,
    }),
  ],
});
