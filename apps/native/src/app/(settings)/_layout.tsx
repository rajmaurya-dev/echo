import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack, useRouter } from 'expo-router';

import { useChatPalette } from '@/constants/chat-theme';

const GLASS = isLiquidGlassAvailable();

export default function SettingsLayout() {
  const router = useRouter();
  const palette = useChatPalette();

  return (
    <Stack
      screenOptions={{
        headerTransparent: GLASS,
        headerLargeTitleShadowVisible: false,
        headerBackButtonDisplayMode: GLASS ? 'minimal' : 'default',
        headerTintColor: palette.foreground,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: palette.background,
        },
        contentStyle: { backgroundColor: palette.background },
      }}>
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerLeft: () => null,
        }}>
        <Stack.Toolbar placement="left">
          <Stack.Toolbar.Button icon="xmark" onPress={() => router.back()} />
        </Stack.Toolbar>
        <Stack.Toolbar placement="right">
          <Stack.Toolbar.Menu icon="info.circle">
            <Stack.Toolbar.MenuAction icon="app">
Echo v1.0.0
            </Stack.Toolbar.MenuAction>
            <Stack.Toolbar.Menu inline>
              <Stack.Toolbar.MenuAction icon="doc.text">Safety & Trust</Stack.Toolbar.MenuAction>
              <Stack.Toolbar.MenuAction icon="arrow.up.forward.square">Terms</Stack.Toolbar.MenuAction>
              <Stack.Toolbar.MenuAction icon="arrow.up.forward.square">Privacy Policy</Stack.Toolbar.MenuAction>
            </Stack.Toolbar.Menu>
            <Stack.Toolbar.MenuAction icon="arrow.up.forward.square">Help & Support</Stack.Toolbar.MenuAction>
          </Stack.Toolbar.Menu>
        </Stack.Toolbar>
      </Stack.Screen>
      <Stack.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="capabilities"
        options={{
          title: 'Capabilities',
        }}
      />
    </Stack>
  );
}
