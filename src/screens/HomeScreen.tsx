import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ComicsBox from 'components/Box/ComicsBox/ComicsBox';
import ComicsBoxLoadPage from 'components/Box/ComicsBox/ComicsBoxLoadPage';
import Genres from 'components/Box/Genres/Genres';
import HeaderBar from 'components/Header/HeaderBar';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import ResuableTitle from 'components/Resuable/ResuableTitle';
import Search from 'components/Search/Search';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
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
import {setComponentLevelLoading} from 'state/Slices/common/ComponentLoading';
import {RootState} from 'store/store';
import {COLORS, ColorType, FONTSIZE, SPACING} from 'theme/theme';
import {COMICPARAM} from 'utils/ApiType';
import {ComicType, RootStackParamList} from 'utils/datatype';

export default function HomeScreen() {
  const systemColorScheme = useColorScheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [getMoreComics, setGetMoreComics] = useState<number>(12);
  const [Loading, setLoading] = useState<Boolean>(false);
  const tabBarHeight = useBottomTabBarHeight();
  const dispath = useDispatch<any>();
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryBlackHex);
  const listComics = useAppSelector(
    (state: RootState) => state.listComics.data,
  );
  const hasMoreComics = useAppSelector(
    (state: RootState) => state.listComics.hasMore,
  ) as boolean;

  const listNewChapter = useAppSelector(
    (state: RootState) => state.listNewChapter.data,
  );
  const listNewComics = useAppSelector(
    (state: RootState) => state.listNewComics.data,
  );
  const listMostViewComics = useAppSelector(
    (state: RootState) => state.listMostViewComics.data,
  );
  const listMostViewChapter = useAppSelector(
    (state: RootState) => state.listMostViewChapter.data,
  );
  const listGenres = useAppSelector(
    (state: RootState) => state.getListGenres.data,
  );
  const ComponentLoading = useAppSelector(
    (state: RootState) => state.ComponentLoading.componentLevelLoading,
  );
  const isLoggedId = useAppSelector(
    (state: RootState) => state.isLogger.isLoggedIn,
  );
  useEffect(() => {
    dispath(setComponentLevelLoading(true));
    dispath(getListComics({...COMICPARAM, page: 1, page_size: getMoreComics}));
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
  useEffect(() => {
    if (
      listComics?.length &&
      listNewChapter?.length &&
      listNewComics?.length &&
      listMostViewComics?.length &&
      listMostViewChapter?.length &&
      listGenres?.length
    ) {
      dispath(setComponentLevelLoading(false));
    }
  }, [
    listComics,
    listNewChapter,
    listNewComics,
    listMostViewComics,
    listMostViewChapter,
    listGenres,
  ]);
  if (ComponentLoading) {
    return (
      <View style={[dynamicStyle.ScreenContainer, resuable.center]}>
        <ActivityIndicator size={40} />
        <ResuableText
          text="Loading..."
          size={FONTSIZE.size_20}
          color={ACTIVECOLORS.secondaryLightGreyHex}
          moreStyles={{marginTop: SPACING.space_8}}
        />
      </View>
    );
  }
  const handleLoadMore = async () => {
    try {
      if (Loading) {
        await dispath(
          getListComics({
            ...COMICPARAM,
            page: 1,
            page_size: getMoreComics + 12,
          }),
        ).then(() => {
          setLoading(false);
          setGetMoreComics(getMoreComics + 12);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleScroll = async (event: any) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isAtEnd =
      layoutMeasurement.height + contentOffset.y >= contentSize.height;
    if (isAtEnd && hasMoreComics) {
      setLoading(true);
      await handleLoadMore();
    }
  };
  return (
    <SafeAreaView style={dynamicStyle.ScreenContainer}>
      <StatusBar
        backgroundColor={ACTIVECOLORS.fixColorBlack}
        barStyle={'default'}
      />
      <View style={[dynamicStyle.ScrollViewFlex]}>
        <HeaderBar title="Comics" />
        <ScrollView
          style={[{marginBottom: tabBarHeight}]}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          {/* search  */}
          <Search />
          {/* end search */}
          {/* category */}
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle
            titleLeft="Categories"
            titleRight="More"
            onPress={() => navigation.navigate('Filter', {})}
          />
          {/* end categories */}
          {/* Genres */}
          <HeightSpacer height={SPACING.space_16} />
          <Genres listGenres={listGenres} />
          {/* end genrtes */}
          {/* chapter */}
          <HeightSpacer height={SPACING.space_30} />
          <ResuableTitle
            onPress={() => navigation.navigate('Filter', {})}
            titleLeft="Trending"
            titleRight="More"
          />
          <ComicsBox listComics={listNewChapter as ComicType[]} />
          <HeightSpacer height={SPACING.space_30} />
          {/* end chapter */}
          {/* New */}
          <ResuableTitle
            onPress={() => navigation.navigate('Filter', {})}
            titleLeft="New"
            titleRight="More"
          />
          <ComicsBox listComics={listNewComics as ComicType[]} stick="new" />
          <HeightSpacer height={SPACING.space_30} />
          {/* end new comic */}
          {/* Hot commic */}
          <ResuableTitle
            onPress={() => navigation.navigate('Filter', {})}
            titleLeft="Hot Comics"
            titleRight="More"
          />
          <ComicsBox
            listComics={listMostViewComics as ComicType[]}
            stick="hot"
          />
          <HeightSpacer height={SPACING.space_30} />
          {/* end */}
          {/* hot chapter */}
          <ResuableTitle
            onPress={() => navigation.navigate('Filter', {})}
            titleLeft="Hot Chapters"
            titleRight="More"
          />
          <ComicsBox
            listComics={listMostViewChapter as ComicType[]}
            stick="hot"
          />
          <HeightSpacer height={SPACING.space_30} />
          {/* end */}
          <ResuableTitle
            onPress={() => navigation.navigate('Filter', {})}
            titleLeft="Hot"
            titleRight="More"
          />
          <ComicsBoxLoadPage
            listComics={listComics as ComicType[]}
            stick="hot"
          />
          {Loading ? (
            <View style={{marginVertical: SPACING.space_8}}>
              <ActivityIndicator size={40} />
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = (backgroundColor: string) =>
  StyleSheet.create({
    ScreenContainer: {
      flex: 1,
      backgroundColor: backgroundColor,
      padding: SPACING.space_8,
    },
    ScrollViewFlex: {
      flex: 1,
    },
  });
