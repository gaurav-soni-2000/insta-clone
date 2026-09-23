export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  verified?: boolean;
  text: string;
  timestamp: string;
  likesCount?: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  verified: boolean;
  image: string;
  caption: string;
  location?: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  isPinned?: boolean;
  viewsCount?: string;
  aspectRatio?: number;
  comments?: Comment[];
}

