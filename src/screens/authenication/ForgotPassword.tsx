import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import ResuableText from 'components/Resuable/ResuableText';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import {Formik} from 'formik';
import {useAppSelector} from 'hooks/useAppSelector';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
import * as Yup from 'yup';

interface FormValues {
  password: string;
  confirmPassword: string;
  code: string;
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

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<any>();
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryLightGreyHex);
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
      <Formik
        initialValues={{password: '', confirmPassword: '', code: ''}}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, {resetForm}) => {}}>
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
                    name="email-outline"
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
                  <Text style={dynamicStyle.errMessage}>{errors.password}</Text>
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
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name={'eye-off-outline'}
                      size={18}
                    />
                  </TouchableOpacity>
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
                <TouchableOpacity>
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
                text={'Lưu'}
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
