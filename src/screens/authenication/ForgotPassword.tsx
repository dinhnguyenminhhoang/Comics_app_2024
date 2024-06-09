import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import ResuableText from 'components/Resuable/ResuableText';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import instance from 'config/instance';
import {Formik} from 'formik';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
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
import * as Yup from 'yup';

interface FormValues {
  password: string;
  confirmPassword: string;
  code: string;
}
interface EmailValue {
  email: string;
}
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mật khẩu phải trên 6 trữ số')
    .required('Bắt buộc'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Phải trùng với mật khẩu vừa nhập')
    .required('Bắt buộc'),
  code: Yup.string().min(6, 'Mã phải gồm 6 số').required('Bắt buộc'),
});
const emailSchema = Yup.object().shape({
  email: Yup.string().email('provide a valid email').required('Required'),
});
const ForgotPassword: React.FC = () => {
  const [confirmEmail, setConfirmEmail] = useState<string | undefined>(
    undefined,
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<any>();
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryLightGreyHex);
  const onSubmit = () => {};
  return (
    <View style={dynamicStyle.container}>
      <ResuableText
        text={'Forgot Password'}
        color={ACTIVECOLORS.fixColorBlack}
        fontFamily={FONTFAMILY.poppins_bold}
        moreStyles={{
          backgroundColor: 'transparent',
        }}
        size={FONTSIZE.size_24}
      />
      {confirmEmail !== undefined ? (
        <Formik
          initialValues={{password: '', confirmPassword: '', code: ''}}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues, {resetForm}) => {
            instance
              .post('/api/v1/auth/reset-password', {
                email: confirmEmail,
                new_password: values.password,
                code: values.code,
              })
              .then((Response: any) => {
                console.log(Response);
                if (Response.message === 'Reset Password success.') {
                  Toast.show({
                    text1: 'Quên mật khẩu!',
                    text2: Response?.message,
                    type: 'success',
                  });
                  resetForm();
                  navigation.navigate('LoginScreen');
                } else {
                  Toast.show({
                    text1: 'Quên mật khẩu!',
                    text2: Response?.message,
                    type: 'error',
                  });
                  resetForm();
                }
              });
          }}>
          {({
            handleChange,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
              <View style={dynamicStyle.wrapper}>
                <Text style={dynamicStyle.label}></Text>
                <View>
                  <View style={dynamicStyle.inputWrapper}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={ACTIVECOLORS.primaryGreyHex}
                    />
                    <WidthSpacer width={10} />
                    <TextInput
                      secureTextEntry={true}
                      placeholder="Nhập mật khẩu"
                      onFocus={() => {
                        setFieldTouched('password');
                      }}
                      onBlur={() => {
                        setFieldTouched('password');
                      }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  {touched.password && errors.password && (
                    <Text style={dynamicStyle.errMessage}>
                      {errors.password}
                    </Text>
                  )}
                </View>
              </View>
              <View style={dynamicStyle.wrapper}>
                <Text style={dynamicStyle.label}></Text>
                <View>
                  <View style={dynamicStyle.inputWrapper}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={ACTIVECOLORS.primaryGreyHex}
                    />
                    <WidthSpacer width={10} />
                    <TextInput
                      secureTextEntry={true}
                      placeholder="Nhập lại mật khẩu"
                      onFocus={() => {
                        setFieldTouched('confirmPassword');
                      }}
                      onBlur={() => {
                        setFieldTouched('confirmPassword');
                      }}
                      onChangeText={handleChange('confirmPassword')}
                      value={values.confirmPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                      textContentType="password"
                    />
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={dynamicStyle.errMessage}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>
              </View>
              <View style={dynamicStyle.wrapper}>
                <Text style={dynamicStyle.label}></Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <View style={[dynamicStyle.inputWrapper, {flex: 1}]}>
                    <MaterialCommunityIcons
                      name="code-braces"
                      size={20}
                      color={ACTIVECOLORS.primaryGreyHex}
                    />
                    <WidthSpacer width={10} />
                    <TextInput
                      keyboardType="number-pad"
                      placeholder="Nhập mã"
                      onFocus={() => {
                        setFieldTouched('code');
                      }}
                      onBlur={() => {
                        setFieldTouched('code');
                      }}
                      onChangeText={handleChange('code')}
                      value={values.code}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      instance
                        .post('/api/v1/auth/reset-password/send-code', {
                          email: confirmEmail,
                        })
                        .then((Response: any) => {
                          if (Response.message === 'Send Code success.') {
                            Toast.show({
                              text1: 'Quên mật khẩu!',
                              text2: Response?.message,
                              type: 'success',
                              visibilityTime: 1000,
                            });
                          } else {
                            Toast.show({
                              text1: 'Quên mật khẩu!',
                              text2: Response?.message,
                              type: 'error',
                              visibilityTime: 1000,
                            });
                          }
                        });
                    }}>
                    <ResuableText
                      text={'Resend'}
                      color={ACTIVECOLORS.fixColorBlack}
                      fontFamily={FONTFAMILY.poppins_semibold}
                      moreStyles={{
                        borderWidth: 1,
                        borderColor: ACTIVECOLORS.fixColorBlack,
                        backgroundColor: 'transparent',
                        lineHeight: 50,
                        paddingHorizontal: SPACING.space_12,
                        height: 50,
                        borderRadius: BORDERRADIUS.radius_10,
                      }}
                      size={FONTSIZE.size_12}
                    />
                  </TouchableOpacity>
                  {/* {touched.code && errors.code && (
                  <Text style={dynamicStyle.errMessage}>{errors.code}</Text>
                )} */}
                </View>
              </View>
              <HeightSpacer height={20} />
              <TouchableOpacity onPress={handleSubmit}>
                <ResuableText
                  text={'XÁC NHẬN'}
                  color={ACTIVECOLORS.fixColorBlack}
                  fontFamily={FONTFAMILY.poppins_bold}
                  moreStyles={{
                    borderWidth: 1,
                    borderColor: ACTIVECOLORS.fixColorBlack,
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
      ) : (
        <Formik
          initialValues={{email: ''}}
          validationSchema={emailSchema}
          onSubmit={(values: EmailValue, {resetForm}) => {
            instance
              .post('/api/v1/auth/reset-password/send-code', values)
              .then((Response: any) => {
                if (Response.message === 'Send Code success.') {
                  Toast.show({
                    text1: 'Quên mật khẩu!',
                    text2: Response?.message,
                    visibilityTime: 1000,
                    type: 'success',
                  });
                  setConfirmEmail(values.email);
                  resetForm();
                } else {
                  Toast.show({
                    text1: 'Quên mật khẩu!',
                    text2: Response?.message,
                    visibilityTime: 1000,
                    type: 'error',
                  });
                }
              });
            // setConfirmEmail(values.email);
          }}>
          {({
            handleChange,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>
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
                      placeholder="Nhập email"
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
              <HeightSpacer height={20} />
              <TouchableOpacity onPress={handleSubmit}>
                <ResuableText
                  text={'Nhận code'}
                  color={ACTIVECOLORS.fixColorBlack}
                  fontFamily={FONTFAMILY.poppins_semibold}
                  moreStyles={{
                    borderWidth: 1,
                    borderColor: ACTIVECOLORS.fixColorBlack,
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
      )}
    </View>
  );
};

export default ForgotPassword;
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
