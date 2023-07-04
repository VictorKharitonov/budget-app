export interface EnvelopeItem {
  name: string,
  status: 'open' | 'closed' | 'frozen'
}

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

export interface CategoryItem {
  name: string,
}
