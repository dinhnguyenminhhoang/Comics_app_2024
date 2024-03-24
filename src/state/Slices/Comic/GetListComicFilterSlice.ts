// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getComiFilter} from 'state/Action/comicAction';
import {ComicType} from 'utils/datatype';

const GetListComicFilterSlice = createSlice({
  name: 'get-list-comics-filter',
  initialState: {
    data: [] as ComicType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getComiFilter.pending, state => {
        state.isLoading = true;
      })
      .addCase(getComiFilter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getComiFilter.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetListComicFilterSlice.reducer;
