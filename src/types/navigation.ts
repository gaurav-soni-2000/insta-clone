import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  HomeTab: undefined;
  ReelsTab: undefined;
  MessagesTab: undefined;
  SearchTab: undefined;
  ProfileTab: undefined;
  CreateTab?: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  UserProfile: { userId: string };
  PostDetail: { postId: string };
  StoryViewer: { initialUserIndex?: number; userId?: string };
  HighlightViewer: { highlightId: string };
  DirectMessages: undefined;
  Chat: { conversationId: string; participantUsername: string; participantAvatar: string };
  Followers: { userId: string; initialTab?: 'followers' | 'following' };
  Following: { userId: string };
  Settings: undefined;
  EditProfile: undefined;
};

