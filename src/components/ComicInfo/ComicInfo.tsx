import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useAppSelector} from 'hooks/useAppSelector';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {ComicDetailType} from 'utils/datatype';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import ResuableText from 'components/Resuable/ResuableText';
import HeightSpacer from 'components/Resuable/HeightSpacer';

interface ComicInfoProps {
  comicById: ComicDetailType;
}
const ComicInfo: React.FC<ComicInfoProps> = ({comicById}) => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;

  const dynamicStyle = styles(ACTIVECOLORS.primaryBlackHex);
  return (
    <>
      <Image
        source={{uri: comicById.image}}
        style={dynamicStyle.image}
        resizeMode="cover"
      />
      <View style={dynamicStyle.overlayImg}></View>
      <View style={[dynamicStyle.titleContainer]}>
        <Image source={{uri: comicById.image}} style={dynamicStyle.ImgSub} />
        <WidthSpacer width={SPACING.space_10} />
        <View style={dynamicStyle.comicInfo}>
          <ResuableText
            size={FONTSIZE.size_16}
            color={ACTIVECOLORS.fixColorWhite}
            fontFamily={FONTFAMILY.poppins_bold}
            text={comicById.name}
            textAlign="left"
            moreStyles={{maxWidth: SPACING.space_30 * 6}}
            numberOfLines={2}
          />
          <ResuableText
            size={FONTSIZE.size_16}
            color={ACTIVECOLORS.fixColorWhite}
            fontFamily={FONTFAMILY.poppins_regular}
            text={`Authors : ${
              comicById.authors?.map(item => item.name).join(' ') || 'updating'
            } `}
            textAlign="left"
          />
          <HeightSpacer height={SPACING.space_12} />
          <ResuableText
            size={FONTSIZE.size_14}
            color={ACTIVECOLORS.primaryWhiteHex}
            fontFamily={FONTFAMILY.poppins_regular}
            text={`Chapter : ${comicById.chapters?.length || 0}`}
            textAlign="left"
          />
          <ResuableText
            size={FONTSIZE.size_14}
            color={ACTIVECOLORS.primaryWhiteHex}
            fontFamily={FONTFAMILY.poppins_regular}
            text={`Status:${comicById.is_finished ? 'Finished' : 'Unfinshed'}`}
            textAlign="left"
          />
          <ResuableText
            size={FONTSIZE.size_14}
            color={ACTIVECOLORS.primaryWhiteHex}
            fontFamily={FONTFAMILY.poppins_regular}
            text={comicById.genres?.map(item => item.name).join(' . ')}
            moreStyles={{maxWidth: SPACING.space_30 * 5}}
            textAlign="left"
          />
        </View>
      </View>
    </>
  );
};

export default ComicInfo;

const styles = (bg: string) =>
  StyleSheet.create({
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height / 3 - SPACING.space_30,
    },
    overlayImg: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      height: Dimensions.get('window').height / 3 - SPACING.space_30,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderBottomRightRadius: BORDERRADIUS.radius_25,
      borderBottomLeftRadius: BORDERRADIUS.radius_25,
    },
    titleContainer: {
      flexDirection: 'row',
      position: 'absolute',
      margin: 15,
      top:
        Dimensions.get('window').height / 3 -
        (StatusBar?.currentHeight || SPACING.space_30 * 2) -
        SPACING.space_20 * 5,
      left: 0,
      right: 0,
      height: Dimensions.get('window').height / 3 - SPACING.space_20,
      backgroundColor: 'transparent',
    },
    ImgSub: {
      borderRadius: BORDERRADIUS.radius_25,
      width: Dimensions.get('window').width / 3 + SPACING.space_30,
    },
    comicInfo: {
      marginTop: SPACING.space_8,
      gap: 5,
    },
  });
