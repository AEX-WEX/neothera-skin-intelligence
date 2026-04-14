import { DayData } from '@/types';

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function getStressLevel(random: () => number): 'low' | 'medium' | 'high' {
  const val = random();
  if (val < 0.5) return 'low';
  if (val < 0.8) return 'medium';
  return 'high';
}

function getSleepQuality(random: () => number, stress: 'low' | 'medium' | 'high'): 'good' | 'poor' {
  if (stress === 'high' && random() < 0.6) return 'poor';
  if (stress === 'medium' && random() < 0.3) return 'poor';
  if (random() < 0.25) return 'poor';
  return 'good';
}

export function generateSyntheticData(days: number = 35): DayData[] {
  const data: DayData[] = [];
  const random = seededRandom(42);
  let currentAcne = 3;

  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - days + 1);

  for (let i = 0; i < days; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);

    const dairy = random() < 0.35;
    const sugar = random() < 0.45;
    const stress = getStressLevel(random);
    const sleepQuality = getSleepQuality(random, stress);
    const skincareDone = random() < 0.65;

    let acneChange = 0;
    if (dairy && random() < 0.7) acneChange += 1;
    if (dairy && random() < 0.4) acneChange += 1;
    if (sugar && random() < 0.45) acneChange += 1;
    if (sleepQuality === 'poor') {
      if (random() < 0.5) acneChange += 1;
    }
    if (stress === 'high' && random() < 0.5) acneChange += 1;
    if (stress === 'medium' && random() < 0.25) acneChange += 1;
    if (skincareDone && random() < 0.4) acneChange -= 1;

    if (random() < 0.15) acneChange += 1;
    if (random() < 0.1) acneChange -= 1;

    currentAcne = Math.max(1, Math.min(5, currentAcne + acneChange));
    if (random() < 0.08) currentAcne = Math.max(1, currentAcne - 1);
    if (random() < 0.05) currentAcne = Math.min(5, currentAcne + 1);

    data.push({
      date: formatDate(date),
      dairy,
      sugar,
      sleepQuality,
      stress,
      skincareDone,
      acneSeverity: currentAcne,
    });
  }

  return data;
}

export const syntheticData = generateSyntheticData(35);
