import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../config/instance';

const handleGetListComment = async (formData: {
  comicID: number;
  chapterID: number;
  page: number;
  page_size: number;
}) => {
  const token = await AsyncStorage.getItem('token');

  const {comicID, chapterID, page, page_size} = formData;
  if (token) {
    const headers = {
      Authorization: `Bearer ${JSON.parse(token || '')}`,
    };
    return axios.get(
      `/api/v1/comics/${comicID}/chapter/${chapterID}/comments`,
      {
        headers,
        params: {
          page,
          page_size,
        },
      },
    );
  }
  return axios.get(`/api/v1/comics/${comicID}/chapter/${chapterID}/comments`, {
    params: {
      page,
      page_size,
    },
  });
};
const handleGetListCommentReply = async (formData: {
  comicID: number;
  chapterID: number;
  page: number;
  page_size: number;
  commentID: number;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  const {comicID, chapterID, page, page_size, commentID} = formData;
  return axios.get(
    `/api/v1/comics/${comicID}/chapter/${chapterID}/comments/${commentID}/replies`,
    {
      headers,
      params: {
        page,
        page_size,
      },
    },
  );
};
const handleCreateComment = async (formData: {
  comicID: number;
  chapterID: number;
  content: string;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  const {comicID, chapterID, content} = formData;
  return axios.post(
    `/api/v1/comics/${comicID}/chapter/${chapterID}/comments`,
    {
      content: content,
    },
    {
      headers: headers,
    },
  );
};
const handleDeleteComment = async (formData: {
  comicID: number;
  chapterID: number;
  commentID: number;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  const {comicID, chapterID, commentID} = formData;
  return axios.delete(
    `/api/v1/comics/${comicID}/chapter/${chapterID}/comments/${commentID}`,
    {
      headers: headers,
    },
  );
};
const handleCreateCommentReply = async (formData: {
  comicID: number;
  chapterID: number;
  content: string;
  commentID: number;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  const {comicID, chapterID, content, commentID} = formData;
  return axios.post(
    `/api/v1/comics/${comicID}/chapter/${chapterID}/comments/${commentID}/replies`,
    {
      content: content,
    },
    {
      headers: headers,
    },
  );
};
export {
  handleGetListComment,
  handleCreateComment,
  handleCreateCommentReply,
  handleDeleteComment,
  handleGetListCommentReply,
};
