import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { useChatPalette } from '@/constants/chat-theme';

type SymbolName = `sf:${string}`;

function AttachmentButton({ icon, label }: { icon: SymbolName; label: string }) {
  const palette = useChatPalette();
  return (
    <Pressable
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
      style={({ pressed }) => [
        styles.attachmentButton,
        { backgroundColor: palette.muted },
        pressed && styles.pressed,
      ]}>
      <Image source={icon} tintColor={palette.foreground} style={styles.attachmentIcon} />
      <Text selectable style={[styles.attachmentLabel, { color: palette.foreground }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ToggleRow({
  icon,
  label,
  badge,
  value,
  onValueChange,
}: {
  icon: SymbolName;
  label: string;
  badge?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const palette = useChatPalette();
  return (
    <View style={styles.row}>
      <Image source={icon} tintColor={palette.foreground} style={styles.rowIcon} />
      <Text selectable style={[styles.rowLabel, { color: palette.foreground }]}>
        {label}
      </Text>
      {badge && (
        <View style={[styles.badge, { backgroundColor: palette.muted }]}> 
          <Text selectable style={[styles.badgeText, { color: palette.mutedForeground }]}>
            {badge}
          </Text>
        </View>
      )}
      <Switch
        value={value}
        onValueChange={(next) => {
          Haptics.selectionAsync();
          onValueChange(next);
        }}
      />
    </View>
  );
}

function DisclosureRow({ icon, label, detail }: { icon: SymbolName; label: string; detail: string }) {
  const palette = useChatPalette();
  return (
    <Pressable
      onPress={() => Haptics.selectionAsync()}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: palette.muted }]}> 
      <Image source={icon} tintColor={palette.foreground} style={styles.rowIcon} />
      <Text selectable style={[styles.rowLabel, { color: palette.foreground }]}>
        {label}
      </Text>
      <Text selectable style={[styles.detail, { color: palette.mutedForeground }]}>
        {detail}
      </Text>
      <Image source="sf:chevron.right" tintColor={palette.mutedForeground} style={styles.chevron} />
    </Pressable>
  );
}

export default function AddToChatSheet() {
  const [research, setResearch] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [memory, setMemory] = useState(true);
  const palette = useChatPalette();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={styles.attachmentGrid}>
        <AttachmentButton icon="sf:camera" label="Camera" />
        <AttachmentButton icon="sf:photo" label="Photos" />
        <AttachmentButton icon="sf:doc" label="Files" />
      </View>

      <ToggleRow
        icon="sf:sparkles"
        label="Research"
        value={research}
        onValueChange={setResearch}
      />
      <ToggleRow
        icon="sf:globe"
        label="Web search"
        badge="Beta"
        value={webSearch}
        onValueChange={setWebSearch}
      />
      <ToggleRow
        icon="sf:brain.head.profile"
        label="Memory"
        badge="Echo"
        value={memory}
        onValueChange={setMemory}
      />

      <View style={[styles.divider, { backgroundColor: palette.border }]} />

      <DisclosureRow icon="sf:archivebox" label="Add to memory" detail="None" />
      <DisclosureRow icon="sf:paintbrush" label="Choose style" detail="Warm" />
      <DisclosureRow icon="sf:wrench.and.screwdriver" label="Tool access" detail="Off" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 14,
    paddingBottom: 24,
  },
  attachmentGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  attachmentButton: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  attachmentIcon: {
    width: 25,
    height: 25,
  },
  attachmentLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rowIcon: {
    width: 21,
    height: 21,
  },
  rowLabel: {
    flex: 1,
    fontSize: 17,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
    marginVertical: 8,
  },
  detail: {
    fontSize: 15,
  },
  chevron: {
    width: 12,
    height: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
