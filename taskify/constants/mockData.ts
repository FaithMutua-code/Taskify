// constants/mockData.ts
// Mirrors the static/demo data that was hardcoded in the original HTML.
// Swap these out for real API calls later.

import {
  User,
  ProjectCard,
  ChartDataPoint,
  Assignment,
  ScheduleEntry,
  Batchmate,
  OnboardingSlide,
} from './types';

export const user: User = {
  firstName: 'Kim',
  lastName: 'Namjoon',
  fullName: 'Kim Namjoon',
  role: 'UI/UX Designer',
  avatar: require('../assets/images/avator.jpg'),
};

export const projectCards: ProjectCard[] = [
  { id: '1', title: 'Web Dashboard', progress: 0.9, color: '#6a0dad', daysLeft: 3 },
  { id: '2', title: 'Mobile App', progress: 0.3, color: '#ec4899', daysLeft: 15 },
  { id: '3', title: 'Animation', progress: 0.75, color: '#9333EA', daysLeft: 7 },
];

export const weeklyChartData: ChartDataPoint[] = [
  { day: 'Mon', timeSpent: 4 },
  { day: 'Tue', timeSpent: 6 },
  { day: 'Wed', timeSpent: 7 },
  { day: 'Thur', timeSpent: 8 },
  { day: 'Fri', timeSpent: 5 },
  { day: 'Sat', timeSpent: 4 },
  { day: 'Sun', timeSpent: 6 },
];

export const assignments: Assignment[] = [
  { id: '1', title: 'Colour Theory', due: '05/10/2024', score: '86/100' },
  { id: '2', title: 'Design System', due: '06/10/2024', score: '90/100' },
  { id: '3', title: 'Prototyping', due: '10/10/2024', score: '80/100' },
];

export const initialSchedule: ScheduleEntry[] = [
  { id: '1', title: 'UI Motion', time: '10:00am - 12:00pm' },
  { id: '2', title: 'UI Design', time: '12:00pm - 02:00pm' },
];

export const batchmates: Batchmate[] = [
  { id: '1', name: 'Rinsen Jey', role: 'UX Designer', avatar: require('../assets/images/avator.jpg') },
  { id: '2', name: 'Kim Jee yong', role: 'UI Designer', avatar: require('../assets/images/avator.jpg') },
  { id: '3', name: 'Kim Beo yong', role: 'UX/UI Designer', avatar: require('../assets/images/avator.jpg') },
];

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    emoji: '✨',
    title: 'Plan it',
    highlight: 'beautifully',
    description: 'Organize every project, task, and deadline in one cozy purple workspace.',
    bgColor: '#F3E8FF',
  },
  {
    id: '2',
    emoji: '⏱️',
    title: 'Track it',
    highlight: 'effortlessly',
    description: 'Watch your progress grow with friendly charts and a calendar that just gets you.',
    bgColor: '#EDE4FF',
  },
  {
    id: '3',
    emoji: '🚀',
    title: 'Crush it',
    highlight: 'together',
    description: 'Stay in sync with your team and celebrate every task you check off.',
    bgColor: '#E9D5FF',
  },
];
