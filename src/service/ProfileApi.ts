import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../config/instance';

const handleGetUserProfile = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };

  return axios.get('/api/v1/user/profile', {headers});
};
const handleUpdateUserProfile = async (formData: {
  first_name: string;
  last_name: string;
  gender: boolean;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  return axios.patch('/api/v1/user/profile', formData, {headers: headers});
};
const handleUpdateImg = async (file: any) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${JSON.parse(token || '')}`,
    // ...file.getHeaders(),
  };
  return axios.put('/api/v1/user/profile/avatar', file, {headers: headers});
};
const handleResetPassword = async (formData: {
  current_password: string;
  new_password: string;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  return axios.put(`/api/v1/user/change-password`, formData, {headers});
};
const handleGetHistory = async (formData: {
  page: number;
  page_size: number;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  return axios.get('/api/v1/user/histories', {params: formData, headers});
};
const handleGetComment = async (formData: {
  page: number;
  page_size: number;
}) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  return axios.get(`/api/v1/user/comments`, {params: formData, headers});
};
export {
  handleGetComment,
  handleGetHistory,
  handleGetUserProfile,
  handleResetPassword,
  handleUpdateImg,
  handleUpdateUserProfile,
};
