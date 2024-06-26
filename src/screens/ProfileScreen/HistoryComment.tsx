import {useFocusEffect} from '@react-navigation/native';
import ResuableText from 'components/Resuable/ResuableText';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getHistoryComment} from 'state/Action/profileAction';
import {RootState} from 'store/store';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';

const HistoryComment = () => {
  const [pageSize, setPageSize] = useState(10);
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const dispatch = useDispatch<any>();
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const historyComment = useAppSelector(
    (state: RootState) => state.historyComment.data,
  );
  const isMore = useAppSelector(
    (state: RootState) => state.historyComment.isMore,
  );
  const isLoggedId = useAppSelector(
    (state: RootState) => state.isLogger.isLoggedIn,
  );
  useFocusEffect(
    useCallback(() => {
      if (isLoggedId)
        dispatch(getHistoryComment({page: 1, page_size: pageSize}));
    }, [dispatch, pageSize]),
  );
  return (
    <FlatList
      onEndReached={() => (isMore ? setPageSize(pageSize + 10) : null)}
      ListEmptyComponent={
        <ResuableText
          text="Có vẻ bạn chưa có bình luận  nào"
          color={ACTIVECOLORS.primaryWhiteHex}
          size={FONTSIZE.size_20}
          moreStyles={{marginTop: SPACING.space_20}}
        />
      }
      data={historyComment}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[
            styles.listContainer,
            {borderColor: ACTIVECOLORS.primaryLightGreyHex},
          ]}>
          <View style={styles.comicContainer}>
            <Image source={{uri: item.comic_image}} style={styles.imgComic} />
            <View>
              <ResuableText
                text={item.comic_name}
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHex}
                fontFamily={FONTFAMILY.poppins_extrabold}
                size={FONTSIZE.size_18}
                numberOfLines={1}
                moreStyles={{
                  maxWidth:
                    Dimensions.get('window').width - SPACING.space_30 * 5,
                }}
              />
              <ResuableText
                text={item.chapter_name}
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
                text={item.content}
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHexRBGA}
                fontFamily={FONTFAMILY.poppins_regular}
                size={FONTSIZE.size_12}
                moreStyles={{
                  maxWidth:
                    Dimensions.get('window').width - SPACING.space_30 * 5,
                }}
                numberOfLines={3}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default HistoryComment;

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
