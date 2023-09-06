import axios from 'axios';
import { User } from '../types/user';
import { TransactionsItem } from '../types/transactions';
import { EnvelopeItem, EnvelopesInfo } from '../types/envelopes';
import { fetchTransactionsBody } from '../store/asyncActions/transaction/fetchEnvelopeTransactionsAction';

const budgetApi = axios.create({
  baseURL: 'https://cloud.uibakery.io/api/automation'
});

export const getUserInfoByChatId = async (chatId: number) => {
  let response = await budgetApi.post<User>(
    '/IWUGJBrSfz',
    {
      chatId: chatId
    },
    {
      params: {
        key: '797e227d-6847-48f5-a0e4-1d0e3d193de6'
      }
    }
  );

  return response.data;
};

export const getEnvelopeTransactions = async (body: fetchTransactionsBody) => {
  let response = await budgetApi.post<TransactionsItem[]>('/uuE9s772t3', body, {
    params: {
      key: 'f045954a-c4ee-49d4-8e0c-b230f3592816'
    }
  });

  return response.data;
};

export const getEnvelopeInfo = async (userId: string, envelope: string) => {
  let response = await budgetApi.post<EnvelopesInfo>(
    '/XTZvcfmtIR',
    {
      userId: userId,
      envelope: envelope
    },
    {
      params: {
        key: 'dfaf5c12-0d49-4920-926e-633669802168'
      }
    }
  );

  return response.data;
};

export const updateUser = async (envelopes: EnvelopeItem[], userId: string, categories: string[]) => {
  return await budgetApi.post(
    'EJnsqB3QJU',
    {
      envelopes,
      userId,
      categories
    },
    {
      params: {
        key: 'ae015b56-a2b8-473c-a0d1-c9e1c9004a08'
      }
    }
  );
};

export const createTransaction = async (transaction: Omit<TransactionsItem, '_id'>) => {
  let response = await budgetApi.post('HvIJOlwQbV', transaction, {
    params: {
      key: '046cbfba-ae51-4fab-9f8f-62c800f05504'
    }
  });

  return response.data;
};

export const deleteTransaction = async (userId: string, _id: string) => {
  let response = await budgetApi.post(
    '4zhiXYiKAF',
    {
      userId,
      _id
    },
    {
      params: {
        key: '8f9f830f-9e51-4a09-b44b-c823b6e4b2e7'
      }
    }
  );

  return response.data;
};

export const updateTransaction = async (transaction: TransactionsItem) => {
  let response = await budgetApi.post('p8lkrjpKlr', transaction, {
    params: {
      key: '418773b7-5598-4143-985f-98901bef1dfd'
    }
  });

  return response.data;
};
