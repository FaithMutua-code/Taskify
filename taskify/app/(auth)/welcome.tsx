// app/(auth)/welcome.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingIllustration from '../../components/OnboardingIllustration';
import PaginationDots from '../../components/PaginationDots';
import { colors, radius, spacing } from '../../constants/theme';
import { onboardingSlides } from '../../constants/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HAS_ONBOARDED_KEY = 'taskify:hasOnboarded';

export default function WelcomeScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<Animated.FlatList<any>>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isLastSlide = activeIndex === onboardingSlides.length - 1;

  const goToAuth = (): void => {
    AsyncStorage.setItem(HAS_ONBOARDED_KEY, 'true').catch(() => {
      // Non-fatal: worst case onboarding shows again next launch.
    });
    router.replace('/(auth)/login');
  };

  const handleNext = (): void => {
    if (isLastSlide) {
      goToAuth();
      return;
    }
    scrollRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Skip */}
      {!isLastSlide && (
        <TouchableOpacity style={styles.skipBtn} onPress={goToAuth}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <Animated.FlatList
        ref={scrollRef}
        data={onboardingSlides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
            <View style={styles.illustrationWrap}>
              <OnboardingIllustration emoji={item.emoji} bgColor={item.bgColor} />
            </View>

            <View style={styles.textWrap}>
              <Text style={styles.title}>
                {item.title}{' '}
                <Text style={styles.titleHighlight}>{item.highlight}</Text>
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <PaginationDots
          count={onboardingSlides.length}
          scrollX={scrollX}
          slideWidth={SCREEN_WIDTH}
        />

        <TouchableOpacity
          style={[styles.nextBtn, isLastSlide && styles.nextBtnWide]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          {isLastSlide ? (
            <Text style={styles.nextBtnTextWide}>Get Started</Text>
          ) : (
            <Ionicons name="arrow-forward" size={22} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>

      {isLastSlide && (
        <TouchableOpacity style={styles.loginLink} onPress={goToAuth}>
          <Text style={styles.loginLinkText}>
            Already have an account? <Text style={styles.loginLinkBold}>Log in</Text>
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipBtn: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  skipText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  illustrationWrap: {
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
  },
  textWrap: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  titleHighlight: {
    color: colors.primary,
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 22,
    maxWidth: 300,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  nextBtn: {
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  nextBtnWide: {
    width: 'auto',
    paddingHorizontal: spacing.xl,
  },
  nextBtnTextWide: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  loginLink: {
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  loginLinkText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  loginLinkBold: {
    color: colors.primary,
    fontWeight: '700',
  },
});
