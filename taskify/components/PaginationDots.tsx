// components/PaginationDots.tsx
import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, spacing } from '../constants/theme';

interface PaginationDotsProps {
  count: number;
  scrollX: Animated.Value;
  slideWidth: number;
}

export default function PaginationDots({ count, scrollX, slideWidth }: PaginationDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: count }).map((_, i) => {
        const inputRange = [
          (i - 1) * slideWidth,
          i * slideWidth,
          (i + 1) * slideWidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { width: dotWidth, opacity },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
