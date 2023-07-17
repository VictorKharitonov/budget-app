import {createAsyncThunk} from "@reduxjs/toolkit";
import {TransactionsItem} from "../../../types/transactions";
import {getEnvelopeTransactions} from "../../../Api/budgetApi";

interface Body {
  userId: string,
  envelope: string,
  limit: number,
  offset: number
}

export const fetchEnvelopeTransactions = createAsyncThunk<TransactionsItem[], Body, { rejectValue: string }>(
  'envelopeTransactions/fetchEnvelopeTransactions',
  async ({userId, envelope, limit, offset}, {rejectWithValue}) => {
    try {
      let transactions = await getEnvelopeTransactions(userId, envelope, limit, offset);
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)