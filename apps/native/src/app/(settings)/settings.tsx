import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { useChatPalette } from '@/constants/chat-theme';

function SettingsRow({
  title,
  subtitle,
  icon,
  href,
}: {
  title: string;
  subtitle?: string;
  icon: `sf:${string}`;
  href: '/(settings)/profile' | '/(settings)/capabilities';
}) {
  const palette = useChatPalette();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync();
        router.navigate(href);
      }}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: palette.muted }]}> 
      <Image source={icon} tintColor={palette.foreground} style={{ width: 22, height: 22 }} />
      <View style={styles.rowTextBlock}>
        <Text numberOfLines={1} style={[styles.rowTitle, { color: palette.foreground }]}> 
          {title}
        </Text>
        {subtitle && (
          <Text numberOfLines={1} style={[styles.rowSubtitle, { color: palette.mutedForeground }]}> 
            {subtitle}
          </Text>
        )}
      </View>
      <Image source="sf:chevron.right" tintColor={palette.mutedForeground} style={{ width: 12, height: 12 }} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const palette = useChatPalette();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <SettingsRow
          title="Profile"
          subtitle="Name, preferences, and account basics"
          icon="sf:person.crop.circle"
          href="/(settings)/profile"
        />
        <View style={[styles.divider, { backgroundColor: palette.border }]} />
        <SettingsRow
          title="Capabilities"
          subtitle="Memory, check-ins, and tool access"
          icon="sf:sparkles"
          href="/(settings)/capabilities"
        />
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}>
        <View style={styles.toggleRow}>
          <View style={styles.toggleTextBlock}>
            <Text selectable style={[styles.rowTitle, { color: palette.foreground }]}>
              Proactive check-ins
            </Text>
            <Text selectable style={[styles.rowSubtitle, { color: palette.mutedForeground }]}>
              Let Echo gently follow up later
            </Text>
          </View>
          <Switch value />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18, gap: 16 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  row: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  rowTextBlock: { flex: 1, flexShrink: 1, minWidth: 0, gap: 2 },
  toggleTextBlock: { flex: 1, flexShrink: 1, minWidth: 0, gap: 2 },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowSubtitle: { fontSize: 13, lineHeight: 18 },
  divider: { height: StyleSheet.hairlineWidth, marginLeft: 52 },
  toggleRow: {
    minHeight: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
