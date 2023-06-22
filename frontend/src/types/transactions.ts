export interface TransactionsItem {
  id: string,
  category: string[],
  userId: string,
  envelop: string[],
  amount: number,
  date: number,
  description: string,
  type: string,
}

export interface Transactions {
  isLoading: boolean;
  transactions: TransactionsItem[];
  error: string | null;
}

export interface TransactionFilter {
  date: number | null,
  categories: string[],
  type: string,
}