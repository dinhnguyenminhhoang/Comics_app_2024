// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getListGenres} from 'state/Action/GenresAction';
import {genresType} from 'utils/datatype';

const GetListGenresSlice = createSlice({
  name: 'get-list-genres',
  initialState: {
    data: [] as genresType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListGenres.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getListGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetListGenresSlice.reducer;
