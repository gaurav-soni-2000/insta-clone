import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { InstagramLogo } from './InstagramLogo';

interface InstagramHeaderProps {
  onCreatePress?: () => void;
  onNotificationsPress?: () => void;
}

export const InstagramHeader: React.FC<InstagramHeaderProps> = ({
  onCreatePress,
  onNotificationsPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Top left: just + icon (not in box) */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onCreatePress}
        style={styles.iconButton}
      >
        <Feather name="plus" size={28} color={Colors.text} />
      </TouchableOpacity>

      {/* Top center logo */}
      <View style={styles.centerLogoWrapper} pointerEvents="box-none">
        <InstagramLogo width={112} height={32} color="#FFFFFF" />
      </View>

      {/* Top right: just heart icon */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onNotificationsPress}
        style={styles.iconButton}
      >
        <Feather name="heart" size={24} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    position: 'relative',
  },
  centerLogoWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconButton: {
    padding: 4,
    zIndex: 2,
  },
});
