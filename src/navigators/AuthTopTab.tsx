import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import AssetImage from 'components/Resuable/AssetImage';
import {useAppSelector} from 'hooks/useAppSelector';
import {COLORS, ColorType, SPACING} from 'theme/theme';
import RegistionScreen from 'screens/authenication/RegistionScreen';
import SingninScreen from 'screens/authenication/SingninScreen';
import resuable from 'components/Resuable/Resuable.style';

const Tab = createMaterialTopTabNavigator();
const AuthTopTab = () => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  return (
    <View style={{flex: 1, backgroundColor: ACTIVECOLORS.primaryWhiteHex}}>
      <ScrollView
        style={{flex: 1, backgroundColor: ACTIVECOLORS.primaryWhiteHex}}>
        <View style={[{height: SPACING.space_30 * 8}, resuable.center]}>
          <AssetImage source={require('../assets/app_images/bgGif3.gif')} />
        </View>
        <View
          style={{
            height: Dimensions.get('window').height - SPACING.space_30 * 6,
          }}>
          <Tab.Navigator>
            <Tab.Screen component={SingninScreen} name="Singnin" />
            <Tab.Screen component={RegistionScreen} name="Registion" />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

export default AuthTopTab;

const styles = StyleSheet.create({});
