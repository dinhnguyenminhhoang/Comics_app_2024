import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAppSelector} from 'hooks/useAppSelector';
import ComicsBoxLoadPage from 'components/Box/ComicsBox/ComicsBoxLoadPage';
import {ComicType, genresType} from 'utils/datatype';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import ResuableText from 'components/Resuable/ResuableText';
import resuable from 'components/Resuable/Resuable.style';
import HeaderBar from 'components/Header/HeaderBar';
import TextIcon from 'components/Resuable/TextIcon';

const FilterScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const listComics = useAppSelector(
    (state: any) => state.listComics.data,
  ) as ComicType[];
  const listGenres = useAppSelector(
    (state: any) => state.getListGenres.data,
  ) as genresType[];
  const ThemeDarkMode = useAppSelector(
    (state: any) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;

  return (
    <View style={styles.container}>
      <HeaderBar title="Comics" />
      <FlatList
        ListHeaderComponent={() => (
          <View style={[resuable.rowWithSpace]}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={showModal}
              onRequestClose={() => {
                setShowModal(false);
              }}>
              <View style={styles.centeredView}>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={styles.overlay}></TouchableOpacity>
                <ResuableText
                  text="CHỌN CÁC THỂ LOẠI MUỐN LỌC"
                  color={ACTIVECOLORS.fixColorWhite}
                  fontFamily={FONTFAMILY.poppins_extrabold}
                  size={FONTSIZE.size_20}
                />
                <View style={styles.modalView}>
                  <View style={styles.modalContent}>
                    {listGenres.map(genres => (
                      <TouchableOpacity onPress={() => {}} key={genres.id}>
                        <ResuableText
                          text={genres.name}
                          moreStyles={[
                            styles.text,
                            {
                              color: ACTIVECOLORS.primaryDarkGreyHex,
                              borderColor: ACTIVECOLORS.primaryDarkGreyHex,
                            },
                          ]}
                          numberOfLines={1}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={[resuable.rowWithSpace, {gap: 4}]}>
                    <TouchableOpacity
                      style={[styles.btnAction, {backgroundColor: '#28a745'}]}
                      onPress={() => setShowModal(true)}>
                      <TextIcon
                        nameIcon="filter"
                        colorIcon={ACTIVECOLORS.fixColorWhite}
                        sizeIcon={FONTSIZE.size_20}
                        text="Lọc"
                        textColor={ACTIVECOLORS.fixColorWhite}
                        textSize={FONTSIZE.size_16}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btnAction, {backgroundColor: '#dc3545'}]}
                      onPress={() => setShowModal(true)}>
                      <TextIcon
                        nameIcon="close"
                        colorIcon={ACTIVECOLORS.fixColorWhite}
                        sizeIcon={FONTSIZE.size_20}
                        text="Hủy"
                        textColor={ACTIVECOLORS.fixColorWhite}
                        textSize={FONTSIZE.size_16}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
        data={listComics}
        showsVerticalScrollIndicator={false}
        renderItem={item => (
          <>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text>ShowModal</Text>
            </TouchableOpacity>
            <ComicsBoxLoadPage listComics={listComics} />
          </>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_10,
  },
  text: {
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_25,
    width: SPACING.space_30 * 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    padding: SPACING.space_20,
    margin: SPACING.space_10,
  },
  modalContent: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: SPACING.space_10,
  },
  btnAction: {
    paddingVertical: FONTSIZE.size_10,
    paddingHorizontal: FONTSIZE.size_14,
    borderRadius: BORDERRADIUS.radius_25,
  },
});
