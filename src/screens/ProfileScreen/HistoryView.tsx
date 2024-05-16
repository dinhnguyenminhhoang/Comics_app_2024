import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ResuableText from 'components/Resuable/ResuableText';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getHistoryView} from 'state/Action/profileAction';
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

const HistoryView = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootAppParamList>>();
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useDispatch<any>();
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const historyView = useAppSelector(
    (state: RootState) => state.historyView.data,
  );
  const isLoggedId = useAppSelector(
    (state: RootState) => state.isLogger.isLoggedIn,
  );
  const isMore = useAppSelector((state: RootState) => state.historyView.isMore);
  useEffect(() => {
    if (isLoggedId) dispatch(getHistoryView({page: 1, page_size: pageSize}));
  }, [dispatch, pageSize]);
  return (
    <FlatList
      onEndReached={() => (isMore ? setPageSize(pageSize + 10) : null)}
      ListEmptyComponent={
        <ResuableText
          text="Có vẻ bạn chưa xem truyện nào nào"
          color={ACTIVECOLORS.primaryWhiteHex}
          size={FONTSIZE.size_20}
          moreStyles={{marginTop: SPACING.space_20}}
        />
      }
      data={historyView}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {comicId: item.comic.id})
          }
          style={[
            styles.listContainer,
            {borderColor: ACTIVECOLORS.primaryLightGreyHex},
          ]}>
          <View style={styles.comicContainer}>
            <Image source={{uri: item.comic.image}} style={styles.imgComic} />
            <View>
              <ResuableText
                text={item.comic.name}
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHex}
                fontFamily={FONTFAMILY.poppins_extrabold}
                size={FONTSIZE.size_20}
                moreStyles={{
                  maxWidth:
                    Dimensions.get('window').width - SPACING.space_30 * 5,
                }}
                numberOfLines={1}
              />
              <ResuableText
                text={
                  item.comic.other_name
                    ? item.comic.other_name
                    : 'Đang cập nhật'
                }
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHexRBGA}
                fontFamily={FONTFAMILY.poppins_regular}
                size={FONTSIZE.size_12}
                moreStyles={{
                  maxWidth:
                    Dimensions.get('window').width - SPACING.space_30 * 5,
                }}
                numberOfLines={1}
              />
              <ResuableText
                text={item.chapter.name}
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHexRBGA}
                fontFamily={FONTFAMILY.poppins_regular}
                size={FONTSIZE.size_12}
                moreStyles={{
                  maxWidth:
                    Dimensions.get('window').width - SPACING.space_30 * 5,
                }}
                numberOfLines={1}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default HistoryView;

const styles = StyleSheet.create({
  listContainer: {
    padding: SPACING.space_10,
    borderBottomWidth: 1,
  },
  comicContainer: {
    flexDirection: 'row',
    gap: SPACING.space_8,
  },
  imgComic: {
    width: SPACING.space_30 * 3,
    height: SPACING.space_30 * 3,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
  },
});
