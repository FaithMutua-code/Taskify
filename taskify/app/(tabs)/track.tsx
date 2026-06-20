// app/(tabs)/track.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import WeeklyBarChart from '../../components/WeeklyBarChart';
import { colors, spacing } from '../../constants/theme';
import { weeklyChartData, projectCards } from '../../constants/mockData';

const totalHours = weeklyChartData.reduce((sum, d) => sum + d.timeSpent, 0);
const avgHours = (totalHours / weeklyChartData.length).toFixed(1);

export default function TrackScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Track</Text>
        <Text style={styles.subheading}>See how you're spending your time this week</Text>

        <View style={styles.statsRow}>
          <Card style={styles.statCard} light>
            <Text style={styles.statValue}>{totalHours}h</Text>
            <Text style={styles.statLabel}>This week</Text>
          </Card>
          <Card style={styles.statCard} light>
            <Text style={styles.statValue}>{avgHours}h</Text>
            <Text style={styles.statLabel}>Daily average</Text>
          </Card>
        </View>

        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionTitle}>Weekly Activity</Text>
          <View style={{ marginTop: spacing.sm, alignItems: 'center' }}>
            <WeeklyBarChart data={weeklyChartData} />
          </View>
        </Card>

        <Card style={{ marginTop: spacing.lg, marginBottom: spacing.xl }}>
          <Text style={styles.sectionTitle}>Time by Project</Text>
          {projectCards.map((p) => (
            <View key={p.id} style={styles.projectRow}>
              <View style={[styles.dot, { backgroundColor: p.color }]} />
              <Text style={styles.projectName}>{p.title}</Text>
              <Text style={styles.projectPct}>{Math.round(p.progress * 100)}%</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg },
  heading: { fontSize: 24, fontWeight: '700', color: colors.text },
  subheading: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs, marginBottom: spacing.lg },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: spacing.lg },
  statValue: { fontSize: 26, fontWeight: '700', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: spacing.xs },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  projectName: { flex: 1, fontSize: 14, color: colors.text },
  projectPct: { fontWeight: '600', color: colors.primary },
});
