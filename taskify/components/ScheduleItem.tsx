// components/ScheduleItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../constants/theme';

interface ScheduleItemProps {
  title: string;
  time: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ScheduleItem({ title, time, onEdit, onDelete }: ScheduleItemProps) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text,
  },
  time: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: 4,
  },
  edit: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '500',
  },
  delete: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '500',
  },
});
