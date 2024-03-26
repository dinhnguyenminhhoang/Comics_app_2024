import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {COLORS, ColorType, SPACING} from 'theme/theme';
import resuable from 'components/Resuable/Resuable.style';
import {useAppSelector} from 'hooks/useAppSelector';
import {RootState} from 'store/store';
import {userinfoType} from 'utils/datatype';

interface ProfilePicProps {}
const ProfilePic: React.FC<ProfilePicProps> = ({}) => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const isLoggedId = useAppSelector(
    (state: RootState) => state.isLogger.isLoggedIn,
  );
  const userInfo = useAppSelector(
    (state: RootState) => state.isLogger.userInfo,
  );
  return (
    <View>
      <View
        style={[
          styles.imgContainer,
          resuable.withSpace,
          {borderColor: ACTIVECOLORS.secondaryDarkGreyHex},
        ]}>
        {isLoggedId ? (
          <Image style={styles.img} source={{uri: userInfo.avatar}} />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    overflow: 'hidden',
  },
  img: {width: SPACING.space_36, height: SPACING.space_36},
});
export default ProfilePic;
