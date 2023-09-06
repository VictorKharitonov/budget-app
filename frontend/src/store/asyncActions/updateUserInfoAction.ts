import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser } from '../../Api/budgetApi';
import { EnvelopeItem } from '../../types/envelopes';

interface Body {
  envelopes: EnvelopeItem[];
  userId: string;
  categories: string[];
}

interface Response {
  envelopes: EnvelopeItem[];
  categories: string[];
}

export const updateUserInfo = createAsyncThunk<Response, Body, { rejectValue: string }>(
  'user/updateUser',
  async ({ envelopes, userId, categories }, { rejectWithValue }) => {
    try {
      await updateUser(envelopes, userId, categories);
      return { envelopes, categories };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
