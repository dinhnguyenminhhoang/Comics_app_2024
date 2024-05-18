import {Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChangePasswordModel from 'components/Model/ChangePasswordModel';
import UpdateProfileModel from 'components/Model/UpdateProfileModel';
import HeaderBack from 'components/Resuable/HeaderBack';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import Avata from 'components/imageCustom/Avata';
import * as ImagePicker from 'expo-image-picker';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import HistoryComment from 'screens/ProfileScreen/HistoryComment';
import HistoryView from 'screens/ProfileScreen/HistoryView';
import {userLogout} from 'state/Action/AuthenAction';
import {getProfileUser, uploadAvata} from 'state/Action/profileAction';
import {setIsLoggedIn, setUserInfo} from 'state/Slices/Auth/auth';
import {RootState} from 'store/store';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {RootStackParamList} from 'utils/datatype';
const Tab = createMaterialTopTabNavigator();
const ProfileTopTab = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChangePasswordVisible, setModalChangePasswordVisible] =
    useState(false);
  const [showMoreAction, setShowMoreAction] = useState(false);
  let tabBarHeight = useBottomTabBarHeight();
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
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  useEffect(() => {
    if (isLoggedId === true) {
      dispatch(getProfileUser());
    }
  }, [dispatch, isLoggedId]);

  const handleLogout = async () => {
    dispatch(userLogout());
    dispatch(setIsLoggedIn(false));
    dispatch(setUserInfo({}));
    try {
      await AsyncStorage.clear().then(() => {
        Toast.show({
          type: 'success',
          text1: 'Đăng xuất thành công',
          text2: 'Chúc bạn có trãi nghiệm tuyệt vời',
        });
        navigation.navigate('Home');
      });
    } catch (error) {}
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  //
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = (await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })) as any;

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const formData = new FormData();
      formData.append('file', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: result.assets[0].fileName || 'avatar.jpg',
      });
      dispatch(uploadAvata(formData));
    }
  };
  //
  return userProfile?.id ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor: ACTIVECOLORS.primaryBlackHex,
        },
      ]}>
      <HeaderBack onPress={() => navigation.goBack()} Onpress2={handleLogout} />
      <View style={[resuable.rowWithSpace, {alignItems: 'flex-start'}]}>
        <View
          style={[
            resuable.rowWithSpace,
            styles.rowContainer,
            {borderColor: ACTIVECOLORS.primaryWhiteHexRBGA},
          ]}>
          <TouchableOpacity onPress={pickImage}>
            <Avata
              src={!image ? userProfile?.avatar : image}
              customStyles={{
                width: SPACING.space_30 * 3,
                height: SPACING.space_30 * 3,
              }}
            />
          </TouchableOpacity>
          <View>
            <ResuableText
              text={`${userProfile?.first_name || 'chưa'} ${
                userProfile?.last_name || 'cập nhật'
              }`}
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
        <View style={styles.ajd}>
          <UpdateProfileModel
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            userProfile={userProfile}
          />
          <ChangePasswordModel
            modalVisible={modalChangePasswordVisible}
            setModalVisible={setModalChangePasswordVisible}
          />
          <View>
            <Pressable onPress={() => setShowMoreAction(!showMoreAction)}>
              <Feather
                name="more-vertical"
                size={FONTSIZE.size_24}
                color={ACTIVECOLORS.primaryWhiteHex}
              />
            </Pressable>
            {showMoreAction ? (
              <Animated.View
                style={[
                  styles.moreAction,
                  {
                    backgroundColor: ACTIVECOLORS.primaryBlackRGBA,
                    opacity: fadeAnim,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setShowMoreAction(false);
                    setModalChangePasswordVisible(false);
                  }}>
                  <ResuableText
                    text="Cập nhật thông tin"
                    color={ACTIVECOLORS.primaryWhiteHex}
                    size={FONTSIZE.size_12}
                    fontFamily={FONTFAMILY.poppins_bold}
                    moreStyles={{
                      borderBottomWidth: 1,
                      padding: SPACING.space_4 + 2,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalChangePasswordVisible(true);
                    setShowMoreAction(false);
                    setModalVisible(false);
                  }}>
                  <ResuableText
                    text="Thay đổi mật khẩu"
                    color={ACTIVECOLORS.primaryWhiteHex}
                    size={FONTSIZE.size_12}
                    fontFamily={FONTFAMILY.poppins_bold}
                    moreStyles={{padding: SPACING.space_4 + 2}}
                  />
                </TouchableOpacity>
              </Animated.View>
            ) : null}
          </View>
        </View>
      </View>
      <View
        style={{
          height: Dimensions.get('window').height - SPACING.space_30 * 6,
          paddingBottom: tabBarHeight || 40,
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
  ajd: {
    paddingTop: SPACING.space_30,
    paddingRight: SPACING.space_10,
  },
  moreAction: {
    position: 'absolute',
    borderRadius: BORDERRADIUS.radius_4,
    borderWidth: 1,
    width: SPACING.space_30 * 5,
    top: SPACING.space_2,
    right: SPACING.space_16,
  },
});
