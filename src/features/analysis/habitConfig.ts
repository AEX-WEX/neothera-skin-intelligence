/**
 * Habit Analysis Configuration
 * Defines all tracked habits, their properties, and behavioral explanations
 */

import { DayData } from '@/types';

export interface HabitConfigItem {
  key: string;
  label: string;
  icon: string;
  invertCorrelation: boolean;
  condition?: (d: DayData) => boolean;
  explanation: string;
}

export const HABIT_CONFIG: HabitConfigItem[] = [
  {
    key: 'dairy',
    label: 'Dairy',
    icon: '🥛',
    invertCorrelation: true,
    explanation: 'Dairy contains lactose and casein which may trigger inflammatory responses, leading to acne flare-ups.',
  },
  {
    key: 'sugar',
    label: 'Sugar',
    icon: '🍬',
    invertCorrelation: true,
    explanation: 'High sugar intake can spike insulin levels and increase sebum production, potentially worsening acne.',
  },
  {
    key: 'sleepQuality',
    label: 'Poor Sleep',
    icon: '😴',
    invertCorrelation: true,
    condition: (d: DayData) => d.sleepQuality === 'poor',
    explanation: 'Sleep deprivation elevates cortisol levels and reduces skin repair capacity, affecting acne severity.',
  },
  {
    key: 'stress',
    label: 'High Stress',
    icon: '⚡',
    invertCorrelation: true,
    condition: (d: DayData) => d.stress === 'high',
    explanation: 'Stress triggers cortisol release, which increases sebum production and inflammatory pathways affecting skin.',
  },
  {
    key: 'skincareDone',
    label: 'Skincare',
    icon: '✨',
    invertCorrelation: false,
    explanation: 'Consistent skincare routines help maintain skin barrier integrity and reduce bacterial colonization.',
  },
];
