import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Conversation } from '../../types/message';
import { Avatar } from '../common/Avatar';

interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <Avatar image={conversation.participantAvatar} size={54} />

      <View style={styles.textContainer}>
        <Text style={[styles.name, conversation.unread && styles.boldText]} numberOfLines={1}>
          {conversation.participantDisplayName || conversation.participantUsername}
        </Text>
        <Text
          style={[styles.subtitle, conversation.unread && styles.unreadSubtitle]}
          numberOfLines={1}
        >
          {conversation.lastMessageText} · {conversation.timestamp}
        </Text>
      </View>

      <View style={styles.rightGroup}>
        {conversation.unread && <View style={styles.unreadDot} />}
        <TouchableOpacity activeOpacity={0.7} style={styles.cameraBtn}>
          <Feather name="camera" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  boldText: {
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  unreadSubtitle: {
    color: Colors.text,
    fontWeight: '600',
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.unreadDot,
    marginRight: 14,
  },
  cameraBtn: {
    padding: 4,
  },
});

