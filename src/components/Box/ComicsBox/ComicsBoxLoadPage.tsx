import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import resuable from 'components/Resuable/Resuable.style';
import {useAppSelector} from 'hooks/useAppSelector';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {BORDERRADIUS, COLORS, ColorType, SPACING} from 'theme/theme';
import {ComicType, RootAppParamList} from 'utils/datatype';
import BoxImg from './BoxImg';

interface ComicsBoxLoadPageprops {
  listComics: ComicType[];
  stick?: string;
  setMoreComic: (numberComics: number) => void;
}

const ComicsBoxLoadPage: React.FC<ComicsBoxLoadPageprops> = ({
  listComics,
  stick,
  setMoreComic,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootAppParamList>>();
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  return listComics?.length ? (
    <View style={[resuable.rowWithSpace, {flexWrap: 'wrap'}]}>
      {listComics?.map(item => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {comicId: item.id})}
          style={styles.itemContainer}
          key={item.id}>
          <BoxImg
            item={item}
            stick={stick}
            moreStyles={[
              styles.img,
              {
                borderColor: ACTIVECOLORS.primaryBlackRGBA,
              },
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    <></>
  );
};
const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get('window').width / 3 - 16,
    height: SPACING.space_30 * 8,
    marginVertical: SPACING.space_4,
    marginHorizontal: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_15,
    overflow: 'hidden',
  },
  img: {
    flex: 1,
    borderWidth: 1,
  },
});
export default ComicsBoxLoadPage;
