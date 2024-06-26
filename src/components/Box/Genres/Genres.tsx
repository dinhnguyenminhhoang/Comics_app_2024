import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import Shadow from 'components/Resuable/Shadow.style';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import {useAppSelector} from 'hooks/useAppSelector';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {RootStackParamList, genresType} from 'utils/datatype';

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
  const navigation =
    useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const ViewItem: React.FC<{title: string; id: number}> = ({title, id}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Filter', {
          genresId: id,
        })
      }
      style={[
        resuable.center,
        styles.boxGenresContainer,
        Shadow(ACTIVECOLORS.darkShadow).innerShadow,
        {backgroundColor: ACTIVECOLORS.primaryBlackHex},
      ]}>
      <Image source={srcListIcon[0].src} alt="" />
      <HeightSpacer height={SPACING.space_4} />
      <ResuableText
        text={title}
        color={ACTIVECOLORS.primaryWhiteHex}
        fontFamily={FONTFAMILY.poppins_medium}
        size={FONTSIZE.size_18}
        textAlign="center"
      />
    </TouchableOpacity>
  );
  const middleIndex = Math.floor(listGenres?.length / 2);
  const firstHalf = listGenres?.slice(0, middleIndex);
  const secondHalf = listGenres?.slice(middleIndex);
  return (
    <View
      style={[
        resuable.rowWithSpace,
        {gap: SPACING.space_10, flexWrap: 'wrap'},
      ]}>
      <FlatList
        data={firstHalf}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <WidthSpacer width={SPACING.space_10} />}
        horizontal
        renderItem={({item, index}) => (
          <View style={{gap: SPACING.space_10, padding: 4}}>
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
    minWidth: SPACING.space_30 * 3,
  },
});
