import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import ResuableText from 'components/Resuable/ResuableText';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import {Formik} from 'formik';
import {useAppSelector} from 'hooks/useAppSelector';
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {ChangePassword} from 'state/Action/profileAction';
import {RootState} from 'store/store';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {ProfileType} from 'utils/datatype';
import * as Yup from 'yup';

interface FormValues {
  currentPassword: string;
  newPassword: string;
}

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Vui lòng nhập mật khẩu hiện tại')
    .required('Required'),
  newPassword: Yup.string()
    .min(6, 'Vui lòng nhập mật khẩu mới gồm 1 kí tự đặc biệt')
    .required('Required'),
});
interface ChangePasswordModelProps {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
}
const ChangePasswordModel: React.FC<ChangePasswordModelProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const ChangePasswordData = useAppSelector(
    (state: RootState) => state.changePassword.data as any,
  );
  const dispatch = useDispatch<any>();
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryLightGreyHex);
  console.log(ChangePasswordData);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={dynamicStyle.centeredView}>
          <View style={dynamicStyle.modalView}>
            <TouchableOpacity
              style={dynamicStyle.btnClose}
              onPress={() => {
                setModalVisible(false);
              }}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={dynamicStyle.modalText}>Cập Nhật Mật Khẩu</Text>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values: FormValues, {resetForm}) => {
                dispatch(
                  ChangePassword({
                    current_password: values.currentPassword,
                    new_password: values.newPassword,
                  }),
                ).then((req: any) => {
                  resetForm();
                  Toast.show({
                    text1: 'Thay đổi mật khẩu',
                    type: 'info',
                    text2: ` ${req?.payload?.message}`,
                  });
                  setModalVisible(false);
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
                    <Text style={dynamicStyle.label}>Mật khẩu hiện tại</Text>
                    <View>
                      <View style={dynamicStyle.inputWrapper}>
                        <MaterialIcons
                          name="password"
                          size={20}
                          color={ACTIVECOLORS.primaryGreyHex}
                        />
                        <WidthSpacer width={10} />
                        <TextInput
                          secureTextEntry={true}
                          placeholder="Enter your password"
                          onFocus={() => {
                            setFieldTouched('currentPassword');
                          }}
                          onBlur={() => {
                            setFieldTouched('currentPassword');
                          }}
                          value={values.currentPassword}
                          onChangeText={handleChange('currentPassword')}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{flex: 1}}
                        />
                      </View>
                      {touched.currentPassword && errors.currentPassword && (
                        <Text style={dynamicStyle.errMessage}>
                          {errors.currentPassword}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={dynamicStyle.wrapper}>
                    <Text style={dynamicStyle.label}>Mật khẩu mới</Text>
                    <View>
                      <View style={dynamicStyle.inputWrapper}>
                        <MaterialIcons
                          name="password"
                          size={20}
                          color={ACTIVECOLORS.primaryGreyHex}
                        />
                        <WidthSpacer width={10} />
                        <TextInput
                          secureTextEntry={true}
                          placeholder="Enter your New Password"
                          onFocus={() => {
                            setFieldTouched('newPassword');
                          }}
                          onBlur={() => {
                            setFieldTouched('newPassword');
                          }}
                          value={values.newPassword}
                          onChangeText={handleChange('newPassword')}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{flex: 1}}
                        />
                      </View>
                      {touched.newPassword && errors.newPassword && (
                        <Text style={dynamicStyle.errMessage}>
                          {errors.newPassword}
                        </Text>
                      )}
                    </View>
                  </View>
                  <HeightSpacer height={20} />
                  <TouchableOpacity onPress={handleSubmit}>
                    <ResuableText
                      text={'XÁC NHẬN'}
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
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default ChangePasswordModel;

const styles = (borderColor: string) =>
  StyleSheet.create({
    btnClose: {
      position: 'absolute',
      top: SPACING.space_8,
      right: SPACING.space_10,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: BORDERRADIUS.radius_20,
      padding: SPACING.space_24,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: borderColor,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: FONTSIZE.size_24,
      fontFamily: FONTFAMILY.poppins_semibold,
    },
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
      minWidth: FONTSIZE.size_30 * 10,
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
