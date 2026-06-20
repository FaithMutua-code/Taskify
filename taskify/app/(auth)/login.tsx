// app/(auth)/login.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { colors, radius, spacing, shadow } from '../../constants/theme';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/(tabs)/dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.illustrationWrap}>
          <Image
            source={require('../../assets/images/logincute.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Login</Text>

          <Input
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Login"
            onPress={handleLogin}
          />

          <Text style={styles.footerText}>
            New here?
          </Text>

          <Button
            title="Create Workspace"
            variant="outline"
            onPress={() => router.push('/(auth)/signup')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },

  illustrationWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  illustration: {
    width: 220,
    height: 220,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xl,
    ...shadow.card,
  },

  heading: {
    fontSize: 26,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  footerText: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.textMuted,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
  },
});