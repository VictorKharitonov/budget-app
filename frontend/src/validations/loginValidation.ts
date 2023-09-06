import { object, number } from 'yup';

export const loginScheme = object({
  chatId: number()
    .transform(value => (isNaN(value) ? null : value))
    .required('Chat Id must be a number')
});
