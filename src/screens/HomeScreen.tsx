import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from 'store/store';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from 'theme/theme';
import HeaderBar from 'components/HeaderBar';

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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar title="Coffee shop" />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flex: 1,
  },
});
