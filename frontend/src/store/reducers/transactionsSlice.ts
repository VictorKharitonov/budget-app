import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {testTransactions} from "../../mock"
import {Transactions} from "../../types/transactions";
import {TransactionsItem} from "../../types";
import {getLatestTransactions as latest} from "../../utils/transactionsHelper";

const initialState: Transactions = {
  isLoading: true,
  transactions: [],
  error: null
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions(state) {
      state.transactions = testTransactions;
    },
    getLatestTransactions(state, action: PayloadAction<string>) {
      state.transactions = testTransactions.filter((transaction: TransactionsItem) => {
        return transaction.envelop.includes(action.payload)
      });
      state.transactions = latest(state.transactions);
    },
    updateTransactionById(state, action: PayloadAction<TransactionsItem>) {
      state.transactions = state.transactions.map((item: TransactionsItem) => {
        return item.id === action.payload.id ? action.payload : item;
      });
    },
    _createTransaction(state, action: PayloadAction<TransactionsItem>) {
      state.transactions.unshift(action.payload);
    },
    deleteTransactionById(state, action: PayloadAction<TransactionsItem>) {
      state.transactions = state.transactions.filter((item: TransactionsItem) => {
        return item.id === action.payload.id ? null : item;
      })
    }
  }
});

export default transactionsSlice.reducer;
export const {getTransactions, getLatestTransactions, updateTransactionById, _createTransaction, deleteTransactionById} = transactionsSlice.actions;
