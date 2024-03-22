import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomIcon from 'components/Resuable/CustomIcon';
import {BlurView} from 'expo-blur';
import React from 'react';
import {StyleSheet} from 'react-native';
import CartScreen from 'screens/CartScreen';
import FacoriesScreen from 'screens/FacoriesScreen';
import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/LoginScreen';
import {COLORS, SPACING} from 'theme/theme';
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView intensity={1} style={styles.BlurViewStyle} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="home"
              size={25}
              color={focused ? COLORS.primaryWhiteHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="like2"
              size={25}
              color={focused ? COLORS.primaryWhiteHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FacoriesScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="hearto"
              size={25}
              color={focused ? COLORS.primaryWhiteHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="user"
              size={25}
              color={focused ? COLORS.primaryWhiteHex : COLORS.primaryGreyHex}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: SPACING.space_24 * 3,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyle: {
    position: 'absolute',
    elevation: 0,
  },
});
