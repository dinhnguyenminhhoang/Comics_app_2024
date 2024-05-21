import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomIcon from 'components/Resuable/CustomIcon';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import resuable from 'components/Resuable/Resuable.style';
import {useAppSelector} from 'hooks/useAppSelector';
import Shadow from 'components/Resuable/Shadow.style';
import {RootState} from 'store/store';
import {useDispatch} from 'react-redux';
import {resetResultSearchComics} from 'state/Slices/Comic/GetResutSearchComicsSlice';
import useDebounce from 'hooks/useDebounce';
import {getResultSearchComics} from 'state/Action/comicAction';

interface SearchProp {
  onPress: (value: string) => void;
  setSearchText: (value: string) => void;
  searchText: string;
}
const Search: React.FC<SearchProp> = ({onPress, searchText, setSearchText}) => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  const dispatch = useDispatch<any>();
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(
    ACTIVECOLORS.primaryBlackHex,
    ACTIVECOLORS.primaryWhiteHex,
  );
  const searchComicData = useAppSelector(
    (state: RootState) => state.searchComicData.data,
  );
  const debounced = useDebounce(searchText, 500) as string;

  useEffect(() => {
    if (debounced !== '') {
      dispatch(
        getResultSearchComics({keyword: debounced, page: 1, page_size: 10}),
      );
    }
  }, [debounced, dispatch]);
  return (
    <View
      style={[
        dynamicStyle.inputContainerCpn,
        resuable.rowWithSpace,
        Shadow(ACTIVECOLORS.darkShadow).innerShadow,
      ]}>
      <TouchableOpacity onPress={() => onPress(searchText)}>
        <CustomIcon
          styles={dynamicStyle.inputIcon}
          name="search1"
          size={FONTSIZE.size_18}
          color={
            searchText?.length > 0
              ? ACTIVECOLORS.primaryWhiteHex
              : ACTIVECOLORS.primaryLightGreyHex
          }
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Search ..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
        }}
        placeholderTextColor={ACTIVECOLORS.primaryLightGreyHex}
        style={dynamicStyle.TextInputContainer}
      />
      {searchText?.length > 0 ? (
        <TouchableOpacity
          onPress={() => {
            setSearchText('');
            if (searchComicData?.length > 0)
              dispatch(resetResultSearchComics([]));
          }}>
          <CustomIcon
            name="close"
            size={FONTSIZE.size_18}
            color={ACTIVECOLORS.primaryLightGreyHex}
            styles={dynamicStyle.inputIcon}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Search;

const styles = (bg: string, cl: string) =>
  StyleSheet.create({
    inputContainerCpn: {
      borderRadius: BORDERRADIUS.radius_20,
      backgroundColor: bg,
      margin: SPACING.space_4,
    },
    inputIcon: {
      marginHorizontal: SPACING.space_20,
    },
    TextInputContainer: {
      height: SPACING.space_16 * 3,
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_14,
      color: cl,
      flex: 1,
    },
  });
