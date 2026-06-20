// constants/types.ts

export interface ProjectCard {
  id: string;
  title: string;
  progress: number; // 0–1
  color: string;
  daysLeft: number;
}

export interface ChartDataPoint {
  day: string;
  timeSpent: number;
}

export interface Assignment {
  id: string;
  title: string;
  due: string;
  score: string; // e.g. "86/100"
}

export interface ScheduleEntry {
  id: string;
  title: string;
  time: string;
}

export interface Batchmate {
  id: string;
  name: string;
  role: string;
  avatar: any; // require() image source
}

export interface User {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  avatar: any; // require() image source
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  avatar: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface OnboardingSlide {
  id: string;
  emoji: string;
  title: string;
  highlight: string;
  description: string;
  bgColor: string;
}
