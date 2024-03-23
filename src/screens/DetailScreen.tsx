import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ComicDetailType,
  RootAppParamList,
  RootStackParamList,
} from 'utils/datatype';
import {COLORS, ColorType, SPACING} from 'theme/theme';
import resuable from 'components/Resuable/Resuable.style';
import {useDispatch} from 'react-redux';
import {useAppSelector} from 'hooks/useAppSelector';
import {getComicById} from 'state/Action/comicAction';
type Props = NativeStackScreenProps<RootAppParamList, 'Details'>;
const DetailScreen: React.FC<Props> = ({route, navigation}) => {
  const dispath = useDispatch<any>();
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  const comicById = useAppSelector(
    (state: any) => state.comicById.data,
  ) as ComicDetailType;
  useEffect(() => {
    dispath(getComicById(route.params?.comicId));
  }, [dispath, route.params?.comicId]);
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const dynamicStyle = styles(ACTIVECOLORS.primaryBlackHex);
  return (
    <View style={[dynamicStyle.ScreenContainer, resuable.center]}>
      <Text>DetailScreen</Text>
    </View>
  );
};

export default DetailScreen;
const styles = (backgroundColor: string) =>
  StyleSheet.create({
    ScreenContainer: {
      flex: 1,
      backgroundColor: backgroundColor,
      padding: SPACING.space_8,
    },
    ScrollViewFlex: {
      flex: 1,
    },
  });
