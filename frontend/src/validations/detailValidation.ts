import { array, date, number, object, string } from 'yup';

let maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 1);

export const detailScheme = object({
  categories: array(string()).min(1, 'Pick at least 1 category').required(),
  envelopes: array(string()).min(1, 'Pick at least 1 envelope').required(),
  amount: number()
    .transform(value => (Number.isNaN(value) ? null : value))
    .nullable()
    .required()
    .positive(),
  date: date()
    .transform((value, originalValue, ctx) => {
      if (originalValue === null) {
        return null;
      }
      return ctx.isType(value) ? value : new Date(originalValue);
    })
    .typeError('Enter valid date')
    .required()
    .max(maxDate),
  description: string().max(256).required(),
  type: string<'income' | 'expenses'>().required()
});
