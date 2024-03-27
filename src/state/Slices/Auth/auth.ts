import {createSlice} from '@reduxjs/toolkit';
import {userinfoType} from 'utils/datatype';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userInfo: ({} as userinfoType) || {},
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: builder => {},
});
export const {setIsLoggedIn, setUserInfo} = authSlice.actions;
export default authSlice.reducer;
