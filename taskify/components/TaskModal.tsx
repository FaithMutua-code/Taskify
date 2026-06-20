// components/TaskModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native';
import Input from './Input';
import Button from './Button';
import { colors, radius, spacing } from '../constants/theme';
import { ScheduleEntry } from '../constants/types';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { title: string; time: string }) => void;
  initialValue?: ScheduleEntry | null;
}

export default function TaskModal({ visible, onClose, onSave, initialValue }: TaskModalProps) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (visible) {
      setName(initialValue?.title || '');
      setTime(initialValue?.time || '');
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    if (!name.trim() || !time.trim()) return;
    onSave({ title: name.trim(), time: time.trim() });
  };

  const stopPropagation = (e: GestureResponderEvent) => e.stopPropagation();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={stopPropagation}>
          <Text style={styles.heading}>
            {initialValue ? 'Edit Task' : 'Add New Task'}
          </Text>
          <Input placeholder="Task name" value={name} onChangeText={setName} />
          <Input
            placeholder="Time range (e.g. 2:00pm - 4:00pm)"
            value={time}
            onChangeText={setTime}
          />
          <View style={styles.buttonRow}>
            <View style={{ flex: 1, marginRight: spacing.sm }}>
              <Button title="Cancel" variant="outline" onPress={onClose} />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="Save" onPress={handleSave} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  sheet: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing.md,
    color: colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
});
