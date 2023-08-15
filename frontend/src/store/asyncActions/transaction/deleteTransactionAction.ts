import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteTransaction} from "../../../Api/budgetApi";

interface Body {
  userId: string,
  _id: string
}

export const deleteTransactionAction = createAsyncThunk<string, Body, { rejectValue: string }>(
	'transactions/deleteTransaction',
	async ({userId, _id}, { rejectWithValue }) => {
	  try {
		await deleteTransaction(userId, _id);
		return _id;
	  } catch (error) {
		return rejectWithValue(error.message);
	  }
	}
);
