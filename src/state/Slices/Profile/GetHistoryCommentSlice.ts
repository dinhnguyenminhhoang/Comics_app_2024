// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getHistoryComment} from 'state/Action/profileAction';
import {ProfileType, comentHistoryType} from 'utils/datatype';

const GetHistoryCommentSlice = createSlice({
  name: 'get-history-comment',
  initialState: {
    data: [] as comentHistoryType[],
    isLoading: false,
    error: null as string | null,
    isMore: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHistoryComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(getHistoryComment.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.isMore = action.payload.paging.has_more;
      })
      .addCase(getHistoryComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetHistoryCommentSlice.reducer;
