import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import type { TrashAnalysisResult } from '../App';
import { parseCo2Kg } from '../lib/achievements';

export interface UserStats {
  scanCount: number;
  co2SavedKg: number;
}

export const DEFAULT_USER_STATS: UserStats = {
  scanCount: 0,
  co2SavedKg: 0,
};

interface UserStatsContextType {
  stats: UserStats;
  recordScan: (result: TrashAnalysisResult) => void;
  resetStats: () => void;
}

const UserStatsContext = createContext<UserStatsContextType | undefined>(undefined);

const STORAGE_KEY = 'userStats';

function loadStats(): UserStats {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as UserStats;
      return {
        scanCount: parsed.scanCount ?? 0,
        co2SavedKg: parsed.co2SavedKg ?? 0,
      };
    }
  } catch (error) {
    console.error('Error loading user stats:', error);
  }
  return DEFAULT_USER_STATS;
}

export function UserStatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<UserStats>(loadStats);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving user stats:', error);
    }
  }, [stats]);

  const recordScan = useCallback((result: TrashAnalysisResult) => {
    const co2Added = parseCo2Kg(result.env_impact.co2_saved);
    setStats((prev) => ({
      scanCount: prev.scanCount + 1,
      co2SavedKg: Math.round((prev.co2SavedKg + co2Added) * 10) / 10,
    }));
  }, []);

  const resetStats = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setStats(DEFAULT_USER_STATS);
  }, []);

  return (
    <UserStatsContext.Provider value={{ stats, recordScan, resetStats }}>
      {children}
    </UserStatsContext.Provider>
  );
}

export function useUserStats() {
  const context = useContext(UserStatsContext);
  if (!context) throw new Error('useUserStats must be used within UserStatsProvider');
  return context;
}
