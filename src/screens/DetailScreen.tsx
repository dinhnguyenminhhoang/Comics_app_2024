import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ComicInfo from 'components/ComicInfo/ComicInfo';
import IntroductionComic from 'components/IntroductionComic/IntroductionComic';
import ListChapter from 'components/ListChapter/ListChapter';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import BackBtn from 'components/ResuableButton/BackBtn';
import BottomButton from 'components/ResuableButton/BottomButton';
import BtnSwich from 'components/ResuableButton/BtnSwich';
import Review from 'components/Review/Review';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getComicById} from 'state/Action/comicAction';
import {COLORS, ColorType, SPACING} from 'theme/theme';
import {ComicDetailType, RootAppParamList} from 'utils/datatype';

type Props = NativeStackScreenProps<RootAppParamList, 'Details'>;

const DetailScreen: React.FC<Props> = ({route, navigation}) => {
  const dispatch = useDispatch<any>();
  const [ContentSwitch, setContentSwitch] = useState(0);
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  const comicById = useAppSelector(
    (state: any) => state.comicById.data,
  ) as ComicDetailType;

  useEffect(() => {
    dispatch(getComicById(route.params?.comicId));
  }, [dispatch, route.params?.comicId]);

  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;

  const dynamicStyle = styles(ACTIVECOLORS.primaryBlackHex);

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <ScrollView
        style={[dynamicStyle.ScreenContainer]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <StatusBar hidden={true} />
        <ComicInfo comicById={comicById} />
        <View style={dynamicStyle.ContentDetails}>
          <BtnSwich
            ACTIVECOLORS={ACTIVECOLORS}
            setContentSwitch={setContentSwitch}
          />
          <HeightSpacer height={SPACING.space_18} />
          <View>
            {ContentSwitch === 0 ? (
              <IntroductionComic
                comic={comicById}
                ACTIVECOLORS={ACTIVECOLORS}
              />
            ) : ContentSwitch === 1 ? (
              <ListChapter comic={comicById} ACTIVECOLORS={ACTIVECOLORS} />
            ) : (
              <Review />
            )}
          </View>
        </View>
      </ScrollView>
      <BottomButton ACTIVESCOLORS={ACTIVECOLORS} />
    </View>
  );
};

export default DetailScreen;

const styles = (backgroundColor: string) =>
  StyleSheet.create({
    ScreenContainer: {
      flex: 1,
      backgroundColor: backgroundColor,
      position: 'relative',
    },
    ContentDetails: {
      marginTop: Dimensions.get('window').height / 5 + SPACING.space_10,
    },
  });
