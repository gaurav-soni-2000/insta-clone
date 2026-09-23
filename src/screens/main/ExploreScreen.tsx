import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { ExploreSearchBar } from '../../components/explore/ExploreSearchBar';
import { ExploreGrid } from '../../components/explore/ExploreGrid';
import { Avatar } from '../../components/common/Avatar';
import { VerifiedBadge } from '../../components/common/VerifiedBadge';
import { Post } from '../../types/post';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ExploreScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { posts, users } = useInstagram();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = searchQuery.trim()
    ? users.filter(
        u =>
          u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { postId: post.id });
  };

  const handleUserPress = (userId: string) => {
    navigation.navigate('UserProfile', { userId });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ExploreSearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onClear={() => setSearchQuery('')}
      />

      {searchQuery.trim().length > 0 ? (
        /* Search Results List */
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleUserPress(item.id)}
              style={styles.userSearchRow}
            >
              <Avatar image={item.profileImage} size={50} />
              <View style={styles.userInfo}>
                <View style={styles.usernameRow}>
                  <Text style={styles.username}>{item.username}</Text>
                  {item.verified && <VerifiedBadge size={13} />}
                </View>
                <Text style={styles.displayName}>{item.displayName}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptySearch}>
              <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
            </View>
          }
          contentContainerStyle={styles.searchList}
        />
      ) : (
        /* Explore 3-column media grid matching screenshot 2 */
        <ExploreGrid items={posts} onItemPress={handlePostPress} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchList: {
    paddingVertical: 8,
  },
  userSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userInfo: {
    marginLeft: 14,
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  displayName: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  emptySearch: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});

