import {format} from 'date-fns';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ComicDetailType} from 'utils/datatype';
import {COLORS, ColorType, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import ResuableText from 'components/Resuable/ResuableText';
interface ListChapterProps {
  comic: ComicDetailType;
  ACTIVECOLORS: ColorType;
}
const ListChapter: React.FC<ListChapterProps> = ({ACTIVECOLORS, comic}) => {
  const Navigation = useNavigation();
  const handleDate = (date: any) => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
  };
  return (
    <View>
      {comic.chapters?.length &&
        comic.chapters.map(chapter => (
          <TouchableOpacity
            onPress={() => {}}
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
