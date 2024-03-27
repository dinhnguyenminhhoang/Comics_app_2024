import resuable from 'components/Resuable/Resuable.style';
import {useAppSelector} from 'hooks/useAppSelector';
import React from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, ColorType, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import GrandientIcon from '../Resuable/GrandientIcon';
import ProfilePic from './ProfilePic';
import {useDispatch} from 'react-redux';
import {setDrakMode} from 'state/Slices/common/ThemeDarkMode';
import {setComponentLevelLoading} from 'state/Slices/common/ComponentLoading';

interface HeaderNarProps {
  title?: string;
  isLoggedIn: boolean;
}

const HeaderBar: React.FC<HeaderNarProps> = ({title, isLoggedIn}) => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  const dispatch = useDispatch<any>();
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const handleChangDarkMode = () => {
    dispatch(setDrakMode(!ThemeDarkMode));
  };
  return (
    <View
      style={[
        styles.headerContainer,
        resuable.rowWithSpace,
        {alignItems: 'flex-start'},
      ]}>
      <GrandientIcon
        name="menu-fold"
        color={ACTIVECOLORS.primaryWhiteHex}
        size={FONTSIZE.size_16}
      />
      <Text style={[styles.HeaderText, {color: ACTIVECOLORS.primaryWhiteHex}]}>
        {title}
      </Text>
      <View style={styles.profiContainer}>
        {isLoggedIn ? <ProfilePic /> : null}
        <View>
          <TouchableOpacity onPress={handleChangDarkMode}>
            {ThemeDarkMode ? (
              <Image
                source={require('../../assets/app_images/sun.png')}
                style={styles.switch}
              />
            ) : (
              <Image
                source={require('../../assets/app_images/moon.png')}
                style={styles.switch}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: SPACING.space_10,
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
  },
  profiContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: SPACING.space_4,
  },
  switch: {width: SPACING.space_36, height: SPACING.space_36},
});
export default HeaderBar;
