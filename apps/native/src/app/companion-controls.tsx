import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { useChatPalette } from '@/constants/chat-theme';

const tones = ['Warm', 'Playful', 'Direct', 'Reflective'] as const;

export default function CompanionControlsSheet() {
  const palette = useChatPalette();
  const [selectedTone, setSelectedTone] = useState<(typeof tones)[number]>('Warm');
  const [memoryAware, setMemoryAware] = useState(true);
  const [checkIns, setCheckIns] = useState(true);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <Text selectable style={[styles.sectionTitle, { color: palette.mutedForeground }]}>Tone</Text>
      <View style={styles.toneGrid}>
        {tones.map((tone) => {
          const active = tone === selectedTone;
          return (
            <Pressable
              key={tone}
              onPress={() => {
                Haptics.selectionAsync();
                setSelectedTone(tone);
              }}
              style={({ pressed }) => [
                styles.toneButton,
                {
                  backgroundColor: active ? palette.foreground : palette.muted,
                  borderColor: palette.border,
                },
                pressed && styles.pressed,
              ]}>
              <Text selectable style={[styles.toneText, { color: active ? palette.background : palette.foreground }]}>
                {tone}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.card, { backgroundColor: palette.card, borderColor: palette.border }]}> 
        <View style={styles.row}>
          <View style={styles.textBlock}>
            <Text selectable style={[styles.rowTitle, { color: palette.foreground }]}>Memory-aware replies</Text>
            <Text selectable style={[styles.rowSubtitle, { color: palette.mutedForeground }]}>Let Echo use remembered context</Text>
          </View>
          <Switch
            value={memoryAware}
            onValueChange={(value) => {
              Haptics.selectionAsync();
              setMemoryAware(value);
            }}
          />
        </View>
        <View style={[styles.divider, { backgroundColor: palette.border }]} />
        <View style={styles.row}>
          <View style={styles.textBlock}>
            <Text selectable style={[styles.rowTitle, { color: palette.foreground }]}>Gentle check-ins</Text>
            <Text selectable style={[styles.rowSubtitle, { color: palette.mutedForeground }]}>Allow supportive follow-ups later</Text>
          </View>
          <Switch
            value={checkIns}
            onValueChange={(value) => {
              Haptics.selectionAsync();
              setCheckIns(value);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18, paddingBottom: 30, gap: 14 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    paddingHorizontal: 2,
  },
  toneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  toneButton: {
    minWidth: '47%',
    flexGrow: 1,
    minHeight: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toneText: { fontSize: 16, fontWeight: '600' },
  card: {
    marginTop: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  row: {
    minHeight: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textBlock: { flex: 1, gap: 3 },
  rowTitle: { fontSize: 16, fontWeight: '600' },
  rowSubtitle: { fontSize: 13, lineHeight: 18 },
  divider: { height: StyleSheet.hairlineWidth, marginLeft: 16 },
  pressed: { opacity: 0.72 },
});
