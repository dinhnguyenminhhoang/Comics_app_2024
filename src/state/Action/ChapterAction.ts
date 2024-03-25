import {createAsyncThunk} from '@reduxjs/toolkit';
import * as ChapterApi from '../../service/ChapterApi';
export const getDetailChapter = createAsyncThunk(
  'getDetailChapter/handleGetDetailChapter',
  async (formData: {comicId: number; ChapterId: number}) => {
    try {
      const response = await ChapterApi.handleGetDetailChapter(formData);
      let data = response.data;
      return data;
    } catch (error) {
      throw error;
    }
  },
);
