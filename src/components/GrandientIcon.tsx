import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {COLORS, SPACING} from 'theme/theme';
import {AntDesign} from '@expo/vector-icons';
import CustomIcon from './CustomIcon';
interface GrandientIconProps {
  name: string;
  size: number;
  color: string;
}
const GrandientIcon: React.FC<GrandientIconProps> = ({name, size, color}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.linearGBG}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
        <CustomIcon name={name} size={size} color={color} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    overflow: 'hidden',
  },
  linearGBG: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default GrandientIcon;
