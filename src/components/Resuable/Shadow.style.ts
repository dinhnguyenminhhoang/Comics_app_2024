import {Platform, StyleSheet} from 'react-native';

const Shadow = (color: string) =>
  StyleSheet.create({
    innerShadow: {
      ...Platform.select({
        ios: {
          shadowColor: color,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 1,
          shadowRadius: 6,
        },
        android: {
          shadowColor: color,
          shadowOpacity: 1,
          shadowRadius: 6,
          elevation: 6,
        },
      }),
    },
    outnerShadow: {
      ...Platform.select({
        ios: {
          shadowColor: color,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 1,
          shadowRadius: 6,
        },
        android: {
          elevation: 6,
        },
      }),
    },
  });

export default Shadow;
