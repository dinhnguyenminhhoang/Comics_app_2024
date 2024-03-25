import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CustomIcon from 'components/Resuable/CustomIcon';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import BottomButton from 'components/ResuableButton/BottomButton';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDetailChapter} from 'state/Action/ChapterAction';
import {setComponentLevelLoading} from 'state/Slices/common/ComponentLoading';
import {RootState} from 'store/store';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {RootAppParamList} from 'utils/datatype';
type Props = NativeStackScreenProps<RootAppParamList, 'Chapters'>;
const ChapterDetail: React.FC<Props> = ({navigation, route}) => {
  const {chapter, comicId, endChapterId, startChapterId} = route.params;
  const [chapterDetail, setChapterDetail] = useState(chapter);
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const ComponentLoading = useSelector(
    (state: RootState) => state.ComponentLoading.componentLevelLoading,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const detailChapter = useAppSelector(
    (state: RootState) => state.detailChapter.data,
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (route.params?.chapter?.id > 0 && route.params?.comicId > 0) {
      dispatch(setComponentLevelLoading(true));
      dispatch(
        getDetailChapter({
          ChapterId: chapterDetail.id,
          comicId: comicId,
        }),
      ).then(() => {
        dispatch(setComponentLevelLoading(false));
      });
    }
  }, [dispatch, route.params]);
  const handleNextChapter = () => {
    dispatch(setComponentLevelLoading(true));
    dispatch(
      getDetailChapter({
        ChapterId: chapterDetail?.id + 1,
        comicId: comicId,
      }),
    ).then(() => {
      setChapterDetail({
        id: chapterDetail?.id + 1,
        name: chapterDetail.name,
        updated_at: chapterDetail.updated_at,
      });
      dispatch(setComponentLevelLoading(false));
    });
  };
  const handlePreChapter = () => {
    dispatch(setComponentLevelLoading(true));
    dispatch(
      getDetailChapter({
        ChapterId: chapterDetail.id - 1,
        comicId: comicId,
      }),
    ).then(() => {
      setChapterDetail({
        id: chapterDetail?.id - 1,
        name: chapterDetail?.name,
        updated_at: chapterDetail?.updated_at,
      });
      dispatch(setComponentLevelLoading(false));
    });
  };
  if (ComponentLoading) {
    return (
      <View style={[styles.container, resuable.center]}>
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
  return (
    <>
      <View
        style={[
          resuable.rowWithSpace,
          {
            paddingVertical: SPACING.space_10,
            backgroundColor: ACTIVECOLORS.primaryBlackHex,
            borderBottomWidth: 1,
          },
        ]}>
        <TouchableOpacity
          onPress={handlePreChapter}
          disabled={chapterDetail.id === startChapterId}>
          <CustomIcon
            name="left"
            size={FONTSIZE.size_20}
            styles={[
              styles.icon,
              {
                borderColor:
                  chapterDetail.id === startChapterId
                    ? ACTIVECOLORS.primaryGreyHex
                    : ACTIVECOLORS.primaryWhiteHex,
              },
            ]}
            color={
              chapterDetail.id === startChapterId
                ? ACTIVECOLORS.primaryGreyHex
                : ACTIVECOLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
        <ResuableText
          text={detailChapter.name}
          color={ACTIVECOLORS.primaryWhiteHex}
          size={FONTSIZE.size_20}
          fontFamily={FONTFAMILY.poppins_extrabold}
          moreStyles={{maxWidth: Dimensions.get('screen').width / 2}}
        />
        <TouchableOpacity
          onPress={handleNextChapter}
          disabled={chapterDetail.id === endChapterId}>
          <CustomIcon
            name="right"
            size={FONTSIZE.size_20}
            styles={[
              styles.icon,
              {
                borderColor:
                  chapterDetail.id === endChapterId
                    ? ACTIVECOLORS.primaryGreyHex
                    : ACTIVECOLORS.primaryWhiteHex,
              },
            ]}
            color={
              chapterDetail.id === endChapterId
                ? ACTIVECOLORS.primaryGreyHex
                : ACTIVECOLORS.primaryWhiteHex
            }
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={detailChapter?.images}
        renderItem={({item}) => (
          <View style={[styles.container]}>
            <Image
              source={{
                uri: `https://comics-api.vercel.app/images?src=
  https://api-manga-2.vercel.app/images?src=${item.cdn}`,
              }}
              style={styles.img}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      {Platform.OS === 'ios' ? (
        <BottomButton
          text="Home"
          ACTIVESCOLORS={ACTIVECOLORS}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ) : null}
    </>
  );
};

export default ChapterDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: SPACING.space_10,
    padding: SPACING.space_10,
    borderWidth: 1,
    borderRadius: BORDERRADIUS.radius_25,
  },
  img: {
    resizeMode: 'stretch',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - SPACING.space_30,
  },
});
