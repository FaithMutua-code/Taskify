// app/index.tsx
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constants/theme';

const HAS_ONBOARDED_KEY = 'taskify:hasOnboarded';

export default function Index() {
  const [checking, setChecking] = useState<boolean>(true);
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const checkOnboarding = async (): Promise<void> => {
      try {
        const value = await AsyncStorage.getItem(HAS_ONBOARDED_KEY);
        setHasOnboarded(value === 'true');
      } catch {
        // If storage fails for any reason, fall back to showing onboarding.
        setHasOnboarded(false);
      } finally {
        setChecking(false);
      }
    };
    checkOnboarding();
  }, []);

  if (checking) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  // Change "/(auth)/login" to "/(tabs)/dashboard" once real auth state exists.
  return (
    <Redirect href={hasOnboarded ? '/(auth)/login' : '/(auth)/welcome'} />
  );
}
