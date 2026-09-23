import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Post } from '../../types/post';
import { resolveImage } from '../../utils/assetService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = 1.5;
const ITEM_WIDTH = (SCREEN_WIDTH - GRID_GAP * 2) / 3;

interface ExploreGridProps {
  items: Post[];
  onItemPress: (item: Post) => void;
}

export const ExploreGrid: React.FC<ExploreGridProps> = ({ items, onItemPress }) => {
  const renderItem = ({ item, index }: { item: Post; index: number }) => {
    // Generate realistic view count for explore grid if not present
    const viewBadges = ['571K', '3.4M', '8.2M', '7.8M', '3.7M', '663K', '543K', '228K', '422K'];
    const views = item.viewsCount || viewBadges[index % viewBadges.length];

    // Every 6th item can be double height (aspect ratio ~1.4) or standard 4:3
    const isTall = index % 7 === 1;
    const height = isTall ? ITEM_WIDTH * 1.5 : ITEM_WIDTH * 1.25;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => onItemPress(item)}
        style={[styles.gridItem, { height }]}
      >
        <Image
          source={resolveImage(item.image)}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Play Icon and View Count at bottom left (matching screenshot 2) */}
        <View style={styles.viewBadge}>
          <Ionicons name="play" size={10} color="#FFFFFF" />
          <Text style={styles.viewBadgeText}>{views}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={item => item.id}
      numColumns={3}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  gridItem: {
    width: ITEM_WIDTH,
    marginRight: GRID_GAP,
    marginBottom: GRID_GAP,
    backgroundColor: Colors.surface,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  viewBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  viewBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 3,
  },
});

