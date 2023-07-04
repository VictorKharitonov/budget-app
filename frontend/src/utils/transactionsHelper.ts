import {TransactionsItem} from "../types/transactions";

export const getTransactionById = (id: string, transactions: TransactionsItem[]) => {
  return [...transactions].find(transaction => transaction._id === id);
};
