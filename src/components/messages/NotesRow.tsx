import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { MessageNote } from '../../types/message';
import { Avatar } from '../common/Avatar';

interface NotesRowProps {
  notes: MessageNote[];
  onNotePress?: (note: MessageNote) => void;
}

export const NotesRow: React.FC<NotesRowProps> = ({ notes, onNotePress }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {notes.map((note, index) => {
          const isYourNote = index === 0;

          return (
            <TouchableOpacity
              key={note.userId}
              activeOpacity={0.8}
              onPress={() => onNotePress?.(note)}
              style={styles.noteItem}
            >
              {/* Note Bubble above Avatar with dedicated wrapper so it is NEVER clipped */}
              <View style={styles.bubbleWrapper}>
                {(note.musicTitle || note.noteText || isYourNote) ? (
                  <View style={styles.bubble}>
                    {note.musicTitle && (
                      <View style={styles.musicTitleRow}>
                        <Ionicons name="musical-notes" size={9} color={Colors.text} style={{ marginRight: 2 }} />
                        <Text style={styles.musicTitle} numberOfLines={1}>
                          {note.musicTitle}
                        </Text>
                      </View>
                    )}
                    {note.musicArtist && (
                      <Text style={styles.musicArtist} numberOfLines={1}>
                        {note.musicArtist}
                      </Text>
                    )}
                    {note.noteText && !note.musicTitle && (
                      <Text style={styles.bubbleText} numberOfLines={2}>
                        {note.noteText}
                      </Text>
                    )}
                    {!note.noteText && !note.musicTitle && isYourNote && (
                      <Text style={styles.bubbleText} numberOfLines={1}>
                        Note...
                      </Text>
                    )}
                    {/* Tail pointing down */}
                    <View style={styles.bubbleTail} />
                  </View>
                ) : null}
              </View>

              {/* Avatar */}
              <Avatar
                image={note.userAvatar}
                size={66}
                hasStory={false}
              />

              {/* Username / Status label */}
              <Text style={styles.username} numberOfLines={1}>
                {note.username}
              </Text>
              {isYourNote && note.location ? (
                <View style={styles.locationRow}>
                  <Ionicons name="airplane" size={10} color={Colors.badge} style={{ marginRight: 2 }} />
                  <Text style={styles.locationText}>{note.location}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  noteItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 84,
  },
  bubbleWrapper: {
    height: 38,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: -10,
    zIndex: 10,
  },
  bubble: {
    backgroundColor: '#262626',
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#383838',
    minWidth: 70,
    maxWidth: 92,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  bubbleText: {
    fontSize: 10,
    color: '#E0E0E0',
    textAlign: 'center',
  },
  musicTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicTitle: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  musicArtist: {
    fontSize: 8.5,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -3.5,
    left: '42%',
    width: 6,
    height: 6,
    backgroundColor: '#262626',
    transform: [{ rotate: '45deg' }],
  },
  username: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  locationText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
});
