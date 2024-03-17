import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from 'theme/theme';

interface ProfilePicProps {}
const ProfilePic: React.FC<ProfilePicProps> = ({}) => {
  return (
    <View style={styles.imgContainer}>
      <Image
        style={styles.img}
        source={require('../assets/app_images/avata.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {width: SPACING.space_36, height: SPACING.space_36},
});
export default ProfilePic;
