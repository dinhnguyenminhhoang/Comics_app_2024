import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import ResuableText from './ResuableText';
interface TextIconProps {
  text: string;
  nameIcon: string;
  sizeIcon: number;
  colorIcon: string;
  textColor: string;
  textSize: number;
  fontFamily?: string;
  numberOfLines?: number;
  moreStyle?: any;
}
const TextIcon: React.FC<TextIconProps> = ({
  colorIcon,
  nameIcon,
  sizeIcon,
  text,
  textColor,
  textSize,
  fontFamily,
  numberOfLines,
  moreStyle,
}) => {
  return (
    <View style={styles.container}>
      <CustomIcon color={colorIcon} name={nameIcon} size={sizeIcon} />
      <ResuableText
        text={text}
        color={textColor}
        fontFamily={fontFamily}
        size={textSize}
        textAlign="left"
        numberOfLines={numberOfLines}
        moreStyles={moreStyle}
      />
    </View>
  );
};

export default TextIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
});
