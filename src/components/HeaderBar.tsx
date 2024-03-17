import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import GrandientIcon from './GrandientIcon';
import ProfilePic from './ProfilePic';

interface HeaderNarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderNarProps> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <GrandientIcon
        name="menu-fold"
        color={COLORS.primaryGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
export default HeaderBar;
