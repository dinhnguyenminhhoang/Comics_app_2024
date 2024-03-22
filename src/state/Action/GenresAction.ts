import {createAsyncThunk} from '@reduxjs/toolkit';
import * as genresApi from '../../service/genresApi';
export const getListGenres = createAsyncThunk(
  'listGenres/handleListGenres',
  async () => {
    try {
      const response = await genresApi.handleGetListGenres();
      let data = response;
      return data.data;
    } catch (error) {
      throw error;
    }
  },
);
