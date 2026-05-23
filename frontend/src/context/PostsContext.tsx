import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import type { TrashType } from '../App';
import { useProfile, CURRENT_USER_ID, DEFAULT_PROFILE } from './ProfileContext';

export interface Comment {
  id: number;
  author: string;
  av: string;
  authorId?: string;
  text: string;
  time: string;
}

export interface Post {
  id: number;
  author: string;
  av: string;
  authorId?: string;
  time: string;
  type: TrashType;
  title: string;
  content: string;
  img: string;
  likes: number;
  commentList: Comment[];
  shares: number;
  liked: boolean;
}

function normalizePost(post: Post & { comments?: number }): Post {
  return {
    ...post,
    commentList: post.commentList ?? [],
  };
}

interface PostsContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  updatePost: (id: number, updates: Partial<Post>) => void;
  deletePost: (id: number) => void;
  likePost: (id: number) => void;
  addComment: (postId: number, text: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
  children: ReactNode;
  initialPosts: Post[];
}

function isCurrentUserContent(author: string, authorId?: string, profileName?: string) {
  return (
    authorId === CURRENT_USER_ID ||
    author === profileName ||
    author === DEFAULT_PROFILE.name
  );
}

export function PostsProvider({ children, initialPosts }: PostsProviderProps) {
  const { profile } = useProfile();
  const profileRef = useRef(profile);

  const [posts, setPosts] = useState<Post[]>(() => {
    // Load dari localStorage jika ada
    try {
      const saved = localStorage.getItem('posts');
      if (saved) {
        const allPosts = JSON.parse(saved) as (Post & { comments?: number })[];
        // Filter out postingan dari "Eka Pratiwi" dan "Eka_upcycle"
        return allPosts
          .filter((p) => p.author !== 'Eka Pratiwi' && p.author !== 'Eka_upcycle')
          .map(normalizePost);
      }
    } catch (error) {
      console.error('Error loading posts from localStorage:', error);
    }
    return initialPosts.map(normalizePost);
  });

  // Sync ke localStorage setiap kali posts berubah
  useEffect(() => {
    try {
      localStorage.setItem('posts', JSON.stringify(posts));
    } catch (error) {
      console.error('Error saving posts to localStorage:', error);
    }
  }, [posts]);

  // Sinkronkan nama & avatar di postingan/komentar milik user saat profil berubah
  useEffect(() => {
    const prev = profileRef.current;
    if (prev.name === profile.name && prev.av === profile.av) return;

    setPosts((current) =>
      current.map((post) => {
        if (!isCurrentUserContent(post.author, post.authorId, prev.name)) return post;
        return {
          ...post,
          authorId: CURRENT_USER_ID,
          author: profile.name,
          av: profile.av,
          commentList: post.commentList.map((c) =>
            isCurrentUserContent(c.author, c.authorId, prev.name)
              ? { ...c, authorId: CURRENT_USER_ID, author: profile.name, av: profile.av }
              : c
          ),
        };
      })
    );
    profileRef.current = profile;
  }, [profile.name, profile.av]);

  const addPost = (newPost: Omit<Post, 'id'>) => {
    const id = Math.max(...posts.map(p => p.id), 0) + 1;
    setPosts(prev => [{ ...newPost, id }, ...prev]);
  };

  const updatePost = (id: number, updates: Partial<Post>) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const likePost = (id: number) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            liked: !p.liked,
            likes: p.liked ? p.likes - 1 : p.likes + 1,
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: number, text: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p;
        const commentId = Math.max(0, ...p.commentList.map(c => c.id)) + 1;
        const newComment: Comment = {
          id: commentId,
          author: profile.name,
          av: profile.av,
          authorId: CURRENT_USER_ID,
          text,
          time: 'Baru saja',
        };
        return { ...p, commentList: [...p.commentList, newComment] };
      })
    );
  };

  const value: PostsContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
}
