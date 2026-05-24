import type { Post } from '../context/PostsContext';
import { CURRENT_USER_ID } from '../context/ProfileContext';

export interface AppUser {
  id: string;
  name: string;
  av: string;
  username: string;
  location: string;
  bio: string;
  avatar: string | null;
  baseFollowers: number;
  baseFollowing: number;
}

export const MOCK_USERS: AppUser[] = [
  {
    id: 'gojo-sitorus',
    name: 'Gojo Sitorus',
    av: 'GS',
    username: '@gojo_upcycle',
    location: 'Jakarta Pusat',
    bio: 'Spesialis daur ulang botol plastik jadi dekorasi rumah.',
    avatar: null,
    baseFollowers: 1240,
    baseFollowing: 312,
  },
  {
    id: 'windah-barusadar',
    name: 'Windah Barusadar',
    av: 'WB',
    username: '@windah_craft',
    location: 'Bandung',
    bio: 'Eksperimen craft dari barang bekas setiap minggu.',
    avatar: null,
    baseFollowers: 890,
    baseFollowing: 201,
  },
  {
    id: 'green-ninja',
    name: 'Green ninja',
    av: 'GN',
    username: '@green_ninja',
    location: 'Surabaya',
    bio: 'Zero waste advocate · kardus · kayu · logam bekas.',
    avatar: null,
    baseFollowers: 4520,
    baseFollowing: 98,
  },
];

export function authorToUserId(author: string): string {
  return author.trim().toLowerCase().replace(/\s+/g, '-');
}

export function getUserById(userId: string): AppUser | null {
  if (userId === 'me') return null;
  return MOCK_USERS.find((u) => u.id === userId) ?? null;
}

export function getUserByAuthorName(author: string): AppUser | null {
  const id = authorToUserId(author);
  return getUserById(id);
}

export function resolveProfileUserId(author: string, authorId?: string): string {
  if (authorId === CURRENT_USER_ID) return 'me';
  const mock = getUserByAuthorName(author);
  if (mock) return mock.id;
  return authorToUserId(author);
}

export function getPostsForUser(
  posts: Post[],
  userId: string,
  currentUserName: string,
  isOwnPost: (author: string, authorId?: string) => boolean
): Post[] {
  if (userId === 'me') {
    return posts.filter((p) => isOwnPost(p.author, p.authorId));
  }
  const user = getUserById(userId);
  if (!user) return [];
  return posts.filter((p) => p.author === user.name && p.authorId !== CURRENT_USER_ID);
}
