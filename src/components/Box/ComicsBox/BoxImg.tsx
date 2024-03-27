import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ComicType} from 'utils/datatype';
import resuable from 'components/Resuable/Resuable.style';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import ResuableText from 'components/Resuable/ResuableText';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import {useAppSelector} from 'hooks/useAppSelector';
import Shadow from 'components/Resuable/Shadow.style';

interface boxImgProps {
  item: ComicType;
  stick?: string;
  moreStyles?: any;
}
const BoxImg: React.FC<boxImgProps> = ({item, stick, moreStyles}) => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  return (
    <>
      <ImageBackground
        source={
          item?.image !== ''
            ? {
                uri: item.image,
              }
            : {
                uri: 'https://st3.depositphotos.com/23594922/31822/v/1600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
              }
        }
        alt=""
        resizeMode="cover"
        style={moreStyles ? moreStyles : styles.img}>
        <View
          style={[stick ? styles.stickContainer : styles.nonStickContainer]}>
          {stick ? (
            <>
              <Image
                source={require('../../../assets/app_images/hoticon.png')}
                alt=""
                style={styles.stickImg}
              />
              <ResuableText
                text={stick}
                fontFamily={FONTFAMILY.poppins_bold}
                size={FONTSIZE.size_10}
                color={ACTIVECOLORS.fixColorWhite}
                textAlign="left"
                moreStyles={{}}
              />
            </>
          ) : null}
        </View>
      </ImageBackground>
      <HeightSpacer height={SPACING.space_10} />
      <View
        style={[
          Shadow(ACTIVECOLORS.darkShadow).innerShadow,
          styles.titleContainer,
          resuable.withSpace,
          {backgroundColor: ACTIVECOLORS.primaryBacgroundContent},
        ]}>
        <ResuableText
          text={item.name}
          color={ACTIVECOLORS.fixColorWhite}
          fontFamily={FONTFAMILY.poppins_regular}
          size={FONTSIZE.size_10}
          numberOfLines={1}
          moreStyles={{width: SPACING.space_36 * 2.2}}
        />
        <ResuableText
          text={item.lasted_chapter}
          color={ACTIVECOLORS.fixColorWhite}
          fontFamily={FONTFAMILY.poppins_regular}
          size={FONTSIZE.size_10}
          numberOfLines={1}
          moreStyles={{width: SPACING.space_36 * 1.8}}
        />
      </View>
    </>
  );
};

export default BoxImg;

const styles = StyleSheet.create({
  titleContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
  },
  img: {
    borderRadius: BORDERRADIUS.radius_10,
    height: SPACING.space_30 * 4.5,
    width: SPACING.space_30 * 3,
    overflow: 'hidden',
  },
  stickContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    top: 2,
    left: 2,
    maxWidth: SPACING.space_30 * 1.5,
    backgroundColor: '#ff0000',
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  nonStickContainer: {
    display: 'none',
  },
  stickImg: {
    width: SPACING.space_12,
    height: SPACING.space_12,
  },
});
