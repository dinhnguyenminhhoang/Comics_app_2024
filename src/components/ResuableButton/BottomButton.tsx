import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Avata from 'components/imageCustom/Avata';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import {BORDERRADIUS, COLORS, ColorType, FONTSIZE, SPACING} from 'theme/theme';
interface BottomButtonProps {
  ACTIVESCOLORS: ColorType;
  onPress: () => void;
  text: string;
}
const BottomButton: React.FC<BottomButtonProps> = ({
  ACTIVESCOLORS,
  onPress,
  text,
}) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.btn,
          {backgroundColor: ACTIVESCOLORS.primaryWhiteHexRBGA},
          resuable.innerShadow,
        ]}>
        <Text
          style={{
            color: ACTIVESCOLORS.primaryBlackHex,
            fontSize: FONTSIZE.size_14,
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height / 25,
    right: 10,
  },
  btn: {
    borderWidth: 1,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_25,
  },
});
