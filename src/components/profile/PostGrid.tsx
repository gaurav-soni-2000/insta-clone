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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Post } from '../../types/post';
import { resolveImage } from '../../utils/assetService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_GAP = 1.5;
// Longer portrait ratio (approx 3:4 / 4:5, not square) matching modern Instagram profile grid
const ITEM_WIDTH = (SCREEN_WIDTH - GRID_GAP * 2) / 3;
const ITEM_HEIGHT = ITEM_WIDTH * 1.32;

interface PostGridProps {
  posts: Post[];
  onPostPress: (post: Post) => void;
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
}

export const PostGrid: React.FC<PostGridProps> = ({
  posts,
  onPostPress,
  ListEmptyComponent,
  ListHeaderComponent,
}) => {
  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPostPress(item)}
      style={styles.gridItem}
    >
      <Image
        source={resolveImage(item.image)}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Pinned post pin icon - angled clean white pin with shadow (matching screenshot) */}
      {item.isPinned && (
        <View style={styles.pinBadge}>
          <MaterialCommunityIcons
            name="pin"
            size={16}
            color="#FFFFFF"
            style={styles.pinIcon}
          />
        </View>
      )}

      {/* Views badge at bottom left - Eye icon matching reference screenshot */}
      {item.viewsCount && (
        <View style={styles.viewsBadge}>
          <Ionicons name="eye-outline" size={13} color="#FFFFFF" style={styles.viewsIcon} />
          <Text style={styles.viewsText}>{item.viewsCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      numColumns={3}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
  gridItem: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: GRID_GAP,
    marginBottom: GRID_GAP,
    backgroundColor: Colors.surface,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  pinBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  pinIcon: {
    transform: [{ rotate: '45deg' }],
  },
  viewsBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewsIcon: {
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  viewsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 3.5,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
