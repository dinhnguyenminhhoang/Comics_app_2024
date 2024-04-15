import {Feather} from '@expo/vector-icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ResuableText from 'components/Resuable/ResuableText';
import {format} from 'date-fns';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ColorType, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import {ComicDetailType, RootAppParamList} from 'utils/datatype';
interface ListChapterProps {
  comic: ComicDetailType;
  ACTIVECOLORS: ColorType;
  navigation: NativeStackNavigationProp<RootAppParamList, 'Details', undefined>;
}
const ListChapter: React.FC<ListChapterProps> = ({
  ACTIVECOLORS,
  comic,
  navigation,
}) => {
  const handleDate = (date: any) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  };
  return (
    <FlatList
      scrollEnabled={false}
      data={comic.chapters}
      renderItem={({item}) => (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chapters', {
                chapter: item,
                comicId: comic.id,
                startChapterId: comic.chapters[comic.chapters?.length - 1].id,
                endChapterId: comic.chapters[0].id,
              })
            }
            style={[
              styles.chapterContainer,
              {borderColor: ACTIVECOLORS.primaryWhiteHexRBGA},
            ]}>
            <View style={{gap: 2}}>
              <ResuableText
                text={item?.name}
                color={ACTIVECOLORS.primaryWhiteHex}
                textAlign="left"
                size={FONTSIZE.size_16}
                fontFamily={FONTFAMILY.poppins_medium}
              />
              <ResuableText
                text={handleDate(item.updated_at)}
                color={ACTIVECOLORS.primaryWhiteHex}
                textAlign="left"
                size={FONTSIZE.size_12}
                fontFamily={FONTFAMILY.poppins_medium}
              />
            </View>
            <Feather
              name="send"
              size={24}
              color={ACTIVECOLORS.primaryWhiteHex}
            />
          </TouchableOpacity>
        </>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default ListChapter;

const styles = StyleSheet.create({
  chapterContainer: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_16,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
