// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {createComment} from 'state/Action/CommentAction';

const createCommentSlice = createSlice({
  name: 'create-comment',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default createCommentSlice.reducer;
