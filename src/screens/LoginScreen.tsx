import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import resuable from 'components/Resuable/Resuable.style';
import RegistionScreen from './authenication/RegistionScreen';

const LoginScreen = () => {
  return <RegistionScreen />;
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
});
