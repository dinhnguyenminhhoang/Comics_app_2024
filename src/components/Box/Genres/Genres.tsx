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

interface genresProps {
  listGenres: {
    id: number;
    title: string;
  }[];
}

const Genres: React.FC<genresProps> = ({listGenres}) => {
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
  ];
  const ViewItem: React.FC<{title: string; id: number}> = ({title, id}) => (
    <TouchableOpacity
      onPress={() => {}}
      style={[
        resuable.center,
        styles.boxGenresContainer,
        resuable.innerShadow,
      ]}>
      <Image source={srcListIcon[id - 1]?.src} alt="" />
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

  return (
    <View
      style={[
        resuable.rowWithSpace,
        {gap: SPACING.space_10, flexWrap: 'wrap'},
      ]}>
      {listGenres?.length &&
        listGenres?.map(genre => (
          <ViewItem title={genre.title} id={genre.id} key={genre.id} />
        ))}
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
