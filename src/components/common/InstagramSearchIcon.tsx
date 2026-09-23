import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface InstagramSearchIconProps {
  focused: boolean;
  size?: number;
  color?: string;
}

export const InstagramSearchIcon: React.FC<InstagramSearchIconProps> = ({
  focused,
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Circular Lens */}
      <Circle
        cx={10.2}
        cy={10.2}
        r={6.8}
        stroke={color}
        strokeWidth={focused ? 2.8 : 2.0}
        fill="none"
      />
      {/* 45-degree Diagonal Handle */}
      <Path
        d="M 15.2 15.2 L 19.5 19.5"
        stroke={color}
        strokeWidth={focused ? 3.0 : 2.1}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default InstagramSearchIcon;

