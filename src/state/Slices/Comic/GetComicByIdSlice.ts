// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getComicById} from 'state/Action/comicAction';
import {ComicDetailType, ComicType} from 'utils/datatype';

const GetComicByIdSlice = createSlice({
  name: 'get-comics-by-id',
  initialState: {
    data: {} as ComicDetailType,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getComicById.pending, state => {
        state.isLoading = true;
      })
      .addCase(getComicById.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getComicById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetComicByIdSlice.reducer;
