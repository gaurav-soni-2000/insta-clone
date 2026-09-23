export interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

export interface ProfileButtons {
  showEditProfile?: boolean;
  showShareProfile?: boolean;
  showMessage?: boolean;
  showFollow?: boolean;
}

export interface UserNote {
  text: string;
  musicTitle?: string;
  musicArtist?: string;
  location?: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  password?: string;
  bio?: string;
  website?: string;
  profileImage: string;
  verified: boolean;
  note?: UserNote;
  category?: string;
  professionalDashboard?: {
    viewsText: string;
    period: string;
  };
  tags?: string[];
  stats: ProfileStats;
  buttons?: ProfileButtons;
  isPrivate?: boolean;
}

