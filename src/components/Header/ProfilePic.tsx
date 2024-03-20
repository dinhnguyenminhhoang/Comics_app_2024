import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SPACING} from 'theme/theme';
import resuable from 'components/Resuable/Resuable.style';

interface ProfilePicProps {}
const ProfilePic: React.FC<ProfilePicProps> = ({}) => {
  return (
    <View>
      <View style={[styles.imgContainer, resuable.withSpace]}>
        <Image
          style={styles.img}
          source={require('../../assets/app_images/avata.png')}
        />
      </View>
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
    overflow: 'hidden',
  },
  img: {width: SPACING.space_36, height: SPACING.space_36},
});
export default ProfilePic;
