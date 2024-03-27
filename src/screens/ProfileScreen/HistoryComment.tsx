import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from 'hooks/useAppSelector';
import {RootState} from 'store/store';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import ResuableText from 'components/Resuable/ResuableText';
import {getHistoryComment, getHistoryView} from 'state/Action/profileAction';
import {useDispatch} from 'react-redux';

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
  useEffect(() => {
    if (isLoggedId) dispatch(getHistoryComment({page: 1, page_size: pageSize}));
  }, [dispatch, pageSize]);
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
        <View style={styles.listContainer}>
          <View style={styles.comicContainer}>
            <Image source={{uri: item.comic_image}} style={styles.imgComic} />
            <View>
              <ResuableText
                text={item.content}
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHex}
                fontFamily={FONTFAMILY.poppins_extrabold}
                size={FONTSIZE.size_20}
                numberOfLines={3}
              />
              <ResuableText
                text={item.comic_name}
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHexRBGA}
                fontFamily={FONTFAMILY.poppins_regular}
                size={FONTSIZE.size_12}
              />
              <ResuableText
                text={item.chapter_name}
                textAlign="left"
                color={ACTIVECOLORS.primaryWhiteHexRBGA}
                fontFamily={FONTFAMILY.poppins_regular}
                size={FONTSIZE.size_12}
              />
            </View>
          </View>
        </View>
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
