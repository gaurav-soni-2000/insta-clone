import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useInstagram } from '../context/InstagramContext';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { UserProfileScreen } from '../screens/sub/UserProfileScreen';
import { PostDetailScreen } from '../screens/sub/PostDetailScreen';
import { StoryViewerScreen } from '../screens/sub/StoryViewerScreen';
import { HighlightViewerScreen } from '../screens/sub/HighlightViewerScreen';
import { DirectMessagesScreen } from '../screens/sub/DirectMessagesScreen';
import { ChatScreen } from '../screens/sub/ChatScreen';
import { FollowersScreen } from '../screens/sub/FollowersScreen';
import { SettingsScreen } from '../screens/sub/SettingsScreen';
import { EditProfileScreen } from '../screens/sub/EditProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { currentUser } = useInstagram();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
          animation: 'slide_from_right',
        }}
      >
        {!currentUser ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ animation: 'fade' }}
          />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen
              name="StoryViewer"
              component={StoryViewerScreen}
              options={{ animation: 'fade', presentation: 'fullScreenModal' }}
            />
            <Stack.Screen
              name="HighlightViewer"
              component={HighlightViewerScreen}
              options={{ animation: 'fade', presentation: 'fullScreenModal' }}
            />
            <Stack.Screen name="DirectMessages" component={DirectMessagesScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Followers" component={FollowersScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

