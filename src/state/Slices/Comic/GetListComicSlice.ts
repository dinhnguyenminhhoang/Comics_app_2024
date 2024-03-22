// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getListComics} from 'state/Action/comicAction';
import {ComicType} from 'utils/datatype';

const GetListComicSlice = createSlice({
  name: 'get-list-comics',
  initialState: {
    data: [] as ComicType[],
    hasMore: false,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListComics.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListComics.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.hasMore = action.payload?.paging?.has_more;
      })
      .addCase(getListComics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetListComicSlice.reducer;
