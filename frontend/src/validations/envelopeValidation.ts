import { object, string } from 'yup';

export const envelopeScheme = object({
  name: string().required(),
});
