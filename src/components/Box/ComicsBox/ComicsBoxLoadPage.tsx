import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDERRADIUS, COLORS, SPACING} from 'theme/theme';
import {ComicType} from 'utils/datatype';
import BoxImg from './BoxImg';
import resuable from 'components/Resuable/Resuable.style';

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
  return listComics?.length ? (
    <View style={[resuable.rowWithSpace, {flexWrap: 'wrap'}]}>
      {listComics?.map(item => (
        <TouchableOpacity
          onPress={() => {}}
          style={styles.itemContainer}
          key={item.id}>
          <BoxImg item={item} stick={stick} moreStyles={styles.img} />
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
    borderColor: COLORS.primaryBlackRGBA,
    borderWidth: 1,
  },
});
export default ComicsBoxLoadPage;
