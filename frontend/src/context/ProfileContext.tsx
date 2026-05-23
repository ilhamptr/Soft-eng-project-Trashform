import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

export const CURRENT_USER_ID = 'me';

export interface UserProfile {
  name: string;
  username: string;
  location: string;
  bio: string;
  avatar: string | null;
  av: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  name: 'EEVEE',
  username: '@eeve_berkarya',
  location: 'Jakarta Selatan',
  bio: 'Mengubah sampah jadi karya bernilai. Eco warrior sejak 2022. Berbagi tips upcycling setiap hari.',
  avatar: null,
  av: 'EV',
};

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function normalizeUsername(username: string): string {
  const trimmed = username.trim();
  if (!trimmed) return DEFAULT_PROFILE.username;
  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
}

export function usernameDisplay(username: string): string {
  return username.startsWith('@') ? username.slice(1) : username;
}

function buildProfile(data: Partial<UserProfile>): UserProfile {
  const name = data.name?.trim() || DEFAULT_PROFILE.name;
  return {
    name,
    username: data.username !== undefined ? normalizeUsername(data.username) : DEFAULT_PROFILE.username,
    location: data.location?.trim() || DEFAULT_PROFILE.location,
    bio: data.bio ?? DEFAULT_PROFILE.bio,
    avatar: data.avatar ?? null,
    av: getInitials(name),
  };
}

export type ProfileUpdate = {
  name?: string;
  username?: string;
  location?: string;
  bio?: string;
  avatar?: string | null;
};

interface ProfileContextType {
  profile: UserProfile;
  isLoggedIn: boolean;
  sessionKey: number;
  updateProfile: (updates: ProfileUpdate) => void;
  logout: () => void;
  login: () => void;
  isOwnPost: (author: string, authorId?: string) => boolean;
  isOwnComment: (author: string, authorId?: string) => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') !== 'false');
  const [sessionKey, setSessionKey] = useState(0);
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) return buildProfile(JSON.parse(saved));
    } catch (error) {
      console.error('Error loading profile:', error);
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    if (!isLoggedIn) return;
    try {
      localStorage.setItem('userProfile', JSON.stringify(profile));
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }, [profile, isLoggedIn]);

  const isOwnPost = useCallback(
    (author: string, authorId?: string) =>
      authorId === CURRENT_USER_ID ||
      author === profile.name ||
      author === DEFAULT_PROFILE.name,
    [profile.name]
  );

  const isOwnComment = isOwnPost;

  const updateProfile = (updates: ProfileUpdate) => {
    setProfile((prev) =>
      buildProfile({
        ...prev,
        ...updates,
        name: updates.name !== undefined ? updates.name : prev.name,
        username: updates.username !== undefined ? updates.username : prev.username,
        location: updates.location !== undefined ? updates.location : prev.location,
        bio: updates.bio !== undefined ? updates.bio : prev.bio,
        avatar: updates.avatar !== undefined ? updates.avatar : prev.avatar,
      })
    );
  };

  const logout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('posts');
    localStorage.removeItem('userStats');
    localStorage.removeItem('following');
    localStorage.setItem('isLoggedIn', 'false');
    setProfile(DEFAULT_PROFILE);
    setIsLoggedIn(false);
    setSessionKey((k) => k + 1);
  };

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  return (
    <ProfileContext.Provider
      value={{ profile, isLoggedIn, sessionKey, updateProfile, logout, login, isOwnPost, isOwnComment }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
}
