import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface ProfileHeaderProps {
  username: string;
  isCurrentUser: boolean;
  onMenuPress: () => void;
  onCreatePress?: () => void;
  onBackPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  isCurrentUser,
  onMenuPress,
  onCreatePress,
  onBackPress,
}) => {
  return (
    <View style={styles.container}>
      {isCurrentUser ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onCreatePress}
          style={styles.iconButton}
        >
          <Feather name="plus" size={26} color={Colors.text} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onBackPress}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
      )}

      {/* Username dropdown */}
      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <Ionicons name="chevron-down" size={14} color={Colors.text} style={styles.chevron} />
        {isCurrentUser && <View style={styles.redDot} />}
      </View>

      {/* Right icons */}
      <View style={styles.rightIcons}>
        {isCurrentUser && (
          <View style={styles.threadsBadgeContainer}>
            <FontAwesome6 name="threads" size={22} color={Colors.text} />
            <View style={styles.threadsBadge}>
              <Text style={styles.threadsBadgeText}>6</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMenuPress}
          style={styles.iconButton}
        >
          <Feather name="menu" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.text,
  },
  chevron: {
    marginLeft: 4,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.badge,
    marginLeft: 6,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
  },
  threadsBadgeContainer: {
    marginRight: 16,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  threadsText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  threadsBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.badge,
    borderRadius: 8,
    minWidth: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  threadsBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
});

