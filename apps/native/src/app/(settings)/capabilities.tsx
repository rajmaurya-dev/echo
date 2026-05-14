import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { useChatPalette } from '@/constants/chat-theme';

function CapabilityToggle({ title, subtitle, initial }: { title: string; subtitle: string; initial: boolean }) {
  const palette = useChatPalette();
  const [value, setValue] = useState(initial);

  return (
    <View style={[styles.row, { borderBottomColor: palette.border }]}> 
      <View style={styles.textBlock}>
        <Text selectable style={[styles.title, { color: palette.foreground }]}>{title}</Text>
        <Text selectable style={[styles.subtitle, { color: palette.mutedForeground }]}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(next) => {
          Haptics.selectionAsync();
          setValue(next);
        }}
      />
    </View>
  );
}

export default function CapabilitiesScreen() {
  const palette = useChatPalette();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <CapabilityToggle title="Memory" subtitle="Use remembered preferences and context" initial />
        <CapabilityToggle title="Proactive check-ins" subtitle="Follow up gently after important moments" initial />
        <CapabilityToggle title="Tool access" subtitle="Allow future integrations when enabled" initial={false} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18 },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  row: {
    minHeight: 76,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textBlock: { flex: 1, gap: 3 },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { fontSize: 13, lineHeight: 18 },
});
