import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useAppSelector} from 'hooks/useAppSelector';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import ResuableText from 'components/Resuable/ResuableText';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {RootState} from 'store/store';
import {useDispatch} from 'react-redux';
import {UserLogin} from 'state/Action/AuthenAction';
import {Buffer} from 'buffer';

import Toast from 'react-native-toast-message';
import {setIsLoggedIn} from 'state/Slices/Auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'utils/datatype';
interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'password must be at least 6 characters')
    .required('Required'),
  email: Yup.string().email('provide a valid email').required('Required'),
});

const SingninScreen: React.FC = () => {
  const [obsecureText, setObsecureText] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const loginData = useAppSelector(
    (state: RootState) => state.loginData,
  ) as any;
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryLightGreyHex);
  const tabBarHeight = useBottomTabBarHeight();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const onSubmit = async (values: FormValues, resetForm: () => void) => {
    await dispatch(UserLogin({email: values.email, password: values.password}));
    resetForm();
  };
  useEffect(() => {
    if (loginData.data) {
      if (loginData.data?.message?.trim()) {
        Toast.show({
          visibilityTime: 1000,
          type: 'error',
          text1: 'Vui lòng thử lại !',
          text2: loginData.data?.message,
        });
        return;
      }
      if (loginData.data.data?.token) {
        Toast.show({
          visibilityTime: 1000,
          type: 'success',
          text1: `Chào mừng quay trở lại`,
        });
        dispatch(setIsLoggedIn(true));
        AsyncStorage.setItem(
          'token',
          JSON.stringify(loginData.data.data?.token),
        );
        navigation.navigate('Home');
      }
    }
  }, [loginData]);
  return (
    <View style={dynamicStyle.container}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, {resetForm}) =>
          onSubmit(values, resetForm)
        }>
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldTouched,
        }) => (
          <View style={{marginBottom: tabBarHeight}}>
            <View style={dynamicStyle.wrapper}>
              <Text style={dynamicStyle.label}>Email</Text>
              <View>
                <View style={dynamicStyle.inputWrapper}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={ACTIVECOLORS.primaryGreyHex}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    placeholder="Enter email"
                    onFocus={() => {
                      setFieldTouched('email');
                    }}
                    onBlur={() => {
                      setFieldTouched('email');
                    }}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex: 1}}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={dynamicStyle.errMessage}>{errors.email}</Text>
                )}
              </View>
            </View>
            <View style={dynamicStyle.wrapper}>
              <Text style={dynamicStyle.label}>password</Text>
              <View>
                <View style={dynamicStyle.inputWrapper}>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={ACTIVECOLORS.primaryGreyHex}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    secureTextEntry={obsecureText}
                    placeholder="Enter password"
                    onFocus={() => {
                      setFieldTouched('password');
                    }}
                    onBlur={() => {
                      setFieldTouched('password');
                    }}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex: 1}}
                    textContentType="password"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setObsecureText(!obsecureText);
                    }}>
                    <MaterialCommunityIcons
                      name={obsecureText ? 'eye-outline' : 'eye-off-outline'}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={dynamicStyle.errMessage}>{errors.password}</Text>
                )}
              </View>
            </View>
            <HeightSpacer height={20} />
            <TouchableOpacity onPress={handleSubmit}>
              <ResuableText
                text={'LOGIN'}
                color={ACTIVECOLORS.primaryWhiteHex}
                fontFamily={FONTFAMILY.poppins_semibold}
                moreStyles={{
                  borderWidth: 1,
                  borderColor: ACTIVECOLORS.primaryWhiteHex,
                  backgroundColor: 'transparent',
                  paddingVertical: SPACING.space_10,
                  borderRadius: BORDERRADIUS.radius_10,
                }}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SingninScreen;
const styles = (borderColor: string) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: 'white',
      flex: 1,
    },
    wrapper: {
      marginBottom: SPACING.space_10,
    },
    inputWrapper: {
      borderColor: borderColor,
      backgroundColor: 'white',
      borderWidth: 1,
      height: 50,
      borderRadius: 12,
      flexDirection: 'row',
      paddingHorizontal: 15,
      alignItems: 'center',
    },
    label: {
      fontFamily: FONTFAMILY.poppins_medium,
      fontSize: FONTSIZE.size_14,
      marginBottom: 10,
      marginEnd: 5,
      textAlign: 'right',
    },
    errMessage: {
      color: 'red',
      fontSize: FONTSIZE.size_14,
      marginTop: 5,
      marginLeft: 5,
    },
  });
