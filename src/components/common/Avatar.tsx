import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { resolveImage } from '../../utils/assetService';

interface AvatarProps {
  image: string;
  size?: number;
  hasStory?: boolean;
  hasUnseenStory?: boolean;
  showAddBadge?: boolean;
  onPress?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  image,
  size = 40,
  hasStory = false,
  hasUnseenStory = true,
  showAddBadge = false,
  onPress,
}) => {
  const imageSource = resolveImage(image);
  const outerSize = size;

  const renderContent = () => {
    if (hasStory) {
      // Bit thick border for story line matching reference screenshot
      const ringThickness = 3.5;
      const gapThickness = 2.5;
      const gapSize = outerSize - ringThickness * 2;
      const innerImageSize = gapSize - gapThickness * 2;

      return (
        <View style={[styles.container, { width: outerSize, height: outerSize }]}>
          {hasUnseenStory ? (
            <LinearGradient
              colors={Colors.storyGradient}
              start={{ x: 0.1, y: 0.9 }}
              end={{ x: 0.9, y: 0.1 }}
              style={[
                styles.ring,
                {
                  width: outerSize,
                  height: outerSize,
                  borderRadius: outerSize / 2,
                },
              ]}
            >
              <View
                style={[
                  styles.innerGap,
                  {
                    width: gapSize,
                    height: gapSize,
                    borderRadius: gapSize / 2,
                  },
                ]}
              >
                <Image
                  source={imageSource}
                  style={{
                    width: innerImageSize,
                    height: innerImageSize,
                    borderRadius: innerImageSize / 2,
                  }}
                />
              </View>
            </LinearGradient>
          ) : (
            <View
              style={[
                styles.seenRing,
                {
                  width: outerSize,
                  height: outerSize,
                  borderRadius: outerSize / 2,
                  borderWidth: ringThickness,
                },
              ]}
            >
              <View
                style={[
                  styles.innerGap,
                  {
                    width: gapSize,
                    height: gapSize,
                    borderRadius: gapSize / 2,
                  },
                ]}
              >
                <Image
                  source={imageSource}
                  style={{
                    width: innerImageSize,
                    height: innerImageSize,
                    borderRadius: innerImageSize / 2,
                  }}
                />
              </View>
            </View>
          )}

          {showAddBadge && (
            <View style={styles.addBadge}>
              <Ionicons name="add" size={16} color="#000000" />
            </View>
          )}
        </View>
      );
    }

    // Story avatar without active story ring (e.g. "Your story")
    if (showAddBadge) {
      const badgeAvatarSize = outerSize - 4;
      return (
        <View style={[styles.container, { width: outerSize, height: outerSize }]}>
          <View
            style={[
              styles.yourStoryBorder,
              {
                width: outerSize,
                height: outerSize,
                borderRadius: outerSize / 2,
              },
            ]}
          >
            <Image
              source={imageSource}
              style={{
                width: badgeAvatarSize,
                height: badgeAvatarSize,
                borderRadius: badgeAvatarSize / 2,
              }}
            />
          </View>
          {/* White badge with black plus icon matching screenshot */}
          <View style={styles.addBadge}>
            <Ionicons name="add" size={16} color="#000000" />
          </View>
        </View>
      );
    }

    // Standard Avatar for posts, comments, profile, DMs
    return (
      <View style={[styles.container, { width: outerSize, height: outerSize }]}>
        <Image
          source={imageSource}
          style={{
            width: outerSize,
            height: outerSize,
            borderRadius: outerSize / 2,
          }}
        />
      </View>
    );
  };

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return renderContent();
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ring: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  seenRing: {
    borderColor: Colors.storySeen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerGap: {
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourStoryBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#262626',
  },
  addBadge: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
