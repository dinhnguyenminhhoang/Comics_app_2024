import {AntDesign, FontAwesome} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import CommentModel from 'components/Model/CommentModel';
import CustomIcon from 'components/Resuable/CustomIcon';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import {useAppSelector} from 'hooks/useAppSelector';
import {Image} from 'expo-image';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
  const {chapter, comicId, endChapterId, startChapterId, optionChapters} =
    route.params;
  const [chapterDetail, setChapterDetail] = useState(chapter);
  const [showComment, setShowComment] = useState(false);
  const [changeServer, setChangeServer] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
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
  const flatListRef = useRef<FlatList>(null);
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
        name: chapterDetail?.name,
        updated_at: chapterDetail.updated_at,
      });
      dispatch(setComponentLevelLoading(false));
      flatListRef.current?.scrollToOffset({offset: 0, animated: true});
    });
  };
  const handlePreChapter = async () => {
    try {
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
        flatListRef.current?.scrollToOffset({offset: 0, animated: true});
      });
    } catch (error) {
      dispatch(setComponentLevelLoading(false));
    }
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
  const reversedChapters = optionChapters ? [...optionChapters].reverse() : [];
  return (
    <>
      <StatusBar hidden />
      <View
        style={[
          {
            paddingVertical: SPACING.space_10,
            backgroundColor: ACTIVECOLORS.primaryBlackHex,
            borderBottomWidth: 1,
            gap: SPACING.space_8,
          },
        ]}>
        <View style={[resuable.rowWithSpace]}>
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
          <View style={styles.contentWrapper}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={chapterDetail}
                style={styles.picker}
                onValueChange={itemValue => {
                  try {
                    dispatch(setComponentLevelLoading(true));
                    dispatch(
                      getDetailChapter({
                        ChapterId: itemValue.id,
                        comicId: comicId,
                      }),
                    ).then(() => {
                      setChapterDetail(itemValue);
                      dispatch(setComponentLevelLoading(false));
                    });
                  } catch (error) {
                    dispatch(setComponentLevelLoading(false));
                  }
                }}>
                <Picker.Item
                  label={`${detailChapter.name}`}
                  value={detailChapter}
                  style={{fontSize: 16}}
                />
                {reversedChapters?.length ? (
                  reversedChapters?.map(chapter => (
                    <Picker.Item
                      style={{fontSize: 12}}
                      key={chapter.id}
                      label={`${chapter.name}`}
                      value={chapter}
                    />
                  ))
                ) : (
                  <ResuableText
                    text="Truyện chưa có chapter nào"
                    color={ACTIVECOLORS.primaryBlackHex}
                    size={FONTSIZE.size_20}
                    fontFamily={FONTFAMILY.poppins_bold}
                  />
                )}
              </Picker>
            </View>
            <View
              style={[
                resuable.rowWithSpace,
                {justifyContent: 'center', gap: SPACING.space_10},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setShowComment(true);
                }}
                style={styles.borderBtn}>
                <FontAwesome
                  name="commenting-o"
                  size={FONTSIZE.size_12}
                  color="black"
                />
                <Text style={styles.borderText}>Bình Luận</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setChangeServer(!changeServer);
                }}
                style={styles.borderBtn}>
                <AntDesign
                  name="retweet"
                  size={FONTSIZE.size_12}
                  color="black"
                />
                <Text style={styles.borderText}>
                  {!changeServer ? 'Server 1' : 'Server 2'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
      </View>
      {showComment ? (
        <CommentModel
          chapterId={detailChapter.id}
          comicId={comicId}
          showCommentcpn={showComment}
          setShowCommentcpn={setShowComment}
        />
      ) : null}
      <ScrollView>
        {detailChapter?.images?.map((item, index) => (
          <View key={index.toString()} style={styles.container}>
            <Image
              source={{
                uri: `https://comics-api.vercel.app/images?src=${
                  !changeServer ? item.original : item.cdn
                }`,
              }}
              style={styles.img}
              contentFit="fill"
              cachePolicy="memory-disk"
              placeholderContentFit="contain"
            />
          </View>
        ))}
      </ScrollView>
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
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - SPACING.space_30,
  },
  btnContainer: {
    position: 'absolute',
    top: SPACING.space_30 * 3,
    left: 10,
  },
  btn: {
    borderWidth: 1,
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  borderBtn: {
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_8 - 2,
    borderRadius: BORDERRADIUS.radius_4,
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  borderText: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  containerPicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  contentWrapper: {
    width: Dimensions.get('window').width / 2,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: SPACING.space_8,
  },
  picker: {
    width: Dimensions.get('window').width / 2,
    fontSize: FONTSIZE.size_10,
  },
});
