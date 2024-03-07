import { IEnvelopeInfo } from '../../types/envelopes';
import { createSlice } from '@reduxjs/toolkit';
import { envelopeInfoAction } from '../asyncActions';

const initialState: IEnvelopeInfo = {
  envelopeInfo: null,
  isLoading: false,
  isSuccess: false,
  error: null
};

export const envelopeInfoSlice = createSlice({
  name: 'envelopeInfo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(envelopeInfoAction.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.isSuccess = false;
    });
    builder.addCase(envelopeInfoAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.envelopeInfo = action.payload;
      state.error = null;
    });
    builder.addCase(envelopeInfoAction.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload;
        state.isLoading = false;
      } else {
        state.error = action.error.message || 'Something went wrong, try it`s later';
      }
    });
  }
});
