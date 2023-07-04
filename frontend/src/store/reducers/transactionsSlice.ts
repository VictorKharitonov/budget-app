import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Transactions, TransactionsItem} from "../../types/transactions";
import {fetchEnvelopeTransactions} from "../asyncActions/transaction/fetchEnvelopeTransactionsAction";

const initialState: Transactions = {
  isLoading: false,
  isSuccess: false,
  transactions: [],
  error: ''
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateTransactionById(state, action: PayloadAction<TransactionsItem>) {
      state.transactions = state.transactions.map((item: TransactionsItem) => {
        return item._id === action.payload._id ? action.payload : item;
      });
    },
    _createTransaction(state, action: PayloadAction<TransactionsItem>) {
      state.transactions.unshift(action.payload);
    },
    deleteTransactionById(state, action: PayloadAction<TransactionsItem>) {
      state.transactions = state.transactions.filter((item: TransactionsItem) => {
        return item._id === action.payload._id ? null : item;
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEnvelopeTransactions.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchEnvelopeTransactions.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.transactions = action.payload;
    })
    builder.addCase(fetchEnvelopeTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || '';
    })
  },
});

export default transactionsSlice.reducer;
export const {updateTransactionById, _createTransaction, deleteTransactionById} = transactionsSlice.actions;
