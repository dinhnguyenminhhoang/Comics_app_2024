import {
  StyleSheet,
  Text,
  TextInputBase,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';

interface InputFormProps {
  type?: TextInputKeyPressEventData;
  placeholder?: string;
  morestyles?: any;
  value: string;
  onChange: (value: string) => void;
  nameIcon: string;
}
const InputForm: React.FC<InputFormProps> = ({
  placeholder,
  morestyles,
  value,
  onChange,
  nameIcon,
}) => {
  return (
    <TextInputBase
      value={value}
      placeholder={placeholder}
      style={[morestyles, styles.inputContainer]}>
      <CustomIcon name={nameIcon} size={25} />
    </TextInputBase>
  );
};

export default InputForm;

const styles = StyleSheet.create({inputContainer: {}});
