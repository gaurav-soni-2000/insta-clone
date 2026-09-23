import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface InstagramHomeIconProps {
  focused: boolean;
  size?: number;
  color?: string;
}

export const InstagramHomeIcon: React.FC<InstagramHomeIconProps> = ({
  focused,
  size = 25,
  color = '#FFFFFF',
}) => {
  // Exact Instagram Home outline with arched doorway contour
  const pathData =
    'M 12 3 C 12.5 3 13 3.3 13.4 3.7 L 21.6 11.2 C 22.2 11.8 22.5 12.6 22.5 13.5 V 20.2 C 22.5 21.2 21.7 22 20.7 22 H 14.8 V 16.5 C 14.8 15.0 13.5 13.7 12 13.7 C 10.5 13.7 9.2 15.0 9.2 16.5 V 22 H 3.3 C 2.3 22 1.5 21.2 1.5 20.2 V 13.5 C 1.5 12.6 1.8 11.8 2.4 11.2 L 10.6 3.7 C 11 3.3 11.5 3 12 3 Z';

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {focused ? (
        <Path
          d={pathData}
          fill={color}
          stroke={color}
          strokeWidth={0.5}
          strokeLinejoin="round"
        />
      ) : (
        <Path
          d={pathData}
          stroke={color}
          strokeWidth={2.0}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </Svg>
  );
};

export default InstagramHomeIcon;

