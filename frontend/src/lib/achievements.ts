import type { UserStats } from '../context/UserStatsContext';

export interface AchievementView {
  id: string;
  name: string;
  icon: string;
  desc: string;
  progress: number;
  current: number;
  target: number;
}

const ACHIEVEMENT_TARGETS = {
  ecoWarrior: 50,
  craftMaster: 20,
  influencer: 100,
  co2Saver: 50,
} as const;

export function parseCo2Kg(co2Saved: string): number {
  const match = co2Saved.replace(',', '.').match(/[\d.]+/);
  if (!match) return 0;
  const value = parseFloat(match[0]);
  return Number.isFinite(value) ? value : 0;
}

export function buildAchievements(
  stats: UserStats,
  postCount: number,
  totalLikes: number,
  totalComments: number
): AchievementView[] {
  const engagement = totalLikes + totalComments;

  const items = [
    {
      id: 'eco-warrior',
      name: 'Eco Warrior',
      icon: '⭐',
      current: stats.scanCount,
      target: ACHIEVEMENT_TARGETS.ecoWarrior,
      desc: (c: number, t: number) => `${c}/${t} item di-scan`,
    },
    {
      id: 'craft-master',
      name: 'Craft Master',
      icon: '🏆',
      current: postCount,
      target: ACHIEVEMENT_TARGETS.craftMaster,
      desc: (c: number, t: number) => `${c}/${t} craft dibuat`,
    },
    {
      id: 'influencer',
      name: 'Influencer',
      icon: '👥',
      current: engagement,
      target: ACHIEVEMENT_TARGETS.influencer,
      desc: (c: number, t: number) => `${c}/${t} interaksi (suka & komentar)`,
    },
    {
      id: 'co2-saver',
      name: 'CO2 Saver',
      icon: '🍃',
      current: Math.round(stats.co2SavedKg * 10) / 10,
      target: ACHIEVEMENT_TARGETS.co2Saver,
      desc: (c: number, t: number) => `${c}/${t} kg CO₂ dihemat`,
    },
  ];

  return items.map((item) => {
    const progress = item.target > 0 ? Math.min(100, Math.round((item.current / item.target) * 100)) : 0;
    return {
      id: item.id,
      name: item.name,
      icon: item.icon,
      current: item.current,
      target: item.target,
      progress,
      desc: item.desc(item.current, item.target),
    };
  });
}

export function getWeeklyImpact(stats: UserStats, postCount: number) {
  return [
    { val: String(Math.round(stats.co2SavedKg * 10) / 10), key: 'kg CO₂' },
    { val: String(stats.scanCount), key: 'item scan' },
    { val: String(postCount), key: 'craft' },
  ];
}
