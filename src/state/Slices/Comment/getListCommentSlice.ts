// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {CommentType} from 'components/Comment/CommentItem';
import {getListComment} from 'state/Action/CommentAction';

const getListCommentSlice = createSlice({
  name: 'get-list-comment',
  initialState: {
    data: [] as CommentType[],
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getListComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(getListComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getListComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default getListCommentSlice.reducer;
