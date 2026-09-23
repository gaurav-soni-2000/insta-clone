import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

interface InstagramReelsIconProps {
  focused: boolean;
  size?: number;
  color?: string;
}

export const InstagramReelsIcon: React.FC<InstagramReelsIconProps> = ({
  focused,
  size = 25,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Outer Squircle */}
      <Rect
        x={2.5}
        y={2.5}
        width={19}
        height={19}
        rx={5.0}
        ry={5.0}
        stroke={color}
        strokeWidth={focused ? 2.3 : 2.1}
        fill={focused ? color : 'none'}
      />

      {/* Inner Play Triangle */}
      {focused ? (
        <Path
          d="M 9.5 7.8 C 9.5 7.1 10.3 6.6 11.0 7.0 L 16.5 11.1 C 17.2 11.5 17.2 12.5 16.5 12.9 L 11.0 17.0 C 10.3 17.4 9.5 16.9 9.5 16.2 Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth={1}
          strokeLinejoin="round"
        />
      ) : (
        <Path
          d="M 9.5 7.8 C 9.5 7.1 10.3 6.6 11.0 7.0 L 16.5 11.1 C 17.2 11.5 17.2 12.5 16.5 12.9 L 11.0 17.0 C 10.3 17.4 9.5 16.9 9.5 16.2 Z"
          fill="none"
          stroke={color}
          strokeWidth={2.1}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </Svg>
  );
};

export default InstagramReelsIcon;
