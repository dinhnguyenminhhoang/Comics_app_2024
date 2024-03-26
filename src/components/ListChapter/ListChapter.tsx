import {Feather} from '@expo/vector-icons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ResuableText from 'components/Resuable/ResuableText';
import {format} from 'date-fns';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
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
    <View>
      {comic.chapters?.length &&
        comic.chapters.map(chapter => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chapters', {
                chapter: chapter,
                comicId: comic.id,
                startChapterId: comic.chapters[comic.chapters.length - 1].id,
                endChapterId: comic.chapters[0].id,
              })
            }
            key={chapter.id}
            style={[
              styles.chapterContainer,
              {borderColor: ACTIVECOLORS.primaryWhiteHexRBGA},
            ]}>
            <View style={{gap: 2}}>
              <ResuableText
                text={chapter.name}
                color={ACTIVECOLORS.primaryWhiteHex}
                textAlign="left"
                size={FONTSIZE.size_16}
                fontFamily={FONTFAMILY.poppins_medium}
              />
              <ResuableText
                text={handleDate(chapter.updated_at)}
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
        ))}
    </View>
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
