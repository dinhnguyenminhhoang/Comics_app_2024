import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import ProfileTopTab from 'navigators/ProfileTopTab';
import TabNavigator from 'navigators/TabNavigator';
import React, {useCallback} from 'react';
import ToastMessage from 'react-native-toast-message';
import {Provider} from 'react-redux';
import ChapterDetail from 'screens/ChapterDetailScreen';
import DetailScreen from 'screens/DetailScreen';
import ForgotPassword from 'screens/authenication/ForgotPassword';
import {store} from 'store/store';
import {RootAppParamList} from 'utils/datatype';

const Stack = createNativeStackNavigator<RootAppParamList>();
export default function App() {
  const [fontLoaded] = useFonts({
    Poppins_Black: require('./assets/fonts/Poppins-Black.ttf'),
    Poppins_Bold: require('./assets/fonts/Poppins-Bold.ttf'),
    Poppins_ExtraBold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    Poppins_ExtraLight: require('./assets/fonts/Poppins-ExtraLight.ttf'),
    Poppins_Light: require('./assets/fonts/Poppins-Light.ttf'),
    Poppins_Medium: require('./assets/fonts/Poppins-Medium.ttf'),
    Poppins_Regular: require('./assets/fonts/Poppins-Regular.ttf'),
    Poppins_SemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_Thin: require('./assets/fonts/Poppins-Thin.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);
  if (!fontLoaded) return null;
  // AsyncStorage.clear();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Details"
            component={DetailScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Chapters"
            component={ChapterDetail}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileTopTab}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{animation: 'slide_from_bottom'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <ToastMessage />
    </Provider>
  );
}
