// components/ProgressBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';

interface ProgressBarProps {
  progress?: number; // 0–1
  color?: string;
  height?: number;
}

export default function ProgressBar({
  progress = 0,
  color = colors.primary,
  height = 8,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <View style={[styles.track, { height }]}>
      <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color, height }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: radius.full,
  },
});
