import {AuthenApiParams} from './../utils/ApiType';
import axios from '../config/instance';

const handleLogin = (formData: AuthenApiParams) => {
  return axios.post(`/api/v1/auth/login`, formData);
};
const handleRegister = (formData: AuthenApiParams) => {
  return axios.post(`/api/v1/auth/register`, formData);
};
const handlelogout = () => {
  return axios.get(`/api/v1/auth/logout`);
};
export {handleLogin, handleRegister, handlelogout};
