import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {COLORS, ColorType, SPACING} from 'theme/theme';
import {AntDesign} from '@expo/vector-icons';
import CustomIcon from './CustomIcon';
import resuable from './Resuable.style';
import {useAppSelector} from 'hooks/useAppSelector';
interface GrandientIconProps {
  name: string;
  size: number;
  color: string;
}
const GrandientIcon: React.FC<GrandientIconProps> = ({name, size, color}) => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(
    ACTIVECOLORS.secondaryDarkGreyHex,
    ACTIVECOLORS.secondaryDarkGreyHex,
  );
  return (
    <View style={[dynamicStyle.container, resuable.center]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[dynamicStyle.linearGBG, resuable.center]}
        colors={[ACTIVECOLORS.primaryGreyHex, ACTIVECOLORS.primaryBlackHex]}>
        <CustomIcon name={name} size={size} color={color} />
      </LinearGradient>
    </View>
  );
};

const styles = (borderColor: string, bgColor: string) =>
  StyleSheet.create({
    container: {
      borderWidth: 2,
      borderColor: borderColor,
      borderRadius: SPACING.space_12,
      backgroundColor: bgColor,
      overflow: 'hidden',
    },
    linearGBG: {
      height: SPACING.space_36,
      width: SPACING.space_36,
    },
  });
export default GrandientIcon;
