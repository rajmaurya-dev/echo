import type { ExpoConfig } from 'expo/config';
import {
  getNativeAppVariantConfig,
  resolveAppVariant,
} from './config/app-variant';

const appVariant = resolveAppVariant(
  process.env.APP_VARIANT ?? process.env.EXPO_PUBLIC_APP_VARIANT,
);
const { appName, bundleIdentifier, packageName, scheme, slug } =
  getNativeAppVariantConfig(appVariant);

const config: ExpoConfig = {
  name: appName,
  slug,
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme,
  userInterfaceStyle: 'automatic',
  ios: {
    icon: './assets/expo.icon',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    usesAppleSignIn: true,
    bundleIdentifier,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    permissions: ['RECORD_AUDIO'],
    package: packageName,
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  extra: {
    appVariant,
    eas: {
      projectId: 'eade73c2-de47-4638-a354-94d66a9dd520',
    },
    scheme,
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#208AEF',
        android: {
          image: './assets/images/splash-icon.png',
          imageWidth: 76,
        },
      },
    ],
    'expo-secure-store',
    [
      'expo-audio',
      {
        microphonePermission:
          'Allow $(PRODUCT_NAME) to access your microphone so you can record voice messages and audio notes.',
      },
    ],
    [
      'expo-camera',
      {
        cameraPermission:
          'Allow $(PRODUCT_NAME) to access your camera so you can take photos and video for chat.',
        microphonePermission:
          'Allow $(PRODUCT_NAME) to access your microphone so you can record video with audio.',
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission:
          'Allow $(PRODUCT_NAME) to access your photos so you can attach images to chat.',
        cameraPermission:
          'Allow $(PRODUCT_NAME) to access your camera so you can capture images to share in chat.',
        microphonePermission:
          'Allow $(PRODUCT_NAME) to access your microphone so you can capture video with audio.',
      },
    ],
    [
      'expo-notifications',
      {
        defaultChannel: 'default',
      },
    ],
    'expo-apple-authentication',
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
