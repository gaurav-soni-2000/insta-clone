export interface Reel {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  verified: boolean;
  videoUrl: string;
  thumbnail: string;
  caption: string;
  audioTrack: {
    title: string;
    artist: string;
  };
  likes: number;
  commentsCount: number;
  sharesCount: number;
  viewsText: string;
}

