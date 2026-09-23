import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { InstagramReshareIcon } from '../common/InstagramReshareIcon';

export type ProfileTabType = 'posts' | 'reels' | 'reposts' | 'tagged';

interface ProfileTabsProps {
  activeTab: ProfileTabType;
  onTabChange: (tab: ProfileTabType) => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {/* Posts Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabChange('posts')}
        style={[styles.tabButton, activeTab === 'posts' && styles.activeTab]}
      >
        <Ionicons
          name="grid-outline"
          size={22}
          color={activeTab === 'posts' ? Colors.text : Colors.textTertiary}
        />
      </TouchableOpacity>

      {/* Reels Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabChange('reels')}
        style={[styles.tabButton, activeTab === 'reels' && styles.activeTab]}
      >
        <View style={[styles.tabReelsBox, { borderColor: activeTab === 'reels' ? Colors.text : Colors.textTertiary }]}>
          <Ionicons
            name="play"
            size={10}
            color={activeTab === 'reels' ? Colors.text : Colors.textTertiary}
            style={{ marginLeft: 1 }}
          />
        </View>
      </TouchableOpacity>

      {/* Reposts Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabChange('reposts')}
        style={[styles.tabButton, activeTab === 'reposts' && styles.activeTab]}
      >
        <InstagramReshareIcon
          size={22}
          color={activeTab === 'reposts' ? Colors.text : Colors.textTertiary}
        />
      </TouchableOpacity>

      {/* Tagged Tab */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabChange('tagged')}
        style={[styles.tabButton, activeTab === 'tagged' && styles.activeTab]}
      >
        <MaterialCommunityIcons
          name="account-box-outline"
          size={23}
          color={activeTab === 'tagged' ? Colors.text : Colors.textTertiary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 44,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.text,
  },
  tabReelsBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

