import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from 'theme/theme';
interface AvataProps {
  src: string;
}
const Avata: React.FC<AvataProps> = ({src}) => {
  return <Image source={{uri: src}} alt="avata" style={styles.img} />;
};

export default Avata;

const styles = StyleSheet.create({
  img: {
    borderRadius: 999,
    width: 45,
    height: 45,
    resizeMode: 'contain',
    borderColor: COLORS.dark.primaryGreyHex,
    borderWidth: 1,
  },
});
