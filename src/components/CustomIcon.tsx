import React from 'react';
import {AntDesign} from '@expo/vector-icons';

interface CustomIconProps {
  name?: any;
  size?: number;
  color?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({name, size, color}) => {
  return <AntDesign name={name} size={size} color={color} />;
};

export default CustomIcon;
