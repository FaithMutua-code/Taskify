// app/(tabs)/support.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import { colors, spacing, radius } from '../../constants/theme';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  { q: 'How do I add a new task?', a: 'Tap "+ Add Task" on your Dashboard profile card.' },
  { q: 'How do I track project progress?', a: 'Visit the Track tab for weekly breakdowns.' },
  { q: 'Can I edit my profile photo?', a: 'Go to Settings → Edit Profile.' },
];

export default function SupportScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Support</Text>
        <Text style={styles.subheading}>We're here to help</Text>

        <Card style={styles.contactCard}>
          <Ionicons name="mail-outline" size={22} color={colors.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.contactTitle}>Email us</Text>
            <Text style={styles.contactSubtitle}>support@taskify.app</Text>
          </View>
          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => Linking.openURL('mailto:support@taskify.app')}
          >
            <Text style={styles.contactBtnText}>Send</Text>
          </TouchableOpacity>
        </Card>

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Frequently Asked Questions
        </Text>

        {FAQS.map((item) => (
          <Card key={item.q} style={styles.faqCard}>
            <Text style={styles.faqQ}>{item.q}</Text>
            <Text style={styles.faqA}>{item.a}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  heading: { fontSize: 24, fontWeight: '700', color: colors.text },
  subheading: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs, marginBottom: spacing.lg },
  contactCard: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  contactTitle: { color: colors.white, fontWeight: '600' },
  contactSubtitle: { color: '#E9D5FF', fontSize: 12 },
  contactBtn: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.sm,
  },
  contactBtnText: { color: colors.primary, fontWeight: '600', fontSize: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  faqCard: { marginBottom: spacing.sm },
  faqQ: { fontSize: 14, fontWeight: '600', color: colors.text },
  faqA: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs },
});
