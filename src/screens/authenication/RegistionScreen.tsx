import React, {useState} from 'react';
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

interface FormValues {
  email: string;
  password: string;
  username: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'password must be at least 8 characters')
    .required('Required'),
  username: Yup.string()
    .min(3, 'username must be at least 3 characters')
    .required('Required'),
  email: Yup.string().email('provide a valid email').required('Required'),
});

const RegistionScreen: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [resData, setResData] = useState<string | null>(null);
  const [obsecureText, setObsecureText] = useState<boolean>(false);
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryLightGreyHex);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={dynamicStyle.container}>
      <Formik
        initialValues={{email: '', password: '', username: ''}}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues) => {
          console.log(values);
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
              <Text style={dynamicStyle.label}>Username</Text>
              <View>
                <View style={dynamicStyle.inputWrapper}>
                  <MaterialCommunityIcons
                    name="face-man-profile"
                    size={20}
                    color={ACTIVECOLORS.primaryGreyHex}
                  />
                  <WidthSpacer width={10} />
                  <TextInput
                    placeholder="Enter username"
                    onFocus={() => {
                      setFieldTouched('username');
                    }}
                    onBlur={() => {
                      setFieldTouched('username');
                    }}
                    value={values.username}
                    onChangeText={handleChange('username')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{flex: 1}}
                  />
                </View>
                {touched.username && errors.username && (
                  <Text style={dynamicStyle.errMessage}>{errors.username}</Text>
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
                text={'REGISTER'}
                color={ACTIVECOLORS.primaryWhiteHex}
                fontFamily={FONTFAMILY.poppins_semibold}
                moreStyles={{
                  borderWidth: 1,
                  borderColor: ACTIVECOLORS.primaryWhiteHex,
                  backgroundColor: 'transparent',
                  paddingVertical: SPACING.space_10,
                  borderRadius: BORDERRADIUS.radius_10,
                }}
                size={FONTSIZE.size_20}
              />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RegistionScreen;
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
