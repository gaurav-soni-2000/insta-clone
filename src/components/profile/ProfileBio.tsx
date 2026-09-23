import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { User } from '../../types/user';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { CustomButton } from '../common/CustomButton';

interface ProfileBioProps {
  user: User;
  isCurrentUser: boolean;
  isFollowing?: boolean;
  onEditProfilePress?: () => void;
  onShareProfilePress?: () => void;
  onFollowPress?: () => void;
  onMessagePress?: () => void;
}

export const ProfileBio: React.FC<ProfileBioProps> = ({
  user,
  isCurrentUser,
  isFollowing = false,
  onEditProfilePress,
  onShareProfilePress,
  onFollowPress,
  onMessagePress,
}) => {
  return (
    <View style={styles.container}>
      {/* Display name & verified badge */}
      <View style={styles.nameRow}>
        <Text style={styles.displayName}>{user.displayName || 'Er Gaurav'}</Text>
        {user.verified && <VerifiedBadge size={15} />}
      </View>

      {/* Category */}
      {user.category ? (
        <Text style={styles.categoryText}>{user.category}</Text>
      ) : null}

      {/* Bio text */}
      {user.bio ? (
        <Text style={styles.bioText}>{user.bio}</Text>
      ) : null}

      {/* Website */}
      {user.website ? (
        <View style={styles.websiteRow}>
          <Feather name="link" size={12} color="#0095F6" />
          <Text style={styles.websiteText}>{user.website}</Text>
        </View>
      ) : null}

      {/* Profile Tags/Links pills (matching reference screenshot) */}
      {user.tags && user.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {user.tags.map((tag, idx) => {
            const isAtTag = tag.startsWith('@');
            return (
              <View key={idx} style={styles.tagPill}>
                {isAtTag ? (
                  <Feather name="at-sign" size={11} color={Colors.text} style={styles.tagIcon} />
                ) : (
                  <MaterialCommunityIcons name="creation" size={12} color={Colors.text} style={styles.tagIcon} />
                )}
                <Text style={styles.tagText}>{isAtTag ? tag.replace(/^@/, '') : tag}</Text>
              </View>
            );
          })}
          {isCurrentUser && (
            <View style={styles.tagPill}>
              <Feather name="plus" size={12} color={Colors.text} style={styles.tagIcon} />
              <Text style={styles.tagText}>Add</Text>
            </View>
          )}
        </View>
      )}

      {/* Professional dashboard card */}
      {isCurrentUser && user.professionalDashboard && (
        <TouchableOpacity activeOpacity={0.8} style={styles.dashboardCard}>
          <View>
            <Text style={styles.dashboardTitle}>Professional dashboard</Text>
            <View style={styles.dashboardMetricRow}>
              <Feather name="arrow-up-right" size={14} color={Colors.success} />
              <Text style={styles.dashboardMetricText}>
                {user.professionalDashboard.viewsText}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Action Buttons Row */}
      <View style={styles.buttonsRow}>
        {isCurrentUser ? (
          <>
            <CustomButton
              title="Edit profile"
              onPress={onEditProfilePress || (() => {})}
              variant="secondary"
              style={styles.actionBtn}
            />
            <CustomButton
              title="Share profile"
              onPress={onShareProfilePress || (() => {})}
              variant="secondary"
              style={styles.actionBtn}
            />
          </>
        ) : (
          <>
            <CustomButton
              title={isFollowing ? 'Following' : 'Follow'}
              onPress={onFollowPress || (() => {})}
              variant={isFollowing ? 'following' : 'primary'}
              style={styles.actionBtn}
            />
            <CustomButton
              title="Message"
              onPress={onMessagePress || (() => {})}
              variant="secondary"
              style={styles.actionBtn}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 7,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: Colors.text,
  },
  categoryText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bioText: {
    fontSize: 13.5,
    color: Colors.text,
    lineHeight: 18,
    marginTop: 3,
  },
  websiteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  websiteText: {
    fontSize: 13,
    color: '#0095F6',
    marginLeft: 4,
    fontWeight: '500',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 0.5,
    borderColor: '#303030',
  },
  tagIcon: {
    marginRight: 3,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  dashboardCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    borderWidth: 0.5,
    borderColor: '#2D2D2D',
  },
  dashboardTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.text,
  },
  dashboardMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  dashboardMetricText: {
    fontSize: 12.5,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 3,
  },
});
