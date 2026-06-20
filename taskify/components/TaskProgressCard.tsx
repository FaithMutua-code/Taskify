// components/TaskProgressCard.tsx
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Card from './Card';
import ProgressBar from './ProgressBar';
import { colors, spacing } from '../constants/theme';

interface TaskProgressCardProps {
  title: string;
  progress: number; // 0–1
  color: string;
  daysLeft: number;
  style?: StyleProp<ViewStyle>;
}

export default function TaskProgressCard({
  title,
  progress,
  color,
  daysLeft,
  style,
}: TaskProgressCardProps) {
  return (
    <Card style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={{ marginTop: spacing.sm }}>
        <ProgressBar progress={progress} color={color} />
      </View>
      <Text style={styles.progressText}>Progress: {Math.round(progress * 100)}%</Text>
      <Text style={styles.daysText}>{daysLeft} days left</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  progressText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  daysText: {
    fontSize: 12,
    color: colors.textLight,
  },
});
