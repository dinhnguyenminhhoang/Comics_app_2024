import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ResuableText from 'components/Resuable/ResuableText';
import {BORDERRADIUS, ColorType, SPACING} from 'theme/theme';

interface BoxtextProps {
  textTop: string;
  textBottom: string;
  ACTIVECOLORS: ColorType;
}
const Boxtext: React.FC<BoxtextProps> = ({
  textBottom,
  textTop,
  ACTIVECOLORS,
}) => {
  return (
    <View
      style={[
        styles.container,
        {borderColor: ACTIVECOLORS.primaryLightGreyHex},
      ]}>
      <ResuableText text={textTop} color={ACTIVECOLORS.primaryWhiteHex} />
      <ResuableText
        text={textBottom}
        moreStyles={{maxWidth: SPACING.space_30 * 4}}
        numberOfLines={1}
        color={ACTIVECOLORS.primaryWhiteHex}
      />
    </View>
  );
};

export default Boxtext;

const styles = StyleSheet.create({
  container: {
    minWidth: 110,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_20,
    borderWidth: 1,
  },
});
