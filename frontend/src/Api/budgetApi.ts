import axios from "axios";
import {User} from "../types/user";
import {TransactionsItem} from "../types/transactions";
import {EnvelopeItem, EnvelopesInfo} from "../types/envelopes";

const budgetApi = axios.create({
  baseURL: 'https://cloud.uibakery.io/api/automation',
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
}

export const getEnvelopeTransactions = async (userId: string, envelope: string, limit: number, offset: number) => {
  let response = await budgetApi.post<TransactionsItem[]>(
    '/uuE9s772t3',
    {
      userId: userId,
      envelope: envelope,
      limit: limit,
      offset: offset
    },
    {
      params: {
        key: 'f045954a-c4ee-49d4-8e0c-b230f3592816'
      }
    }
  );

  return response.data;
}

export const getEnvelopeInfo = async (userId: string, envelope: string) => {
  let response = await budgetApi.post<EnvelopesInfo>(
    '/XTZvcfmtIR',
    {
      userId: userId,
      envelope: envelope,
    },
    {
      params: {
        key: 'dfaf5c12-0d49-4920-926e-633669802168'
      }
    }
  );

  return response.data;
}

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
  )
};