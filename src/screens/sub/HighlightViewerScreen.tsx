import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useInstagram } from '../../context/InstagramContext';
import { resolveImage } from '../../utils/assetService';
import { RootStackParamList } from '../../types/navigation';
import { Highlight } from '../../types/story';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type RouteProps = RouteProp<RootStackParamList, 'HighlightViewer'>;

export const HighlightViewerScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { highlights } = useInstagram();
  const { highlightId } = route.params;

  // Find the selected highlight and all highlights for this user
  const initialHighlight = highlights.find(h => h.id === highlightId);
  const userHighlights: Highlight[] = initialHighlight
    ? highlights.filter(h => h.userId === initialHighlight.userId)
    : highlights;

  const initialHighlightIndex = Math.max(
    0,
    userHighlights.findIndex(h => h.id === highlightId)
  );

  const [highlightIdx, setHighlightIdx] = useState(initialHighlightIndex);
  const [storyIdx, setStoryIdx] = useState(0);

  const currentHighlight = userHighlights[highlightIdx];
  const stories = currentHighlight?.stories || [];
  const currentItem = stories[storyIdx];

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!currentItem) return;

    progressAnim.setValue(0);
    const animation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        goToNext();
      }
    });

    return () => animation.stop();
  }, [highlightIdx, storyIdx, currentItem]);

  const goToNext = () => {
    if (storyIdx < stories.length - 1) {
      // Next story in current highlight
      setStoryIdx(prev => prev + 1);
    } else if (highlightIdx < userHighlights.length - 1) {
      // Automatically advance to the next highlight section!
      setHighlightIdx(prev => prev + 1);
      setStoryIdx(0);
    } else {
      // Reached the end of all highlights
      navigation.goBack();
    }
  };

  const goToPrevious = () => {
    if (storyIdx > 0) {
      // Previous story in current highlight
      setStoryIdx(prev => prev - 1);
    } else if (highlightIdx > 0) {
      // Go to previous highlight section
      const prevHighlight = userHighlights[highlightIdx - 1];
      setHighlightIdx(prev => prev - 1);
      setStoryIdx(Math.max(0, (prevHighlight?.stories?.length || 1) - 1));
    } else {
      navigation.goBack();
    }
  };

  const handleScreenPress = (evt: any) => {
    const touchX = evt.nativeEvent.locationX;
    if (touchX < SCREEN_WIDTH * 0.35) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  if (!currentHighlight || !currentItem) {
    navigation.goBack();
    return null;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <TouchableWithoutFeedback onPress={handleScreenPress}>
        <View style={styles.mediaContainer}>
          <Image
            source={resolveImage(currentItem.image)}
            style={styles.storyImage}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Top Overlay */}
      <View
        style={[styles.topOverlay, { top: Math.max(insets.top + 8, 40) }]}
        pointerEvents="box-none"
      >
        {/* Progress Bars for active highlight */}
        <View style={styles.progressBarRow}>
          {stories.map((_, idx) => {
            let widthInterpolation: any;
            if (idx < storyIdx) {
              widthInterpolation = '100%';
            } else if (idx === storyIdx) {
              widthInterpolation = progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              });
            } else {
              widthInterpolation = '0%';
            }

            return (
              <View key={idx} style={styles.progressBackground}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: widthInterpolation,
                    },
                  ]}
                />
              </View>
            );
          })}
        </View>

        {/* Highlight Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.coverThumbnail}>
              {currentHighlight.emoji ? (
                <Text style={styles.coverEmoji}>{currentHighlight.emoji}</Text>
              ) : (
                <Image
                  source={resolveImage(currentHighlight.coverImage)}
                  style={styles.coverImg}
                />
              )}
            </View>
            <Text style={styles.title}>{currentHighlight.title}</Text>
            <Text style={styles.timestamp}>{currentItem.timestamp}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  mediaContainer: {
    ...StyleSheet.absoluteFill,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  topOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
  progressBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBackground: {
    flex: 1,
    height: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginHorizontal: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverThumbnail: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#262626',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  coverEmoji: {
    fontSize: 16,
  },
  coverImg: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  timestamp: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginLeft: 8,
  },
  closeBtn: {
    padding: 4,
  },
});
