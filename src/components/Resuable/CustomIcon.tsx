import React from 'react';
import {AntDesign} from '@expo/vector-icons';

interface CustomIconProps {
  name?: any;
  size?: number;
  color?: string;
  styles?: any;
}

const CustomIcon: React.FC<CustomIconProps> = ({name, size, color, styles}) => {
  return <AntDesign name={name} size={size} color={color} style={styles} />;
};

export default CustomIcon;
