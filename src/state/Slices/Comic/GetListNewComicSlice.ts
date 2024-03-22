// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getListNewComics} from 'state/Action/comicAction';
import {ComicType} from 'utils/datatype';

const GetListNewComicSlice = createSlice({
  name: 'get-list-new-comics',
  initialState: {
    data: [] as ComicType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListNewComics.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListNewComics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getListNewComics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetListNewComicSlice.reducer;
