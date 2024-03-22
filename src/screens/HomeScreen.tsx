import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import ComicsBox from 'components/Box/ComicsBox/ComicsBox';
import ComicsBoxLoadPage from 'components/Box/ComicsBox/ComicsBoxLoadPage';
import Genres from 'components/Box/Genres/Genres';
import HeaderBar from 'components/Header/HeaderBar';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import ResuableTitle from 'components/Resuable/ResuableTitle';
import Search from 'components/Search/Search';
import {conmicsData} from 'data/ComicsData';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getListGenres} from 'state/Action/GenresAction';
import {
  getListComics,
  getListMostViewChapter,
  getListMostViewComics,
  getListNewChapter,
  getListNewComics,
} from 'state/Action/comicAction';
import {COLORS, SPACING} from 'theme/theme';
import {COMICPARAM} from 'utils/ApiType';
import {ComicType} from 'utils/datatype';

export default function HomeScreen() {
  const [getMoreComics, setGetMoreComics] = useState<number>(12);
  const tabBarHeight = useBottomTabBarHeight();
  const dispath = useDispatch<any>();
  const listComics = useAppSelector((state: any) => state.listComics.data);
  const listNewChapter = useAppSelector(
    (state: any) => state.listNewChapter.data,
  );
  const listNewComics = useAppSelector(
    (state: any) => state.listNewComics.data,
  );
  const listMostViewComics = useAppSelector(
    (state: any) => state.listMostViewComics.data,
  );
  const listMostViewChapter = useAppSelector(
    (state: any) => state.listMostViewChapter.data,
  );
  const listGenres = useAppSelector((state: any) => state.getListGenres.data);
  useEffect(() => {
    dispath(getListComics({...COMICPARAM, page: 1, page_size: getMoreComics}));
  }, [dispath, getMoreComics]);
  useEffect(() => {
    dispath(
      getListNewComics({...COMICPARAM, page: 1, page_size: 10, sort_by: 0}),
    );
    dispath(
      getListMostViewComics({
        ...COMICPARAM,
        page: 1,
        page_size: 12,
        sort_by: 2,
      }),
    );
    dispath(
      getListNewChapter({
        ...COMICPARAM,
        page: 1,
        page_size: 12,
        sort_by: 1,
      }),
    );
    dispath(
      getListMostViewChapter({
        ...COMICPARAM,
        page: 1,
        page_size: 12,
        sort_by: 3,
      }),
    );
    dispath(getListGenres());
  }, [dispath]);
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <View style={[styles.ScrollViewFlex]}>
        <HeaderBar title="Comics" />
        <ScrollView style={[{marginBottom: tabBarHeight}]}>
          <HeightSpacer height={SPACING.space_20} />
          <Search />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Categories" titleRight="More" />
          <HeightSpacer height={SPACING.space_16} />
          <Genres listGenres={listGenres} />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Trending" titleRight="More" />
          <ComicsBox listComics={listNewChapter as ComicType[]} />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="New" titleRight="More" />
          <ComicsBox listComics={listNewComics as ComicType[]} stick="new" />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Hot Comics" titleRight="More" />
          <ComicsBox
            listComics={listMostViewComics as ComicType[]}
            stick="hot"
          />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Hot Chapters" titleRight="More" />
          <ComicsBox
            listComics={listMostViewChapter as ComicType[]}
            stick="hot"
          />
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle titleLeft="Hot" titleRight="More" />
          <ComicsBoxLoadPage
            listComics={listComics as ComicType[]}
            stick="hot"
            setMoreComic={setGetMoreComics}
          />
        </ScrollView>
      </View>
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
