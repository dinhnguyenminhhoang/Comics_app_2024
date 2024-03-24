import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import resuable from 'components/Resuable/Resuable.style';
import {BORDERRADIUS, ColorType, SPACING} from 'theme/theme';

interface BtnSwichProps {
  ACTIVECOLORS: ColorType;
  setContentSwitch: (contentId: number) => void;
}
const BtnSwich: React.FC<BtnSwichProps> = ({
  ACTIVECOLORS,
  setContentSwitch,
}) => {
  const dynamicStyle = styles(
    ACTIVECOLORS.secondaryLightGreyHex,
    ACTIVECOLORS.primaryWhiteHex,
    ACTIVECOLORS.fixColorWhite,
    ACTIVECOLORS.fixColorBlack,
  );
  const [active, setActive] = useState(0); // Sử dụng active state để theo dõi nút được kích hoạt

  const handlePress = (index: number) => {
    setActive(index); // Cập nhật trạng thái kích hoạt khi nút được nhấn
  };
  return (
    <View style={dynamicStyle.switchContainer}>
      <TouchableOpacity
        onPressIn={() => setContentSwitch(0)}
        style={[
          dynamicStyle.customBtn,
          resuable.innerShadow,
          active === 0 && dynamicStyle.activeBtn,
        ]} // Sử dụng dynamicStyle.activeBtn khi nút có index = 0 được kích hoạt
        onPress={() => handlePress(0)} // Gọi handlePress với index tương ứng của nút khi nút được nhấn
      >
        <Text
          style={[
            dynamicStyle.textStyle,
            active === 0 && dynamicStyle.activeColor,
          ]}>
          Introduction
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => setContentSwitch(1)}
        style={[
          dynamicStyle.customBtn,
          resuable.innerShadow,
          active === 1 && dynamicStyle.activeBtn,
        ]} // Tương tự cho các nút khác
        onPress={() => handlePress(1)}>
        <Text
          style={[
            dynamicStyle.textStyle,
            active === 1 && dynamicStyle.activeColor,
          ]}>
          Chapters
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPressIn={() => setContentSwitch(2)}
        style={[
          dynamicStyle.customBtn,
          resuable.innerShadow,
          active === 2 && dynamicStyle.activeBtn,
        ]}
        onPress={() => handlePress(2)}>
        <Text
          style={[
            dynamicStyle.textStyle,
            active === 2 && dynamicStyle.activeColor,
          ]}>
          Reviews
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BtnSwich;

const styles = (
  bgColor: string,
  colorBorder: string,
  bgActive: string,
  colorActive: string,
) =>
  StyleSheet.create({
    switchContainer: {
      flexDirection: 'row',
      gap: 4,
      justifyContent: 'center',
      backgroundColor: bgColor,
      marginHorizontal: SPACING.space_20,
      paddingVertical: SPACING.space_8,
      borderRadius: 999,
    },
    customBtn: {
      paddingVertical: SPACING.space_10,
      paddingHorizontal: SPACING.space_16,

      borderColor: colorBorder,
      borderRadius: BORDERRADIUS.radius_25,
    },
    textStyle: {
      color: colorBorder,
    },
    activeBtn: {
      backgroundColor: bgActive,
    },
    activeColor: {
      color: colorActive,
    },
  });
