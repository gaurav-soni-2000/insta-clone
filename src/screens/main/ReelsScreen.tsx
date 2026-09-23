import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { ReelItem } from '../../components/reels/ReelItem';
import { RootStackParamList } from '../../types/navigation';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ReelsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { reels } = useInstagram();
  const [likedReelIds, setLikedReelIds] = useState<Set<string>>(new Set());

  const toggleLikeReel = (reelId: string) => {
    setLikedReelIds(prev => {
      const next = new Set(prev);
      if (next.has(reelId)) {
        next.delete(reelId);
      } else {
        next.add(reelId);
      }
      return next;
    });
  };

  const handleUserPress = (userId: string) => {
    navigation.navigate('UserProfile', { userId });
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Top Overlay Header */}
      <View style={[styles.topHeader, { top: Math.max(insets.top + 8, 40) }]}>
        <Text style={styles.headerTitle}>Reels</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.cameraBtn}>
          <Feather name="camera" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Vertical Reels FlatList */}
      <FlatList
        data={reels}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT - 70}
        snapToAlignment="start"
        decelerationRate="fast"
        renderItem={({ item }) => (
          <ReelItem
            reel={item}
            isLiked={likedReelIds.has(item.id)}
            onLikePress={() => toggleLikeReel(item.id)}
            onCommentPress={() => {}}
            onSharePress={() => {}}
            onUserPress={handleUserPress}
            itemHeight={SCREEN_HEIGHT - 70}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topHeader: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  cameraBtn: {
    padding: 4,
  },
});
