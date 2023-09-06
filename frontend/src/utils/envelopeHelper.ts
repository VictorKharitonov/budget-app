import { EnvelopeItem } from '../types/envelopes';

export const getCurrentEnvelope = (name: string, envelopes: EnvelopeItem[]) => {
  if (envelopes.length) {
    return envelopes.find(envelope => envelope.name === name);
  }
};
