import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import resuable from './Resuable.style';
import ResuableText from './ResuableText';
import {COLORS, ColorType, FONTFAMILY, FONTSIZE} from 'theme/theme';
import {useAppSelector} from 'hooks/useAppSelector';

interface ResuableTextProps {
  titleRight?: string;
  titleLeft?: string;
  onPress?: () => void;
}

const ResuableTitle: React.FC<ResuableTextProps> = ({
  titleLeft,
  titleRight,
  onPress,
}) => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  return (
    <View style={[resuable.rowWithSpace]}>
      <ResuableText
        color={ACTIVECOLORS.primaryWhiteHex}
        fontFamily={FONTFAMILY.poppins_semibold}
        text={titleLeft}
        textAlign="right"
        size={FONTSIZE.size_18}
      />
      <TouchableOpacity onPress={onPress}>
        <ResuableText
          color={ACTIVECOLORS.primaryWhiteHex}
          fontFamily={FONTFAMILY.poppins_regular}
          text={titleRight}
          textAlign="left"
          size={FONTSIZE.size_14}
          textDecorationLine="underline"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ResuableTitle;

const styles = StyleSheet.create({});
