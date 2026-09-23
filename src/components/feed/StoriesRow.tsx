import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '../common/Avatar';
import { Colors } from '../../theme/colors';
import { UserStory } from '../../types/story';
import { User } from '../../types/user';

interface StoriesRowProps {
  currentUser: User | null;
  stories: UserStory[];
  onYourStoryPress?: () => void;
  onStoryPress?: (story: UserStory, index: number) => void;
}

const STORY_AVATAR_SIZE = 82; // Bit large story circle matching reference screenshot

export const StoriesRow: React.FC<StoriesRowProps> = ({
  currentUser,
  stories,
  onYourStoryPress,
  onStoryPress,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Your Story */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onYourStoryPress}
          style={styles.storyItem}
        >
          <Avatar
            image={currentUser?.profileImage || 'gaurav.jpg'}
            size={STORY_AVATAR_SIZE}
            hasStory={false}
            showAddBadge={true}
          />
          <Text style={styles.username} numberOfLines={1}>
            Your story
          </Text>
        </TouchableOpacity>

        {/* Other Users' Stories */}
        {stories.map((story, index) => {
          if (story.userId === currentUser?.id) return null;

          return (
            <TouchableOpacity
              key={story.userId}
              activeOpacity={0.8}
              onPress={() => onStoryPress?.(story, index)}
              style={styles.storyItem}
            >
              <Avatar
                image={story.userAvatar}
                size={STORY_AVATAR_SIZE}
                hasStory={true}
                hasUnseenStory={story.hasUnseenStory}
              />
              <Text style={styles.username} numberOfLines={1}>
                {story.username}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 7,
    width: 86,
  },
  username: {
    marginTop: 6,
    fontSize: 11.5,
    color: Colors.text,
    textAlign: 'center',
  },
});
