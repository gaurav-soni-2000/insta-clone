import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../theme/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'following';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'secondary',
  style,
  textStyle,
  disabled = false,
}) => {
  const isPrimary = variant === 'primary';
  const isFollowing = variant === 'following';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.baseButton,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        isFollowing && styles.followingButton,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      <Text
        style={[
          styles.baseText,
          isPrimary ? styles.primaryText : styles.secondaryText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.buttonSecondary,
  },
  followingButton: {
    backgroundColor: Colors.buttonSecondary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  baseText: {
    fontSize: 14,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: Colors.buttonSecondaryText,
  },
});

