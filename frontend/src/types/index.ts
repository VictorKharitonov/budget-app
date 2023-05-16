export interface EnvelopeItem {
  id: string,
  userId: string,
  name: string,
}

export interface TransactionsItem {
  id: string,
  category: string[],
  userId: string,
  envelop: string[],
  amount: number,
  date: string,
  description: string,
  type: string,
}