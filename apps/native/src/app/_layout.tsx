import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { DrawerContent, DrawerProvider, useDrawer } from '@/components/layout/drawer-content';
import { DrawerLayout } from '@/components/layout/drawer-layout';
import { useChatPalette } from '@/constants/chat-theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <KeyboardProvider preload>
        <DrawerProvider>
          <RootDrawer />
        </DrawerProvider>
        <StatusBar style="auto" />
      </KeyboardProvider>
    </ThemeProvider>
  );
}

function RootDrawer() {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <DrawerLayout
      open={isOpen}
      onOpen={openDrawer}
      onClose={closeDrawer}
      drawerContent={<DrawerContent />}>
      <StackLayout />
    </DrawerLayout>
  );
}

function StackLayout() {
  const palette = useChatPalette();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTintColor: palette.foreground,
        headerShadowVisible: false,
        headerLargeTitleShadowVisible: false,
        contentStyle: { backgroundColor: palette.background },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Echo',
          animation: 'none',
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="attachments"
        options={{
          title: 'Add to chat',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.55],
          sheetGrabberVisible: true,
          headerTransparent: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="companion-controls"
        options={{
          title: 'Companion',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.8],
          sheetGrabberVisible: true,
          headerTransparent: true,
          headerLargeTitleShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(settings)"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
