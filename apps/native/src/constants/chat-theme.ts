import { useColorScheme } from 'react-native';

export type ChatPalette = ReturnType<typeof useChatPalette>;

export function useChatPalette() {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';

  return {
    dark,
    background: dark ? '#1F1F20' : '#FBFAF7',
    foreground: dark ? '#F4F1EA' : '#171412',
    mutedForeground: dark ? '#A39E96' : '#6F6A61',
    card: dark ? '#28282A' : '#FFFFFF',
    muted: dark ? '#323235' : '#EFEEE9',
    accent: dark ? '#37373B' : '#ECEAE3',
    border: dark ? 'rgba(255,255,255,0.12)' : 'rgba(23,20,18,0.11)',
    sidebar: dark ? '#171718' : '#F0EEE8',
    userBubble: dark ? '#111111' : '#EFEDE6',
    composer: dark ? 'rgba(42,42,45,0.86)' : 'rgba(255,255,255,0.84)',
    destructive: '#EF4444',
    scrim: dark ? 'rgba(0,0,0,0.42)' : 'rgba(0,0,0,0.22)',
  } as const;
}
