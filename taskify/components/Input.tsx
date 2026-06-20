// components/Input.tsx
import React from 'react';
import { TextInput, StyleSheet, TextInputProps, StyleProp, TextStyle } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

interface InputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export default function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      placeholderTextColor={colors.textLight}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    marginBottom: spacing.sm,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.white,
  },
});
