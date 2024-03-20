import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ComicType} from 'utils/datatype';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import WidthSpacer from 'components/Resuable/WidthSpacer';

interface ComicsBoxProps {
  listComics: ComicType[];
}
const ComicsBox: React.FC<ComicsBoxProps> = ({listComics}) => {
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
          <Image
            source={{
              uri: item.image,
            }}
            alt=""
            resizeMode="cover"
            height={125}
            width={90}
            style={styles.img}
          />
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
    borderRadius: BORDERRADIUS.radius_25,
  },
});
