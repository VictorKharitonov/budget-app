import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsItem } from '../../../types/transactions';
import { getEnvelopeTransactions } from '../../../Api/budgetApi';

export interface Filter {
  field: string;
  value: string | number | string[] | null;
}

export interface fetchTransactionsBody {
  userId: string;
  envelope: string;
  limit: number;
  offset: number;
  sort?: Filter,
  filter?: Filter[] | null,
}

export const fetchEnvelopeTransactions = createAsyncThunk<TransactionsItem[], fetchTransactionsBody, { rejectValue: string }>(
  'transactions/fetchEnvelopeTransactions',
  async ({userId, envelope, limit, offset, sort, filter}, {rejectWithValue}) => {
    try {
	  return await getEnvelopeTransactions({ userId, envelope, limit, offset, sort, filter });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
