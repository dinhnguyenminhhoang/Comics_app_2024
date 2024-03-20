import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from 'store/store';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import HeaderBar from 'components/Header/HeaderBar';
import Search from 'components/Search/Search';
import ResuableText from 'components/Resuable/ResuableText';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import Genres from 'components/Box/Genres/Genres';
import resuable from 'components/Resuable/Resuable.style';
import ResuableTitle from 'components/Resuable/ResuableTitle';
import ComicsBox from 'components/Box/ComicsBox/ComicsBox';
import {conmicsData} from 'data/ComicsData';
import {ComicType} from 'utils/datatype';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};
const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};
export default function HomeScreen() {
  const CoffeeList = useStore((state: any) => state.coffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchIndex, setSearchIndex] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortCoffee, setSortCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollViewFlex]}>
        <HeaderBar title="Comics" />
        <ScrollView style={[{marginBottom: tabBarHeight}]}>
          <HeightSpacer height={SPACING.space_20} />
          <Search />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Categories" titleRight="More" />
          <HeightSpacer height={SPACING.space_16} />
          <Genres
            listGenres={[
              {id: 1, title: 'action'},
              {id: 2, title: 'manga'},
              {id: 3, title: 'manhuo'},
              {id: 4, title: 'love'},
              {id: 5, title: 'drama'},
              {id: 6, title: 'school'},
            ]}
          />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Trending" titleRight="More" />
          <ComicsBox listComics={conmicsData as ComicType[]} />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="New" titleRight="More" />
          <ComicsBox listComics={conmicsData as ComicType[]} />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Hot" titleRight="More" />
          <ComicsBox listComics={conmicsData as ComicType[]} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    padding: SPACING.space_12,
  },
  ScrollViewFlex: {
    flex: 1,
  },
});
