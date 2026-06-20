// app/(tabs)/reports.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { colors, spacing } from '../../constants/theme';
import { assignments } from '../../constants/mockData';

const scores: number[] = assignments.map((a) => parseInt(a.score.split('/')[0], 10));
const average: number = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Reports</Text>
        <Text style={styles.subheading}>Your performance overview</Text>

        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Average Score</Text>
          <Text style={styles.summaryValue}>{average}/100</Text>
          <View style={{ marginTop: spacing.sm }}>
            <ProgressBar progress={average / 100} color={colors.primary} height={10} />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Assignments ({assignments.length})
        </Text>

        {assignments.map((a) => {
          const score = parseInt(a.score.split('/')[0], 10);
          return (
            <Card key={a.id} style={styles.assignmentCard}>
              <View style={styles.assignmentTop}>
                <Text style={styles.assignmentTitle}>{a.title}</Text>
                <Text style={styles.assignmentScore}>{a.score}</Text>
              </View>
              <Text style={styles.assignmentDue}>Due: {a.due}</Text>
              <View style={{ marginTop: spacing.sm }}>
                <ProgressBar
                  progress={score / 100}
                  color={score >= 85 ? colors.success : colors.primary}
                />
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  heading: { fontSize: 24, fontWeight: '700', color: colors.text },
  subheading: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs, marginBottom: spacing.lg },
  summaryCard: { backgroundColor: colors.primary },
  summaryLabel: { color: '#E9D5FF', fontSize: 13 },
  summaryValue: { color: colors.white, fontSize: 32, fontWeight: '700', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  assignmentCard: { marginBottom: spacing.md },
  assignmentTop: { flexDirection: 'row', justifyContent: 'space-between' },
  assignmentTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  assignmentScore: { fontWeight: '700', color: colors.primary },
  assignmentDue: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
