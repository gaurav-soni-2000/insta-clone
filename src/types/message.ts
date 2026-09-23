export interface MessageNote {
  userId: string;
  username: string;
  userAvatar: string;
  noteText: string;
  musicTitle?: string;
  musicArtist?: string;
  emojiReactions?: string;
  location?: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantUsername: string;
  participantDisplayName: string;
  participantAvatar: string;
  lastMessageText: string;
  timestamp: string;
  unread: boolean;
  unreadCount?: number;
  isStoryMention?: boolean;
  isReelShare?: boolean;
  messages: DirectMessage[];
}

