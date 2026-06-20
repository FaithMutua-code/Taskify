// constants/theme.ts
// Central place for colors, spacing, radius, shadows — matches the web app's purple theme.

import { ViewStyle } from 'react-native';

export const colors = {
  primary: '#6a0dad',      // main purple (buttons, active states)
  primaryDark: '#581c87',  // hover/pressed
  primaryLight: '#9333EA',
  surfaceLight: '#E9D5FF', // light purple backgrounds (profile card, batchmates)
  surfaceLighter: '#f5e9fc',
  accentPink: '#ec4899',   // progress bar accent (Mobile App card)
  accentPurpleMid: '#9333EA',

  background: '#FAF5FF',   // page bg (purple-50 equivalent)
  card: '#FFFFFF',
  border: '#E5E7EB',
  text: '#1F2937',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',
  white: '#FFFFFF',
  danger: '#EF4444',
  success: '#22C55E',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const shadow: { card: ViewStyle; soft: ViewStyle } = {
  card: {
    shadowColor: '#9333EA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
};

export const fonts = {
  // Optional: load 'Pacifico' via expo-font for headings if you want the
  // exact web look. Falls back to system font otherwise.
  heading: 'Pacifico_400Regular',
  body: undefined,
} as const;
