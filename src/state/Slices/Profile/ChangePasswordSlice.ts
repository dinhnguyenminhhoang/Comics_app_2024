// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {ChangePassword} from 'state/Action/profileAction';

const ChangePasswordSlice = createSlice({
  name: 'change-password',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ChangePassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default ChangePasswordSlice.reducer;
