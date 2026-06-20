// app/(tabs)/projects.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { colors, spacing, radius } from '../../constants/theme';
import { projectCards } from '../../constants/mockData';
import { ProjectCard } from '../../constants/types';

export default function ProjectsScreen() {
  const renderItem: ListRenderItem<ProjectCard> = ({ item }) => (
    <Card style={styles.projectCard}>
      <View style={styles.cardTop}>
        <View style={[styles.iconWrap, { backgroundColor: item.color + '22' }]}>
          <Ionicons name="folder" size={20} color={item.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.projectTitle}>{item.title}</Text>
          <Text style={styles.projectDays}>{item.daysLeft} days left</Text>
        </View>
        <Text style={[styles.projectPct, { color: item.color }]}>
          {Math.round(item.progress * 100)}%
        </Text>
      </View>
      <View style={{ marginTop: spacing.md }}>
        <ProgressBar progress={item.progress} color={item.color} />
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Projects</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={projectCards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  heading: { fontSize: 24, fontWeight: '700', color: colors.text },
  addBtn: {
    backgroundColor: colors.primary,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  projectCard: { marginBottom: spacing.md },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectTitle: { fontSize: 15, fontWeight: '600', color: colors.text },
  projectDays: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  projectPct: { fontWeight: '700', fontSize: 15 },
});
