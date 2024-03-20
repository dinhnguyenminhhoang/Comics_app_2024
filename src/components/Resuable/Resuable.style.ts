import {Platform, StatusBar, StyleSheet, ViewStyle} from 'react-native';
import {COLORS} from 'theme/theme';

interface ResuableStyles {
  container: ViewStyle;
  safeView: ViewStyle;
  rowWithSpace: ViewStyle;
  withSpace: ViewStyle;
  innerShadow: ViewStyle;
  outnerShadow: ViewStyle;
  center: ViewStyle;
}

const resuable: ResuableStyles = StyleSheet.create<ResuableStyles>({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  safeView: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  withSpace: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerShadow: {
    ...Platform.select({
      ios: {
        shadowColor: COLORS.darkShadow,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        shadowColor: COLORS.darkShadow,
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 8,
      },
    }),
  },
  outnerShadow: {
    ...Platform.select({
      ios: {
        shadowColor: COLORS.darkShadow,
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});

export default resuable;
