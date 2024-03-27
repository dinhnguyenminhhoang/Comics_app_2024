import {useAppSelector} from 'hooks/useAppSelector';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import {RootState} from 'store/store';
import {BORDERRADIUS, COLORS, ColorType, SPACING} from 'theme/theme';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  username: string;
  user_avatar: string;
  is_owner: boolean;
  reply_num: number;
}

interface Props {
  comments: Comment[];
}

const CommentItem: React.FC<{
  comment: Comment;
  onReply: (commentId: number, replyContent: string) => void;
}> = ({comment, onReply}) => {
  const [replyContent, setReplyContent] = useState('');
  const handleReply = () => {
    if (replyContent.trim() !== '') {
      onReply(comment.id, replyContent);
      setReplyContent('');
      Keyboard.dismiss(); // Ẩn bàn phím sau khi gửi comment
    }
  };

  return (
    <View style={[styles.commentContainer]}>
      {/* Nội dung comment */}
      <View style={styles.userInfoContainer}>
        <Image source={{uri: comment.user_avatar}} style={styles.avatar} />
        <Text style={styles.username}>{comment.username}</Text>
      </View>
      <Text style={styles.content}>{comment.content}</Text>

      {/* Phần nhập liệu reply */}
      <View style={styles.replyContainer}>
        <TextInput
          style={styles.input}
          placeholder="Reply..."
          value={replyContent}
          onChangeText={setReplyContent}
        />
        <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
          <Text style={{}}>Phản hồi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommentScreen: React.FC<Props> = ({comments}) => {
  const ThemeDarkMode = useAppSelector(
    (state: RootState) => state.ThemeDarkMode.darkMode,
  );
  let ACTIVECOLORS = (ThemeDarkMode ? COLORS.dark : COLORS.light) as ColorType;
  const handleReply = (commentId: number, replyContent: string) => {
    // Xử lý logic reply comment ở đây
    console.log(`Reply to comment ${commentId} with content: ${replyContent}`);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: ACTIVECOLORS.primaryBlackHex},
      ]}>
      <FlatList
        data={comments}
        renderItem={({item}) => (
          <CommentItem comment={item} onReply={handleReply} />
        )}
        keyExtractor={item => item.id.toString()}
      />
      {/* Phần nhập liệu ở footer */}
      <KeyboardAvoidingView behavior="padding" style={styles.footer}>
        <TextInput
          style={[styles.input, {color: ACTIVECOLORS.primaryWhiteHex}]}
          placeholder="Comment..."
        />
        <TouchableOpacity style={styles.replyButton}>
          <Text style={[{color: ACTIVECOLORS.primaryWhiteHex}]}>Gửi</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    padding: SPACING.space_10,
  },
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
    marginBottom: 5,
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
    paddingTop: SPACING.space_12,
    borderTopWidth: 1,
  },
});

export default CommentScreen;
