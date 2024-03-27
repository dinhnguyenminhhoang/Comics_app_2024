import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'hooks/useAppSelector';
import {RootState} from 'store/store';
import {getProfileUser} from 'state/Action/profileAction';
import resuable from 'components/Resuable/Resuable.style';
import Avata from 'components/imageCustom/Avata';
import {COLORS, ColorType, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import ResuableText from 'components/Resuable/ResuableText';
import {ThemeDarkMode} from 'state/Slices/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrifileScreen = () => {
  const dispatch = useDispatch<any>();
  const userProfile = useAppSelector(
    (state: RootState) => state.userProfile.data,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  useEffect(() => {
    dispatch(getProfileUser());
  }, [dispatch]);
  console.log('prifileScreen', userProfile);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: ACTIVECOLORS.primaryBlackHex},
      ]}>
      <View
        style={[
          resuable.rowWithSpace,
          styles.rowContainer,
          {borderColor: ACTIVECOLORS.primaryWhiteHexRBGA},
        ]}>
        <Avata
          src={userProfile.avatar}
          customerStyles={{
            width: SPACING.space_30 * 3,
            height: SPACING.space_30 * 3,
          }}
        />
        <View>
          <ResuableText
            text={`${userProfile.first_name} ${userProfile.last_name}`}
            textAlign="left"
            color={ACTIVECOLORS.primaryWhiteHex}
            fontFamily={FONTFAMILY.poppins_semibold}
            size={FONTSIZE.size_20}
          />
          <ResuableText
            text={userProfile.username}
            textAlign="left"
            color={ACTIVECOLORS.secondaryLightGreyHex}
            fontFamily={FONTFAMILY.poppins_regular}
            size={FONTSIZE.size_12}
          />
          <ResuableText
            text={userProfile.email}
            textAlign="left"
            color={ACTIVECOLORS.secondaryLightGreyHex}
            fontFamily={FONTFAMILY.poppins_regular}
            size={FONTSIZE.size_12}
          />
        </View>
      </View>
    </View>
  );
};

export default PrifileScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  rowContainer: {
    justifyContent: 'flex-start',
    gap: SPACING.space_4,
    paddingBottom: SPACING.space_16,
    borderBottomWidth: 1,
    paddingHorizontal: SPACING.space_20,
    paddingTop: SPACING.space_20,
  },
});
