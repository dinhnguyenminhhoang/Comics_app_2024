import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import resuable from 'components/Resuable/Resuable.style';

const LoginScreen = () => {
  return (
    <View style={[styles.loginContainer, resuable.center]}>
      <View></View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
});
