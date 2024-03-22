import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDERRADIUS, COLORS, SPACING} from 'theme/theme';
import {ComicType} from 'utils/datatype';
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
  return listComics?.length ? (
    <FlatList
      onEndReached={() => console.log('end list')}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      data={listComics}
      keyExtractor={(item, index) => item.id.toString()}
      numColumns={3}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => {}} style={styles.itemContainer}>
          <BoxImg item={item} stick={stick} moreStyles={styles.img} />
        </TouchableOpacity>
      )}
    />
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
