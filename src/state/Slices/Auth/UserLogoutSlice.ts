// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {userLogout} from 'state/Action/AuthenAction';

const UserLogoutSlice = createSlice({
  name: 'Logout',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogout.pending, state => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default UserLogoutSlice.reducer;
