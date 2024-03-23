import React from 'react';

export interface TransactionsItem {
  _id: string;
  userId: string;
  categories: string[];
  envelopes: string[];
  amount: number;
  currency: string;
  date: number;
  description: string;
  type: string;
}

export interface Transactions {
  isLoading: boolean;
  isSuccess: boolean;
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  error: string;
  createError: string;
  updateError: string;
  deleteError: string;
  transactions: TransactionsItem[];
  selectedTransaction: TransactionsItem | undefined;
}

export interface ITransactionFilter {
  date: number | null;
  categories: string[];
  type: string;
}

export interface IFilter {
  field: string;
  value: string | number | string[] | null;
}

export interface Column {
  id: 'date' | 'amount' | 'type' | 'categories' | 'description' | 'currency';
  label: string;
  format?: (value: any) => string | React.ReactNode;
}

export type TOrder = 'asc' | 'desc';
export type TOderBy = keyof TransactionsItem;
