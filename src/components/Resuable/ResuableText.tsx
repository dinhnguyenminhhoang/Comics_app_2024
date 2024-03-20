import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

interface ResuableTextProps {
  text?: string;
  size?: number;
  color?: string;
  fontWeight?: string;
  textAlign?: string;
  fontFamily?: string;
  textDecorationLine?: string;
  moreStyles?: any;
  numberOfLines?: number;
}
const ResuableText: React.FC<ResuableTextProps> = ({
  text,
  size,
  color,
  fontWeight,
  textAlign = 'center',
  fontFamily,
  textDecorationLine,
  moreStyles,
  numberOfLines,
}) => {
  const textStyle = {
    fontSize: size,
    color: color,
    fontWeight: fontWeight,
    textAlign: textAlign || 'center',
    fontFamily: fontFamily,
    textDecorationLine: textDecorationLine,
  } as ViewStyle;
  return (
    <Text numberOfLines={numberOfLines} style={[textStyle, moreStyles]}>
      {text}
    </Text>
  );
};
export default ResuableText;
