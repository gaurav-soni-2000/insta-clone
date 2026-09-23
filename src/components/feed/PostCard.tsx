import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Post } from '../../types/post';
import { Avatar } from '../common/Avatar';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { PostActions } from './PostActions';
import { resolveImage } from '../../utils/assetService';
import { formatCount } from '../../utils/formatters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  isSaved: boolean;
  onLikePress: () => void;
  onSavePress: () => void;
  onCommentPress: () => void;
  onSharePress?: () => void;
  onUserPress: (userId: string) => void;
  onMorePress?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  isLiked,
  isSaved,
  onLikePress,
  onSavePress,
  onCommentPress,
  onSharePress = () => {},
  onUserPress,
  onMorePress = () => {},
}) => {
  const lastTap = useRef<number>(0);
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;
  const [isReshared, setIsReshared] = useState(false);

  const handleResharePress = () => {
    setIsReshared(prev => !prev);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
      if (!isLiked) {
        onLikePress();
      }
      triggerHeartAnimation();
    }
    lastTap.current = now;
  };

  const triggerHeartAnimation = () => {
    heartScale.setValue(0);
    heartOpacity.setValue(1);

    Animated.parallel([
      Animated.spring(heartScale, {
        toValue: 1.2,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(heartOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(heartOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onUserPress(post.userId)}
          style={styles.headerUser}
        >
          <Avatar image={post.userAvatar} size={32} />
          <View style={styles.headerTextGroup}>
            <View style={styles.usernameRow}>
              <Text style={styles.username}>{post.username}</Text>
              {post.verified && <VerifiedBadge size={13} />}
            </View>
            {post.location && <Text style={styles.location}>{post.location}</Text>}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMorePress}
          style={styles.moreButton}
        >
          <Feather name="more-horizontal" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Media Image */}
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={styles.mediaContainer}>
          <Image
            source={resolveImage(post.image)}
            style={styles.postImage}
            resizeMode="cover"
          />

          {/* Floating animated heart for double tap */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.floatingHeart,
              {
                opacity: heartOpacity,
                transform: [{ scale: heartScale }],
              },
            ]}
          >
            <Ionicons name="heart" size={90} color="#FFFFFF" />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      {/* Action Buttons */}
      <PostActions
        isLiked={isLiked}
        isSaved={isSaved}
        isReshared={isReshared}
        commentsCount={post.comments?.length || post.commentsCount}
        onLikePress={onLikePress}
        onCommentPress={onCommentPress}
        onResharePress={handleResharePress}
        onSharePress={onSharePress}
        onSavePress={onSavePress}
      />

      {/* Post Info */}
      <View style={styles.infoContainer}>
        {/* Likes count */}
        <Text style={styles.likesText}>
          {formatCount(post.likes)} {post.likes === 1 ? 'like' : 'likes'}
        </Text>

        {/* Caption */}
        {post.caption ? (
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>
              <Text
                style={styles.boldUsername}
                onPress={() => onUserPress(post.userId)}
              >
                {post.username}{' '}
              </Text>
              {post.caption}
            </Text>
          </View>
        ) : null}

        {/* Comments count */}
        {post.commentsCount > 0 && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onCommentPress}
            style={styles.commentsLink}
          >
            <Text style={styles.commentsCountText}>
              View all {post.commentsCount} comments
            </Text>
          </TouchableOpacity>
        )}

        {/* Timestamp */}
        <Text style={styles.timestampText}>{post.timestamp} ago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    marginBottom: 12,
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  headerUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTextGroup: {
    marginLeft: 10,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.text,
  },
  location: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  moreButton: {
    padding: 6,
  },
  mediaContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 1.25,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  floatingHeart: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  infoContainer: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },
  likesText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  captionContainer: {
    marginBottom: 4,
  },
  captionText: {
    fontSize: 13.5,
    color: Colors.text,
    lineHeight: 18,
  },
  boldUsername: {
    fontWeight: '700',
    color: Colors.text,
  },
  commentsLink: {
    marginTop: 4,
  },
  commentsCountText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  timestampText: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});

