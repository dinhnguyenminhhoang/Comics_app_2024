// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {UserLogin} from 'state/Action/AuthenAction';

const UserLoginSlice = createSlice({
  name: 'Login',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UserLogin.pending, state => {
        state.isLoading = true;
      })
      .addCase(UserLogin.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default UserLoginSlice.reducer;
