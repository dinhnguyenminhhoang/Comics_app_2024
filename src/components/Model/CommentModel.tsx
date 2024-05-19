import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from 'hooks/useAppSelector';
import {RootState} from 'store/store';
import {useDispatch} from 'react-redux';
import {
  BORDERRADIUS,
  COLORS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {
  createComment,
  createCommentReply,
  getListComment,
} from 'state/Action/CommentAction';
import Toast from 'react-native-toast-message';
import ResuableText from 'components/Resuable/ResuableText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CommentItem from 'components/Comment/CommentItem';
import HeightSpacer from 'components/Resuable/HeightSpacer';
import ResuableTitle from 'components/Resuable/ResuableTitle';
interface CommentModelProps {
  chapterId: number;
  comicId: number;
  showCommentcpn: boolean;
  setShowCommentcpn: (show: boolean) => void;
}
const CommentModel: React.FC<CommentModelProps> = ({
  chapterId,
  comicId,
  setShowCommentcpn,
  showCommentcpn,
}) => {
  const [comment, setComment] = useState<string>('');
  const [showComment, setShowComment] = useState<boolean>(true);
  const [showKeyBoard, setShowKeyBoard] = useState<boolean>(true);
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  const dispatch = useDispatch<any>();
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const handleReply = (commentId: number, replyContent: string) => {
    if (commentId && replyContent !== '') {
      dispatch(
        createCommentReply({
          chapterID: chapterId,
          comicID: comicId,
          commentID: commentId,
          content: replyContent,
        }),
      );
    }
  };
  const listComments = useAppSelector(
    (state: RootState) => state.listComment.data,
  );
  const createReplyData = useAppSelector(
    (state: RootState) => state.createCommentReplyData.data,
  );
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.isLogger.isLoggedIn,
  );

  useEffect(() => {
    dispatch(
      getListComment({
        page: 1,
        page_size: 10,
        chapterID: chapterId,
        comicID: comicId,
      }),
    );
  }, [dispatch, chapterId, comicId]);
  const handleComment = () => {
    if (comment && comment?.trim() !== '') {
      try {
        dispatch(
          createComment({
            chapterID: chapterId,
            comicID: comicId,
            content: comment.trim(),
          }),
        ).then(() => {
          Toast.show({
            text1: 'Đợi trong giây lát để hiển thị',
            text2: 'Bình luận thành công !',
            type: 'info',
          });
          dispatch(
            getListComment({
              page: 1,
              page_size: 10,
              chapterID: chapterId,
              comicID: comicId,
            }),
          );
          setComment('');
        });
      } catch (error) {}
    }
  };
  return (
    <Modal
      animationType="slide"
      visible={showComment}
      onRequestClose={() => {
        setShowCommentcpn(!showCommentcpn);
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: ACTIVECOLORS.primaryBlackRGBA,
          },
        ]}>
        <ResuableTitle
          titleRight={`Tổng ${listComments?.length || 0} bình luận`}
          titleLeft="Danh sách bình luận"
          onPress={() => {}}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <HeightSpacer height={SPACING.space_10} />
          )}
          ListEmptyComponent={
            <ResuableText
              text="Trở thành người bình luận đầu điên nào !"
              size={FONTSIZE.size_16}
              color={ACTIVECOLORS.primaryWhiteHex}
              fontFamily={FONTFAMILY.poppins_medium}
              moreStyles={{marginTop: 20}}
            />
          }
          data={listComments}
          renderItem={({item}) => (
            <CommentItem
              comment={item}
              onReply={handleReply}
              ACTIVECOLORS={ACTIVECOLORS}
              setShowComment={setShowComment}
              chapterID={chapterId}
              comicID={comicId}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
        {showComment ? (
          isLoggedIn ? (
            <KeyboardAwareScrollView>
              <View style={styles.footer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: ACTIVECOLORS.primaryWhiteHex,
                      borderColor: ACTIVECOLORS.primaryWhiteHex,
                    },
                  ]}
                  placeholder="Comment..."
                  placeholderTextColor={ACTIVECOLORS.primaryWhiteHex}
                  onChangeText={(value: string) => setComment(value)}
                />
                <TouchableOpacity
                  onPress={handleComment}
                  style={[
                    styles.replyButton,
                    {borderColor: ACTIVECOLORS.primaryWhiteHex},
                  ]}>
                  <Text style={[{color: ACTIVECOLORS.primaryWhiteHex}]}>
                    Gửi
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <TouchableOpacity style={styles.btnLogin} onPress={() => {}}>
              <ResuableText
                text="Đăng nhập để bình luận"
                color={ACTIVECOLORS.primaryWhiteHex}
                fontFamily={FONTFAMILY.poppins_extrabold}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </Modal>
  );
};

export default CommentModel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  commentContainer: {},
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: SPACING.space_24 * 2,
    height: SPACING.space_24 * 2,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    // marginBottom: 5,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_8,
    height: SPACING.space_20 * 2,
  },
  replyButton: {
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_8,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    height: SPACING.space_20 * 2,
    borderWidth: 1,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
    width: SPACING.space_30 * 3,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: SPACING.space_12,
    // borderTopWidth: 1,
  },
  btnLogin: {
    // padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15,
    borderWidth: 1,
  },
});
