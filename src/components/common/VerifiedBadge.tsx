import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

interface VerifiedBadgeProps {
  size?: number;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 14 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <MaterialIcons name="verified" size={size} color={Colors.verified} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
});

