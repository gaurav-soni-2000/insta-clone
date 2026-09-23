import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { InstagramReshareIcon } from '../common/InstagramReshareIcon';
import { InstagramDirectIcon } from '../common/InstagramDirectIcon';

interface PostActionsProps {
  isLiked: boolean;
  isSaved: boolean;
  isReshared?: boolean;
  commentsCount?: number;
  onLikePress: () => void;
  onCommentPress: () => void;
  onResharePress?: () => void;
  onSharePress: () => void;
  onSavePress: () => void;
}

export const PostActions: React.FC<PostActionsProps> = ({
  isLiked,
  isSaved,
  isReshared = false,
  commentsCount,
  onLikePress,
  onCommentPress,
  onResharePress,
  onSharePress,
  onSavePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftActions}>
        {/* Like Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onLikePress}
          style={styles.actionButton}
        >
          {isLiked ? (
            <Ionicons name="heart" size={26} color={Colors.like} />
          ) : (
            <Ionicons name="heart-outline" size={26} color={Colors.text} />
          )}
        </TouchableOpacity>

        {/* Comment Button with comment count displayed right after icon */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onCommentPress}
          style={styles.commentActionButton}
        >
          <Ionicons name="chatbubble-outline" size={23} color={Colors.text} />
          {commentsCount !== undefined && commentsCount > 0 && (
            <Text style={styles.commentCountText}>{commentsCount}</Text>
          )}
        </TouchableOpacity>

        {/* Re-share / Repost Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onResharePress}
          style={styles.actionButton}
        >
          <InstagramReshareIcon
            size={23}
            color={isReshared ? '#00ba7c' : Colors.text}
          />
        </TouchableOpacity>

        {/* Direct Send / Share Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSharePress}
          style={styles.actionButton}
        >
          <InstagramDirectIcon size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Bookmark / Save Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSavePress}
        style={styles.actionButton}
      >
        {isSaved ? (
          <Ionicons name="bookmark" size={24} color={Colors.text} />
        ) : (
          <Ionicons name="bookmark-outline" size={24} color={Colors.text} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 16,
    padding: 2,
  },
  commentActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    padding: 2,
  },
  commentCountText: {
    color: Colors.text,
    fontSize: 13.5,
    fontWeight: '600',
    marginLeft: 6,
  },
});
