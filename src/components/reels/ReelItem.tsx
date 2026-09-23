import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Reel } from '../../types/reel';
import { Avatar } from '../common/Avatar';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { resolveImage } from '../../utils/assetService';
import { formatCount } from '../../utils/formatters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ReelItemProps {
  reel: Reel;
  isLiked: boolean;
  onLikePress: () => void;
  onCommentPress: () => void;
  onSharePress: () => void;
  onUserPress: (userId: string) => void;
  itemHeight?: number;
}

export const ReelItem: React.FC<ReelItemProps> = ({
  reel,
  isLiked,
  onLikePress,
  onCommentPress,
  onSharePress,
  onUserPress,
  itemHeight = SCREEN_HEIGHT - 80,
}) => {
  return (
    <View style={[styles.container, { height: itemHeight }]}>
      {/* Background Image/Video representation */}
      <Image
        source={resolveImage(reel.videoUrl || reel.thumbnail)}
        style={styles.media}
        resizeMode="cover"
      />

      {/* Dark overlay for readability */}
      <View style={styles.gradientOverlay} />

      {/* Floating Right Actions */}
      <View style={styles.rightActions}>
        {/* Like */}
        <TouchableOpacity activeOpacity={0.7} onPress={onLikePress} style={styles.actionBtn}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={28}
            color={isLiked ? Colors.like : '#FFFFFF'}
          />
          <Text style={styles.actionText}>{formatCount(reel.likes + (isLiked ? 1 : 0))}</Text>
        </TouchableOpacity>

        {/* Comment */}
        <TouchableOpacity activeOpacity={0.7} onPress={onCommentPress} style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={26} color="#FFFFFF" />
          <Text style={styles.actionText}>{formatCount(reel.commentsCount)}</Text>
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity activeOpacity={0.7} onPress={onSharePress} style={styles.actionBtn}>
          <Feather name="send" size={24} color="#FFFFFF" />
          <Text style={styles.actionText}>{formatCount(reel.sharesCount)}</Text>
        </TouchableOpacity>

        {/* More */}
        <TouchableOpacity activeOpacity={0.7} style={styles.actionBtn}>
          <Feather name="more-horizontal" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Audio disc thumbnail */}
        <View style={styles.audioDisc}>
          <Image source={resolveImage(reel.userAvatar)} style={styles.audioDiscInner} />
        </View>
      </View>

      {/* Bottom Info */}
      <View style={styles.bottomInfo}>
        {/* User row */}
        <View style={styles.userRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onUserPress(reel.userId)}
            style={styles.userInfo}
          >
            <Avatar image={reel.userAvatar} size={32} />
            <Text style={styles.username}>{reel.username}</Text>
            {reel.verified && <VerifiedBadge size={13} />}
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Caption */}
        <Text style={styles.caption} numberOfLines={2}>
          {reel.caption}
        </Text>

        {/* Audio track info */}
        <View style={styles.audioTrackRow}>
          <Ionicons name="musical-notes" size={13} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.audioTrackText} numberOfLines={1}>
            {reel.audioTrack.title} · {reel.audioTrack.artist}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: '#000000',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  media: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  rightActions: {
    position: 'absolute',
    right: 12,
    bottom: 24,
    alignItems: 'center',
    zIndex: 10,
  },
  actionBtn: {
    alignItems: 'center',
    marginBottom: 16,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  audioDisc: {
    width: 30,
    height: 30,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginTop: 4,
  },
  audioDiscInner: {
    width: '100%',
    height: '100%',
  },
  bottomInfo: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingRight: 64, // leave room for right actions
    zIndex: 9,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  followButton: {
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  caption: {
    color: '#FFFFFF',
    fontSize: 13.5,
    lineHeight: 18,
    marginBottom: 8,
  },
  audioTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioTrackText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
});
