// app/(tabs)/dashboard.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Card from '../../components/Card';
import Button from '../../components/Button';
import TaskProgressCard from '../../components/TaskProgressCard';
import ScheduleItem from '../../components/ScheduleItem';
import TaskModal from '../../components/TaskModal';
import MiniCalendar from '../../components/MiniCalendar';
import WeeklyBarChart from '../../components/WeeklyBarChart';

import { colors, radius, spacing, shadow } from '../../constants/theme';
import {
  user,
  projectCards,
  weeklyChartData,
  assignments,
  initialSchedule,
  batchmates,
} from '../../constants/mockData';
import { ScheduleEntry } from '../../constants/types';

// Wraps each TaskProgressCard with:
// 1. A staggered fade + slide-up entrance when the dashboard mounts
// 2. A subtle scale-down "press" animation for tactile feedback on tap
function AnimatedProjectCard({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay: index * 90, // stagger each card's entrance
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay: index * 90,
        friction: 7,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      friction: 6,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          opacity,
          transform: [{ translateY }, { scale }],
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(initialSchedule);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ScheduleEntry | null>(null);
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const monthName = new Date().toLocaleString('default', { month: 'long' });

  const openAddModal = (): void => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item: ScheduleEntry): void => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const handleDelete = (id: string): void => {
    setSchedule((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = ({ title, time }: { title: string; time: string }): void => {
    if (editingItem) {
      setSchedule((prev) =>
        prev.map((s) => (s.id === editingItem.id ? { ...s, title, time } : s))
      );
    } else {
      setSchedule((prev) => [
        ...prev,
        { id: Date.now().toString(), title, time },
      ]);
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>
              Hi, <Text style={styles.greetingName}>{user.fullName}</Text>
            </Text>
            <Text style={styles.subGreeting}>Lets finish your task today</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/settings')}>
            <Ionicons name="notifications-outline" size={26} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Today's Task Hero Card */}
        <Card style={styles.heroCard}>
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>{"Today's Task"}</Text>
            <Text style={styles.heroSubtitle}>
              Check your daily tasks and schedules
            </Text>
            <Button
              title="Today's Schedule"
              onPress={() => router.push('/(tabs)/track')}
              style={{ width: 180, marginTop: spacing.sm }}
            />
          </View>
          <Image
            source={require('../../assets/images/hero.jpg')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </Card>

        {/* Project Progress Cards - horizontal scroll */}
        <Animated.View
          style={[styles.cardsSectionHeader, { opacity: headerOpacity }]}
        >
          <Text style={styles.sectionTitle}>Your Projects</Text>
          <Text style={styles.cardsCount}>{projectCards.length} active</Text>
        </Animated.View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
          contentContainerStyle={styles.cardsRow}
          decelerationRate="fast"
          snapToInterval={166} // cardItem width (150) + gap (spacing.sm = 16)
          snapToAlignment="start"
        >
          {projectCards.map((p, index) => (
            <AnimatedProjectCard key={p.id} index={index}>
              <View style={[styles.cardItem, shadow.soft]}>
                <TaskProgressCard
                  title={p.title}
                  progress={p.progress}
                  color={p.color}
                  daysLeft={p.daysLeft}
                />
              </View>
            </AnimatedProjectCard>
          ))}
        </ScrollView>

        {/* Chart */}
        <Card style={{ marginTop: spacing.lg }}>
          <Text style={styles.sectionTitle}>Tasks Progress</Text>
          <View style={{ marginTop: spacing.sm, alignItems: 'center' }}>
            <WeeklyBarChart data={weeklyChartData} />
          </View>
        </Card>

        {/* Assignments */}
        <Card style={{ marginTop: spacing.lg }}>
          <View style={styles.assignmentHeader}>
            <Text style={styles.sectionTitle}>Assignments (12)</Text>
            <Text style={styles.assignmentMeta}>2/5 completed</Text>
          </View>
          {assignments.map((a) => (
            <View key={a.id} style={styles.assignmentRow}>
              <View>
                <Text style={styles.assignmentTitle}>{a.title}</Text>
                <Text style={styles.assignmentDue}>Due: {a.due}</Text>
              </View>
              <Text style={styles.assignmentScore}>{a.score}</Text>
            </View>
          ))}
        </Card>

        {/* Profile + Calendar + Schedule */}
        <View style={[styles.purpleCard, { marginTop: spacing.lg }]}>
          <View style={styles.profileRow}>
            <Image source={user.avatar} style={styles.avatar} />
            <View>
              <Text style={styles.profileName}>{user.fullName}</Text>
              <Text style={styles.profileRole}>{user.role}</Text>
            </View>
          </View>

          <View style={styles.innerWhiteCard}>
            <View style={styles.monthRow}>
              <Text style={styles.monthText}>{monthName}</Text>
              <TouchableOpacity style={styles.addTaskBtn} onPress={openAddModal}>
                <Text style={styles.addTaskText}>+ Add Task</Text>
              </TouchableOpacity>
            </View>

            <MiniCalendar />

            <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>
              Schedule
            </Text>
            <View style={{ marginTop: spacing.sm }}>
              {schedule.length === 0 ? (
                <Text style={styles.emptyText}>No tasks scheduled yet.</Text>
              ) : (
                schedule.map((item) => (
                  <ScheduleItem
                    key={item.id}
                    title={item.title}
                    time={item.time}
                    onEdit={() => openEditModal(item)}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))
              )}
            </View>
          </View>
        </View>

        {/* Batchmates */}
        <View style={[styles.purpleCard, { marginTop: spacing.lg, marginBottom: spacing.xl }]}>
          <Text style={styles.sectionTitle}>Batchmates</Text>
          <View style={{ marginTop: spacing.sm, gap: spacing.sm }}>
            {batchmates.map((b) => (
              <View key={b.id} style={styles.batchmateRow}>
                <Image source={b.avatar} style={styles.batchmateAvatar} />
                <View>
                  <Text style={styles.batchmateName}>{b.name}</Text>
                  <Text style={styles.batchmateRole}>{b.role}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialValue={editingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  greeting: { fontSize: 18, fontWeight: '600', color: colors.text },
  greetingName: { color: colors.primary },
  subGreeting: { fontSize: 13, color: colors.primary, fontWeight: '300', marginTop: 2 },

  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  heroText: { flex: 1 },
  heroTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  heroSubtitle: { fontSize: 13, color: colors.textMuted, marginTop: spacing.xs },
  heroImage: { width: 100, height: 90, borderRadius: radius.md },

  cardsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  cardsCount: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    overflow: 'hidden',
  },

  // Horizontal scroll wrapper for project cards.
  // Negative horizontal margin + matching padding lets cards
  // bleed to the screen edge while content stays aligned with
  // the rest of the page (which has spacing.lg padding).
  cardsScroll: {
    marginTop: spacing.sm,
    marginHorizontal: -spacing.lg,
  },
  cardsRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  cardItem: {
    width: 150, // fixed width so each card is fully visible and swipeable
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },

  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.text },

  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignmentMeta: { fontSize: 12, color: colors.textMuted },
  assignmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  assignmentTitle: { fontSize: 14, fontWeight: '500', color: colors.text },
  assignmentDue: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  assignmentScore: { fontWeight: '700', color: colors.primary },

  purpleCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  profileName: { fontWeight: '600', color: colors.text },
  profileRole: { fontSize: 12, color: colors.textMuted },

  innerWhiteCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    ...shadow.soft,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthText: { fontSize: 16, fontWeight: '600', color: colors.text },
  addTaskBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.full,
  },
  addTaskText: { color: colors.white, fontSize: 11, fontWeight: '600' },
  emptyText: { fontSize: 13, color: colors.textLight, fontStyle: 'italic' },

  batchmateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: radius.full,
  },
  batchmateAvatar: { width: 40, height: 40, borderRadius: 20 },
  batchmateName: { fontWeight: '600', fontSize: 13, color: colors.text },
  batchmateRole: { fontSize: 11, color: colors.textMuted },
});