import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
interface SearchProps {
  type?: string;
  color: string;
  bg: string;
  placeholder?: string;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
}

const Search: React.FC<SearchProps> = ({
  type = 'text',
  color,
  bg,
  placeholder = 'Enter your text',
  iconName,
  iconColor,
  iconSize,
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput placeholder="" />
      <CustomIcon color={iconColor} name={iconName} size={iconSize} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {},
});

export default Search;
