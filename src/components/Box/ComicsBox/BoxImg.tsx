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
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import ResuableText from 'components/Resuable/ResuableText';
import HeightSpacer from 'components/Resuable/HeightSpacer';

interface boxImgProps {
  item: ComicType;
  stick?: string;
  moreStyles?: any;
}
const BoxImg: React.FC<boxImgProps> = ({item, stick, moreStyles}) => {
  return (
    <>
      <ImageBackground
        source={
          item?.image !== ''
            ? {
                uri: item.image,
              }
            : require('../../../assets/app_images/noimg.png')
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
                color={COLORS.primaryWhiteHex}
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
          resuable.innerShadow,
          styles.titleContainer,
          resuable.withSpace,
        ]}>
        <ResuableText
          text={item.name}
          color={COLORS.primaryWhiteHex}
          fontFamily={FONTFAMILY.poppins_regular}
          size={FONTSIZE.size_10}
          numberOfLines={1}
          moreStyles={{width: SPACING.space_36 * 2.2}}
        />
        <ResuableText
          text={item.lasted_chapter}
          color={COLORS.primaryWhiteHex}
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
    backgroundColor: COLORS.primaryBacgroundContent,
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
