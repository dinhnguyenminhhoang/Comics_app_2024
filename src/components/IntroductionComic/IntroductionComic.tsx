import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ResuableText from 'components/Resuable/ResuableText';
import {ColorType, FONTFAMILY, SPACING} from 'theme/theme';
import resuable from 'components/Resuable/Resuable.style';
import {ComicDetailType} from 'utils/datatype';
import ResuableTitle from 'components/Resuable/ResuableTitle';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import Boxtext from 'components/Box/Boxtext/Boxtext';

interface IntroductionComicProps {
  comic: ComicDetailType;
  ACTIVECOLORS: ColorType;
}
const IntroductionComic: React.FC<IntroductionComicProps> = ({
  comic,
  ACTIVECOLORS,
}) => {
  return (
    <View style={styles.container}>
      <ResuableText
        color={ACTIVECOLORS.primaryWhiteHex}
        text={comic.name}
        textAlign="center"
        fontFamily={FONTFAMILY.poppins_semibold}
      />
      <HeightSpacer height={SPACING.space_10} />
      <View
        style={[
          resuable.center,
          {flexDirection: 'row', gap: SPACING.space_10},
        ]}>
        <Boxtext
          ACTIVECOLORS={ACTIVECOLORS}
          textTop="Chapter"
          textBottom={comic.chapters?.length.toString() || '0'}
        />
        <Boxtext
          ACTIVECOLORS={ACTIVECOLORS}
          textTop="Hoàn thành"
          textBottom={comic.is_finished ? 'Đã hoàn' : 'Chưa hoàn'}
        />
        <Boxtext
          ACTIVECOLORS={ACTIVECOLORS}
          textTop="Tên khác"
          textBottom={
            comic.other_name?.length
              ? comic.authors.map(item => item.name).join(' - ')
              : 'đang cập nhật'
          }
        />
      </View>
      <HeightSpacer height={SPACING.space_10} />
      <ResuableText
        color={ACTIVECOLORS.primaryWhiteHex}
        text={comic.description}
        textAlign="left"
        fontFamily={FONTFAMILY.poppins_regular}
      />
      <HeightSpacer height={SPACING.space_30} />
    </View>
  );
};

export default IntroductionComic;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_10,
  },
});
