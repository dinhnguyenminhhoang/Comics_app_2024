import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import resuable from './Resuable.style';
import CustomIcon from './CustomIcon';
import {COLORS, ColorType, FONTSIZE, SPACING} from 'theme/theme';
import {useAppSelector} from 'hooks/useAppSelector';
import {RootState} from 'store/store';
interface HeaderBackProps {
  onPress: () => void;
  Onpress2: () => void;
}
const HeaderBack: React.FC<HeaderBackProps> = ({Onpress2, onPress}) => {
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  return (
    <View
      style={[
        resuable.rowWithSpace,
        {
          marginTop: SPACING.space_10,
          paddingHorizontal: SPACING.space_20,
          borderBottomWidth: 1,
          borderColor: ACTIVECOLORS.primaryLightGreyHex,
          paddingBottom: SPACING.space_10,
        },
      ]}>
      <TouchableOpacity onPress={onPress}>
        <CustomIcon
          name={'arrowleft'}
          size={FONTSIZE.size_24}
          color={ACTIVECOLORS.primaryWhiteHex}
        />
      </TouchableOpacity>
      {Onpress2 ? (
        <TouchableOpacity onPress={Onpress2}>
          <CustomIcon
            name={'logout'}
            size={FONTSIZE.size_24}
            color={ACTIVECOLORS.primaryWhiteHex}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({});
