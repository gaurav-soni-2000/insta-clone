import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '../common/Avatar';
import { Colors } from '../../theme/colors';
import { ProfileStats as StatsType, UserNote } from '../../types/user';
import { formatCount } from '../../utils/formatters';

interface ProfileStatsProps {
  avatarImage: string;
  note?: UserNote;
  stats: StatsType;
  isCurrentUser: boolean;
  onAvatarPress?: () => void;
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  avatarImage,
  note,
  stats,
  isCurrentUser,
  onAvatarPress,
  onFollowersPress,
  onFollowingPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Avatar with top-left floating note bubble overlapping DP */}
      <View style={styles.avatarSection}>
        {note?.text && (
          <View style={styles.noteWrapper} pointerEvents="none">
            <View style={styles.noteBubble}>
              <Text style={styles.noteText}>
                {note.text}
              </Text>
            </View>
            {/* Thought dots leading down toward the DP */}
            <View style={styles.thoughtDot1} />
            <View style={styles.thoughtDot2} />
          </View>
        )}

        <Avatar
          image={avatarImage}
          size={77}
          showAddBadge={isCurrentUser}
          onPress={onAvatarPress}
        />
      </View>

      {/* Stats Columns: Posts, Followers, Following */}
      <View style={styles.statsContainer}>
        <View style={styles.statColumn}>
          {isCurrentUser ? (
            <View style={styles.bugBadgeRow}>
              <Text style={styles.bugBadgeEmoji}>🐞</Text>
            </View>
          ) : (
            <View style={styles.bugBadgePlaceholder} />
          )}
          <Text style={styles.statNumber}>{formatCount(stats.posts)}</Text>
          <Text style={styles.statLabel}>posts</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onFollowersPress}
          style={styles.statColumn}
        >
          {isCurrentUser && <View style={styles.bugBadgePlaceholder} />}
          <Text style={styles.statNumber}>{formatCount(stats.followers)}</Text>
          <Text style={styles.statLabel}>followers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onFollowingPress}
          style={styles.statColumn}
        >
          {isCurrentUser && <View style={styles.bugBadgePlaceholder} />}
          <Text style={styles.statNumber}>{formatCount(stats.following)}</Text>
          <Text style={styles.statLabel}>following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 2,
  },
  avatarSection: {
    width: 77,
    height: 77,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteWrapper: {
    position: 'absolute',
    top: -25,
    left: -4,
    zIndex: 15,
    alignItems: 'center',
  },
  noteBubble: {
    backgroundColor: '#262626',
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#383838',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 6,
  },
  noteText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 12.5,
  },
  thoughtDot1: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#262626',
    borderWidth: 0.8,
    borderColor: '#383838',
    marginTop: 2,
    marginLeft: 14,
    opacity:0
  },
  thoughtDot2: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#262626',
    borderWidth: 0.5,
    borderColor: '#383838',
    marginTop: 1,
    marginLeft: 22,
    opacity:0
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 6,
    alignItems: 'flex-end',
  },
  statColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 58,
  },
  bugBadgeRow: {
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  bugBadgePlaceholder: {
    height: 18,
    marginBottom: 2,
  },
  bugBadgeEmoji: {
    fontSize: 15,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 2,
  },
});
