import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { Avatar } from '../../components/common/Avatar';
import { RootStackParamList } from '../../types/navigation';
import { DirectMessage } from '../../types/message';

type RouteProps = RouteProp<RootStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { conversationId, participantUsername, participantAvatar } = route.params;

  const { conversations, currentUser, sendMessage } = useInstagram();
  const [inputText, setInputText] = useState('');

  const conversation = conversations.find(c => c.id === conversationId);
  const messages: DirectMessage[] = conversation?.messages || [];

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(conversationId, inputText);
      setInputText('');
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Avatar image={participantAvatar} size={36} />
            <Text style={styles.participantName} numberOfLines={1}>
              {participantUsername}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="call-outline" size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerIcon, { marginLeft: 16 }]}>
              <Ionicons name="videocam-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Message Feed */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const isMe = item.senderId === currentUser?.id;
            return (
              <View
                style={[
                  styles.messageBubble,
                  isMe ? styles.myBubble : styles.theirBubble,
                ]}
              >
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>{item.timestamp}</Text>
              </View>
            );
          }}
          contentContainerStyle={styles.messageList}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.mediaBtn}>
            <Feather name="camera" size={22} color={Colors.text} />
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Message..."
              placeholderTextColor={Colors.textTertiary}
              style={styles.input}
            />
            {inputText.trim().length > 0 ? (
              <TouchableOpacity activeOpacity={0.7} onPress={handleSend}>
                <Text style={styles.sendBtnText}>Send</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ padding: 4 }}>
                <Feather name="mic" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
  participantName: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: 4,
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    marginVertical: 4,
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#3797EF',
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#262626',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 18,
  },
  messageTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  mediaBtn: {
    padding: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 22,
    paddingHorizontal: 14,
    height: 42,
    marginLeft: 6,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },
  sendBtnText: {
    color: '#0095F6',
    fontWeight: '700',
    fontSize: 14,
    paddingHorizontal: 6,
  },
});

