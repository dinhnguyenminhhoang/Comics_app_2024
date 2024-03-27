import {AuthenApiParams} from './../utils/ApiType';
import axios from '../config/instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const handleLogin = (formData: AuthenApiParams) => {
  return axios.post(`/api/v1/auth/login`, formData);
};
const handleRegister = (formData: AuthenApiParams) => {
  return axios.post(`/api/v1/auth/register`, formData);
};
const handlelogout = async () => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${JSON.parse(token || '')}`,
  };
  return axios.delete(`/api/v1/auth/logout`, {headers});
};
export {handleLogin, handleRegister, handlelogout};
