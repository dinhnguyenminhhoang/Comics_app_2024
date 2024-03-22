import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

const ThemeDarkMode = createSlice({
  name: 'ThemeDarkMode',
  initialState,
  reducers: {
    setDrakMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const {setDrakMode} = ThemeDarkMode.actions;
export default ThemeDarkMode.reducer;
