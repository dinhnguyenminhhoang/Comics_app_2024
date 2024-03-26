import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomIcon from 'components/Resuable/CustomIcon';
import {BlurView} from 'expo-blur';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import FacoriesScreen from 'screens/FacoriesScreen';
import FilterScreen from 'screens/FilterScreen';
import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/LoginScreen';
import {COLORS, ColorType, SPACING} from 'theme/theme';
import {RootStackParamList, userinfoType} from 'utils/datatype';
import AuthTopTab from './AuthTopTab';
import {RootState} from 'store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn, setUserInfo} from 'state/Slices/Auth/auth';
const Tab = createBottomTabNavigator<RootStackParamList>();
const getData = async () => {
  try {
    const userinfo = await AsyncStorage.getItem('userinfo');
    if (userinfo !== null) {
      return userinfo;
    } else {
      console.log('Access token does not exist in local storage');
    }
  } catch (error) {
    console.error('Error retrieving access token:', error);
  }
};

const TabNavigator = () => {
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  const isLoggedId = useAppSelector(
    (state: RootState) => state.isLogger.isLoggedIn,
  );
  const dispatch = useDispatch<any>();
  const userData = useAppSelector((state: RootState) => state.loginData.data);
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        return JSON.parse(token);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi lấy token từ AsyncStorage:', error);
      return null;
    }
  };

  useEffect(() => {
    getToken().then(token => {
      if (token !== null) {
        const parts = token
          .split('.')
          .map((part: string) =>
            Buffer.from(
              part.replace(/-/g, '+').replace(/_/g, '/'),
              'base64',
            ).toString(),
          );
        const payload = JSON.parse(parts[1]) as userinfoType;
        dispatch(setUserInfo({...payload}));
        dispatch(setIsLoggedIn(true));
        Toast.show({
          type: 'info',
          text1: `Chào mừng quay trở lại ${payload.username}`,
          text2: 'Chúc bạn 1 ngày tốt lành',
        });
      } else {
        return Toast.show({
          type: 'info',
          text1: 'Có vẻ bạn chưa đang nhập trước đây',
          text2: 'hãy đăng nhập hoặc tạo tài khoản để có trải nghiệm tốt nhất',
        });
      }
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: [
          styles.tabBarStyle,
          {backgroundColor: ACTIVECOLORS.primaryBlackRGBA},
        ],
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
              color={
                focused
                  ? ACTIVECOLORS.primaryWhiteHex
                  : ACTIVECOLORS.primaryGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="filter"
              size={25}
              color={
                focused
                  ? ACTIVECOLORS.primaryWhiteHex
                  : ACTIVECOLORS.primaryGreyHex
              }
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
              color={
                focused
                  ? ACTIVECOLORS.primaryWhiteHex
                  : ACTIVECOLORS.primaryGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="LoginScreen"
        component={AuthTopTab}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="user"
              size={25}
              color={
                focused
                  ? ACTIVECOLORS.primaryWhiteHex
                  : ACTIVECOLORS.primaryGreyHex
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
const styles = StyleSheet.create({
  tabBarStyle: {
    height: SPACING.space_24 * 3,
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyle: {
    position: 'absolute',
    elevation: 0,
  },
});
