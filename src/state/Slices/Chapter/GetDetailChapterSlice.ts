// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getDetailChapter} from 'state/Action/ChapterAction';
import {chapterDetailType} from 'utils/datatype';

const GetDetailChapterSlice = createSlice({
  name: 'get-detail-chapter',
  initialState: {
    data: {} as chapterDetailType,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDetailChapter.pending, state => {
        state.isLoading = true;
      })
      .addCase(getDetailChapter.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDetailChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetDetailChapterSlice.reducer;
