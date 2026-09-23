export interface StoryItem {
  id: string;
  image: string;
  timestamp: string;
  duration?: number; // duration in ms, default ~5000
}

export interface UserStory {
  userId: string;
  username: string;
  userAvatar: string;
  hasUnseenStory: boolean;
  stories: StoryItem[];
}

export interface Highlight {
  id: string;
  userId: string;
  title: string;
  coverImage: string;
  emoji?: string;
  stories: StoryItem[];
}

