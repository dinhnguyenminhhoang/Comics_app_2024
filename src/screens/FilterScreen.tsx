import {
  BottomTabNavigationProp,
  useBottomTabBarHeight,
} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import BoxImg from 'components/Box/ComicsBox/BoxImg';
import HeaderBar from 'components/Header/HeaderBar';
import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import TextIcon from 'components/Resuable/TextIcon';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getComiFilter} from 'state/Action/comicAction';
import {setComponentLevelLoading} from 'state/Slices/common/ComponentLoading';
import {RootState} from 'store/store';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {COMICPARAM} from 'utils/ApiType';
import {
  ComicType,
  RootAppParamList,
  RootStackParamList,
  genresType,
} from 'utils/datatype';

type Props = NativeStackScreenProps<RootStackParamList, 'Filter'>;
const FilterScreen: React.FC<Props> = ({route}) => {
  const [listIdFilttered, setListIdFiltered] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootAppParamList>>();
  const dispatch = useDispatch<any>();
  const listComics = useAppSelector(
    (state: RootState) => state.listComics.data,
  ) as ComicType[];
  const listGenres = useAppSelector(
    (state: RootState) => state.getListGenres.data,
  ) as genresType[];
  const ListComicsFilter = useAppSelector(
    (state: RootState) => state.ListComicsFilter.data,
  ) as ComicType[];
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const ComponentLoading = useAppSelector(
    (state: RootState) => state.ComponentLoading.componentLevelLoading,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const tabBarHeight = useBottomTabBarHeight();
  useEffect(() => {
    if (route.params.genresId && route.params.genresId > 0) {
      setListIdFiltered([route.params.genresId]);
      dispatch(setComponentLevelLoading(true));
      dispatch(
        getComiFilter({
          ...COMICPARAM,
          genres: [route.params.genresId],
          page_size: 22,
        }),
      ).then(() => {
        dispatch(setComponentLevelLoading(false));
      });
    }
  }, [route.params?.genresId]);
  const handleFilter = () => {
    if (listIdFilttered.length === 0) {
      return 0;
    }
    dispatch(setComponentLevelLoading(true));
    dispatch(
      getComiFilter({...COMICPARAM, genres: listIdFilttered, page_size: 22}),
    ).then(() => {
      setShowModal(false);
      dispatch(setComponentLevelLoading(false));
    });
  };
  const handleAddOrRemoveIdFilter = (id: number) => {
    const idIndex = listIdFilttered.indexOf(id);
    if (idIndex !== -1) {
      const newList = [
        ...listIdFilttered.slice(0, idIndex),
        ...listIdFilttered.slice(idIndex + 1),
      ];
      setListIdFiltered(newList);
    } else {
      setListIdFiltered([...listIdFilttered, id]);
    }
  };

  if (ComponentLoading) {
    return (
      <View style={[styles.container, resuable.center]}>
        <ActivityIndicator size={40} />
        <ResuableText
          text="Loading..."
          size={FONTSIZE.size_20}
          color={ACTIVECOLORS.secondaryLightGreyHex}
          moreStyles={{marginTop: SPACING.space_8}}
        />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: ACTIVECOLORS.primaryBlackHex,
        },
      ]}>
      <StatusBar
        backgroundColor={ACTIVECOLORS.fixColorBlack}
        barStyle={'default'}
      />
      <HeaderBar title="Comics" />
      <View style={{marginBottom: tabBarHeight, flex: 1}}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={[resuable.rowWithSpace]}>
              <View>
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={[
                    styles.btnFilter,
                    {borderColor: ACTIVECOLORS.primaryWhiteHex},
                  ]}>
                  <TextIcon
                    colorIcon={ACTIVECOLORS.primaryWhiteHex}
                    nameIcon="filter"
                    sizeIcon={FONTSIZE.size_24}
                    text="Chọn để lọc"
                    textColor={ACTIVECOLORS.primaryWhiteHex}
                    textSize={FONTSIZE.size_16}
                  />
                </TouchableOpacity>
                {listIdFilttered.length ? (
                  <View
                    style={[
                      styles.btnFilter,
                      {borderColor: ACTIVECOLORS.primaryWhiteHex},
                    ]}>
                    <TextIcon
                      colorIcon={ACTIVECOLORS.primaryWhiteHex}
                      nameIcon="checkcircleo"
                      sizeIcon={FONTSIZE.size_24}
                      text={`${listIdFilttered
                        .map(id => {
                          const matched = listGenres.find(
                            item => item.id === id,
                          );
                          return matched ? matched.name : null;
                        })
                        .filter(name => name !== null)
                        .join(' - ')}`}
                      textColor={ACTIVECOLORS.primaryWhiteHex}
                      textSize={FONTSIZE.size_16}
                      moreStyle={{
                        maxWidth:
                          Dimensions.get('window').width - SPACING.space_30 * 2,
                      }}
                    />
                  </View>
                ) : null}
              </View>
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
                  <View
                    style={[
                      styles.modalView,
                      {backgroundColor: ACTIVECOLORS.fixColorWhite},
                    ]}>
                    <View style={styles.modalContent}>
                      {listGenres?.map(genres => (
                        <TouchableOpacity
                          onPress={() => handleAddOrRemoveIdFilter(genres.id)}
                          key={genres.id}>
                          <ResuableText
                            text={genres.name}
                            moreStyles={[
                              styles.text,
                              {
                                borderColor: ACTIVECOLORS.primaryDarkGreyHex,
                              },
                              listIdFilttered.find(id => genres.id === id)
                                ? {
                                    backgroundColor: ACTIVECOLORS.fixColorBlack,
                                    color: ACTIVECOLORS.fixColorWhite,
                                  }
                                : {
                                    backgroundColor: 'transparent',
                                    color: ACTIVECOLORS.fixColorBlack,
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
                        onPress={handleFilter}>
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
                        style={[styles.btnAction, {backgroundColor: '#6c757d'}]}
                        onPress={() => {
                          setListIdFiltered([]);
                          setShowModal(false);
                        }}>
                        <TextIcon
                          nameIcon="minuscircleo"
                          colorIcon={ACTIVECOLORS.fixColorWhite}
                          sizeIcon={FONTSIZE.size_20}
                          text="Làm mới"
                          textColor={ACTIVECOLORS.fixColorWhite}
                          textSize={FONTSIZE.size_16}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.btnAction, {backgroundColor: '#dc3545'}]}
                        onPress={() => setShowModal(false)}>
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
          ListEmptyComponent={
            <ResuableText
              text=" Không tìm thấy truyện nào phù hợp"
              size={FONTSIZE.size_24}
              color={ACTIVECOLORS.primaryWhiteHex}
              fontFamily={FONTFAMILY.poppins_semibold}
            />
          }
          data={
            ListComicsFilter.length && listIdFilttered.length
              ? ListComicsFilter
              : listComics
          }
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', {comicId: item.id})}
              style={[styles.itemContainer]}>
              <BoxImg
                item={item}
                moreStyles={[
                  styles.img,
                  {
                    borderColor: ACTIVECOLORS.primaryBlackRGBA,
                  },
                ]}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default FilterScreen;

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
  btnFilter: {
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    marginVertical: SPACING.space_10,
    maxWidth: Dimensions.get('screen').width - SPACING.space_20,
  },
});
