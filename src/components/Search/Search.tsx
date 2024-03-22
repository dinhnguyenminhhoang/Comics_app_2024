import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(
    ACTIVECOLORS.primaryBlackHex,
    ACTIVECOLORS.primaryWhiteHex,
  );

  return (
    <View
      style={[
        dynamicStyle.inputContainerCpn,
        resuable.rowWithSpace,
        Shadow(ACTIVECOLORS.darkShadow).innerShadow,
      ]}>
      <TouchableOpacity onPress={() => {}}>
        <CustomIcon
          styles={dynamicStyle.inputIcon}
          name="search1"
          size={FONTSIZE.size_18}
          color={
            searchText.length > 0
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
      {searchText.length > 0 ? (
        <TouchableOpacity onPress={() => {}}>
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
