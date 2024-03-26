import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAppSelector} from 'hooks/useAppSelector';
import {COLORS, ColorType} from 'theme/theme';
interface AssetImageProps {
  source: ImageSourcePropType;
  radiusButtonIOS?: number;
  mode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}
const AssetImage: React.FC<AssetImageProps> = ({
  source,
  radiusButtonIOS,
  mode = 'cover',
}) => {
  const dynamicStyle = styles(radiusButtonIOS);
  return <Image source={source} style={dynamicStyle.image} resizeMode={mode} />;
};

export default AssetImage;

const styles = (radiusButtonIOS?: number) =>
  StyleSheet.create({
    image: {
      flex: 1,
      borderRadius: radiusButtonIOS,
    },
  });
