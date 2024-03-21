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
import {useSelector} from 'react-redux';
import {useAppSelector} from 'components/hooks/useAppSelector';

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const counter = useAppSelector((state: any) => state.counter);
  console.log('counter', counter);
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
          <ComicsBox listComics={conmicsData as ComicType[]} stick="new" />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Hot" titleRight="More" />
          <ComicsBox listComics={conmicsData as ComicType[]} stick="hot" />
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
