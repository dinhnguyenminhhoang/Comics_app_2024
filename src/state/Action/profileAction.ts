import {createAsyncThunk} from '@reduxjs/toolkit';
import * as ProfileApi from '../../service/ProfileApi';
export const getProfileUser = createAsyncThunk(
  'getProfileUser/handleGetProfileUser',
  async () => {
    try {
      const response = await ProfileApi.handleGetUserProfile();
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
export const getHistoryView = createAsyncThunk(
  'getHistoryView/handleGetHistoryViewr',
  async (formData: {page: number; page_size: number}) => {
    try {
      const response = await ProfileApi.handleGetHistory(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
export const getHistoryComment = createAsyncThunk(
  'getHistoryComment/handleGetHistoryCommentr',
  async (formData: {page: number; page_size: number}) => {
    try {
      const response = await ProfileApi.handleGetComment(formData);
      let data = response;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
