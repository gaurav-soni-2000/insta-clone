import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { InstagramHeader } from '../../components/common/InstagramHeader';
import { StoriesRow } from '../../components/feed/StoriesRow';
import { PostCard } from '../../components/feed/PostCard';
import { Post } from '../../types/post';
import { RootStackParamList } from '../../types/navigation';
import { Avatar } from '../../components/common/Avatar';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    currentUser,
    posts,
    stories,
    likedPostIds,
    savedPostIds,
    toggleLikePost,
    toggleSavePost,
    addComment,
  } = useInstagram();

  const [refreshing, setRefreshing] = useState(false);
  const [activeCommentPost, setActiveCommentPost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState('');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  const handleUserPress = (userId: string) => {
    if (userId === currentUser?.id) {
      // Navigate to current user profile or user profile screen
      navigation.navigate('UserProfile', { userId });
    } else {
      navigation.navigate('UserProfile', { userId });
    }
  };

  const handleStoryPress = (story: any, index: number) => {
    navigation.navigate('StoryViewer', { initialUserIndex: index, userId: story.userId });
  };

  const handleYourStoryPress = () => {
    if (currentUser) {
      navigation.navigate('StoryViewer', { userId: currentUser.id });
    }
  };

  const handleSendComment = () => {
    if (activeCommentPost && commentText.trim()) {
      addComment(activeCommentPost.id, commentText);
      setCommentText('');
      // update active comment post with new comment
      const updated = posts.find(p => p.id === activeCommentPost.id);
      if (updated) setActiveCommentPost(updated);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <InstagramHeader
        onCreatePress={() =>
          Alert.alert('Create', 'Create functionality is disabled in demo mode.')
        }
        onNotificationsPress={() => {}}
      />

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            isLiked={likedPostIds.has(item.id)}
            isSaved={savedPostIds.has(item.id)}
            onLikePress={() => toggleLikePost(item.id)}
            onSavePress={() => toggleSavePost(item.id)}
            onCommentPress={() => setActiveCommentPost(item)}
            onUserPress={handleUserPress}
          />
        )}
        ListHeaderComponent={
          <StoriesRow
            currentUser={currentUser}
            stories={stories}
            onYourStoryPress={handleYourStoryPress}
            onStoryPress={handleStoryPress}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.textSecondary}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Comment Modal */}
      <Modal
        visible={!!activeCommentPost}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveCommentPost(null)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {/* Modal Drag handle */}
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Comments</Text>

            {/* Comments List */}
            <FlatList
              data={activeCommentPost?.comments || []}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentRow}>
                  <Avatar image={item.userAvatar} size={32} />
                  <View style={styles.commentBody}>
                    <Text style={styles.commentUser}>
                      {item.username}{' '}
                      <Text style={styles.commentText}>{item.text}</Text>
                    </Text>
                    <Text style={styles.commentMeta}>{item.timestamp}</Text>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyComments}>
                  <Text style={styles.emptyText}>No comments yet. Start the conversation!</Text>
                </View>
              }
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            />

            {/* Input bar */}
            <View style={styles.commentInputBar}>
              <Avatar image={currentUser?.profileImage || 'gaurav.jpg'} size={32} />
              <TextInput
                value={commentText}
                onChangeText={setCommentText}
                placeholder="Add a comment..."
                placeholderTextColor={Colors.textTertiary}
                style={styles.commentInput}
              />
              {commentText.trim().length > 0 && (
                <TouchableOpacity activeOpacity={0.7} onPress={handleSendComment}>
                  <Text style={styles.postBtnText}>Post</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '60%',
    paddingTop: 10,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#404040',
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  commentBody: {
    marginLeft: 12,
    flex: 1,
  },
  commentUser: {
    color: Colors.text,
    fontWeight: '700',
    fontSize: 13,
    lineHeight: 18,
  },
  commentText: {
    fontWeight: '400',
  },
  commentMeta: {
    fontSize: 11,
    color: Colors.textTertiary,
    marginTop: 3,
  },
  emptyComments: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  commentInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    backgroundColor: '#1E1E1E',
  },
  commentInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    marginHorizontal: 12,
  },
  postBtnText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});

