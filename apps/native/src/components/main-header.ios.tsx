import * as Haptics from 'expo-haptics';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActionSheetIOS, useColorScheme } from 'react-native';

import { useDrawer } from '@/components/layout/drawer-content';
import { useChatPalette } from '@/constants/chat-theme';
import {
  Button,
  Host,
  HStack,
  Image as SUIImage,
  Menu,
  Section,
  Text as SUIText,
  Toggle,
  VStack,
} from '@expo/ui/swift-ui';
import { controlSize, font, foregroundStyle } from '@expo/ui/swift-ui/modifiers';
function HeaderTitleMenu() {
  const router = useRouter();
  const [memoryAware, setMemoryAware] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const headerFg = isDark ? '#fff' : '#000';
  const headerFgMuted = isDark ? 'rgba(255,255,255,0.66)' : 'rgba(0,0,0,0.48)';

  return (
    <Host style={{ minWidth: 128, minHeight: 42 }}>
      <Menu
        label={
          <VStack spacing={0}>
            <HStack spacing={4} alignment="center">
              <SUIText
                modifiers={[foregroundStyle(headerFg), font({ weight: 'semibold', size: 17 })]}>
                Echo
              </SUIText>
              <SUIImage systemName="chevron.down" size={10} color={headerFg} />
            </HStack>
            <SUIText modifiers={[foregroundStyle(headerFgMuted), font({ size: 12 })]}>
              Companion
            </SUIText>
          </VStack>
        }
        modifiers={[controlSize('regular')]}>
        <Section title="Conversation">
          <Button systemImage="pencil" label="Rename chat" onPress={() => Haptics.selectionAsync()} />
          <Button
            systemImage="sparkles"
            label="Companion controls"
            onPress={() => {
              Haptics.selectionAsync();
              router.navigate('/companion-controls');
            }}
          />
          <Button systemImage="trash" label="Clear chat" role="destructive" onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)} />
        </Section>
        <Toggle isOn={memoryAware} onIsOnChange={setMemoryAware}>
          <SUIText>Memory-aware replies</SUIText>
          <SUIText>Let Echo use remembered context</SUIText>
        </Toggle>
      </Menu>
    </Host>
  );
}

export function MainHeader() {
  const { openDrawer } = useDrawer();
  const palette = useChatPalette();

  function showConversationActions() {
    Haptics.selectionAsync();
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Echo',
        message: 'Conversation controls',
        options: ['Cancel', 'Rename chat', 'Memory settings', 'Clear chat'],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 3,
        userInterfaceStyle: palette.dark ? 'dark' : 'light',
      },
      () => {},
    );
  }

  return (
    <>
      <Stack.Screen.Title asChild>
        <HeaderTitleMenu />
      </Stack.Screen.Title>
      <Stack.Toolbar placement="left">
        <Stack.Toolbar.Button icon="list.bullet" onPress={openDrawer} />
      </Stack.Toolbar>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button icon="ellipsis" onPress={showConversationActions} />
      </Stack.Toolbar>
    </>
  );
}
