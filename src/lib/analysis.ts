import { DayData, HabitPattern, TriggerInsight, WhatChangedItem, AnalysisResult, Recommendation, WeeklyDigest } from '@/types';

const HABIT_CONFIG = [
  { 
    key: 'dairy' as const, 
    label: 'Dairy', 
    icon: '🥛', 
    invertCorrelation: true,
    explanation: 'Dairy contains lactose and casein which may trigger inflammatory responses, leading to acne flare-ups.'
  },
  { 
    key: 'sugar' as const, 
    label: 'Sugar', 
    icon: '🍬', 
    invertCorrelation: true,
    explanation: 'High sugar intake can spike insulin levels and increase sebum production, potentially worsening acne.'
  },
  { 
    key: 'sleepQuality' as const, 
    label: 'Poor Sleep', 
    icon: '😴', 
    invertCorrelation: true, 
    condition: (d: DayData) => d.sleepQuality === 'poor',
    explanation: 'Sleep deprivation elevates cortisol levels and reduces skin repair capacity, affecting acne severity.'
  },
  { 
    key: 'stress' as const, 
    label: 'High Stress', 
    icon: '⚡', 
    invertCorrelation: true, 
    condition: (d: DayData) => d.stress === 'high',
    explanation: 'Stress triggers cortisol release, which increases sebum production and inflammatory pathways affecting skin.'
  },
  { 
    key: 'skincareDone' as const, 
    label: 'Skincare', 
    icon: '✨', 
    invertCorrelation: false,
    explanation: 'Consistent skincare routines help maintain skin barrier integrity and reduce bacterial colonization.'
  },
];

function getConfidenceLevel(confidence: number): 'weak' | 'moderate' | 'strong' | 'insufficient' {
  if (confidence < 50) return 'insufficient';
  if (confidence < 60) return 'weak';
  if (confidence < 70) return 'moderate';
  return 'strong';
}

function analyzeHabitMultiLag(
  data: DayData[],
  config: typeof HABIT_CONFIG[0],
  maxLag: number = 3
): { lag1: number; lag2: number; lag3: number } {
  const isTriggered = (day: DayData) => config.condition ? config.condition(day) : (day[config.key] as boolean);
  
  const results: { [key: number]: { worsens: number; total: number } } = {};
  
  for (let lag = 1; lag <= maxLag; lag++) {
    results[lag] = { worsens: 0, total: 0 };
    
    for (let i = 0; i < data.length - lag; i++) {
      if (isTriggered(data[i])) {
        results[lag].total++;
        const change = data[i + lag].acneSeverity - data[i].acneSeverity;
        
        if (config.invertCorrelation) {
          if (change > 0) results[lag].worsens++;
        } else {
          if (change < 0) results[lag].worsens++;
        }
      }
    }
  }
  
  return {
    lag1: results[1].total > 0 ? Math.round((results[1].worsens / results[1].total) * 100) : 0,
    lag2: results[2].total > 0 ? Math.round((results[2].worsens / results[2].total) * 100) : 0,
    lag3: results[3].total > 0 ? Math.round((results[3].worsens / results[3].total) * 100) : 0,
  };
}

function analyzeHabit(
  data: DayData[],
  config: typeof HABIT_CONFIG[0]
): HabitPattern | null {
  const isTriggered = (day: DayData) => config.condition ? config.condition(day) : (day[config.key] as boolean);

  let occurrences = 0;
  let worsenCount = 0;
  let improveCount = 0;
  let neutralCount = 0;

  for (let i = 0; i < data.length - 1; i++) {
    const today = data[i];
    const tomorrow = data[i + 1];

    if (isTriggered(today)) {
      occurrences++;
      const change = tomorrow.acneSeverity - today.acneSeverity;

      if (change > 0) worsenCount++;
      else if (change < 0) improveCount++;
      else neutralCount++;
    }
  }

  if (occurrences < 3) return null;

  const negativeCount = config.invertCorrelation ? improveCount : worsenCount;
  const positiveCount = config.invertCorrelation ? worsenCount : improveCount;

  const total = negativeCount + positiveCount + neutralCount;
  const confidence = total > 0 ? Math.round((negativeCount / total) * 100) : 0;

  let impact: 'negative' | 'positive' | 'neutral' = 'neutral';
  if (confidence >= 55) impact = 'negative';
  else if (confidence <= 45) impact = 'positive';

  const confidenceLevel = getConfidenceLevel(confidence);

  // Multi-lag analysis
  const multiLagData = analyzeHabitMultiLag(data, config);
  const strongestLag = Math.max(multiLagData.lag1, multiLagData.lag2, multiLagData.lag3);

  const descriptions = {
    dairy: `We've observed a pattern where your acne may worsen after dairy intake (${confidence}% confidence).`,
    sugar: `Sugar intake appears to have a ${confidence}% association with skin changes in your data.`,
    sleepQuality: `Poor sleep days seem to correlate with skin recovery patterns (${confidence}% confidence).`,
    stress: `High stress days show a ${confidence}% association with skin condition changes.`,
    skincareDone: `Regular skincare appears to support skin health (${confidence}% confidence).`,
  };

  return {
    habit: config.label,
    habitKey: config.key,
    icon: config.icon,
    occurrences,
    worsenCount,
    improveCount,
    confidence,
    impact,
    description: descriptions[config.key as keyof typeof descriptions],
    confidenceLevel,
    explanation: config.explanation || '',
    multiLagData: {
      ...multiLagData,
      strongestLag,
    },
  };
}

function generateRecommendations(patterns: HabitPattern[]): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // Sort by confidence to get highest impact opportunities
  const negativePatterns = patterns
    .filter(p => p.impact === 'negative' && p.confidence >= 55)
    .sort((a, b) => b.confidence - a.confidence);
  
  const positivePatterns = patterns
    .filter(p => p.impact === 'positive' && p.confidence >= 55)
    .sort((a, b) => b.confidence - a.confidence);

  // Eliminate top trigger
  if (negativePatterns.length > 0) {
    const top = negativePatterns[0];
    recommendations.push({
      id: 'eliminate-' + top.habitKey,
      title: `Try eliminating ${top.habit.toLowerCase()}`,
      description: `For 7 days, avoid ${top.habit.toLowerCase()} and track how your skin responds. Based on your data, this could reduce acne severity.`,
      habit: top.habit,
      icon: top.icon,
      impact: 'high',
      effort: 'moderate',
      reason: `Your data shows ${top.confidence}% correlation with acne worsening. This is your highest-impact opportunity.`,
    });
  }

  // Amplify top support habit
  if (positivePatterns.length > 0) {
    const top = positivePatterns[0];
    recommendations.push({
      id: 'amplify-' + top.habitKey,
      title: `Increase ${top.habit.toLowerCase()} consistency`,
      description: `You see better skin on days you maintain this habit. Aim for 100% consistency this week.`,
      habit: top.habit,
      icon: top.icon,
      impact: 'high',
      effort: 'easy',
      reason: `Your data shows ${top.confidence}% improvement correlation. This is your easiest win.`,
    });
  }

  // If we have multiple triggers, suggest tracking one
  if (negativePatterns.length > 1 && recommendations.length < 3) {
    const second = negativePatterns[1];
    recommendations.push({
      id: 'track-' + second.habitKey,
      title: `Monitor ${second.habit.toLowerCase()} impact`,
      description: `This shows a moderate pattern (${second.confidence}%). Track it closely over the next 2 weeks.`,
      habit: second.habit,
      icon: second.icon,
      impact: 'medium',
      effort: 'easy',
      reason: `Signal is moderate but worth investigating further.`,
    });
  }

  return recommendations;
}

function generateWeeklyDigest(patterns: HabitPattern[], data: DayData[]): WeeklyDigest {
  const recentWeek = data.slice(-7);
  const previousWeek = data.slice(-14, -7);

  const recentAvg = recentWeek.reduce((s, d) => s + d.acneSeverity, 0) / recentWeek.length;
  const prevAvg = previousWeek.length > 0 
    ? previousWeek.reduce((s, d) => s + d.acneSeverity, 0) / previousWeek.length 
    : recentAvg;

  const improvement = prevAvg - recentAvg;
  
  let topImprovement = 'Keep tracking consistently';
  let progressMessage = 'Your skin is holding steady';

  if (improvement > 0.3) {
    topImprovement = `Your acne improved by ${improvement.toFixed(1)} points this week!`;
    progressMessage = 'Great progress! Keep up what you\'re doing.';
  } else if (improvement < -0.3) {
    topImprovement = `Your acne worsened slightly this week`;
    progressMessage = 'Consider reviewing recent habits for triggers.';
  }

  const negativePatterns = patterns.filter(p => p.impact === 'negative').sort((a, b) => b.confidence - a.confidence);
  const topConcern = negativePatterns.length > 0 
    ? `${negativePatterns[0].habit} shows the strongest correlation with acne worsening`
    : 'No clear negative patterns yet';

  const focusPattern = negativePatterns[0] || patterns.filter(p => p.impact === 'positive')[0] || patterns[0];
  
  return {
    topImprovement,
    topConcern,
    focusHabit: focusPattern?.habit || 'Habit tracking',
    focusIcon: focusPattern?.icon || '📍',
    focusReason: focusPattern?.confidence 
      ? `Based on ${focusPattern.confidence}% correlation in your data`
      : 'To unlock more personalized insights',
    progressMessage,
  };
}

function detectTriggers(patterns: HabitPattern[]): TriggerInsight[] {
  return patterns
    .filter(p => p.confidence >= 55 && p.occurrences >= 3)
    .map(p => ({
      habit: p.habit,
      icon: p.icon,
      message: p.description,
      confidence: p.confidence,
      impact: p.impact,
    }))
    .sort((a, b) => b.confidence - a.confidence);
}

function analyzeTodaySpike(data: DayData[]): { occurred: boolean; contributors: WhatChangedItem[]; acneChange: number } {
  if (data.length < 2) return { occurred: false, contributors: [], acneChange: 0 };

  const today = data[data.length - 1];
  const yesterday = data[data.length - 2];
  const acneChange = today.acneSeverity - yesterday.acneSeverity;

  if (acneChange <= 0) return { occurred: false, contributors: [], acneChange };

  const contributors: WhatChangedItem[] = [];

  if (today.dairy) {
    contributors.push({
      habit: 'Dairy',
      icon: '🥛',
      reason: 'Dairy intake detected today',
    });
  }

  if (today.sugar) {
    contributors.push({
      habit: 'Sugar',
      icon: '🍬',
      reason: 'Sugar intake detected today',
    });
  }

  if (today.sleepQuality === 'poor') {
    contributors.push({
      habit: 'Poor Sleep',
      icon: '😴',
      reason: 'Sleep quality was poor',
    });
  }

  if (today.stress === 'high') {
    contributors.push({
      habit: 'High Stress',
      icon: '⚡',
      reason: 'Stress levels were elevated',
    });
  }

  if (!today.skincareDone) {
    contributors.push({
      habit: 'No Skincare',
      icon: '💤',
      reason: 'Skincare routine not completed',
    });
  }

  return { occurred: acneChange > 0, contributors, acneChange };
}

export function analyzeData(data: DayData[]): AnalysisResult {
  const patterns = HABIT_CONFIG
    .map(config => analyzeHabit(data, config))
    .filter((p): p is HabitPattern => p !== null);

  const triggers = detectTriggers(patterns);
  const todaySpike = analyzeTodaySpike(data);
  const scorecards = patterns.sort((a, b) => b.confidence - a.confidence);
  const recommendations = generateRecommendations(patterns);
  const weeklyDigest = generateWeeklyDigest(patterns, data);

  return { patterns, triggers, todaySpike, scorecards, recommendations, weeklyDigest };
}

export function getBaselineAcne(data: DayData[]): number {
  const total = data.reduce((sum, d) => sum + d.acneSeverity, 0);
  return Math.round((total / data.length) * 10) / 10;
}

export function getAcneTrend(data: DayData[]): 'improving' | 'worsening' | 'stable' {
  if (data.length < 7) return 'stable';

  const recent = data.slice(-7);
  const older = data.slice(-14, -7);

  const recentAvg = recent.reduce((s, d) => s + d.acneSeverity, 0) / recent.length;
  const olderAvg = older.reduce((s, d) => s + d.acneSeverity, 0) / older.length;

  const diff = recentAvg - olderAvg;
  if (diff < -0.3) return 'improving';
  if (diff > 0.3) return 'worsening';
  return 'stable';
}
