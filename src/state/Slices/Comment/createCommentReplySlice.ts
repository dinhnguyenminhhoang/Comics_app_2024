// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {createCommentReply} from 'state/Action/CommentAction';

const createCommentReplySlice = createSlice({
  name: 'create-comment-reply',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createCommentReply.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createCommentReply.fulfilled,
        (state, action: {payload: any}) => {
          state.isLoading = false;
          state.data = action.payload.causes || action.payload.data;
        },
      )
      .addCase(createCommentReply.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default createCommentReplySlice.reducer;
