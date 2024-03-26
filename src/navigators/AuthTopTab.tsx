import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AssetImage from 'components/Resuable/AssetImage';
import resuable from 'components/Resuable/Resuable.style';
import {useAppSelector} from 'hooks/useAppSelector';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import RegistionScreen from 'screens/authenication/RegistionScreen';
import SingninScreen from 'screens/authenication/SingninScreen';
import {COLORS, ColorType, SPACING} from 'theme/theme';
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
