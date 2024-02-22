import { createSlice } from '@reduxjs/toolkit';
import { Transactions } from '../../types/transactions';
import {
  fetchEnvelopeTransactionsAction,
  createTransactionAction,
  deleteTransactionAction,
  updateTransactionAction
} from '../asyncActions/transaction';
import { getTransactionById } from '../../utils/transactionsHelper';

const initialState: Transactions = {
  isLoading: false,
  isLoadingCreate: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  isSuccess: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isDeleteSuccess: false,
  error: '',
  createError: '',
  updateError: '',
  deleteError: '',
  transactions: [],
  selectedTransaction: undefined
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    selectTransactionAction(state, action) {
      state.selectedTransaction = getTransactionById(action.payload, state.transactions);
    },
    clearTransactionsAction(state) {
      state.transactions = [];
      state.isSuccess = false;
      state.selectedTransaction = undefined;
      state.isLoading = true;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEnvelopeTransactionsAction.pending, state => {
      state.isLoading = true;
      state.isDeleteSuccess = false;
      state.isCreateSuccess = false;
    });
    builder.addCase(fetchEnvelopeTransactionsAction.fulfilled, (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.error = '';
      state.transactions = action.payload;
    });
    builder.addCase(fetchEnvelopeTransactionsAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Something went wrong, try it`s later';
    });
    builder.addCase(createTransactionAction.pending, state => {
      state.isLoadingCreate = true;
      state.isCreateSuccess = false;
    });
    builder.addCase(createTransactionAction.fulfilled, state => {
      state.isLoadingCreate = false;
      state.isCreateSuccess = true;
    });
    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.isLoadingCreate = false;
      state.createError = action.payload || 'Something went wrong, try it`s later';
    });
    builder.addCase(deleteTransactionAction.pending, state => {
      state.isLoadingDelete = true;
      state.isDeleteSuccess = false;
      state.deleteError = '';
      state.updateError = '';
    });
    builder.addCase(deleteTransactionAction.fulfilled, state => {
      state.isLoadingDelete = false;
      state.isDeleteSuccess = true;
    });
    builder.addCase(deleteTransactionAction.rejected, (state, action) => {
      state.isLoadingDelete = false;
      state.deleteError = action.payload || 'Something went wrong, try it`s later';
    });
    builder.addCase(updateTransactionAction.pending, state => {
      state.isLoadingUpdate = true;
      state.isUpdateSuccess = false;
      state.updateError = '';
      state.deleteError = '';
    });
    builder.addCase(updateTransactionAction.fulfilled, (state, action) => {
      state.isLoadingUpdate = false;
      state.isUpdateSuccess = true;
      state.transactions = state.transactions.map(transaction =>
        transaction._id === action.payload._id ? action.payload : transaction
      );
      state.selectedTransaction = action.payload;
    });
    builder.addCase(updateTransactionAction.rejected, (state, action) => {
      state.isLoadingUpdate = false;
      state.updateError = action.payload || 'Something went wrong, try it`s later';
    });
  }
});

export const { clearTransactionsAction, selectTransactionAction } = transactionsSlice.actions;
