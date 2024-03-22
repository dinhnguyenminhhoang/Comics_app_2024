// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getListNewChapter} from 'state/Action/comicAction';
import {ComicType} from 'utils/datatype';

const GetListNewChapterSlice = createSlice({
  name: 'get-list-new-chapter',
  initialState: {
    data: [] as ComicType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListNewChapter.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListNewChapter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getListNewChapter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetListNewChapterSlice.reducer;
