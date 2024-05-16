import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
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
import {useDispatch} from 'react-redux';
import {UpdateUserProfile, getProfileUser} from 'state/Action/profileAction';
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
  firstName: string;
  lastName: string;
  gender: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(4, 'Vui lòng nhập tên đệm').required('Required'),
  lastName: Yup.string().min(4, 'Vui lòng nhập tên').required('Required'),
  gender: Yup.string(),
});
interface UpdateProfileModelProps {
  modalVisible: boolean;
  setModalVisible: (isVisible: boolean) => void;
  userProfile: ProfileType;
}
const UpdateProfileModel: React.FC<UpdateProfileModelProps> = ({
  modalVisible,
  setModalVisible,
  userProfile,
}) => {
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const dispatch = useDispatch<any>();
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryLightGreyHex);
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
            <Text style={dynamicStyle.modalText}>Cập nhật thông tin</Text>
            <Formik
              initialValues={{
                firstName: userProfile.first_name,
                lastName: userProfile.last_name,
                gender: userProfile.gender ? 'male' : 'female',
              }}
              validationSchema={validationSchema}
              onSubmit={(values: FormValues, {resetForm}) => {
                dispatch(
                  UpdateUserProfile({
                    first_name: values.firstName,
                    last_name: values.lastName,
                    gender: values.gender === 'male' ? true : false,
                  }),
                ).then(() => {
                  dispatch(getProfileUser());
                  resetForm();
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
                    <Text style={dynamicStyle.label}>FirstName</Text>
                    <View>
                      <View style={dynamicStyle.inputWrapper}>
                        <MaterialCommunityIcons
                          name="email-outline"
                          size={20}
                          color={ACTIVECOLORS.primaryGreyHex}
                        />
                        <WidthSpacer width={10} />
                        <TextInput
                          placeholder="Enter your First Name"
                          onFocus={() => {
                            setFieldTouched('firstName');
                          }}
                          onBlur={() => {
                            setFieldTouched('firstName');
                          }}
                          value={values.firstName}
                          onChangeText={handleChange('firstName')}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{flex: 1}}
                        />
                      </View>
                      {touched.firstName && errors.firstName && (
                        <Text style={dynamicStyle.errMessage}>
                          {errors.firstName}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={dynamicStyle.wrapper}>
                    <Text style={dynamicStyle.label}>LastName</Text>
                    <View>
                      <View style={dynamicStyle.inputWrapper}>
                        <MaterialCommunityIcons
                          name="email-outline"
                          size={20}
                          color={ACTIVECOLORS.primaryGreyHex}
                        />
                        <WidthSpacer width={10} />
                        <TextInput
                          placeholder="Enter your Last Name"
                          onFocus={() => {
                            setFieldTouched('lastName');
                          }}
                          onBlur={() => {
                            setFieldTouched('lastName');
                          }}
                          value={values.lastName}
                          onChangeText={handleChange('lastName')}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{flex: 1}}
                        />
                      </View>
                      {touched.lastName && errors.lastName && (
                        <Text style={dynamicStyle.errMessage}>
                          {errors.lastName}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={dynamicStyle.wrapper}>
                    <Text style={dynamicStyle.label}>Gender</Text>
                    <View style={dynamicStyle.inputWrapper}>
                      <Picker
                        selectedValue={values.gender}
                        onValueChange={handleChange('gender')}
                        style={{flex: 1}}>
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                      </Picker>
                    </View>
                    {touched.gender && errors.gender && (
                      <Text style={dynamicStyle.errMessage}>
                        {errors.gender}
                      </Text>
                    )}
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

export default UpdateProfileModel;

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
