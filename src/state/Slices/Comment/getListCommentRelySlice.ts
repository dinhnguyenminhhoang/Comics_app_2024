// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getListCommentReply} from 'state/Action/CommentAction';

const getListCommentRelySlice = createSlice({
  name: 'get-list-comment--reply',
  initialState: {
    data: [],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListCommentReply.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListCommentReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getListCommentReply.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default getListCommentRelySlice.reducer;
