import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import resuable from 'components/Resuable/Resuable.style';
import WidthSpacer from 'components/Resuable/WidthSpacer';
import React from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {SPACING} from 'theme/theme';
import {ComicType, RootAppParamList} from 'utils/datatype';
import BoxImg from './BoxImg';
import {useNavigation} from '@react-navigation/native';

interface ComicsBoxProps {
  listComics: ComicType[];
  stick?: string;
}
const ComicsBox: React.FC<ComicsBoxProps> = ({listComics, stick}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootAppParamList>>();
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={listComics}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => <WidthSpacer width={SPACING.space_4} />}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Details', {
              comicId: item.id,
            })
          }
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
