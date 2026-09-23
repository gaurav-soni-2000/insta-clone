import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { currentUser, getUserPosts, getUserHighlights } = useInstagram();
  const [activeTab, setActiveTab] = useState<ProfileTabType>('posts');

  if (!currentUser) return null;

  const userPosts = getUserPosts(currentUser.id);
  const userHighlights = getUserHighlights(currentUser.id);

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { postId: post.id });
  };

  const handleHighlightPress = (highlight: Highlight) => {
    navigation.navigate('HighlightViewer', { highlightId: highlight.id });
  };

  const renderHeader = () => (
    <View>
      <ProfileStats
        avatarImage={currentUser.profileImage}
        note={currentUser.note}
        stats={currentUser.stats}
        isCurrentUser={true}
        onFollowersPress={() => navigation.navigate('Followers', { userId: currentUser.id, initialTab: 'followers' })}
        onFollowingPress={() => navigation.navigate('Followers', { userId: currentUser.id, initialTab: 'following' })}
        onAvatarPress={() => navigation.navigate('StoryViewer', { userId: currentUser.id })}
      />

      <ProfileBio
        user={currentUser}
        isCurrentUser={true}
        onEditProfilePress={() => navigation.navigate('EditProfile')}
        onShareProfilePress={() => {}}
      />

      <ProfileHighlights
        highlights={userHighlights}
        isCurrentUser={true}
        onHighlightPress={handleHighlightPress}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ProfileHeader
        username={currentUser.username}
        isCurrentUser={true}
        onMenuPress={() => navigation.navigate('Settings')}
        onCreatePress={() => {}}
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
});

