import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface FollowContextType {
  followingIds: string[];
  isFollowing: (userId: string) => boolean;
  toggleFollow: (userId: string) => void;
  followingCount: number;
  getFollowerCount: (userId: string, baseFollowers: number) => number;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

const STORAGE_KEY = 'following';

function loadFollowing(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as string[];
  } catch (error) {
    console.error('Error loading following:', error);
  }
  return [];
}

export function FollowProvider({ children }: { children: ReactNode }) {
  const [followingIds, setFollowingIds] = useState<string[]>(loadFollowing);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(followingIds));
    } catch (error) {
      console.error('Error saving following:', error);
    }
  }, [followingIds]);

  const isFollowing = useCallback(
    (userId: string) => followingIds.includes(userId),
    [followingIds]
  );

  const toggleFollow = useCallback((userId: string) => {
    setFollowingIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  }, []);

  const getFollowerCount = useCallback(
    (userId: string, baseFollowers: number) =>
      baseFollowers + (followingIds.includes(userId) ? 1 : 0),
    [followingIds]
  );

  return (
    <FollowContext.Provider
      value={{
        followingIds,
        isFollowing,
        toggleFollow,
        followingCount: followingIds.length,
        getFollowerCount,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
}

export function useFollow() {
  const context = useContext(FollowContext);
  if (!context) throw new Error('useFollow must be used within FollowProvider');
  return context;
}

export function clearFollowingStorage() {
  localStorage.removeItem(STORAGE_KEY);
}
