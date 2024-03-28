import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import resuable from 'components/Resuable/Resuable.style';
import {useAppSelector} from 'hooks/useAppSelector';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {RootState} from 'store/store';
import {COLORS, ColorType, SPACING} from 'theme/theme';
import {RootAppParamList} from 'utils/datatype';

interface ProfilePicProps {}
const ProfilePic: React.FC<ProfilePicProps> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootAppParamList>>();
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;

  const userInfo = useAppSelector(
    (state: RootState) => state.isLogger.userInfo,
  );
  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate('Profile')}
      style={[
        styles.imgContainer,
        resuable.withSpace,
        {borderColor: ACTIVECOLORS.secondaryDarkGreyHex},
      ]}>
      <Image
        style={styles.img}
        source={{
          uri:
            userInfo?.avatar ||
            'https://st3.depositphotos.com/23594922/31822/v/1600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
        }}
      />
    </TouchableOpacity>
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
