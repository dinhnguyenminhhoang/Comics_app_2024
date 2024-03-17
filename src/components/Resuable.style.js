import {Platform, StatusBar, StyleSheet} from 'react-native';

const resuable = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  safeView: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  rowWithSpace: (justifyContent, alignItems) => ({
    flexDirection: 'row',
    alignItems: alignItems || 'center',
    justifyContent: justifyContent || 'space-between',
  }),
});

export default resuable;
