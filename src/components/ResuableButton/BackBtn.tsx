import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from 'components/Resuable/CustomIcon';
import {FONTSIZE, SPACING} from 'theme/theme';
import {SimpleLineIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {RootAppParamList} from 'utils/datatype';

const BackBtn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.btnContainer}
      onPress={() => navigation.goBack()}>
      <SimpleLineIcons
        name="arrow-left-circle"
        size={SPACING.space_30}
        color="white"
      />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    top: SPACING.space_10,
    right: SPACING.space_8,
    left: SPACING.space_8,
    zIndex: 1,
  },
});
