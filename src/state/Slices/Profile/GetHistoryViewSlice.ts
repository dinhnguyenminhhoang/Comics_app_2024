// reducer.js
import {createSlice} from '@reduxjs/toolkit';
import {getHistoryView} from 'state/Action/profileAction';
import {ProfileType, historyViewType} from 'utils/datatype';

const GetHistoryViewSlice = createSlice({
  name: 'get-history-view',
  initialState: {
    data: [] as historyViewType[],
    isLoading: false,
    error: null as string | null,
    isMore: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHistoryView.pending, state => {
        state.isLoading = true;
      })
      .addCase(getHistoryView.fulfilled, (state, action: {payload: any}) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.isMore = action.payload.paging.has_more;
      })
      .addCase(getHistoryView.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default GetHistoryViewSlice.reducer;
