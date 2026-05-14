import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { createContext, use, useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useChatPalette } from '@/constants/chat-theme';

const mockChats = [
  { id: '1', title: 'Daily reset' },
  { id: '2', title: 'Hard day at work' },
  { id: '3', title: 'Weekend plan' },
  { id: '4', title: 'Sleep routine' },
  { id: '5', title: 'Things to remember' },
];

type DrawerContextValue = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return <DrawerContext value={{ isOpen, openDrawer, closeDrawer }}>{children}</DrawerContext>;
}

export function useDrawer() {
  const context = use(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}

function DrawerNavItem({ label, icon, onPress }: { label: string; icon: string; onPress: () => void }) {
  const palette = useChatPalette();
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [styles.navItem, pressed && { backgroundColor: palette.accent }]}>
      <Image source={`sf:${icon}`} tintColor={palette.foreground} style={{ width: 18, height: 18 }} />
      <Text selectable style={[styles.navText, { color: palette.foreground }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function DrawerChatItem({ title, active, onPress }: { title: string; active?: boolean; onPress: () => void }) {
  const palette = useChatPalette();
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [
        styles.chatItem,
        active && { backgroundColor: palette.muted },
        pressed && { backgroundColor: palette.accent },
      ]}>
      <Text
        selectable
        numberOfLines={1}
        style={[styles.chatTitle, { color: active ? palette.foreground : palette.mutedForeground }]}>
        {title}
      </Text>
    </Pressable>
  );
}

export function DrawerContent({ onNewChat }: { onNewChat?: () => void }) {
  const palette = useChatPalette();
  const insets = useSafeAreaInsets();
  const { closeDrawer } = useDrawer();
  const router = useRouter();

  const openSettings = useCallback(() => {
    closeDrawer();
    router.navigate('/(settings)/settings');
  }, [closeDrawer, router]);

  const openProfile = useCallback(() => {
    closeDrawer();
    router.navigate('/(settings)/profile');
  }, [closeDrawer, router]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: palette.sidebar,
          paddingTop: insets.top + 8,
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={styles.header}>
        <Text selectable style={[styles.title, { color: palette.foreground }]}>
          Echo
        </Text>
        <Pressable
          accessibilityLabel="New chat"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onNewChat?.();
            closeDrawer();
          }}
          style={({ pressed }) => [
            styles.headerButton,
            { backgroundColor: palette.foreground },
            pressed && styles.pressed,
          ]}>
          <Image source="sf:square.and.pencil" tintColor={palette.background} style={{ width: 18, height: 18 }} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scroll}>
        <DrawerNavItem label="Chats" icon="bubble.left.and.bubble.right" onPress={closeDrawer} />
        <DrawerNavItem label="Memory" icon="sparkles" onPress={() => router.navigate('/companion-controls')} />
        <DrawerNavItem label="Settings" icon="gearshape" onPress={openSettings} />

        <Text selectable style={[styles.sectionLabel, { color: palette.mutedForeground }]}>
          Recents
        </Text>
        {mockChats.map((chat) => (
          <DrawerChatItem key={chat.id} title={chat.title} active={chat.id === '1'} onPress={closeDrawer} />
        ))}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: palette.border }]}> 
        <Pressable
          onPress={() => {
            Haptics.selectionAsync();
            openProfile();
          }}
          style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}>
          <View style={[styles.avatar, { backgroundColor: palette.muted }]}> 
            <Text selectable style={[styles.avatarText, { color: palette.foreground }]}>P</Text>
          </View>
          <View style={styles.profileTextBlock}>
            <Text selectable style={[styles.profileName, { color: palette.foreground }]}>
              Prashant
            </Text>
            <Text selectable style={[styles.profileSub, { color: palette.mutedForeground }]}>
              One companion
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    minHeight: 58,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -1,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  navItem: {
    minHeight: 46,
    marginHorizontal: 10,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  chatItem: {
    marginHorizontal: 10,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  chatTitle: {
    fontSize: 15,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    paddingTop: 12,
  },
  profileButton: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingHorizontal: 4,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
  },
  profileTextBlock: {
    flex: 1,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
  },
  profileSub: {
    fontSize: 12,
    marginTop: 2,
  },
  pressed: {
    opacity: 0.68,
  },
});
