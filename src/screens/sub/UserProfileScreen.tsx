import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileStats } from '../../components/profile/ProfileStats';
import { ProfileBio } from '../../components/profile/ProfileBio';
import { ProfileHighlights } from '../../components/profile/ProfileHighlights';
import { ProfileTabs, ProfileTabType } from '../../components/profile/ProfileTabs';
import { PostGrid } from '../../components/profile/PostGrid';
import { Post } from '../../types/post';
import { Highlight } from '../../types/story';
import { RootStackParamList } from '../../types/navigation';

type RouteProps = RouteProp<RootStackParamList, 'UserProfile'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const UserProfileScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { userId } = route.params;

  const {
    currentUser,
    getUserById,
    getUserPosts,
    getUserHighlights,
    isFollowing,
    toggleFollowUser,
  } = useInstagram();

  const [activeTab, setActiveTab] = useState<ProfileTabType>('posts');

  const user = getUserById(userId);
  if (!user) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isCurrentUser = currentUser?.id === user.id;
  const userPosts = getUserPosts(user.id);
  const userHighlights = getUserHighlights(user.id);
  const following = isFollowing(user.id);

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { postId: post.id });
  };

  const handleHighlightPress = (highlight: Highlight) => {
    navigation.navigate('HighlightViewer', { highlightId: highlight.id });
  };

  const handleMessagePress = () => {
    navigation.navigate('Chat', {
      conversationId: `conv_${user.id}`,
      participantUsername: user.username,
      participantAvatar: user.profileImage,
    });
  };

  const renderHeader = () => (
    <View>
      <ProfileStats
        avatarImage={user.profileImage}
        note={user.note}
        stats={user.stats}
        isCurrentUser={isCurrentUser}
        onFollowersPress={() => navigation.navigate('Followers', { userId: user.id, initialTab: 'followers' })}
        onFollowingPress={() => navigation.navigate('Followers', { userId: user.id, initialTab: 'following' })}
        onAvatarPress={() => navigation.navigate('StoryViewer', { userId: user.id })}
      />

      <ProfileBio
        user={user}
        isCurrentUser={isCurrentUser}
        isFollowing={following}
        onFollowPress={() => toggleFollowUser(user.id)}
        onMessagePress={handleMessagePress}
        onEditProfilePress={() => navigation.navigate('EditProfile')}
      />

      <ProfileHighlights
        highlights={userHighlights}
        isCurrentUser={isCurrentUser}
        onHighlightPress={handleHighlightPress}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ProfileHeader
        username={user.username}
        isCurrentUser={isCurrentUser}
        onMenuPress={() => {}}
        onBackPress={() => navigation.goBack()}
      />

      <PostGrid
        posts={activeTab === 'posts' ? userPosts : []}
        onPostPress={handlePostPress}
        ListHeaderComponent={renderHeader()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});

