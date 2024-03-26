import {createAsyncThunk} from '@reduxjs/toolkit';
import * as AuthenticatonApi from '../../service/AuthenticatonApi';
import {AuthenApiParams} from 'utils/ApiType';
export const UserLogin = createAsyncThunk(
  'UserLogin/handleUserLogin',
  async (formData: AuthenApiParams) => {
    try {
      const response = await AuthenticatonApi.handleLogin(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const UserRegister = createAsyncThunk(
  'UserRegister/handleUserRegister',
  async (formData: AuthenApiParams) => {
    try {
      const response = await AuthenticatonApi.handleRegister(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const userLogout = createAsyncThunk(
  'UseruserLogout/handleUseruserLogout',
  async () => {
    try {
      const response = await AuthenticatonApi.handlelogout();
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
