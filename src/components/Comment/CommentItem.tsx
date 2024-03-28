import resuable from 'components/Resuable/Resuable.style';
import ResuableText from 'components/Resuable/ResuableText';
import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getListCommentReply} from 'state/Action/CommentAction';
import {RootState} from 'store/store';
import {
  BORDERRADIUS,
  ColorType,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from 'theme/theme';
import {replyCOmmentType} from 'utils/datatype';

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
  onReply: (commentId: number, replyContent: string) => void;
  ACTIVECOLORS: ColorType;
  setShowComment: (show: boolean) => void;
  chapterID: number;
  comicID: number;
}
const CommentItem: React.FC<comicItemProp> = ({
  comment,
  onReply,
  ACTIVECOLORS,
  setShowComment,
  chapterID,
  comicID,
}) => {
  const [relyId, setReplyId] = useState<number>(0);
  const [replyContent, setReplyContent] = useState('');
  const dispatch = useDispatch<any>();
  const commentReply = useAppSelector(
    (state: RootState) => state.listCommentReply.data,
  ) as replyCOmmentType[];
  const handleReply = () => {
    if (replyContent.trim() !== '') {
      onReply(comment.id, replyContent);
      setReplyContent('');
      Keyboard.dismiss();
    }
  };
  const handleShowReply = (id: number) => {
    if (relyId === 0) {
      setReplyId(id);
      setShowComment(false);
    } else {
      setReplyId(0);
      setShowComment(true);
    }
  };
  useEffect(() => {
    dispatch(
      getListCommentReply({
        chapterID: chapterID,
        comicID: comicID,
        commentID: comment.id,
        page: 1,
        page_size: 10,
      }),
    );
  }, [chapterID, comicID, comment]);
  // console.log('commentReply', commentReply);
  return (
    <View style={[styles.commentContainer]}>
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
            handleShowReply(comment.id);
          }}>
          <Text
            style={[
              styles.replyMiniIcon,
              {
                color: ACTIVECOLORS.primaryWhiteHex,
              },
            ]}>
            {relyId > 0 ? 'ẩn' : 'phản hồi'}
          </Text>
        </TouchableOpacity>
      </View>
      {commentReply?.length && commentReply[0].parent_id === comment.id ? (
        <FlatList
          data={commentReply}
          renderItem={({item}) => (
            <View style={{}}>
              <View style={styles.userReply}>
                <Image
                  source={{uri: comment.user_avatar}}
                  style={styles.avatar}
                />
                <ResuableText
                  text={item.username}
                  size={FONTSIZE.size_16}
                  fontFamily={FONTFAMILY.poppins_medium}
                  numberOfLines={3}
                  color={ACTIVECOLORS.primaryWhiteHex}
                  textAlign="left"
                />
              </View>
              <ResuableText
                text={item.content}
                size={FONTSIZE.size_12}
                fontFamily={FONTFAMILY.poppins_medium}
                numberOfLines={3}
                color={ACTIVECOLORS.primaryWhiteHex}
                textAlign="left"
              />
            </View>
          )}
        />
      ) : null}

      {relyId === comment.id ? (
        <View style={styles.replyContainer}>
          <TextInput
            style={[
              styles.input,
              {
                color: ACTIVECOLORS.primaryWhiteHex,
                borderColor: ACTIVECOLORS.secondaryLightGreyHex,
              },
            ]}
            placeholder="Reply..."
            placeholderTextColor={ACTIVECOLORS.secondaryLightGreyHex}
            value={replyContent}
            onChangeText={setReplyContent}
          />
          <TouchableOpacity
            style={[
              styles.replyButton,
              {
                borderColor: ACTIVECOLORS.secondaryLightGreyHex,
              },
            ]}
            onPress={handleReply}>
            <Text style={{color: ACTIVECOLORS.primaryWhiteHex}}>Phản hồi</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  commentContainer: {
    marginBottom: 20,
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
});

export default CommentItem;
