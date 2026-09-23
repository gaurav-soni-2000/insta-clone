import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { Avatar } from '../../components/common/Avatar';
import { VerifiedBadge } from '../../components/common/VerifiedBadge';
import { CustomButton } from '../../components/common/CustomButton';
import { RootStackParamList } from '../../types/navigation';
import { User } from '../../types/user';

type RouteProps = RouteProp<RootStackParamList, 'Followers'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FollowersScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { userId, initialTab = 'followers' } = route.params;

  const {
    getUserById,
    getUserFollowers,
    getUserFollowing,
    isFollowing,
    toggleFollowUser,
    currentUser,
  } = useInstagram();

  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  const targetUser = getUserById(userId);
  const followers = getUserFollowers(userId);
  const following = getUserFollowing(userId);

  const displayedList = activeTab === 'followers' ? followers : following;
  const filteredList = displayedList.filter(
    u =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{targetUser?.username || 'User'}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('followers')}
          style={[styles.tab, activeTab === 'followers' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'followers' && styles.tabTextActive]}>
            {targetUser?.stats.followers || followers.length} Followers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('following')}
          style={[styles.tab, activeTab === 'following' && styles.tabActive]}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.tabTextActive]}>
            {targetUser?.stats.following || following.length} Following
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={18} color={Colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor={Colors.textTertiary}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const userIsFollowing = isFollowing(item.id);
          const isSelf = currentUser?.id === item.id;

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('UserProfile', { userId: item.id })}
              style={styles.userRow}
            >
              <Avatar image={item.profileImage} size={50} />
              <View style={styles.userInfo}>
                <View style={styles.usernameRow}>
                  <Text style={styles.username}>{item.username}</Text>
                  {item.verified && <VerifiedBadge size={13} />}
                </View>
                <Text style={styles.displayName}>{item.displayName}</Text>
              </View>

              {!isSelf && (
                <CustomButton
                  title={userIsFollowing ? 'Following' : 'Follow'}
                  variant={userIsFollowing ? 'following' : 'primary'}
                  onPress={() => toggleFollowUser(item.id)}
                  style={styles.actionBtn}
                  textStyle={styles.actionBtnText}
                />
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.text,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    height: 38,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },
  userRow: {
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
  actionBtn: {
    height: 30,
    paddingHorizontal: 14,
  },
  actionBtnText: {
    fontSize: 13,
  },
  emptyContainer: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});

