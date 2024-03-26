// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {UserRegister} from 'state/Action/AuthenAction';

const UserRegisterSlice = createSlice({
  name: 'Register',
  initialState: {
    data: {},
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UserRegister.pending, state => {
        state.isLoading = true;
      })
      .addCase(UserRegister.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(UserRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default UserRegisterSlice.reducer;
