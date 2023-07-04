export interface TransactionsItem {
  _id: string,
  userId: string,
  categories: string[],
  envelopes: string[],
  amount: number,
  currency: string,
  date: number,
  description: string,
  type: string,
}

export interface Transactions {
  isLoading: boolean;
  isSuccess: boolean,
  transactions: TransactionsItem[];
  error: string;
}

export interface TransactionFilter {
  date: number | null,
  categories: string[],
  type: string,
}