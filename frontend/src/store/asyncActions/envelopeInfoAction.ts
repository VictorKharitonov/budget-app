import { createAsyncThunk } from '@reduxjs/toolkit';
import { EnvelopesInfo } from '../../types/envelopes';
import { getEnvelopeInfo } from '../../Api/budgetApi';

interface Body {
  userId: string;
  envelopeName: string;
}

export const envelopeInfoAction = createAsyncThunk<EnvelopesInfo, Body, { rejectValue: string }>(
  'envelopeInfo',
  async ({ userId, envelopeName }, { rejectWithValue, signal }) => {
    try {
      return await getEnvelopeInfo(userId, envelopeName, signal);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
