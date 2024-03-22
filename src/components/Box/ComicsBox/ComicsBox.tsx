import HeightSpacer from 'components/Resuable/HeightSpacer';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import {ComicType} from 'utils/datatype';
import BoxImg from './BoxImg';

interface ComicsBoxProps {
  listComics: ComicType[];
  stick?: string;
}
const ComicsBox: React.FC<ComicsBoxProps> = ({listComics, stick}) => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={listComics}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <WidthSpacer width={SPACING.space_4} />}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {}}
          style={[
            resuable.withSpace,
            {
              marginBottom: SPACING.space_4,
              width: Dimensions.get('window').width / 4,
            },
          ]}>
          <BoxImg item={item} stick={stick} />
        </TouchableOpacity>
      )}
    />
  );
};

export default ComicsBox;
