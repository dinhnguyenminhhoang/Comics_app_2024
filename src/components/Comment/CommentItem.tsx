import {Ionicons} from '@expo/vector-icons';
import ResuableText from 'components/Resuable/ResuableText';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {
  createCommentReply,
  getListCommentReply,
} from 'state/Action/CommentAction';
import {BORDERRADIUS, ColorType, FONTSIZE, SPACING} from 'theme/theme';
import {replyCOmmentType} from 'utils/datatype';
import * as Yup from 'yup';

export interface CommentType {
  id: number;
  content: string;
  created_at: string;
  username: string;
  user_avatar: string;
  is_owner: boolean;
  reply_num: number;
}
interface comicItemProp {
  comment: CommentType;
  ACTIVECOLORS: ColorType;
  chapterID: number;
  comicID: number;
  showComment: boolean;
  setShowComment: (showComment: boolean) => void;
}

const validationSchema = Yup.object().shape({
  contentReply: Yup.string()
    .min(6, 'Bình luận phải trên 6 kí tự')
    .required('Bắt buộc'),
});
const CommentItem: React.FC<comicItemProp> = ({
  comment,
  ACTIVECOLORS,
  chapterID,
  comicID,
  showComment,
  setShowComment,
}) => {
  const [showInputReply, setShowInputReply] = useState(false);
  const [callApiReply, setCallApiReply] = useState(false);
  const [listCommentReply, setListCommentReply] = useState<replyCOmmentType[]>(
    [],
  );
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (callApiReply)
      if (comicID && chapterID && comment.id) {
        dispatch(
          getListCommentReply({
            chapterID: chapterID,
            comicID: comicID,
            commentID: comment.id,
            page: 1,
            page_size: 10,
          }),
        ).then((req: any) => {
          if (req?.payload?.data?.length > 0) {
            setListCommentReply(req.payload.data);
          }
        });
      }
  }, [dispatch, comment, comicID, chapterID, callApiReply]);
  // const handleCreateReplyComment = () => {};
  return (
    <View
      style={[
        styles.commentContainer,
        {borderBottomColor: ACTIVECOLORS.primaryWhiteHexRBGA},
      ]}>
      <View style={styles.userInfoContainer}>
        <Image source={{uri: comment.user_avatar}} style={styles.avatar} />
        <Text style={[styles.username, {color: ACTIVECOLORS.primaryWhiteHex}]}>
          {comment.username}
        </Text>
      </View>
      <View
        style={[
          {
            justifyContent: 'flex-start',
            gap: 4,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: SPACING.space_8,
          },
        ]}>
        <Text style={[styles.content, {color: ACTIVECOLORS.primaryWhiteHex}]}>
          {comment.content}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowInputReply(!showInputReply);
            showInputReply ? setShowComment(true) : setShowComment(false);
          }}>
          <Text style={styles.replyMiniIcon}>
            {!showInputReply ? 'Phàn hồi' : 'Ẩn'}
          </Text>
        </TouchableOpacity>
      </View>
      {!callApiReply ? (
        <TouchableOpacity
          onPress={() => setCallApiReply(true)}
          style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <Ionicons
            name="arrow-redo"
            size={14}
            color={ACTIVECOLORS.primaryWhiteHex}
          />
          <ResuableText
            text="xem phản hồi"
            textAlign="start"
            size={FONTSIZE.size_12}
          />
        </TouchableOpacity>
      ) : null}
      {listCommentReply?.length && callApiReply ? (
        listCommentReply?.map(commentReply => (
          <View
            key={commentReply.id}
            style={{gap: SPACING.space_8, marginTop: SPACING.space_8}}>
            <View style={styles.userReply}>
              <Image
                source={{uri: commentReply.user_avatar}}
                style={styles.avatar}
              />
              <View style={{gap: SPACING.space_4}}>
                <Text
                  style={[
                    styles.username,
                    {color: ACTIVECOLORS.primaryWhiteHex},
                  ]}>
                  {commentReply.username}
                </Text>
                <Text
                  style={[
                    styles.contentReply,
                    {color: ACTIVECOLORS.primaryWhiteHex},
                  ]}>
                  {commentReply.content}
                </Text>
              </View>
            </View>
            <View
              style={[
                {
                  justifyContent: 'flex-start',
                  gap: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: SPACING.space_8,
                },
              ]}></View>
          </View>
        ))
      ) : callApiReply ? (
        <ResuableText
          text="hãy trở thành người phản hồi đầu tiên"
          color={ACTIVECOLORS.primaryWhiteHex}
          size={FONTSIZE.size_14}
        />
      ) : null}
      {showInputReply ? (
        <Formik
          initialValues={{
            contentReply: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values: {contentReply: string}, {resetForm}) => {
            dispatch(
              createCommentReply({
                chapterID: chapterID,
                comicID: comicID,
                commentID: comment.id,
                content: values.contentReply,
              }),
            ).then(() => {
              dispatch(
                getListCommentReply({
                  chapterID: chapterID,
                  comicID: comicID,
                  commentID: comment.id,
                  page: 1,
                  page_size: 10,
                }),
              ).then((req: any) => {
                if (req?.payload?.data?.length > 0) {
                  setListCommentReply(req.payload.data);
                }
              });
              resetForm();
              setShowInputReply(false);
              setShowComment(true);
            });
          }}>
          {({
            handleChange,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <KeyboardAwareScrollView>
              <View style={styles.replyContainer}>
                <TextInput
                  placeholder="Trả lời ..."
                  style={styles.input}
                  onFocus={() => {
                    setFieldTouched('contentReply');
                  }}
                  onBlur={() => {
                    setFieldTouched('contentReply');
                  }}
                  value={values.contentReply}
                  onChangeText={handleChange('contentReply')}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.replyButton}
                  onPress={handleSubmit}>
                  <Text>Trả lời</Text>
                </TouchableOpacity>
              </View>
              {touched.contentReply && errors.contentReply && (
                <Text style={styles.errMessage}>{errors.contentReply}</Text>
              )}
            </KeyboardAwareScrollView>
          )}
        </Formik>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  commentContainer: {
    paddingBottom: SPACING.space_10,
    borderBottomWidth: 1,
  },
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
    fontSize: FONTSIZE.size_14,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
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
  replyMiniIcon: {
    fontSize: FONTSIZE.size_12,
    textDecorationLine: 'underline',
  },
  userReply: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_4,
    marginLeft: SPACING.space_8,
  },
  errMessage: {
    color: 'red',
    fontSize: FONTSIZE.size_14,
    marginTop: 5,
    marginLeft: 5,
  },
  contentReply: {
    // marginLeft: SPACING.space_20,
  },
});

export default CommentItem;
