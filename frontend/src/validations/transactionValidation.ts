import {array, number, object, string} from 'yup';

export const transactionScheme = object({
  currency: string().required(),
  categories: array(string()).transform((value, originalValue, ctx) => {
    if (value.length === 0) {
      return null;
    }
    return value.split(',');
  }).required(),
  envelopes: array(string()).min(1, 'Pick at least 1 envelope').required(),
  amount: number().transform((value) => Number.isNaN(value) ? null : value).nullable().required().positive(),
  description: string().max(256).required(),
  type: string<'income' | 'expenses'>().required(),
});