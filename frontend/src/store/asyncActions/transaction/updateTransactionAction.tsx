import {createAsyncThunk} from "@reduxjs/toolkit";
import {updateTransaction} from "../../../Api/budgetApi";
import {TransactionsItem} from "../../../types/transactions";

export const updateTransactionAction = createAsyncThunk<TransactionsItem, TransactionsItem, { rejectValue: string }>(
  'transactions/updateTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
      await updateTransaction(transaction);
      return transaction;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
