import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { PostCard } from '../../components/feed/PostCard';
import { Avatar } from '../../components/common/Avatar';
import { RootStackParamList } from '../../types/navigation';

type RouteProps = RouteProp<RootStackParamList, 'PostDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const PostDetailScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NavigationProp>();
  const { postId } = route.params;

  const {
    currentUser,
    posts,
    likedPostIds,
    savedPostIds,
    toggleLikePost,
    toggleSavePost,
    addComment,
  } = useInstagram();

  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  const post = posts.find(p => p.id === postId);
  if (!post) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Post</Text>
        </View>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Post not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSendComment = () => {
    if (commentText.trim()) {
      addComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Posts</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <PostCard
          post={post}
          isLiked={likedPostIds.has(post.id)}
          isSaved={savedPostIds.has(post.id)}
          onLikePress={() => toggleLikePost(post.id)}
          onSavePress={() => toggleSavePost(post.id)}
          onCommentPress={() => setCommentsModalVisible(true)}
          onUserPress={userId => navigation.navigate('UserProfile', { userId })}
        />
      </ScrollView>

      {/* Comment Modal */}
      <Modal
        visible={commentsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCommentsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Comments</Text>

            <FlatList
              data={post.comments || []}
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
                  <Text style={styles.emptyText}>No comments yet. Be the first to comment!</Text>
                </View>
              }
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            />

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
  header: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    padding: 4,
    marginRight: 18,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.textSecondary,
    fontSize: 14,
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

