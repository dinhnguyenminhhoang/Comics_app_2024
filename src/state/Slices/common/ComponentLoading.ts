import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  componentLevelLoading: {
    loading: false,
    id: '',
  },
};

const ComponentLoading = createSlice({
  name: 'ComponentLoading',
  initialState,
  reducers: {
    setComponentLevelLoading: (state, action) => {
      state.componentLevelLoading = action.payload;
    },
  },
});

export const {setComponentLevelLoading} = ComponentLoading.actions;
export default ComponentLoading.reducer;
