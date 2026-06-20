// app/(tabs)/settings.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import { colors, spacing } from '../../constants/theme';
import { user } from '../../constants/mockData';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface SettingsItem {
  icon: IoniconName;
  label: string;
}

const SETTINGS_ITEMS: SettingsItem[] = [
  { icon: 'person-outline', label: 'Edit Profile' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'lock-closed-outline', label: 'Privacy & Security' },
  { icon: 'color-palette-outline', label: 'Appearance' },
  { icon: 'language-outline', label: 'Language' },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Settings</Text>

        <Card style={styles.profileCard}>
          <Image source={user.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user.fullName}</Text>
            <Text style={styles.role}>{user.role}</Text>
          </View>
        </Card>

        <Card style={{ marginTop: spacing.lg, padding: 0 }}>
          {SETTINGS_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.row,
                idx !== SETTINGS_ITEMS.length - 1 && styles.rowBorder,
              ]}
            >
              <Ionicons name={item.icon} size={20} color={colors.primary} />
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity
          style={styles.supportLink}
          onPress={() => router.push('/(tabs)/support')}
        >
          <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
          <Text style={styles.supportLinkText}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  heading: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.lg },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  role: { fontSize: 13, color: colors.textMuted },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { flex: 1, fontSize: 14, color: colors.text },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
  },
  supportLinkText: { color: colors.primary, fontWeight: '500' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
  },
  logoutText: { color: colors.danger, fontWeight: '500' },
});
