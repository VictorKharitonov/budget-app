import {TransactionsItem} from '../types';

export const getLatestTransactions = (transactions: TransactionsItem[]) => {
  return transactions.length < 10 ? transactions : transactions.slice(transactions.length - 10);
};

export const getTransactionById = (id: string, transactions: TransactionsItem[]) => {
  return [...transactions].find(transaction => transaction.id === id);
};
