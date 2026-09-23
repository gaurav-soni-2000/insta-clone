import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import { NotesRow } from '../../components/messages/NotesRow';
import { ConversationItem } from '../../components/messages/ConversationItem';
import { RootStackParamList } from '../../types/navigation';
import { Conversation } from '../../types/message';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DirectMessagesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { currentUser, conversations, notes } = useInstagram();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Primary' | 'General' | 'Requests'>('All');

  const filteredConversations = conversations.filter(
    c =>
      c.participantUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.participantDisplayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationPress = (conv: Conversation) => {
    navigation.navigate('Chat', {
      conversationId: conv.id,
      participantUsername: conv.participantDisplayName || conv.participantUsername,
      participantAvatar: conv.participantAvatar,
    });
  };

  const renderHeader = () => (
    <View>
      {/* Search Input Bar with Filter icon (matching screenshot 1) */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={18} color={Colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor={Colors.textTertiary}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.filterBtn}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Notes Horizontal Row (matching screenshot 1) */}
      <NotesRow notes={notes} />

      {/* Filter Pill Tabs (All 10, Primary 10, General, Requests) */}
      <View style={styles.filterTabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterTabsContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('All')}
            style={[styles.filterPill, activeTab === 'All' && styles.filterPillActive]}
          >
            {activeTab === 'All' && <View style={styles.pillDot} />}
            <Text style={[styles.filterPillText, activeTab === 'All' && styles.filterPillTextActive]}>
              All 10
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('Primary')}
            style={[styles.filterPill, activeTab === 'Primary' && styles.filterPillActive]}
          >
            <Text style={[styles.filterPillText, activeTab === 'Primary' && styles.filterPillTextActive]}>
              Primary 10
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('General')}
            style={[styles.filterPill, activeTab === 'General' && styles.filterPillActive]}
          >
            <Text style={[styles.filterPillText, activeTab === 'General' && styles.filterPillTextActive]}>
              General
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('Requests')}
            style={[styles.filterPill, activeTab === 'Requests' && styles.filterPillActive]}
          >
            <Text style={[styles.filterPillText, activeTab === 'Requests' && styles.filterPillTextActive]}>
              Requests
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Top Header matching screenshot 1 */}
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <MaterialCommunityIcons name="briefcase-outline" size={22} color={Colors.text} style={{ marginLeft: 8 }} />
          <Ionicons name="trending-up" size={22} color={Colors.text} style={{ marginLeft: 12 }} />
        </View>

        {/* Username with red dot and dropdown chevron */}
        <View style={styles.headerCenter}>
          <Text style={styles.usernameText}>{currentUser?.username || '_er_gourav'}</Text>
          <Ionicons name="chevron-down" size={14} color={Colors.text} style={{ marginLeft: 4 }} />
          <View style={styles.redBadgeDot} />
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
            <Feather name="more-horizontal" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={[styles.iconBtn, { marginLeft: 12 }]}>
            <Feather name="edit" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            conversation={item}
            onPress={() => handleConversationPress(item)}
          />
        )}
        ListHeaderComponent={renderHeader()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topHeader: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  redBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.badge,
    marginLeft: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    height: 38,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },
  filterBtn: {
    marginLeft: 12,
    paddingVertical: 6,
  },
  filterText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  filterTabsRow: {
    paddingTop: 4,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  filterTabsContent: {
    paddingHorizontal: 16,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#FFFFFF',
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.unreadDot,
    marginRight: 6,
  },
  filterPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: '#000000',
  },
});

