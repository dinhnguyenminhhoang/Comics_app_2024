import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import GrandientIcon from '../Resuable/GrandientIcon';
import ProfilePic from './ProfilePic';
import resuable from 'components/Resuable/Resuable.style';

interface HeaderNarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderNarProps> = ({title}) => {
  return (
    <View style={[styles.headerContainer, resuable.rowWithSpace]}>
      <GrandientIcon
        name="menu-fold"
        color={COLORS.primaryWhiteHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: SPACING.space_10,
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
export default HeaderBar;
