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
  TextInput,
} from 'react-native';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { Avatar } from '../../components/common/Avatar';
import { resolveImage } from '../../utils/assetService';
import { RootStackParamList } from '../../types/navigation';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type RouteProps = RouteProp<RootStackParamList, 'StoryViewer'>;

export const StoryViewerScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { stories } = useInstagram();
  const { userId, initialUserIndex = 0 } = route.params || {};

  // Find user story set
  const userStoryIndex = userId
    ? Math.max(0, stories.findIndex(s => s.userId === userId))
    : initialUserIndex;

  const [currentUserIdx, setCurrentUserIdx] = useState(userStoryIndex >= 0 ? userStoryIndex : 0);
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);

  const activeUserStory = stories[currentUserIdx];
  const activeStories = activeUserStory?.stories || [];
  const currentItem = activeStories[currentStoryIdx];

  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!currentItem) return;

    progressAnim.setValue(0);
    const animation = Animated.timing(progressAnim, {
      toValue: 1,
      duration: currentItem.duration || 5000,
      useNativeDriver: false,
    });

    animation.start(({ finished }) => {
      if (finished) {
        goToNext();
      }
    });

    return () => animation.stop();
  }, [currentUserIdx, currentStoryIdx, currentItem]);

  const goToNext = () => {
    if (currentStoryIdx < activeStories.length - 1) {
      setCurrentStoryIdx(prev => prev + 1);
    } else if (currentUserIdx < stories.length - 1) {
      setCurrentUserIdx(prev => prev + 1);
      setCurrentStoryIdx(0);
    } else {
      navigation.goBack();
    }
  };

  const goToPrevious = () => {
    if (currentStoryIdx > 0) {
      setCurrentStoryIdx(prev => prev - 1);
    } else if (currentUserIdx > 0) {
      setCurrentUserIdx(prev => prev - 1);
      setCurrentStoryIdx(0);
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

  if (!activeUserStory || !currentItem) {
    navigation.goBack();
    return null;
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Background Image */}
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
        {/* Progress Bars */}
        <View style={styles.progressBarRow}>
          {activeStories.map((_, idx) => {
            let widthInterpolation: any;
            if (idx < currentStoryIdx) {
              widthInterpolation = '100%';
            } else if (idx === currentStoryIdx) {
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

        {/* User Info & Close */}
        <View style={styles.userHeader}>
          <View style={styles.userLeft}>
            <Avatar image={activeUserStory.userAvatar} size={34} />
            <Text style={styles.username}>{activeUserStory.username}</Text>
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

      {/* Bottom Reply Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={`Send message to ${activeUserStory.username}...`}
            placeholderTextColor="rgba(255,255,255,0.7)"
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
          <Ionicons name="heart-outline" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
          <Feather name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
    top: 40,
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
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13.5,
    marginLeft: 10,
  },
  timestamp: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginLeft: 8,
  },
  closeBtn: {
    padding: 4,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputWrapper: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  iconBtn: {
    padding: 6,
    marginLeft: 4,
  },
});
