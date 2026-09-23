import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors } from '../../theme/colors';
import { useInstagram } from '../../context/InstagramContext';
import initialSettingsData from '../../data/settings.json';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { currentUser, logout } = useInstagram();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      `Log out of @${currentUser?.username || 'account'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Top Header matching screenshot 4 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings and activity</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Input Bar matching screenshot 4 */}
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Ionicons name="search" size={18} color={Colors.textSecondary} style={{ marginRight: 8 }} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search"
              placeholderTextColor={Colors.textTertiary}
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Dynamic Sections from settings.json */}
        {initialSettingsData.sections.map((section, secIdx) => (
          <View key={secIdx} style={styles.sectionContainer}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.subtitleBadge && (
                <View style={styles.metaBadge}>
                  <Text style={styles.metaText}>∞ {section.subtitleBadge}</Text>
                </View>
              )}
            </View>

            {section.items.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                style={styles.itemRow}
                onPress={() => {
                  Alert.alert(item.title, `${item.title} settings are UI-only in this local demo.`);
                }}
              >
                <View style={styles.itemIconContainer}>
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={Colors.text}
                  />
                </View>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {'subtitle' in item && Boolean((item as any).subtitle) && (
                    <Text style={styles.itemSubtitle} numberOfLines={2}>
                      {(item as any).subtitle}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Login & Logout Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Login</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.itemRow}
            onPress={() => {
              Alert.alert('Add Account', 'Use the logout option to switch between configured demo users.');
            }}
          >
            <View style={styles.itemIconContainer}>
              <Ionicons name="add-circle-outline" size={22} color={Colors.primary} />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={[styles.itemTitle, { color: Colors.primary }]}>Add account</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.itemRow}
            onPress={handleLogout}
          >
            <View style={styles.itemIconContainer}>
              <Ionicons name="log-out-outline" size={22} color={Colors.like} />
            </View>
            <View style={styles.itemTextContainer}>
              <Text style={[styles.itemTitle, { color: Colors.like }]}>
                Log out @{currentUser?.username || 'account'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
  },
  sectionContainer: {
    marginTop: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemIconContainer: {
    width: 28,
    alignItems: 'center',
    marginRight: 14,
  },
  itemTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    color: Colors.text,
    fontSize: 14.5,
    fontWeight: '500',
  },
  itemSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
});
