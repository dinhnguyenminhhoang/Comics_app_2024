import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  darkMore: false,
};

const ThemeDarkMore = createSlice({
  name: 'ThemeDarkMore',
  initialState,
  reducers: {
    setComponentLevelLoading: (state, action) => {
      state.darkMore = action.payload;
    },
  },
});

export const {setComponentLevelLoading} = ThemeDarkMore.actions;
export default ThemeDarkMore.reducer;
