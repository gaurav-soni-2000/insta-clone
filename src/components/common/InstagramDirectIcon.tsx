import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface InstagramDirectIconProps {
  focused?: boolean;
  size?: number;
  color?: string;
  hasBadge?: boolean;
  badgeCount?: number | string;
}

export const InstagramDirectIcon: React.FC<InstagramDirectIconProps> = ({
  focused = false,
  size = 24,
  color = '#FFFFFF',
  hasBadge = false,
  badgeCount = 13,
}) => {
  // Smooth native Instagram paper plane contour matching official app geometry
  const outerContour =
    'M 5.0 4.0 H 19.5 C 20.8 4.0 21.6 5.0 21.0 6.2 L 13.8 20.8 C 13.3 21.8 11.7 21.8 11.2 20.8 L 6.2 12.0 C 5.5 10.8 3.8 9.5 3.2 8.0 C 2.4 6.0 3.2 4.0 5.0 4.0 Z';

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {focused ? (
          <>
            {/* Active: solid white filled body with round corners */}
            <Path
              d={outerContour}
              fill={color}
              stroke={color}
              strokeWidth={0.5}
              strokeLinejoin="round"
            />
            {/* The signature diagonal fold slit cutting across the plane */}
            <Path
              d="M 4.6 12.0 L 15.2 8.0"
              stroke="#000000"
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* Inactive: outline shape */}
            <Path
              d={outerContour}
              stroke={color}
              strokeWidth={2.0}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Fold line */}
            <Path
              d="M 5.6 12.0 L 15.2 8.0"
              stroke={color}
              strokeWidth={2.0}
              strokeLinecap="round"
            />
          </>
        )}
      </Svg>

      {/* Red Notification Badge with unread count matching native Instagram */}
      {hasBadge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    bottom: -3,
    right: -7,
    backgroundColor: '#FF3040',
    minWidth: 16.5,
    height: 16.5,
    borderRadius: 8.25,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000000',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default InstagramDirectIcon;
