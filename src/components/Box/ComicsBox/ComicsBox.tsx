import HeightSpacer from 'components/Resuable/HeightSpacer';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import {ComicType} from 'utils/datatype';

interface ComicsBoxProps {
  listComics: ComicType[];
  stick?: string;
}
const ComicsBox: React.FC<ComicsBoxProps> = ({listComics, stick}) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={listComics}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <WidthSpacer width={SPACING.space_4} />}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {}}
          style={[resuable.withSpace, {marginBottom: SPACING.space_4}]}>
          <ImageBackground
            source={{
              uri: item.image,
            }}
            alt=""
            resizeMode="cover"
            style={styles.img}>
            <View
              style={[
                stick ? styles.stickContainer : styles.nonStickContainer,
              ]}>
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
              text={`Views comics ${item.viewed}`}
              color={COLORS.primaryWhiteHex}
              fontFamily={FONTFAMILY.poppins_regular}
              size={FONTSIZE.size_10}
              numberOfLines={1}
              moreStyles={{width: SPACING.space_36 * 1.8}}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ComicsBox;

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
