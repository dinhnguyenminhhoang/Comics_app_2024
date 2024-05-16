// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {UpdateUserProfile} from 'state/Action/profileAction';

const UpdateProfileCommentSlice = createSlice({
  name: 'update-user-profile',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UpdateUserProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(UpdateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(UpdateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default UpdateProfileCommentSlice.reducer;
