import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import resuable from './Resuable.style';
import CustomIcon from './CustomIcon';
import {FONTSIZE, SPACING} from 'theme/theme';
interface HeaderBackProps {
  onPress: () => void;
  Onpress2: () => void;
}
const HeaderBack: React.FC<HeaderBackProps> = ({Onpress2, onPress}) => {
  return (
    <View
      style={[
        resuable.rowWithSpace,
        {
          marginTop: SPACING.space_10,
          paddingHorizontal: SPACING.space_20,
          borderBottomWidth: 1,
          paddingBottom: SPACING.space_10,
        },
      ]}>
      <TouchableOpacity onPress={onPress}>
        <CustomIcon name={'arrowleft'} size={FONTSIZE.size_24} />
      </TouchableOpacity>
      {Onpress2 ? (
        <TouchableOpacity onPress={Onpress2}>
          <CustomIcon name={'logout'} size={FONTSIZE.size_24} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({});
