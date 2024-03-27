// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getProfileUser} from 'state/Action/profileAction';
import {ProfileType} from 'utils/datatype';

const GetProfileSlice = createSlice({
  name: 'get-profile',
  initialState: {
    data: {} as ProfileType,
    isLoading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProfileUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetProfileSlice.reducer;
