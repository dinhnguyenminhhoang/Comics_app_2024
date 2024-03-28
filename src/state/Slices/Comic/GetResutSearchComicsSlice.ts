// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getResultSearchComics} from 'state/Action/comicAction';
import {ComicType} from 'utils/datatype';

const GetResutSearchComicsSlice = createSlice({
  name: 'Get-Resut-Search-Comics-Slicer',
  initialState: {
    data: [] as ComicType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {
    resetResultSearchComics: (state, action) => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getResultSearchComics.pending, state => {
        state.isLoading = true;
      })
      .addCase(getResultSearchComics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getResultSearchComics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});
export const {resetResultSearchComics} = GetResutSearchComicsSlice.actions;

export default GetResutSearchComicsSlice.reducer;
