import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilter, TransactionsItem } from '../../../types/transactions';
import { getEnvelopeTransactions } from '../../../Api/budgetApi';

export interface fetchTransactionsBody {
  userId: string;
  envelope: string;
  limit: number;
  offset: number;
  sort?: IFilter;
  filter?: IFilter[] | null;
}

export const fetchEnvelopeTransactionsAction = createAsyncThunk<
  TransactionsItem[],
  fetchTransactionsBody,
  { rejectValue: string }
>(
  'transactions/fetchEnvelopeTransactions',
  async ({ userId, envelope, limit, offset, sort, filter }, { rejectWithValue }) => {
    try {
      return await getEnvelopeTransactions({ userId, envelope, limit, offset, sort, filter });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
