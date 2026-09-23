import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';
import { useInstagram } from '../context/InstagramContext';
import { BottomTabParamList } from '../types/navigation';
import { HomeScreen } from '../screens/main/HomeScreen';
import { ExploreScreen } from '../screens/main/ExploreScreen';
import { ReelsScreen } from '../screens/main/ReelsScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { DirectMessagesScreen } from '../screens/sub/DirectMessagesScreen';
import { resolveImage } from '../utils/assetService';

import { InstagramHomeIcon } from '../components/common/InstagramHomeIcon';
import { InstagramReelsIcon } from '../components/common/InstagramReelsIcon';
import { InstagramDirectIcon } from '../components/common/InstagramDirectIcon';
import { InstagramSearchIcon } from '../components/common/InstagramSearchIcon';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const { currentUser } = useInstagram();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      {/* 1. Home - Exact Instagram Home icon with arched doorway */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <InstagramHomeIcon focused={focused} size={25} color={Colors.text} />
          ),
        }}
      />

      {/* 2. Reels - Exact Instagram Reels squircle with hollow play triangle */}
      <Tab.Screen
        name="ReelsTab"
        component={ReelsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <InstagramReelsIcon focused={focused} size={25} color={Colors.text} />
          ),
        }}
      />

      {/* 3. Direct Message / Send with red badge - Exact Instagram Direct paper plane */}
      <Tab.Screen
        name="MessagesTab"
        component={DirectMessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <InstagramDirectIcon
              focused={focused}
              size={24}
              color={Colors.text}
              hasBadge={true}
            />
          ),
        }}
      />

      {/* 4. Search / Explore - Exact Instagram Search magnifying glass */}
      <Tab.Screen
        name="SearchTab"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <InstagramSearchIcon focused={focused} size={24} color={Colors.text} />
          ),
        }}
      />

      {/* 5. Profile - Exact Instagram Profile avatar with black ring gap when active */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.avatarTabWrapper,
                focused && styles.avatarTabActive,
              ]}
            >
              <Image
                source={resolveImage(currentUser?.profileImage || 'gaurav.jpg')}
                style={focused ? styles.avatarTabImgActive : styles.avatarTabImg}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000000',
    borderTopColor: '#262626',
    borderTopWidth: 0.5,
    height: 52,
    paddingBottom: 4,
    paddingTop: 4,
  },
  avatarTabWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  avatarTabActive: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarTabImg: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  avatarTabImgActive: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
  },
});

export default BottomTabNavigator;
