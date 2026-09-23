import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Highlight } from '../../types/story';
import { resolveImage } from '../../utils/assetService';

interface ProfileHighlightsProps {
  highlights: Highlight[];
  isCurrentUser: boolean;
  onHighlightPress: (highlight: Highlight) => void;
  onNewHighlightPress?: () => void;
}

export const ProfileHighlights: React.FC<ProfileHighlightsProps> = ({
  highlights,
  isCurrentUser,
  onHighlightPress,
  onNewHighlightPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* + New Highlight on first left side */}
        {isCurrentUser && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNewHighlightPress}
            style={styles.highlightItem}
          >
            <View style={styles.newCircle}>
              <Ionicons name="add" size={30} color={Colors.text} />
            </View>
            <Text style={styles.highlightTitle}>New</Text>
          </TouchableOpacity>
        )}

        {/* Existing Highlights */}
        {highlights.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => onHighlightPress(item)}
            style={styles.highlightItem}
          >
            <View style={styles.circleOuter}>
              <Image
                source={resolveImage(item.coverImage)}
                style={styles.coverImage}
              />
            </View>
            <Text style={styles.highlightTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 0,
    borderBottomColor: Colors.border,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  highlightItem: {
    alignItems: 'center',
    marginHorizontal: 7,
    width: 76,
  },
  newCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 1,
    borderColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
  },
  circleOuter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 1.5,
    borderColor: '#262626',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
  },
  highlightTitle: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
});
