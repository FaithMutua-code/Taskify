// components/OnboardingIllustration.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors, radius } from '../constants/theme';

interface OnboardingIllustrationProps {
  emoji: string;
  bgColor: string;
  size?: number;
}

export default function OnboardingIllustration({
  emoji,
  bgColor,
  size = 240,
}: OnboardingIllustrationProps) {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -14,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    float.start();
    rotate.start();

    return () => {
      float.stop();
      rotate.stop();
    };
  }, [floatAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      {/* Slow-spinning decorative ring of dots */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <View style={[styles.dotSmall, styles.dotTop]} />
        <View style={[styles.dotSmall, styles.dotRight]} />
        <View style={[styles.dotSmall, styles.dotBottom]} />
        <View style={[styles.dotSmall, styles.dotLeft]} />
      </Animated.View>

      {/* Main blob backdrop */}
      <View
        style={[
          styles.blob,
          {
            width: size * 0.78,
            height: size * 0.78,
            borderRadius: (size * 0.78) / 2,
            backgroundColor: bgColor,
          },
        ]}
      />

      {/* Floating emoji */}
      <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
        <Text style={[styles.emoji, { fontSize: size * 0.34 }]}>{emoji}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: colors.surfaceLight,
    borderStyle: 'dashed',
  },
  dotSmall: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
  },
  dotTop: { top: -5, left: '50%', marginLeft: -5 },
  dotRight: { right: -5, top: '50%', marginTop: -5 },
  dotBottom: { bottom: -5, left: '50%', marginLeft: -5 },
  dotLeft: { left: -5, top: '50%', marginTop: -5 },
  blob: {
    position: 'absolute',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  emoji: {
    textAlign: 'center',
  },
});
