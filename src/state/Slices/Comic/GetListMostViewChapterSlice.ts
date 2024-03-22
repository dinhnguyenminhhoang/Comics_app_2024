// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getListMostViewChapter} from 'state/Action/comicAction';
import {ComicType} from 'utils/datatype';

const GetListMostViewChapterSlice = createSlice({
  name: 'get-list-most-view-chapter',
  initialState: {
    data: [] as ComicType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListMostViewChapter.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListMostViewChapter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getListMostViewChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetListMostViewChapterSlice.reducer;
