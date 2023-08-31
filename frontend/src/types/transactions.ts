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
}

export interface TransactionFilter {
  date: number | null;
  categories: string[];
  type: string;
}
