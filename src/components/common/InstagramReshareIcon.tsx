import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface InstagramReshareIconProps {
  size?: number;
  color?: string;
}

export const InstagramReshareIcon: React.FC<InstagramReshareIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Top arrow: stem goes up, smooth 90-deg curve to the right, horizontal bar meeting right arrowhead */}
      <Path
        d="M 4.75 14.5 V 9.5 C 4.75 6.88 6.88 4.75 9.5 4.75 H 18 M 14.25 1.5 L 18.25 4.75 L 14.25 8"
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bottom arrow: stem goes down, smooth 90-deg curve to the left, horizontal bar meeting left arrowhead */}
      <Path
        d="M 19.25 9.5 V 14.5 C 19.25 17.12 17.12 19.25 14.5 19.25 H 6 M 9.75 22.5 L 5.75 19.25 L 9.75 16"
        stroke={color}
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default InstagramReshareIcon;

