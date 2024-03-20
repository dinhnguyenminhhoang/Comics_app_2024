import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomIcon from 'components/Resuable/CustomIcon';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import resuable from 'components/Resuable/Resuable.style';

const Search = () => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View
      style={[
        styles.inputContainerCpn,
        resuable.rowWithSpace,
        resuable.innerShadow,
      ]}>
      <TouchableOpacity onPress={() => {}}>
        <CustomIcon
          styles={styles.inputIcon}
          name="search1"
          size={FONTSIZE.size_18}
          color={
            searchText.length > 0
              ? COLORS.primaryWhiteHex
              : COLORS.primaryLightGreyHex
          }
        />
      </TouchableOpacity>
      <TextInput
        placeholder="Search ..."
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
        }}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.TextInputContainer}
      />
      {searchText.length > 0 ? (
        <TouchableOpacity onPress={() => {}}>
          <CustomIcon
            name="close"
            size={FONTSIZE.size_18}
            color={COLORS.primaryLightGreyHex}
            styles={styles.inputIcon}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainerCpn: {
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryBlackHex,
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    height: SPACING.space_16 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    flex: 1,
  },
});
