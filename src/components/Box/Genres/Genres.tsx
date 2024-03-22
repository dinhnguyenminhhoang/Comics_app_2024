import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomIcon from 'components/Resuable/CustomIcon';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import {genresType} from 'utils/datatype';
import WidthSpacer from 'components/Resuable/WidthSpacer';

interface genresProps {
  listGenres: genresType[];
}

const srcListIcon = [
  {
    src: require('../../../assets/app_images/heart.png'),
  },
  {
    src: require('../../../assets/app_images/laugh.png'),
  },
  {
    src: require('../../../assets/app_images/swords.png'),
  },
  {
    src: require('../../../assets/app_images/magnifyingglass.png'),
  },
  {
    src: require('../../../assets/app_images/theatre.png'),
  },
  {
    src: require('../../../assets/app_images/school.png'),
  },
  {
    src: require('../../../assets/app_images/compass.png'),
  },
  {
    src: require('../../../assets/app_images/horror.png'),
  },
];
const Genres: React.FC<genresProps> = ({listGenres}) => {
  const ViewItem: React.FC<{title: string; id: number}> = ({title, id}) => (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        resuable.center,
        styles.boxGenresContainer,
        resuable.innerShadow,
      ]}>
      <Image
        source={
          srcListIcon[Math.floor(Math.random() * (srcListIcon.length - 1)) + 1]
            ?.src
        }
        alt=""
      />
      <HeightSpacer height={SPACING.space_4} />
      <ResuableText
        text={title}
        color={COLORS.primaryWhiteHex}
        fontFamily={FONTFAMILY.poppins_medium}
        size={FONTSIZE.size_18}
        textAlign="center"
      />
    </TouchableOpacity>
  );
  const middleIndex = Math.floor(listGenres.length / 2);
  const firstHalf = listGenres.slice(0, middleIndex);
  const secondHalf = listGenres.slice(middleIndex);
  return (
    <View
      style={[
        resuable.rowWithSpace,
        {gap: SPACING.space_10, flexWrap: 'wrap'},
      ]}>
      <FlatList
        data={firstHalf}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <WidthSpacer width={SPACING.space_10} />}
        horizontal
        renderItem={({item, index}) => (
          <View style={{gap: SPACING.space_10}}>
            <ViewItem title={item.name} id={item.id} />
            <ViewItem
              title={secondHalf[index].name}
              id={secondHalf[index].id}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Genres;

const styles = StyleSheet.create({
  boxGenresContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_8,
    backgroundColor: COLORS.primaryBlackHex,
    minWidth: SPACING.space_30 * 3,
  },
});
