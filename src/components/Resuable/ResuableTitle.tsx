import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import resuable from './Resuable.style';
import ResuableText from './ResuableText';
import {COLORS, FONTFAMILY, FONTSIZE} from 'theme/theme';

interface ResuableTextProps {
  titleRight?: string;
  titleLeft?: string;
}

const ResuableTitle: React.FC<ResuableTextProps> = ({
  titleLeft,
  titleRight,
}) => {
  return (
    <View style={[resuable.rowWithSpace]}>
      <ResuableText
        color={COLORS.primaryWhiteHex}
        fontFamily={FONTFAMILY.poppins_bold}
        text={titleLeft}
        textAlign="right"
        size={FONTSIZE.size_20}
      />
      <TouchableOpacity>
        <ResuableText
          color={COLORS.primaryWhiteHex}
          fontFamily={FONTFAMILY.poppins_regular}
          text={titleRight}
          textAlign="left"
          size={FONTSIZE.size_16}
          textDecorationLine="underline"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ResuableTitle;

const styles = StyleSheet.create({});
