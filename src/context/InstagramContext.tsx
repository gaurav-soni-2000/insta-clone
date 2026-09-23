import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';
import { Post, Comment } from '../types/post';
import { UserStory, Highlight } from '../types/story';
import { Reel } from '../types/reel';
import { Conversation, MessageNote, DirectMessage } from '../types/message';

import initialUsersData from '../data/users.json';
import initialPostsData from '../data/posts.json';
import initialStoriesData from '../data/stories.json';
import initialHighlightsData from '../data/highlights.json';
import initialReelsData from '../data/reels.json';
import initialMessagesData from '../data/messages.json';
import initialFollowersData from '../data/followers.json';
import initialFollowingData from '../data/following.json';

interface InstagramContextType {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  stories: UserStory[];
  highlights: Highlight[];
  reels: Reel[];
  conversations: Conversation[];
  notes: MessageNote[];
  likedPostIds: Set<string>;
  savedPostIds: Set<string>;
  
  // Actions
  login: (username: string, password: string) => { success: boolean; message?: string };
  loginAsUser: (userIdOrUsername: string) => boolean;
  logout: () => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  toggleFollowUser: (targetUserId: string) => void;
  addComment: (postId: string, text: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  updateCurrentUser: (updated: Partial<User>) => void;
  getUserById: (userId: string) => User | undefined;
  getUserPosts: (userId: string) => Post[];
  getUserHighlights: (userId: string) => Highlight[];
  getUserFollowers: (userId: string) => User[];
  getUserFollowing: (userId: string) => User[];
  isFollowing: (targetUserId: string) => boolean;
}

const InstagramContext = createContext<InstagramContextType | undefined>(undefined);

const STORAGE_KEY_USER_ID = '@insta_current_user_id';
const STORAGE_KEY_LIKES = '@insta_liked_posts';
const STORAGE_KEY_SAVES = '@insta_saved_posts';
const STORAGE_KEY_FOLLOWING = '@insta_following_map';

export const InstagramProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsersData as User[]);
  const [currentUser, setCurrentUser] = useState<User | null>(initialUsersData[0] as User);
  const [posts, setPosts] = useState<Post[]>(initialPostsData as Post[]);
  const [stories, setStories] = useState<UserStory[]>(initialStoriesData as UserStory[]);
  const [highlights, setHighlights] = useState<Highlight[]>(initialHighlightsData as Highlight[]);
  const [reels, setReels] = useState<Reel[]>(initialReelsData as Reel[]);
  const [conversations, setConversations] = useState<Conversation[]>(initialMessagesData.conversations as Conversation[]);
  const [notes, setNotes] = useState<MessageNote[]>(initialMessagesData.notes as MessageNote[]);
  
  const [followersMap, setFollowersMap] = useState<Record<string, string[]>>(initialFollowersData as Record<string, string[]>);
  const [followingMap, setFollowingMap] = useState<Record<string, string[]>>(initialFollowingData as Record<string, string[]>);
  
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set());
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());

  // Load persisted state on startup
  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem(STORAGE_KEY_USER_ID);
        if (storedUserId) {
          const matched = (initialUsersData as User[]).find(u => u.id === storedUserId || u.username === storedUserId);
          if (matched) {
            setCurrentUser(matched);
          }
        }
        const storedLikes = await AsyncStorage.getItem(STORAGE_KEY_LIKES);
        if (storedLikes) {
          setLikedPostIds(new Set(JSON.parse(storedLikes)));
        }
        const storedSaves = await AsyncStorage.getItem(STORAGE_KEY_SAVES);
        if (storedSaves) {
          setSavedPostIds(new Set(JSON.parse(storedSaves)));
        }
        const storedFollowing = await AsyncStorage.getItem(STORAGE_KEY_FOLLOWING);
        if (storedFollowing) {
          setFollowingMap(JSON.parse(storedFollowing));
        }
      } catch (e) {
        console.warn('Error reading from AsyncStorage', e);
      }
    })();
  }, []);

  const login = (usernameInput: string, passwordInput: string): { success: boolean; message?: string } => {
    const cleanUsername = usernameInput.trim().toLowerCase();
    const cleanPassword = passwordInput.trim();

    const matchedUser = users.find(
      u => u.username.toLowerCase() === cleanUsername || (u.id && u.id.toLowerCase() === cleanUsername)
    );

    if (!matchedUser) {
      return { success: false, message: 'The username you entered doesn\'t appear to belong to an account. Please check your username and try again.' };
    }

    if (matchedUser.password && matchedUser.password !== cleanPassword) {
      return { success: false, message: 'Sorry, your password was incorrect. Please double-check your password.' };
    }

    setCurrentUser(matchedUser);
    AsyncStorage.setItem(STORAGE_KEY_USER_ID, matchedUser.id);
    return { success: true };
  };

  const loginAsUser = (userIdOrUsername: string): boolean => {
    const clean = userIdOrUsername.trim().toLowerCase();
    const matched = users.find(u => u.id.toLowerCase() === clean || u.username.toLowerCase() === clean);
    if (matched) {
      setCurrentUser(matched);
      AsyncStorage.setItem(STORAGE_KEY_USER_ID, matched.id);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    AsyncStorage.removeItem(STORAGE_KEY_USER_ID);
  };

  const toggleLikePost = (postId: string) => {
    setLikedPostIds(prev => {
      const next = new Set(prev);
      const isCurrentlyLiked = next.has(postId);
      if (isCurrentlyLiked) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      AsyncStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(Array.from(next)));
      
      // Update like count in posts
      setPosts(currentPosts =>
        currentPosts.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              likes: isCurrentlyLiked ? Math.max(0, p.likes - 1) : p.likes + 1,
            };
          }
          return p;
        })
      );
      return next;
    });
  };

  const toggleSavePost = (postId: string) => {
    setSavedPostIds(prev => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      AsyncStorage.setItem(STORAGE_KEY_SAVES, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const toggleFollowUser = (targetUserId: string) => {
    if (!currentUser || currentUser.id === targetUserId) return;
    
    setFollowingMap(prevMap => {
      const currentFollowing = prevMap[currentUser.id] || [];
      const isCurrentlyFollowing = currentFollowing.includes(targetUserId);
      const nextFollowing = isCurrentlyFollowing
        ? currentFollowing.filter(id => id !== targetUserId)
        : [...currentFollowing, targetUserId];

      const newMap = { ...prevMap, [currentUser.id]: nextFollowing };
      AsyncStorage.setItem(STORAGE_KEY_FOLLOWING, JSON.stringify(newMap));

      // Also update followers map for the target user
      setFollowersMap(prevFollowers => {
        const targetFollowers = prevFollowers[targetUserId] || [];
        const nextTargetFollowers = isCurrentlyFollowing
          ? targetFollowers.filter(id => id !== currentUser.id)
          : [...targetFollowers, currentUser.id];
        return { ...prevFollowers, [targetUserId]: nextTargetFollowers };
      });

      // Update current user stats and target user stats in state
      setUsers(currentUsers =>
        currentUsers.map(u => {
          if (u.id === currentUser.id) {
            return {
              ...u,
              stats: {
                ...u.stats,
                following: nextFollowing.length,
              },
            };
          }
          if (u.id === targetUserId) {
            return {
              ...u,
              stats: {
                ...u.stats,
                followers: isCurrentlyFollowing ? Math.max(0, u.stats.followers - 1) : u.stats.followers + 1,
              },
            };
          }
          return u;
        })
      );

      // Also update currentUser object
      setCurrentUser(prevUser => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          stats: {
            ...prevUser.stats,
            following: nextFollowing.length,
          },
        };
      });

      return newMap;
    });
  };

  const addComment = (postId: string, text: string) => {
    if (!currentUser || !text.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.profileImage,
      verified: currentUser.verified,
      text: text.trim(),
      timestamp: 'Just now',
      likesCount: 0,
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [newComment, ...(p.comments || [])],
          };
        }
        return p;
      })
    );
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!currentUser || !text.trim()) return;

    const newMsg: DirectMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: 'Just now',
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessageText: text.trim(),
            timestamp: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  const updateCurrentUser = (updated: Partial<User>) => {
    if (!currentUser) return;
    const merged = { ...currentUser, ...updated };
    setCurrentUser(merged);
    setUsers(prev => prev.map(u => (u.id === merged.id ? merged : u)));
  };

  const getUserById = (userId: string): User | undefined => {
    return users.find(u => u.id === userId || u.username === userId);
  };

  const getUserPosts = (userId: string): Post[] => {
    const user = getUserById(userId);
    if (!user) return [];
    return posts.filter(p => p.userId === user.id || p.username === user.username);
  };

  const getUserHighlights = (userId: string): Highlight[] => {
    const user = getUserById(userId);
    if (!user) return [];
    return highlights.filter(h => h.userId === user.id);
  };

  const getUserFollowers = (userId: string): User[] => {
    const user = getUserById(userId);
    if (!user) return [];
    const followerIds = followersMap[user.id] || [];
    return followerIds.map(id => getUserById(id)).filter(Boolean) as User[];
  };

  const getUserFollowing = (userId: string): User[] => {
    const user = getUserById(userId);
    if (!user) return [];
    const followingIds = followingMap[user.id] || [];
    return followingIds.map(id => getUserById(id)).filter(Boolean) as User[];
  };

  const isFollowing = (targetUserId: string): boolean => {
    if (!currentUser) return false;
    const currentFollowing = followingMap[currentUser.id] || [];
    return currentFollowing.includes(targetUserId);
  };

  return (
    <InstagramContext.Provider
      value={{
        currentUser,
        users,
        posts,
        stories,
        highlights,
        reels,
        conversations,
        notes,
        likedPostIds,
        savedPostIds,
        login,
        loginAsUser,
        logout,
        toggleLikePost,
        toggleSavePost,
        toggleFollowUser,
        addComment,
        sendMessage,
        updateCurrentUser,
        getUserById,
        getUserPosts,
        getUserHighlights,
        getUserFollowers,
        getUserFollowing,
        isFollowing,
      }}
    >
      {children}
    </InstagramContext.Provider>
  );
};

export const useInstagram = (): InstagramContextType => {
  const context = useContext(InstagramContext);
  if (!context) {
    throw new Error('useInstagram must be used within an InstagramProvider');
  }
  return context;
};

