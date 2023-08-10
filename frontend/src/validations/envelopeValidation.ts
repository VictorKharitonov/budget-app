import {object, string} from 'yup';

export const envelopeScheme = object({
  name: string()
    .test(
      'unique',
      'Envelope already exist',
      function (value) {
        const envelopes = this.options.context?.envelopes;
        return !envelopes || !envelopes.includes(value);
      }
    )
    .required(),
});
