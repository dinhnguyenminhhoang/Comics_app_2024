// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {deleteComment} from 'state/Action/CommentAction';

const deleteCommentSlice = createSlice({
  name: 'get-list-comment',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default deleteCommentSlice.reducer;
