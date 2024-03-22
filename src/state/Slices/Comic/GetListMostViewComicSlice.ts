// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getListMostViewComics} from 'state/Action/comicAction';
import {ComicType} from 'utils/datatype';

const GetListMostViewComicSlice = createSlice({
  name: 'get-list-most -view-comics',
  initialState: {
    data: [] as ComicType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListMostViewComics.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListMostViewComics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getListMostViewComics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetListMostViewComicSlice.reducer;
