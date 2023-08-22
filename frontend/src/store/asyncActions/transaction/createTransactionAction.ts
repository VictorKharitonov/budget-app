import {createAsyncThunk} from "@reduxjs/toolkit";
import {createTransaction as _createTransaction} from "../../../Api/budgetApi";
import {TransactionsItem} from "../../../types/transactions";

interface Body extends Omit<TransactionsItem, "_id"> {}

export const createTransactionAction = createAsyncThunk<string, Body, { rejectValue: string }>(
  'transactions/createTransaction',
  async (transaction, { rejectWithValue }) => {
    try {
	  return await _createTransaction(transaction);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
