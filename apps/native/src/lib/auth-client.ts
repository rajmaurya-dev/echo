import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';
import {
  getNativeAppVariantConfig,
  resolveAppVariant,
} from '../../config/app-variant';

const authBaseURL =
  process.env.EXPO_PUBLIC_BETTER_AUTH_URL ?? 'http://localhost:8787';
const appVariant = resolveAppVariant(process.env.EXPO_PUBLIC_APP_VARIANT);
const { scheme } = getNativeAppVariantConfig(appVariant);

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins: [
    expoClient({
      scheme,
      storagePrefix: scheme,
      storage: SecureStore,
    }),
  ],
});
