import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useChatPalette } from '@/constants/chat-theme';

export default function ProfileScreen() {
  const palette = useChatPalette();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: palette.background }]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.content}>
      <View style={[styles.avatar, { backgroundColor: palette.muted }]}> 
        <Text selectable style={[styles.avatarText, { color: palette.foreground }]}>P</Text>
      </View>
      <Text selectable style={[styles.title, { color: palette.foreground }]}>Prashant</Text>
      <Text selectable style={[styles.subtitle, { color: palette.mutedForeground }]}>Echo companion profile placeholder</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { alignItems: 'center', padding: 24, gap: 10 },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: { fontSize: 34, fontWeight: '800' },
  title: { fontSize: 26, fontWeight: '700', letterSpacing: -0.6 },
  subtitle: { fontSize: 15, textAlign: 'center' },
});
