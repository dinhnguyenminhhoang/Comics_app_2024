import AsyncStorage from '@react-native-async-storage/async-storage';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import HeaderBack from 'components/Resuable/HeaderBack';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import Avata from 'components/imageCustom/Avata';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import HistoryComment from 'screens/ProfileScreen/HistoryComment';
import HistoryView from 'screens/ProfileScreen/HistoryView';
import {userLogout} from 'state/Action/AuthenAction';
import {getProfileUser} from 'state/Action/profileAction';
import {setIsLoggedIn, setUserInfo} from 'state/Slices/Auth/auth';
import {RootState} from 'store/store';
import {COLORS, ColorType, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import {RootAppParamList, RootStackParamList} from 'utils/datatype';
const Tab = createMaterialTopTabNavigator();
const ProfileTopTab = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<any>();
  const userProfile = useAppSelector(
    (state: RootState) => state.userProfile.data,
  );
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const isLoggedId = useAppSelector(
    (state: RootState) => state.isLogger.isLoggedIn,
  );
  console.log(isLoggedId);
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  useEffect(() => {
    if (isLoggedId === true) dispatch(getProfileUser());
  }, [dispatch, isLoggedId]);
  const handleLogout = async () => {
    dispatch(userLogout());
    console.log('User logged out 1');
    dispatch(setIsLoggedIn(false));
    console.log('User logged out 2');

    dispatch(setUserInfo({}));
    console.log('User logged out 3');

    await AsyncStorage.clear().then(() => {
      navigation.navigate('Home');
      console.log('User logged out 4');
    });
  };
  return userProfile?.id ? (
    <View
      style={[
        styles.container,
        {backgroundColor: ACTIVECOLORS.primaryBlackHex},
      ]}>
      <HeaderBack onPress={() => navigation.goBack()} Onpress2={handleLogout} />
      <View
        style={[
          resuable.rowWithSpace,
          styles.rowContainer,
          {borderColor: ACTIVECOLORS.primaryWhiteHexRBGA},
        ]}>
        <Avata
          src={userProfile?.avatar || ''}
          customerStyles={{
            width: SPACING.space_30 * 3,
            height: SPACING.space_30 * 3,
          }}
        />
        <View>
          <ResuableText
            text={`${userProfile.first_name} ${userProfile.last_name}`}
            textAlign="left"
            color={ACTIVECOLORS.primaryWhiteHex}
            fontFamily={FONTFAMILY.poppins_semibold}
            size={FONTSIZE.size_20}
          />
          <ResuableText
            text={userProfile.username}
            textAlign="left"
            color={ACTIVECOLORS.primaryWhiteHexRBGA}
            fontFamily={FONTFAMILY.poppins_regular}
            size={FONTSIZE.size_12}
          />
          <ResuableText
            text={userProfile.email}
            textAlign="left"
            color={ACTIVECOLORS.primaryWhiteHexRBGA}
            fontFamily={FONTFAMILY.poppins_regular}
            size={FONTSIZE.size_12}
          />
        </View>
      </View>
      <View
        style={{
          height: Dimensions.get('window').height - SPACING.space_30 * 6,
        }}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: ACTIVECOLORS.primaryBlackHex},
            tabBarActiveTintColor: ACTIVECOLORS.primaryWhiteHex,
            tabBarInactiveTintColor: ACTIVECOLORS.primaryGreyHex,
          }}
          sceneContainerStyle={{backgroundColor: ACTIVECOLORS.primaryBlackHex}}>
          <Tab.Screen component={HistoryView} name="Lịch sử xem" />
          <Tab.Screen component={HistoryComment} name="Lịch sử commment" />
        </Tab.Navigator>
      </View>
    </View>
  ) : null;
};

export default ProfileTopTab;

const styles = StyleSheet.create({
  container: {flex: 1},
  rowContainer: {
    justifyContent: 'flex-start',
    gap: SPACING.space_4,
    paddingBottom: SPACING.space_16,
    paddingHorizontal: SPACING.space_20,
    paddingTop: SPACING.space_10,
  },
});
